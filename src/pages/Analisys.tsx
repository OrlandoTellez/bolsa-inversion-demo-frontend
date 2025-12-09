import { useState } from "react";
import { Input } from "../components/common/Input";
import { TrendingUp, TrendingDown, BarChart3, Activity } from "lucide-react";
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    Line,
    LineChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Legend,
} from "recharts";
import { cn } from "../utils/cn";

const timeRanges = [
    { value: "1D", label: "1 Día" },
    { value: "5D", label: "5 Días" },
    { value: "1M", label: "1 Mes" },
    { value: "6M", label: "6 Meses" },
    { value: "1A", label: "1 Año" },
];

const historicalData = [
    { date: "Ene", LAFISE: 140, BANCEN: 100, AGRI: 52, ENITEL: 75 },
    { date: "Feb", LAFISE: 142, BANCEN: 98, AGRI: 51, ENITEL: 77 },
    { date: "Mar", LAFISE: 138, BANCEN: 102, AGRI: 53, ENITEL: 76 },
    { date: "Abr", LAFISE: 145, BANCEN: 99, AGRI: 52, ENITEL: 78 },
    { date: "May", LAFISE: 143, BANCEN: 97, AGRI: 54, ENITEL: 79 },
    { date: "Jun", LAFISE: 147, BANCEN: 98, AGRI: 53, ENITEL: 80 },
    { date: "Jul", LAFISE: 148, BANCEN: 97, AGRI: 55, ENITEL: 81 },
];

const volumeData = [
    { date: "Lun", volume: 12500 },
    { date: "Mar", volume: 15800 },
    { date: "Mié", volume: 11200 },
    { date: "Jue", volume: 18500 },
    { date: "Vie", volume: 21000 },
];

const extremeData = [
    { ticker: "LAFISE", high: 152.5, low: 135.2, highDate: "15 Jun", lowDate: "02 Mar" },
    { ticker: "BANCEN", high: 105.8, low: 94.2, highDate: "22 Ene", lowDate: "18 Jul" },
    { ticker: "AGRI", high: 58.3, low: 48.5, highDate: "10 Jul", lowDate: "15 Feb" },
    { ticker: "ENITEL", high: 83.5, low: 72.1, highDate: "28 Jul", lowDate: "05 Ene" },
];

const compareStocks = ["LAFISE", "BANCEN", "AGRI", "ENITEL"];
const stockColors: Record<string, string> = {
    LAFISE: "#3b82f6",
    BANCEN: "#8b5cf6",
    AGRI: "#22c55e",
    ENITEL: "#f59e0b",
};

