import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    PieChart,
    Wallet,
} from "lucide-react";
import { usePortfolio } from "../../../context/PortafolioContext";

export const PortfolioSummary = () => {
    const { totalValue, totalInvested, totalGainLoss, holdings } = usePortfolio();
    // const totalGainLossPercent = ((totalGainLoss / totalInvested) * 100) || 0;

    const stats = [
        {
            label: "Inversión Total",
            value: `$${totalInvested.toLocaleString("es-NI", { minimumFractionDigits: 2 })}`,
            icon: Wallet,
            color: "from-blue-500 to-cyan-500",
            bgColor: "bg-blue-500/10",
        },
        {
            label: "Valor Actual",
            value: `$${totalValue.toLocaleString("es-NI", { minimumFractionDigits: 2 })}`,
            icon: DollarSign,
            color: "from-purple-500 to-pink-500",
            bgColor: "bg-purple-500/10",
        },
        {
            label: "Ganancia/Pérdida",
            value: `${totalGainLoss >= 0 ? "+" : ""}$${totalGainLoss.toFixed(2)}`,
            icon: totalGainLoss >= 0 ? TrendingUp : TrendingDown,
            color: totalGainLoss >= 0 ? "from-green-500 to-emerald-500" : "from-red-500 to-rose-500",
            bgColor: totalGainLoss >= 0 ? "bg-green-500/10" : "bg-red-500/10",
        },
        {
            label: "Empresas",
            value: holdings.length.toString(),
            icon: PieChart,
            color: "from-orange-500 to-yellow-500",
            bgColor: "bg-orange-500/10",
        },
    ];

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
                <div
                    key={stat.label}
                    className="bg-gradient-to-br from-[#1a1d24] to-[#14161a] border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all duration-300 hover:scale-105 group"
                    style={{ animationDelay: `${index * 100}ms` }}
                >
                    <div className="flex items-start justify-between mb-3">
                        <div className={`${stat.bgColor} p-3 rounded-xl`}>
                            <stat.icon className={`w-6 h-6 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} style={{ WebkitTextFillColor: 'transparent' }} />
                        </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                    <h3 className="text-2xl font-bold text-white group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                        {stat.value}
                    </h3>
                </div>
            ))}
        </div>
    );
};
