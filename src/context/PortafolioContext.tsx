import { createContext, useContext, useState } from "react";
import { toast } from "sonner";

export interface Stock {
    ticker: string;
    company: string;
    price: number;
    change: number;
}

export interface Holding {
    ticker: string;
    company: string;
    shares: number;
    avgPrice: number;
    currentPrice: number;
    purchaseDate: string;
}

export interface Transaction {
    id: string;
    type: "compra" | "venta";
    ticker: string;
    company: string;
    shares: number;
    price: number;
    total: number;
    date: string;
    bank: string;
}

interface PortfolioContextType {
    balance: number;
    holdings: Holding[];
    transactions: Transaction[];
    stocks: Stock[];
    totalValue: number;
    totalInvested: number;
    totalGainLoss: number;
    totalGainLossPercent: number;
    buyStock: (ticker: string, shares: number, bank: string) => boolean;
    sellStock: (ticker: string, shares: number, bank: string) => boolean;
    getPortfolioValue: () => number;
    getTotalGainLoss: () => { absolute: number; percent: number };
}

const initialStocks: Stock[] = [
    { ticker: "LAFISE", company: "LAFISE Nicaragua", price: 148.2, change: 5.1 },
    { ticker: "BANCEN", company: "Banco Central", price: 96.8, change: -3.5 },
    { ticker: "AGRI", company: "Agrícola Nicaragua", price: 54.8, change: 5.2 },
    { ticker: "ENITEL", company: "ENITEL Telecom", price: 80.5, change: 2.0 },
    { ticker: "CEMEX", company: "CEMEX Nicaragua", price: 122.3, change: -2.8 },
];

const initialHoldings: Holding[] = [
    { ticker: "LAFISE", company: "LAFISE Nicaragua", shares: 500, avgPrice: 140.5, currentPrice: 148.2, purchaseDate: "2024-01-10" },
    { ticker: "BANCEN", company: "Banco Central", shares: 350, avgPrice: 100.2, currentPrice: 96.8, purchaseDate: "2023-12-15" },
    { ticker: "AGRI", company: "Agrícola Nicaragua", shares: 800, avgPrice: 52.0, currentPrice: 54.8, purchaseDate: "2024-01-05" },
    { ticker: "ENITEL", company: "ENITEL Telecom", shares: 250, avgPrice: 78.5, currentPrice: 80.5, purchaseDate: "2024-01-12" },
];

const initialTransactions: Transaction[] = [
    { id: "1", type: "compra", ticker: "LAFISE", company: "LAFISE Nicaragua", shares: 500, price: 140.5, total: 70250, date: "2024-01-10 09:30", bank: "BAC Nicaragua" },
    { id: "2", type: "compra", ticker: "BANCEN", company: "Banco Central", shares: 350, price: 100.2, total: 35070, date: "2023-12-15 14:20", bank: "Banpro" },
    { id: "3", type: "compra", ticker: "AGRI", company: "Agrícola Nicaragua", shares: 800, price: 52.0, total: 41600, date: "2024-01-05 10:15", bank: "BAC Nicaragua" },
];

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const usePortfolio = () => {
    const context = useContext(PortfolioContext);
    if (!context) {
        throw new Error("usePortfolio must be used within a PortfolioProvider");
    }
    return context;
};

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
    const [balance, setBalance] = useState(100000); // Starting cash balance
    const [holdings, setHoldings] = useState<Holding[]>(initialHoldings);
    const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
    const [stocks] = useState<Stock[]>(initialStocks);

    const getPortfolioValue = () => {
        const holdingsValue = holdings.reduce((acc, h) => acc + h.shares * h.currentPrice, 0);
        return balance + holdingsValue;
    };

    const getTotalGainLoss = () => {
        const totalCost = holdings.reduce((acc, h) => acc + h.shares * h.avgPrice, 0);
        const currentValue = holdings.reduce((acc, h) => acc + h.shares * h.currentPrice, 0);
        const absolute = currentValue - totalCost;
        const percent = totalCost > 0 ? (absolute / totalCost) * 100 : 0;
        return { absolute, percent };
    };

    // Computed values
    const totalInvested = holdings.reduce((acc, h) => acc + h.shares * h.avgPrice, 0);
    const currentHoldingsValue = holdings.reduce((acc, h) => acc + h.shares * h.currentPrice, 0);
    const totalValue = currentHoldingsValue;
    const totalGainLoss = currentHoldingsValue - totalInvested;
    const totalGainLossPercent = totalInvested > 0 ? (totalGainLoss / totalInvested) * 100 : 0;

    const buyStock = (ticker: string, shares: number, bank: string): boolean => {
        const stock = stocks.find((s) => s.ticker === ticker);
        if (!stock) {
            toast.error("Acción no encontrada");
            return false;
        }

        const total = stock.price * shares;
        if (total > balance) {
            toast.error("Saldo insuficiente para esta compra");
            return false;
        }

        // Update balance
        setBalance((prev) => prev - total);

        // Update or create holding
        setHoldings((prev) => {
            const existing = prev.find((h) => h.ticker === ticker);
            if (existing) {
                const newTotalShares = existing.shares + shares;
                const newAvgPrice = ((existing.shares * existing.avgPrice) + (shares * stock.price)) / newTotalShares;
                return prev.map((h) =>
                    h.ticker === ticker
                        ? { ...h, shares: newTotalShares, avgPrice: newAvgPrice, currentPrice: stock.price }
                        : h
                );
            } else {
                return [
                    ...prev,
                    {
                        ticker: stock.ticker,
                        company: stock.company,
                        shares,
                        avgPrice: stock.price,
                        currentPrice: stock.price,
                        purchaseDate: new Date().toISOString().split("T")[0],
                    },
                ];
            }
        });

        // Add transaction
        const newTransaction: Transaction = {
            id: Date.now().toString(),
            type: "compra",
            ticker: stock.ticker,
            company: stock.company,
            shares,
            price: stock.price,
            total,
            date: new Date().toLocaleString("es-NI"),
            bank,
        };
        setTransactions((prev) => [newTransaction, ...prev]);

        toast.success(`Compra exitosa: ${shares} acciones de ${stock.ticker}`);
        return true;
    };

    const sellStock = (ticker: string, shares: number, bank: string): boolean => {
        const holding = holdings.find((h) => h.ticker === ticker);
        if (!holding) {
            toast.error("No posees acciones de esta empresa");
            return false;
        }

        if (shares > holding.shares) {
            toast.error(`Solo tienes ${holding.shares} acciones disponibles`);
            return false;
        }

        const stock = stocks.find((s) => s.ticker === ticker);
        const price = stock?.price || holding.currentPrice;
        const total = price * shares;

        // Update balance
        setBalance((prev) => prev + total);

        // Update holdings
        setHoldings((prev) => {
            if (shares === holding.shares) {
                return prev.filter((h) => h.ticker !== ticker);
            }
            return prev.map((h) =>
                h.ticker === ticker ? { ...h, shares: h.shares - shares } : h
            );
        });

        // Add transaction
        const newTransaction: Transaction = {
            id: Date.now().toString(),
            type: "venta",
            ticker,
            company: holding.company,
            shares,
            price,
            total,
            date: new Date().toLocaleString("es-NI"),
            bank,
        };
        setTransactions((prev) => [newTransaction, ...prev]);

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
                buyStock,
                sellStock,
                getPortfolioValue,
                getTotalGainLoss,
            }}
        >
            {children}
        </PortfolioContext.Provider>
    );
}
