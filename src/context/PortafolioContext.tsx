import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { stocksAPI, portfolioAPI, transactionsAPI, type Stock, type Holding, type Transaction } from "../services/api";
import { useAuth } from "./AuthContext";

export type { Stock, Holding, Transaction };

interface PortfolioContextType {
    balance: number;
    holdings: Holding[];
    transactions: Transaction[];
    stocks: Stock[];
    totalValue: number;
    totalInvested: number;
    totalGainLoss: number;
    totalGainLossPercent: number;
    isLoading: boolean;
    buyStock: (ticker: string, shares: number, bank: string, price?: number) => Promise<boolean>;
    sellStock: (ticker: string, shares: number, bank: string, price?: number) => Promise<boolean>;
    refreshPortfolio: () => Promise<void>;
    refreshStocks: () => Promise<void>;
}

// Fallback/initial data - start with cash to invest
const initialBalance = 1000;

const fallbackStocks: Stock[] = [
    { ticker: "LAFISE", company: "LAFISE Nicaragua", price: 148.2, change: 5.1 },
    { ticker: "BANCEN", company: "Banco Central", price: 96.8, change: -3.5 },
    { ticker: "AGRI", company: "Agrícola Nicaragua", price: 54.8, change: 5.2 },
    { ticker: "ENITEL", company: "ENITEL Telecom", price: 80.5, change: 2.0 },
    { ticker: "CEMEX", company: "CEMEX Nicaragua", price: 122.3, change: -2.8 },
];

