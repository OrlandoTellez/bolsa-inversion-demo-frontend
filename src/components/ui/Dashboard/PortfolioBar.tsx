import {
    TrendingUp,
    TrendingDown,
} from "lucide-react";
import { usePortfolio } from "../../../context/PortafolioContext";

export const PortfolioBar = () => {
    const { totalValue, totalGainLoss, totalGainLossPercent } = usePortfolio();
    const isPositive = totalGainLoss >= 0;

    return (
        <div className="bg-[#161a1e] p-6 rounded-2xl shadow-2xl mb-6 relative overflow-hidden">
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>

            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
                <div>
                    <p className="text-white/80 text-sm font-medium mb-1">Valor Total del Portafolio</p>
                    <h2 className="text-4xl font-bold text-white">
                        ${totalValue.toLocaleString("es-NI", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </h2>
                </div>
                <div className="flex items-center gap-3">
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${isPositive ? "bg-green-500/20 backdrop-blur-sm" : "bg-red-500/20 backdrop-blur-sm"}`}>
                        {isPositive ? (
                            <TrendingUp className="w-6 h-6 text-green-300" />
                        ) : (
                            <TrendingDown className="w-6 h-6 text-red-300" />
                        )}
                        <div className="text-right">
                            <p className={`text-lg font-bold ${isPositive ? "text-green-200" : "text-red-200"}`}>
                                {isPositive ? "+" : ""}${totalGainLoss.toFixed(2)}
                            </p>
                            <p className={`text-sm ${isPositive ? "text-green-300" : "text-red-300"}`}>
                                {isPositive ? "+" : ""}{totalGainLossPercent.toFixed(2)}%
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};