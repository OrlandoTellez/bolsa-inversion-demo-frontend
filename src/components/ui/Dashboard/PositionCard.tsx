import {
    ArrowUpRight,
    ArrowDownRight,
} from "lucide-react";



// ============ POSITION CARD COMPONENT ============
interface PositionCardProps {
    company: string;
    ticker: string;
    shares: number;
    currentPrice: number;
    change: number;
    changePercent: number;
}



export const PositionCard = ({ company, ticker, shares, currentPrice, change, changePercent }: PositionCardProps) => {
    const isPositive = change >= 0;
    const totalValue = shares * currentPrice;

    return (
        <div className="bg-gradient-to-br from-[#1a1d24] to-[#14161a] border border-white/10 rounded-md p-5 hover:border-white/20 transition-all duration-300 hover:scale-105 group">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="text-white font-bold text-lg mb-1">{ticker}</h3>
                    <p className="text-gray-400 text-sm">{company}</p>
                </div>
                <div className={`flex items-center gap-1 px-3 py-1 rounded-lg ${isPositive ? "bg-green-500/20" : "bg-red-500/20"}`}>
                    {isPositive ? (
                        <ArrowUpRight className="w-4 h-4 text-green-400" />
                    ) : (
                        <ArrowDownRight className="w-4 h-4 text-red-400" />
                    )}
                    <span className={`text-sm font-semibold ${isPositive ? "text-green-400" : "text-red-400"}`}>
                        {isPositive ? "+" : ""}{changePercent.toFixed(2)}%
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
                <div>
                    <p className="text-gray-500 text-xs mb-1">Precio</p>
                    <p className="text-white font-semibold">${currentPrice.toFixed(2)}</p>
                </div>
                <div>
                    <p className="text-gray-500 text-xs mb-1">Acciones</p>
                    <p className="text-white font-semibold">{shares}</p>
                </div>
                <div>
                    <p className="text-gray-500 text-xs mb-1">Valor</p>
                    <p className="text-white font-semibold">${totalValue.toFixed(2)}</p>
                </div>
            </div>

            <div className="pt-3 border-t border-white/10">
                <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Ganancia/Pérdida</span>
                    <span className={`font-bold ${isPositive ? "text-green-400" : "text-red-400"}`}>
                        {isPositive ? "+" : ""}${change.toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    );
};
