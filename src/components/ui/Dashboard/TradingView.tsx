import { useMemo } from "react";
import { Activity } from "lucide-react";
import { StockChart } from "./StockChart";
import { type Stock, type Holding } from "../../../context/PortafolioContext";


interface TradingViewProps {
    tradingStock: string;
    stocks: Stock[];
    holdings: Holding[];
    balance: number;
    buyStock: (ticker: string, shares: number, bank: string, price?: number) => Promise<boolean>;
    sellStock: (ticker: string, shares: number, bank: string, price?: number) => Promise<boolean>;
}

export const TradingView = ({ tradingStock, stocks, holdings, balance, buyStock, sellStock }: TradingViewProps) => {
    const stock = stocks.find(s => s.ticker === tradingStock);
    const holding = holdings.find(h => h.ticker === tradingStock);

    // Memoize the initial price so it doesn't change when global stock price updates
    // This prevents the chart from resetting its history/simulation
    const chartInitialPrice = useMemo(() => {
        return stock ? stock.price : 0;
    }, [tradingStock]); // Only update when the USER changes the stock selection

    if (!tradingStock) {
        return (
            <div className="text-center py-12 bg-gradient-to-br from-[#1a1d24] to-[#14161a] border border-white/10 rounded-md">
                <Activity className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">Selecciona una empresa para ver el gráfico en tiempo real</p>
                <p className="text-gray-500 text-sm mt-2">Los precios se actualizan cada 5 segundos</p>
            </div>
        );
    }

    if (!stock) return null;

    return (
        <StockChart
            key={tradingStock}
            ticker={stock.ticker}
            companyName={stock.company}
            initialPrice={chartInitialPrice}
            balance={balance}
            currentHoldings={holding?.shares || 0}
            onBuy={async (qty, price) => {
                return await buyStock(stock.ticker, qty, "Bolsa de Valores", price);
            }}
            onSell={async (qty, price) => {
                return await sellStock(stock.ticker, qty, "Bolsa de Valores", price);
            }}
        />
    );
};