// Start with empty holdings - user builds their own portfolio
const fallbackHoldings: Holding[] = [];

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const usePortfolio = () => {
    const context = useContext(PortfolioContext);
    if (!context) {
        throw new Error("usePortfolio must be used within a PortfolioProvider");
    }
    return context;
};

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
    const { token } = useAuth();

    const [balance, setBalance] = useState(initialBalance);
    const [holdings, setHoldings] = useState<Holding[]>(fallbackHoldings);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [stocks, setStocks] = useState<Stock[]>(fallbackStocks);
    const [isLoading, setIsLoading] = useState(false);
    const [backendAvailable, setBackendAvailable] = useState(false);

    // Computed values
    const totalInvested = holdings.reduce((acc, h) => acc + h.shares * h.avgPrice, 0);
    const currentHoldingsValue = holdings.reduce((acc, h) => acc + h.shares * h.currentPrice, 0);
    const totalValue = currentHoldingsValue;
    const totalGainLoss = currentHoldingsValue - totalInvested;
    const totalGainLossPercent = totalInvested > 0 ? (totalGainLoss / totalInvested) * 100 : 0;

    // Fetch stocks from API
    const refreshStocks = useCallback(async () => {
        try {
            const data = await stocksAPI.getAll();
            if (data && data.length > 0) {
                setStocks(data);
                setBackendAvailable(true);
            }
        } catch (error) {
            console.error("Error fetching stocks (using fallback):", error);
            setBackendAvailable(false);
            // Keep fallback data
        }
    }, []);

    // Fetch portfolio from API
    const refreshPortfolio = useCallback(async () => {
        if (!token) return;

        setIsLoading(true);
        try {
            const [portfolio, txns] = await Promise.all([
                portfolioAPI.getSummary(),
                transactionsAPI.getAll(),
            ]);

            // Only update if we got valid data
            if (portfolio) {
                console.log("Portfolio data received:", portfolio);
                setBalance(portfolio.balance);
                if (portfolio.holdings && portfolio.holdings.length >= 0) {
                    console.log("Setting holdings:", portfolio.holdings);
                    setHoldings(portfolio.holdings.length > 0 ? portfolio.holdings : fallbackHoldings);
                }
            }
            if (txns) {
                console.log("Transactions received:", txns);
                setTransactions(txns);
            }
            setBackendAvailable(true);
        } catch (error) {
            console.error("Error fetching portfolio (using fallback):", error);
            setBackendAvailable(false);
            // Keep current/fallback data - don't reset
        } finally {
            setIsLoading(false);
        }
    }, [token]);

    // Load data on mount and when token changes
    useEffect(() => {
        refreshStocks();
        if (token) {
            refreshPortfolio();
        }
    }, [token, refreshStocks, refreshPortfolio]);

    // Global Price Simulation
    useEffect(() => {
        const interval = setInterval(() => {
            setStocks(prevStocks => {
                return prevStocks.map(stock => {
                    const volatility = 0.02; // 2% max change
                    const changePercent = (Math.random() * volatility * 2 - volatility);
                    const newPrice = Math.max(0.01, stock.price * (1 + changePercent));

                    // Update change percentage relative to original/previous close (simplified here to just be daily change)
                    // For demo purposes, we just add the instant change to the daily change
                    const newChange = stock.change + (changePercent * 100);

                    return {
                        ...stock,
                        price: newPrice,
                        change: Number(newChange.toFixed(2))
                    };
                });
            });
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const buyStock = async (ticker: string, shares: number, bank: string, price?: number): Promise<boolean> => {
        // Try backend first if available AND no custom price (simulation)
        if (token && backendAvailable && !price) {
            try {
                const transaction = await transactionsAPI.buy({ ticker, shares, bank });
                await refreshPortfolio();
                toast.success(`Compra exitosa: ${shares} acciones de ${transaction.ticker}`);
                return true;
            } catch (error: any) {
                console.error("Backend buy failed, using local:", error);
                // Fall through to local transaction
            }
        }

        // Local transaction (no backend or backend failed)
        const stock = stocks.find(s => s.ticker === ticker);
        if (!stock) {
            toast.error("Acción no encontrada");
            return false;
        }

        const currentPrice = price || stock.price;
        const total = currentPrice * shares;
        if (total > balance) {
            toast.error("Saldo insuficiente");
            return false;
        }

        // Update balance
        setBalance(prev => prev - total);

        // Update holdings
        setHoldings(prev => {
            const existing = prev.find(h => h.ticker === ticker);
            if (existing) {
                const newShares = existing.shares + shares;
                const newAvg = ((existing.shares * existing.avgPrice) + (shares * currentPrice)) / newShares;
                return prev.map(h => h.ticker === ticker
                    ? { ...h, shares: newShares, avgPrice: newAvg, currentPrice: currentPrice }
                    : h
                );
            }
            return [...prev, {
                ticker,
                company: stock.company,
                shares,
                avgPrice: currentPrice,
                currentPrice: currentPrice,
                purchaseDate: new Date().toISOString().split('T')[0]
            }];
        });

        // Add transaction
        const newTransaction: Transaction = {
            id: Date.now().toString(),
            type: "compra",
            ticker,
            company: stock.company,
            shares,
            price: currentPrice,
            total,
            date: new Date().toLocaleString("es-NI"),
            bank,
        };
        setTransactions(prev => [newTransaction, ...prev]);

        toast.success(`Compra exitosa: ${shares} acciones de ${ticker}`);
        return true;
    };

    const sellStock = async (ticker: string, shares: number, bank: string, price?: number): Promise<boolean> => {
        // Try backend first if available AND no custom price (simulation)
        if (token && backendAvailable && !price) {
            try {
                const transaction = await transactionsAPI.sell({ ticker, shares, bank });
                await refreshPortfolio();
                toast.success(`Venta exitosa: ${shares} acciones de ${transaction.ticker}`);
                return true;
            } catch (error: any) {
                console.error("Backend sell failed, using local:", error);
                // Fall through to local transaction
            }
        }

        // Local transaction
        const holding = holdings.find(h => h.ticker === ticker);
        if (!holding) {
            toast.error("No posees esta acción");
            return false;
        }
        if (shares > holding.shares) {
            toast.error(`Solo tienes ${holding.shares} acciones`);
            return false;
        }

        const currentPrice = price || stocks.find(s => s.ticker === ticker)?.price || holding.currentPrice;
        const total = currentPrice * shares;

        // Update balance
        setBalance(prev => prev + total);

        // Update holdings
        setHoldings(prev => {
            if (shares === holding.shares) {
                return prev.filter(h => h.ticker !== ticker);
            }
            return prev.map(h => h.ticker === ticker ? { ...h, shares: h.shares - shares } : h);
        });

        // Add transaction
        const newTransaction: Transaction = {
            id: Date.now().toString(),
            type: "venta",
            ticker,
            company: holding.company,
            shares,
            price: currentPrice,
            total,
            date: new Date().toLocaleString("es-NI"),
            bank,
        };
        setTransactions(prev => [newTransaction, ...prev]);

        toast.success(`Venta exitosa: ${shares} acciones de ${ticker}`);
        return true;
    };

    return (
        <PortfolioContext.Provider
            value={{
                balance,
                holdings,
                transactions,
                stocks,
                totalValue,
                totalInvested,
                totalGainLoss,
                totalGainLossPercent,
                isLoading,
                buyStock,
                sellStock,
                refreshPortfolio,
                refreshStocks,
            }}
        >
            {children}
        </PortfolioContext.Provider>
    );
}
