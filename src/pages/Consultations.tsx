import { useState } from "react";
import { Input } from "../components/common/Input";
import { ArrowUpRight, ArrowDownRight, Search, Filter, TrendingUp, TrendingDown, Activity, Download } from "lucide-react";
import { cn } from "../utils/cn";

const stockOptions = [
    { value: "LAFISE", label: "LAFISE Nicaragua" },
    { value: "BANCEN", label: "Banco Central" },
    { value: "AGRI", label: "Agrícola Nicaragua" },
    { value: "ENITEL", label: "ENITEL Telecom" },
    { value: "CEMEX", label: "CEMEX Nicaragua" },
];

const queryResults = [
    { date: "2024-01-15", ticker: "LAFISE", open: 146.5, close: 148.2, high: 149.0, low: 145.8, volume: 12500, change: 1.16 },
    { date: "2024-01-14", ticker: "LAFISE", open: 145.2, close: 146.5, high: 147.2, low: 144.5, volume: 10800, change: 0.90 },
    { date: "2024-01-13", ticker: "LAFISE", open: 144.8, close: 145.2, high: 146.0, low: 143.9, volume: 9500, change: 0.28 },
    { date: "2024-01-12", ticker: "LAFISE", open: 143.5, close: 144.8, high: 145.5, low: 142.8, volume: 11200, change: 0.91 },
    { date: "2024-01-11", ticker: "LAFISE", open: 142.0, close: 143.5, high: 144.2, low: 141.5, volume: 8900, change: 1.06 },
    { date: "2024-01-10", ticker: "LAFISE", open: 141.5, close: 142.0, high: 143.0, low: 140.8, volume: 7800, change: 0.35 },
    { date: "2024-01-09", ticker: "LAFISE", open: 140.2, close: 141.5, high: 142.0, low: 139.5, volume: 9100, change: 0.93 },
    { date: "2024-01-08", ticker: "LAFISE", open: 139.8, close: 140.2, high: 141.0, low: 138.9, volume: 8500, change: 0.29 },
];

