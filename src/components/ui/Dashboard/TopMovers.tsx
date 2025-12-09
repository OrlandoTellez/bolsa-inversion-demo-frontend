import {
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
} from "lucide-react";

export const TopMovers = () => {
    const movers = [
        { ticker: "BANC", company: "Bancentro", change: "+5.67%", isPositive: true },
        { ticker: "LAFISE", company: "Lafise", change: "+3.42%", isPositive: true },
        { ticker: "BAC", company: "BAC", change: "-2.15%", isPositive: false },
        { ticker: "CORP", company: "Corporación", change: "-1.89%", isPositive: false },
    ];

    return (
        <div className="bg-gradient-to-br from-[#1a1d24] to-[#14161a] border border-white/10 rounded-md p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                Top Movers
            </h3>
            <div className="space-y-3">
                {movers.map((mover, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-white/5 rounded-md hover:bg-white/10 transition-all hover:scale-105 cursor-pointer"
                    >
                        <div>
                            <p className="text-white font-semibold">{mover.ticker}</p>
                            <p className="text-gray-400 text-sm">{mover.company}</p>
                        </div>
                        <div className={`flex items-center gap-1 px-3 py-1 rounded-lg font-semibold ${mover.isPositive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                            }`}>
                            {mover.isPositive ? (
                                <ArrowUpRight className="w-4 h-4" />
                            ) : (
                                <ArrowDownRight className="w-4 h-4" />
                            )}
                            <span>{mover.change}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
