import { useState, useEffect, useRef } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown, Activity } from "lucide-react";
import { cn } from "../../../utils/cn";
import { Input } from "../../common/Input";

interface StockChartProps {
    ticker: string;
    companyName: string;
    initialPrice: number;
    balance: number;
    onBuy: (quantity: number, price: number) => Promise<boolean>;
    onSell: (quantity: number, price: number) => Promise<boolean>;
    currentHoldings: number;
}

export const StockChart = ({
    ticker,
    companyName,
    initialPrice,
    balance,
    onBuy,
    onSell,
    currentHoldings
}: StockChartProps) => {
    const [data, setData] = useState<{ time: string; price: number }[]>([]);
    const [currentPrice, setCurrentPrice] = useState(initialPrice);
    const [priceChange, setPriceChange] = useState(0);
    const [quantity, setQuantity] = useState("");
    const [isTrading, setIsTrading] = useState(false);

    // Refs to keep track of interval to clear it on unmount or ticker change
    const intervalRef = useRef<any>(null);

    // Initialize chart data
    useEffect(() => {
        const now = new Date();
        const initialData = Array.from({ length: 20 }).map((_, i) => {
            const time = new Date(now.getTime() - (20 - i) * 5000);
            return {
                time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                price: initialPrice // Start flat
            };
        });
        setData(initialData);
        setCurrentPrice(initialPrice);
        setPriceChange(0);

        // Clear previous interval if exists
        if (intervalRef.current) clearInterval(intervalRef.current);

        // Start simulation
        intervalRef.current = setInterval(() => {
            setCurrentPrice(prev => {
                const volatility = 0.02; // 2% max change
                const change = prev * (Math.random() * volatility * 2 - volatility);
                const newPrice = Math.max(0.01, prev + change); // Ensure price doesn't go below 0.01

                const now = new Date();
                setData(prevData => {
                    const newData = [...prevData.slice(1), {
                        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                        price: newPrice
                    }];
                    return newData;
                });

                setPriceChange(((newPrice - initialPrice) / initialPrice) * 100);
                return newPrice;
            });
        }, 5000);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [ticker, initialPrice]);

    const handleTrade = async (type: 'buy' | 'sell') => {
        if (!quantity || isNaN(Number(quantity)) || Number(quantity) <= 0) return;

        setIsTrading(true);
        try {
            if (type === 'buy') {
                await onBuy(Number(quantity), currentPrice);
            } else {
                await onSell(Number(quantity), currentPrice);
            }
            setQuantity("");
        } finally {
            setIsTrading(false);
        }
    };

    const totalCost = Number(quantity) * currentPrice;
    const canBuy = totalCost <= balance && totalCost > 0;
    const canSell = Number(quantity) <= currentHoldings && Number(quantity) > 0;

    return (
        <div className="grid lg:grid-cols-3 gap-6 animate-fade-in">
            {/* Chart Section */}
            <div className="lg:col-span-2 bg-gradient-to-br from-[#1a1d24] to-[#14161a] border border-white/10 rounded-xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <div className="flex items-center gap-3">
                            <h2 className="text-2xl font-bold text-white">{ticker}</h2>
                            <span className="px-2 py-1 rounded text-xs font-medium bg-white/5 text-gray-400 border border-white/10">
                                En Vivo
                            </span>
                        </div>
                        <p className="text-gray-400">{companyName}</p>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-bold text-white tabular-nums">
                            C$ {currentPrice.toFixed(2)}
                        </div>
                        <div className={cn(
                            "flex items-center justify-end gap-1 font-medium",
                            priceChange >= 0 ? "text-green-400" : "text-red-400"
                        )}>
                            {priceChange >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                            {priceChange >= 0 ? "+" : ""}{priceChange.toFixed(2)}%
                        </div>
                    </div>
                </div>

                <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={priceChange >= 0 ? "#22c55e" : "#ef4444"} stopOpacity={0.3} />
                                    <stop offset="95%" stopColor={priceChange >= 0 ? "#22c55e" : "#ef4444"} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                            <XAxis
                                dataKey="time"
                                stroke="#9ca3af"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                domain={['auto', 'auto']}
                                stroke="#9ca3af"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `C$ ${value.toFixed(0)}`}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1a1d24',
                                    borderColor: 'rgba(255,255,255,0.1)',
                                    borderRadius: '0.5rem',
                                    color: '#fff'
                                }}
                                itemStyle={{ color: '#fff' }}
                                formatter={(value: number) => [`C$ ${value.toFixed(2)}`, "Precio"]}
                                labelStyle={{ color: '#9ca3af', marginBottom: '0.5rem' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="price"
                                stroke={priceChange >= 0 ? "#22c55e" : "#ef4444"}
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorPrice)"
                                isAnimationActive={false}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Trading Panel */}
            <div className="bg-gradient-to-br from-[#1a1d24] to-[#14161a] border border-white/10 rounded-xl p-6 shadow-xl h-fit">
                <div className="flex items-center gap-2 mb-6 text-white">
                    <Activity className="w-5 h-5 text-blue-400" />
                    <h3 className="text-lg font-semibold">Panel de Trading</h3>
                </div>

                <div className="space-y-6">
                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-400">Saldo Disponible</span>
                            <span className="text-white font-medium">C$ {balance.toLocaleString("es-NI", { minimumFractionDigits: 2 })}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Acciones en Posesión</span>
                            <span className="text-white font-medium">{currentHoldings}</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Cantidad</label>
                        <Input
                            type="number"
                            placeholder="0"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            min="1"
                            className="text-lg font-medium"
                        />
                    </div>

                    <div className="space-y-2 pt-4 border-t border-white/10">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Precio de Mercado</span>
                            <span className="text-white">C$ {currentPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold">
                            <span className="text-gray-300">Total Estimado</span>
                            <span className="text-blue-400">C$ {totalCost.toLocaleString("es-NI", { minimumFractionDigits: 2 })}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                        <button
                            onClick={() => handleTrade('buy')}
                            disabled={!canBuy || isTrading}
                            className={cn(
                                "flex flex-col items-center justify-center gap-1 p-3 rounded-lg transition-all",
                                canBuy && !isTrading
                                    ? "bg-green-500/20 text-green-400 border border-green-500/50 hover:bg-green-500/30 hover:scale-[1.02]"
                                    : "bg-gray-800/50 text-gray-500 border border-gray-700 cursor-not-allowed"
                            )}
                        >
                            <TrendingUp className="w-5 h-5" />
                            <span className="font-bold">COMPRAR</span>
                        </button>

                        <button
                            onClick={() => handleTrade('sell')}
                            disabled={!canSell || isTrading}
                            className={cn(
                                "flex flex-col items-center justify-center gap-1 p-3 rounded-lg transition-all",
                                canSell && !isTrading
                                    ? "bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30 hover:scale-[1.02]"
                                    : "bg-gray-800/50 text-gray-500 border border-gray-700 cursor-not-allowed"
                            )}
                        >
                            <TrendingDown className="w-5 h-5" />
                            <span className="font-bold">VENDER</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