export const Consultations = () => {
    const [selectedStock, setSelectedStock] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [priceMin, setPriceMin] = useState("");
    const [priceMax, setPriceMax] = useState("");
    const [showResults, setShowResults] = useState(true);

    // Calculate KPIs from results
    const prices = queryResults.map((r) => r.close);
    const highestPrice = Math.max(...queryResults.map((r) => r.high));
    const lowestPrice = Math.min(...queryResults.map((r) => r.low));
    const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
    const totalVolume = queryResults.reduce((a, b) => a + b.volume, 0);

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-white bg-clip-text mb-2">
                    Consultas Avanzadas
                </h1>
                <p className="text-gray-400">Búsqueda detallada con filtros personalizados</p>
            </div>

            {/* Filters */}
            <div className="bg-gradient-to-br from-[#1a1d24] to-[#14161a] border border-white/10 rounded-md p-6 mb-6 animate-fade-in">
                <div className="flex items-center gap-2 mb-4">
                    <Filter className="h-5 w-5 text-blue-400" />
                    <h3 className="font-semibold text-white">Filtros de Búsqueda</h3>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Empresa</label>
                        <select
                            value={selectedStock}
                            onChange={(e) => setSelectedStock(e.target.value)}
                            className="w-full h-10 px-3 bg-white/5 border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="" className="bg-[#14161a]">Seleccionar</option>
                            {stockOptions.map((stock) => (
                                <option key={stock.value} value={stock.value} className="bg-[#14161a]">
                                    {stock.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Fecha desde</label>
                        <Input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Fecha hasta</label>
                        <Input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Precio mínimo</label>
                        <Input type="number" placeholder="C$ 0.00" value={priceMin} onChange={(e) => setPriceMin(e.target.value)} />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Precio máximo</label>
                        <Input type="number" placeholder="C$ 999.99" value={priceMax} onChange={(e) => setPriceMax(e.target.value)} />
                    </div>

                    <div className="flex items-end gap-2">
                        <button
                            onClick={() => setShowResults(true)}
                            className="flex-1 flex items-center justify-center gap-2 h-10 px-4 bg-[#16412c] text-white rounded-xl font-medium hover:shadow-lg transition-all"
                        >
                            <Search className="h-4 w-4" />
                            Buscar
                        </button>
                    </div>
                </div>
            </div>

            {showResults && (
                <>
                    {/* KPI Cards */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
                        <div className="bg-gradient-to-br from-[#1a1d24] to-[#14161a] border border-white/10 rounded-md p-4 animate-slide-up">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/20">
                                    <TrendingUp className="h-5 w-5 text-green-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Precio Máximo</p>
                                    <p className="text-xl font-bold text-white">C$ {highestPrice.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-[#1a1d24] to-[#14161a] border border-white/10 rounded-md p-4 animate-slide-up" style={{ animationDelay: "100ms" }}>
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/20">
                                    <TrendingDown className="h-5 w-5 text-red-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Precio Mínimo</p>
                                    <p className="text-xl font-bold text-white">C$ {lowestPrice.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-[#1a1d24] to-[#14161a] border border-white/10 rounded-md p-4 animate-slide-up" style={{ animationDelay: "200ms" }}>
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20">
                                    <Activity className="h-5 w-5 text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Precio Promedio</p>
                                    <p className="text-xl font-bold text-white">C$ {avgPrice.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-[#1a1d24] to-[#14161a] border border-white/10 rounded-md p-4 animate-slide-up" style={{ animationDelay: "300ms" }}>
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/20">
                                    <Activity className="h-5 w-5 text-yellow-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Volumen Total</p>
                                    <p className="text-xl font-bold text-white">{totalVolume.toLocaleString("es-NI")}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results Table */}
                    <div className="bg-gradient-to-br from-[#1a1d24] to-[#14161a] border border-white/10 rounded-md overflow-hidden animate-fade-in">
                        <div className="flex items-center justify-between border-b border-white/10 p-4">
                            <h3 className="font-semibold text-white">Resultados ({queryResults.length})</h3>
                            <button className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all text-sm">
                                <Download className="h-4 w-4" />
                                Exportar
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Fecha</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Acción</th>
                                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">Apertura</th>
                                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">Cierre</th>
                                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">Máximo</th>
                                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">Mínimo</th>
                                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">Volumen</th>
                                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">Cambio %</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {queryResults.map((row, index) => {
                                        const isPositive = row.change >= 0;
                                        return (
                                            <tr
                                                key={index}
                                                className={cn(
                                                    "border-b border-white/5 transition-colors hover:bg-white/5",
                                                    index % 2 === 0 ? "bg-transparent" : "bg-white/[0.02]"
                                                )}
                                            >
                                                <td className="px-4 py-3 font-medium text-white">{row.date}</td>
                                                <td className="px-4 py-3 font-medium text-white">{row.ticker}</td>
                                                <td className="px-4 py-3 text-right text-gray-400">
                                                    C$ {row.open.toFixed(2)}
                                                </td>
                                                <td
                                                    className={cn(
                                                        "px-4 py-3 text-right font-medium",
                                                        row.close > row.open ? "text-green-400" : "text-red-400"
                                                    )}
                                                >
                                                    C$ {row.close.toFixed(2)}
                                                </td>
                                                <td className="px-4 py-3 text-right text-green-400">C$ {row.high.toFixed(2)}</td>
                                                <td className="px-4 py-3 text-right text-red-400">C$ {row.low.toFixed(2)}</td>
                                                <td className="px-4 py-3 text-right text-gray-400">
                                                    {row.volume.toLocaleString("es-NI")}
                                                </td>
                                                <td className="px-4 py-3 text-right">
                                                    <span
                                                        className={cn(
                                                            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                                                            isPositive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                                                        )}
                                                    >
                                                        {isPositive ? (
                                                            <ArrowUpRight className="h-3 w-3" />
                                                        ) : (
                                                            <ArrowDownRight className="h-3 w-3" />
                                                        )}
                                                        {isPositive ? "+" : ""}
                                                        {row.change.toFixed(2)}%
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-between border-t border-white/10 p-4">
                            <p className="text-sm text-gray-400">
                                Mostrando 1-8 de 156 resultados
                            </p>
                            <div className="flex gap-2">
                                <button
                                    disabled
                                    className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-gray-500 text-sm cursor-not-allowed"
                                >
                                    Anterior
                                </button>
                                <button className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-sm font-medium">
                                    1
                                </button>
                                <button className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-all text-sm">
                                    2
                                </button>
                                <button className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-all text-sm">
                                    3
                                </button>
                                <button className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-all text-sm">
                                    Siguiente
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
