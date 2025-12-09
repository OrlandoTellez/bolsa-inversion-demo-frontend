import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { cn } from "../../../utils/cn";
import { usePortfolio } from "../../../context/PortafolioContext";

const portfolioData = [
    { date: "Ene", value: 185000 },
    { date: "Feb", value: 192000 },
    { date: "Mar", value: 188000 },
    { date: "Abr", value: 205000 },
    { date: "May", value: 215000 },
    { date: "Jun", value: 228000 },
];

export const PortfolioSummary = () => {
    const { totalValue, totalGainLoss, totalGainLossPercent } = usePortfolio();

    const isPositive = totalGainLoss >= 0;

    // Add current value to chart data
    const chartData = [...portfolioData, { date: "Jul", value: totalValue }];

    return (
        <div className="bg-gradient-to-br from-[#1a1d24] to-[#14161a] border border-white/10 rounded-md p-6 animate-fade-in">
            <div className="mb-6 flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-400">Valor Total del Portafolio</p>
                    <h2 className="mt-1 text-3xl font-bold tracking-tight text-white">
                        C$ {totalValue.toLocaleString("es-NI", { minimumFractionDigits: 2 })}
                    </h2>
                    <div className="mt-2 flex items-center gap-2">
                        <span
                            className={cn(
                                "flex items-center gap-1 rounded-full px-2 py-0.5 text-sm font-medium",
                                isPositive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                            )}
                        >
                            {isPositive ? (
                                <ArrowUpRight className="h-3.5 w-3.5" />
                            ) : (
                                <ArrowDownRight className="h-3.5 w-3.5" />
                            )}
                            {totalGainLossPercent.toFixed(2)}%
                        </span>
                        <span className="text-sm text-gray-400">
                            {isPositive ? "+" : ""}C$ {totalGainLoss.toLocaleString("es-NI", { minimumFractionDigits: 2 })} en inversiones
                        </span>
                    </div>
                </div>
                <div
                    className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-xl",
                        isPositive ? "bg-green-500/20" : "bg-red-500/20"
                    )}
                >
                    {isPositive ? (
                        <TrendingUp className="h-6 w-6 text-green-400" />
                    ) : (
                        <TrendingDown className="h-6 w-6 text-red-400" />
                    )}
                </div>
            </div>

            <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={isPositive ? "#1fe066" : "#ef4444"} stopOpacity={0.3} />
                                <stop offset="100%" stopColor={isPositive ? "#1fe066" : "#ef4444"} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: "#9ca3af" }}
                        />
                        <YAxis hide domain={["dataMin - 10000", "dataMax + 10000"]} />
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="rounded-lg border border-white/10 bg-[#1a1d24] px-3 py-2 shadow-lg">
                                            <p className="text-sm font-medium text-white">
                                                C$ {Number(payload[0].value).toLocaleString("es-NI", { minimumFractionDigits: 2 })}
                                            </p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke={isPositive ? "#1fe066" : "#ef4444"}
                            strokeWidth={2}
                            fill="url(#portfolioGradient)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
