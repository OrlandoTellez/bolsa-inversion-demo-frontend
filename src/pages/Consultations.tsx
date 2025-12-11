import { useState } from "react";
import { Input } from "../components/common/Input";
import { ArrowUpRight, ArrowDownRight, Search, Filter, TrendingUp, TrendingDown, Activity, Download } from "lucide-react";
import { cn } from "../utils/cn";
import { usePortfolio } from "../context/PortafolioContext";

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
    const { stocks } = usePortfolio();

    // Advanced Search State
    const [advancedStartDate, setAdvancedStartDate] = useState("");
    const [advancedEndDate, setAdvancedEndDate] = useState("");
    const [advancedStock, setAdvancedStock] = useState("all");
    const [advancedQueryType, setAdvancedQueryType] = useState("history"); // history, maxmin
    const [advancedResults, setAdvancedResults] = useState<any[] | null>(queryResults);

    // Derived state for KPIs (only for history mode)
    const initialPrices = queryResults.map((r) => r.close);
    const initialMax = Math.max(...queryResults.map((r) => r.high));
    const initialMin = Math.min(...queryResults.map((r) => r.low));
    const initialAvg = initialPrices.reduce((a, b) => a + b, 0) / initialPrices.length;
    const initialVol = queryResults.reduce((a, b) => a + b.volume, 0);

    const [kpis, setKpis] = useState({ max: initialMax, min: initialMin, avg: initialAvg, vol: initialVol });

    const handleAdvancedSearch = () => {
        if (!advancedStartDate || !advancedEndDate) return;

        const start = new Date(advancedStartDate);
        const end = new Date(advancedEndDate);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // Limit to 30 days for demo
        const daysToGenerate = Math.min(diffDays, 30);

        const results = [];

        // Combine context stocks with static options to ensure we find a match
        const allStocks = [...stocks];
        // Add static options if they don't exist in stocks (mocking price for simulation)
        stockOptions.forEach(opt => {
            if (!allStocks.find(s => s.ticker === opt.value)) {
                allStocks.push({
                    ticker: opt.value,
                    company: opt.label,
                    price: 150 + Math.random() * 50, // Mock price
                    change: 0
                } as any);
            }
        });

        const targetStocks = advancedStock === "all" ? allStocks : allStocks.filter(s => s.ticker === advancedStock);

        let globalMax = -Infinity;
        let globalMin = Infinity;
        let totalSum = 0;
        let totalCount = 0;
        let totalVol = 0;

        for (const stock of targetStocks) {
            let currentPrice = stock.price;
            let maxPrice = -Infinity;
            let minPrice = Infinity;
            let maxDate = "";
            let minDate = "";

            const history = [];

            for (let i = 0; i <= daysToGenerate; i++) {
                const date = new Date(start);
                date.setDate(date.getDate() + i);

                // Enhanced Simulation for OHLCV
                const volatility = 0.05; // 5% volatility
                const changePercent = (Math.random() - 0.5) * volatility;
                const close = currentPrice * (1 + changePercent);
                const open = currentPrice; // Open is previous close (simplified)

                // High/Low simulation
                const high = Math.max(open, close) * (1 + Math.random() * 0.02);
                const low = Math.min(open, close) * (1 - Math.random() * 0.02);
                const volume = Math.floor(Math.random() * 10000) + 1000;

                // Update current price for next day
                currentPrice = close;

                const dataPoint = {
                    date: date.toLocaleDateString("es-NI"),
                    ticker: stock.ticker,
                    company: stock.company,
                    open,
                    close,
                    high,
                    low,
                    volume,
                    change: changePercent * 100
                };

                history.push(dataPoint);

                // Track Max/Min for this stock
                if (close > maxPrice) {
                    maxPrice = close;
                    maxDate = date.toLocaleDateString("es-NI");
                }
                if (close < minPrice) {
                    minPrice = close;
                    minDate = date.toLocaleDateString("es-NI");
                }

                // Global KPI tracking
                if (high > globalMax) globalMax = high;
                if (low < globalMin) globalMin = low;
                totalSum += close;
                totalCount++;
                totalVol += volume;
            }

            // Always push history data, we will aggregate on render if needed
            results.push(...history);
        }

        setAdvancedResults(results);

        // Update KPIs
        setKpis({
            max: globalMax === -Infinity ? 0 : globalMax,
            min: globalMin === Infinity ? 0 : globalMin,
            avg: totalCount > 0 ? totalSum / totalCount : 0,
            vol: totalVol
        });
    };

    // Helper to process results for display based on active view
    const getDisplayResults = () => {
        if (!advancedResults || advancedResults.length === 0) return null;

        // If we are in Max/Min view, but data is history (array of daily points), aggregate it
        if (advancedQueryType === "maxmin") {
            // Check if data is already aggregated (has maxPrice)
            if ("maxPrice" in advancedResults[0]) return advancedResults;

            // Aggregate history data
            const grouped: Record<string, any> = {};
            advancedResults.forEach((curr) => {
                if (!grouped[curr.ticker]) {
                    grouped[curr.ticker] = {
                        ticker: curr.ticker,
                        company: curr.company || curr.ticker,
                        maxPrice: -Infinity,
                        minPrice: Infinity,
                        maxDate: "",
                        minDate: ""
                    };
                }
                const item = grouped[curr.ticker];
                // Use high/low if available, else close/price
                const high = curr.high ?? curr.price ?? curr.close;
                const low = curr.low ?? curr.price ?? curr.close;

                if (high > item.maxPrice) {
                    item.maxPrice = high;
                    item.maxDate = curr.date;
                }
                if (low < item.minPrice) {
                    item.minPrice = low;
                    item.minDate = curr.date;
                }
            });
            return Object.values(grouped);
        }

        return advancedResults;
    };

    const displayResults = getDisplayResults();

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-white bg-clip-text mb-2">
                    Consultas Avanzadas
                </h1>
                <p className="text-gray-400">Búsqueda detallada con filtros personalizados y simulación histórica</p>
            </div>

            {/* Filters */}
            <div className="bg-gradient-to-br from-[#1a1d24] to-[#14161a] border border-white/10 rounded-md p-6 mb-6 animate-fade-in">
                <div className="flex items-center gap-2 mb-4">
                    <Filter className="h-5 w-5 text-blue-400" />
                    <h3 className="font-semibold text-white">Filtros de Búsqueda</h3>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <label className="text-sm font-medium text-gray-300">Tipo de Consulta</label>
                        <select
                            value={advancedQueryType}
                            onChange={(e) => setAdvancedQueryType(e.target.value)}
                            className="w-full mt-2 h-10 px-3 bg-white/5 border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="history" className="bg-[#14161a]">Historial de Precios</option>
                            <option value="maxmin" className="bg-[#14161a]">Máximos y Mínimos</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-300">Empresa</label>
                        <select
                            value={advancedStock}
                            onChange={(e) => setAdvancedStock(e.target.value)}
                            className="w-full mt-2 h-10 px-3 bg-white/5 border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all" className="bg-[#14161a]">Todas las empresas</option>
                            {stockOptions.map((stock) => (
                                <option key={stock.value} value={stock.value} className="bg-[#14161a]">
                                    {stock.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-300">Fecha Inicio</label>
                        <Input
                            type="date"
                            className="mt-2"
                            value={advancedStartDate}
                            onChange={(e) => setAdvancedStartDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-300">Fecha Fin</label>
                        <Input
                            type="date"
                            className="mt-2"
                            value={advancedEndDate}
                            onChange={(e) => setAdvancedEndDate(e.target.value)}
                        />
                    </div>
                </div>
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={handleAdvancedSearch}
                        disabled={!advancedStartDate || !advancedEndDate}
                        className={cn(
                            "flex items-center gap-2 px-6 py-2 rounded-md font-medium transition-all",
                            !advancedStartDate || !advancedEndDate
                                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                                : "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg"
                        )}
                    >
                        <Search className="h-4 w-4" />
                        Ejecutar Análisis
                    </button>
                </div>
            </div>

            {/* Results Display */}
            {displayResults && (
                <div className="animate-fade-in">

                    {/* KPI Cards (Only for History Mode) */}
                    {advancedQueryType === "history" && (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
                            <div className="bg-gradient-to-br from-[#1a1d24] to-[#14161a] border border-white/10 rounded-md p-4 animate-slide-up">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/20">
                                        <TrendingUp className="h-5 w-5 text-green-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400">Precio Máximo</p>
                                        <p className="text-xl font-bold text-white">C$ {kpis.max.toFixed(2)}</p>
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
                                        <p className="text-xl font-bold text-white">C$ {kpis.min.toFixed(2)}</p>
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
                                        <p className="text-xl font-bold text-white">C$ {kpis.avg.toFixed(2)}</p>
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
                                        <p className="text-xl font-bold text-white">{kpis.vol.toLocaleString("es-NI")}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="bg-gradient-to-br from-[#1a1d24] to-[#14161a] border border-white/10 rounded-md p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-white">Resultados del Análisis</h3>
                            <button className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all text-sm">
                                <Download className="h-4 w-4" />
                                Exportar
                            </button>
                        </div>

                        {advancedQueryType === "maxmin" ? (
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {displayResults.map((result, idx) => (
                                    <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h4 className="font-bold text-white text-lg">{result.ticker}</h4>
                                                <p className="text-xs text-gray-400">{result.company}</p>
                                            </div>
                                            <div className="p-2 bg-blue-500/20 rounded-lg">
                                                <Activity className="w-5 h-5 text-blue-400" />
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center p-2 bg-green-500/10 rounded-lg border border-green-500/20">
                                                <div>
                                                    <p className="text-xs text-green-400 font-medium">Precio Máximo</p>
                                                    <p className="text-xs text-gray-500">{result.maxDate}</p>
                                                </div>
                                                <p className="font-bold text-white">C$ {result.maxPrice.toFixed(2)}</p>
                                            </div>
                                            <div className="flex justify-between items-center p-2 bg-red-500/10 rounded-lg border border-red-500/20">
                                                <div>
                                                    <p className="text-xs text-red-400 font-medium">Precio Mínimo</p>
                                                    <p className="text-xs text-gray-500">{result.minDate}</p>
                                                </div>
                                                <p className="font-bold text-white">C$ {result.minPrice.toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
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
                                        {displayResults.map((row, index) => {
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
                                                    <td className="px-4 py-3 font-medium text-white">
                                                        {row.ticker}
                                                        <span className="text-gray-500 text-xs ml-2 hidden md:inline">{row.company}</span>
                                                    </td>
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
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