export const Analisys = () => {
    const [activeTab, setActiveTab] = useState("grafico");
    const [selectedRange, setSelectedRange] = useState("1M");
    const [selectedStock, setSelectedStock] = useState("LAFISE");
    const [selectedStocks, setSelectedStocks] = useState(["LAFISE"]);

    const tabs = [
        { value: "grafico", label: "Gráfico Histórico", icon: Activity },
        { value: "comparativo", label: "Comparativo", icon: BarChart3 },
        { value: "extremos", label: "Máx/Mín Históricos", icon: TrendingUp },
    ];

    const toggleStock = (stock: string) => {
        if (selectedStocks.includes(stock)) {
            setSelectedStocks(selectedStocks.filter((s) => s !== stock));
        } else {
            setSelectedStocks([...selectedStocks, stock]);
        }
    };

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-white bg-clip-text mb-2">
                    Análisis de Mercado
                </h1>
                <p className="text-gray-400">Herramientas avanzadas de análisis técnico</p>
            </div>

            {/* Custom Tabs */}
            <div className="bg-gradient-to-br from-[#1a1d24] to-[#14161a] border border-white/10 rounded-md p-2 mb-6">
                <div className="flex gap-2 overflow-x-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab.value}
                            onClick={() => setActiveTab(tab.value)}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all whitespace-nowrap",
                                activeTab === tab.value
                                    ? "bg-[#111418] text-white shadow-lg"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <tab.icon className="w-4 h-4" />
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Gráfico Histórico */}
            {activeTab === "grafico" && (
                <div className="space-y-6 animate-fade-in">
                    <div className="bg-gradient-to-br from-[#1a1d24] to-[#14161a] border border-white/10 rounded-md p-6">
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                            <div className="flex items-center gap-4 flex-wrap">
                                <select
                                    value={selectedStock}
                                    onChange={(e) => setSelectedStock(e.target.value)}
                                    className="h-10 px-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {compareStocks.map((stock) => (
                                        <option key={stock} value={stock} className="bg-[#14161a]">
                                            {stock}
                                        </option>
                                    ))}
                                </select>
                                <div className="flex gap-1 rounded-lg bg-white/5 p-1">
                                    {timeRanges.map((range) => (
                                        <button
                                            key={range.value}
                                            onClick={() => setSelectedRange(range.value)}
                                            className={cn(
                                                "h-8 px-3 rounded-lg font-medium text-sm transition-all",
                                                selectedRange === range.value
                                                    ? "bg-[#111418] text-white shadow-lg"
                                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                                            )}
                                        >
                                            {range.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div>
                                    <label className="text-xs text-gray-400 mb-1 block">Desde</label>
                                    <Input type="date" className="h-9" />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-400 mb-1 block">Hasta</label>
                                    <Input type="date" className="h-9" />
                                </div>
                            </div>
                        </div>

                        <div className="h-[400px] bg-black/20 rounded-xl p-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={historicalData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorLAFISE" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
                                            <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                    <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
                                    <YAxis stroke="#9ca3af" fontSize={12} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "#1a1d24",
                                            border: "1px solid rgba(255,255,255,0.1)",
                                            borderRadius: "8px",
                                            color: "#fff",
                                        }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey={selectedStock}
                                        stroke="#3b82f6"
                                        strokeWidth={2}
                                        fill="url(#colorLAFISE)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Volume Chart */}
                    <div className="bg-gradient-to-br from-[#1a1d24] to-[#14161a] border border-white/10 rounded-md p-6">
                        <h3 className="mb-4 font-semibold text-white">Volumen de Transacciones</h3>
                        <div className="h-[200px] bg-black/20 rounded-xl p-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={volumeData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                    <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
                                    <YAxis stroke="#9ca3af" fontSize={12} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "#1a1d24",
                                            border: "1px solid rgba(255,255,255,0.1)",
                                            borderRadius: "8px",
                                            color: "#fff",
                                        }}
                                    />
                                    <Bar dataKey="volume" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            )}

            {/* Panel Comparativo */}
            {activeTab === "comparativo" && (
                <div className="space-y-6 animate-fade-in">
                    <div className="bg-gradient-to-br from-[#1a1d24] to-[#14161a] border border-white/10 rounded-md p-6">
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <span className="text-sm font-medium text-white">Comparar:</span>
                            {compareStocks.map((stock) => (
                                <button
                                    key={stock}
                                    onClick={() => toggleStock(stock)}
                                    className={cn(
                                        "px-4 py-2 rounded-md font-medium text-sm transition-all",
                                        selectedStocks.includes(stock)
                                            ? "text-white shadow-lg"
                                            : "bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10"
                                    )}
                                    style={{
                                        backgroundColor: selectedStocks.includes(stock) ? stockColors[stock] : undefined,
                                    }}
                                >
                                    {stock}
                                </button>
                            ))}
                        </div>

                        <div className="h-[400px] bg-black/20 rounded-md p-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={historicalData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                    <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
                                    <YAxis stroke="#9ca3af" fontSize={12} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "#1a1d24",
                                            border: "1px solid rgba(255,255,255,0.1)",
                                            borderRadius: "8px",
                                            color: "#fff",
                                        }}
                                    />
                                    <Legend />
                                    {selectedStocks.map((stock) => (
                                        <Line
                                            key={stock}
                                            type="monotone"
                                            dataKey={stock}
                                            stroke={stockColors[stock]}
                                            strokeWidth={2}
                                            dot={false}
                                        />
                                    ))}
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            )}

            {/* Máximos y Mínimos */}
            {activeTab === "extremos" && (
                <div className="grid gap-4 md:grid-cols-2 animate-fade-in">
                    {extremeData.map((stock) => (
                        <div key={stock.ticker} className="bg-gradient-to-br from-[#1a1d24] to-[#14161a] border border-white/10 rounded-md p-6 hover:border-white/20 transition-all">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20 font-bold text-blue-400">
                                    {stock.ticker.slice(0, 2)}
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-white">{stock.ticker}</h4>
                                    <p className="text-sm text-gray-400">Últimos 12 meses</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <TrendingUp className="h-5 w-5 text-green-400" />
                                        <span className="text-sm font-medium text-green-400">Máximo</span>
                                    </div>
                                    <p className="text-2xl font-bold text-white">C$ {stock.high.toFixed(2)}</p>
                                    <p className="text-sm text-gray-400 mt-1">{stock.highDate}</p>
                                </div>
                                <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <TrendingDown className="h-5 w-5 text-red-400" />
                                        <span className="text-sm font-medium text-red-400">Mínimo</span>
                                    </div>
                                    <p className="text-2xl font-bold text-white">C$ {stock.low.toFixed(2)}</p>
                                    <p className="text-sm text-gray-400 mt-1">{stock.lowDate}</p>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-white/10">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Rango de variación:</span>
                                    <span className="font-medium text-white">
                                        C$ {(stock.high - stock.low).toFixed(2)} ({(((stock.high - stock.low) / stock.low) * 100).toFixed(1)}%)
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
