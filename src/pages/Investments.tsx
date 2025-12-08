import { useState } from "react";
import { PortfolioBar } from "../components/ui/Dashboard/PortfolioBar";
import { Input } from "../components/common/Input";
import { ArrowUpRight, ArrowDownRight, Search, TrendingUp, TrendingDown, Building2, Users, X } from "lucide-react";
import { cn } from "../utils/cn";
import { usePortfolio } from "../context/PortafolioContext";

const banks = [
    { value: "bac", label: "BAC Nicaragua" },
    { value: "banpro", label: "Banpro" },
    { value: "ficohsa", label: "Ficohsa" },
    { value: "lafise", label: "LAFISE Bancentro" },
];

const investors = [
    { id: 1, name: "María González", portfolio: 850000, roi: 12.5, focus: "Tecnología" },
    { id: 2, name: "Roberto Martínez", portfolio: 1250000, roi: 8.2, focus: "Banca" },
    { id: 3, name: "Ana López", portfolio: 520000, roi: 15.8, focus: "Agrícola" },
    { id: 4, name: "Carlos Mendoza", portfolio: 980000, roi: 10.1, focus: "Diversificado" },
];

export const Investments = () => {
    const { stocks, holdings, balance, buyStock, sellStock } = usePortfolio();

    const [activeTab, setActiveTab] = useState("comprar");
    const [selectedStock, setSelectedStock] = useState<string>("");
    const [quantity, setQuantity] = useState<string>("");
    const [selectedBank, setSelectedBank] = useState<string>("");
    const [searchDate, setSearchDate] = useState<string>("");
    const [searchFilter, setSearchFilter] = useState<string>("all");
    const [investorFilter, setInvestorFilter] = useState<string>("all");

    // Sell modal state
    const [sellModalOpen, setSellModalOpen] = useState(false);
    const [sellTicker, setSellTicker] = useState("");
    const [sellQuantity, setSellQuantity] = useState("");
    const [sellBank, setSellBank] = useState("");

    const selectedStockData = stocks.find((s) => s.ticker === selectedStock);
    const sellHolding = holdings.find((h) => h.ticker === sellTicker);

    const handleBuy = () => {
        if (!selectedStock || !quantity || !selectedBank) return;

        const bankLabel = banks.find((b) => b.value === selectedBank)?.label || selectedBank;
        const success = buyStock(selectedStock, Number(quantity), bankLabel);

        if (success) {
            setSelectedStock("");
            setQuantity("");
            setSelectedBank("");
        }
    };

    const handleSellClick = (ticker: string) => {
        setSellTicker(ticker);
        setSellQuantity("");
        setSellBank("");
        setSellModalOpen(true);
    };

    const handleSellConfirm = () => {
        if (!sellTicker || !sellQuantity || !sellBank) return;

        const bankLabel = banks.find((b) => b.value === sellBank)?.label || sellBank;
        const success = sellStock(sellTicker, Number(sellQuantity), bankLabel);

        if (success) {
            setSellModalOpen(false);
            setSellTicker("");
            setSellQuantity("");
            setSellBank("");
        }
    };

    const tabs = [
        { value: "comprar", label: "Comprar Acciones", icon: TrendingUp },
        { value: "vender", label: "Vender Acciones", icon: TrendingDown },
        { value: "buscar", label: "Buscar Precios", icon: Search },
        { value: "inversionistas", label: "Inversionistas", icon: Users },
    ];

    return (
        <div>
            <PortfolioBar />

            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                        Inversiones
                    </h1>
                    <p className="text-gray-400">Gestiona tus compras y ventas de acciones</p>
                </div>

                {/* Custom Tabs */}
                <div className="bg-gradient-to-br from-[#1a1d24] to-[#14161a] border border-white/10 rounded-2xl p-2">
                    <div className="flex gap-2 overflow-x-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab.value}
                                onClick={() => setActiveTab(tab.value)}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all whitespace-nowrap",
                                    activeTab === tab.value
                                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                                        : "text-gray-400 hover:text-white hover:bg-white/5"
                                )}
                            >
                                <tab.icon className="w-4 h-4" />
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content - Comprar Acciones */}
                {activeTab === "comprar" && (
                    <div className="grid gap-6 lg:grid-cols-2 animate-fade-in">
                        <div className="bg-gradient-to-br from-[#1a1d24] to-[#14161a] border border-white/10 rounded-2xl p-6">
                            <h3 className="mb-6 text-lg font-semibold text-white">Nueva Compra</h3>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Seleccionar Empresa</label>
                                    <select
                                        value={selectedStock}
                                        onChange={(e) => setSelectedStock(e.target.value)}
                                        className="w-full h-10 px-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Selecciona una acción</option>
                                        {stocks.map((stock) => (
                                            <option key={stock.ticker} value={stock.ticker} className="bg-[#14161a]">
                                                {stock.company} ({stock.change >= 0 ? "+" : ""}{stock.change}%)
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Cantidad de Acciones</label>
                                    <Input
                                        type="number"
                                        placeholder="Ej: 100"
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                        min="1"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Banco para Transacción</label>
                                    <select
                                        value={selectedBank}
                                        onChange={(e) => setSelectedBank(e.target.value)}
                                        className="w-full h-10 px-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Selecciona un banco</option>
                                        {banks.map((bank) => (
                                            <option key={bank.value} value={bank.value} className="bg-[#14161a]">
                                                {bank.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {selectedStockData && quantity && (
                                    <div className="rounded-xl bg-white/5 p-4 space-y-2 border border-white/10">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">Precio unitario:</span>
                                            <span className="font-medium text-white">C$ {selectedStockData.price.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">Total estimado:</span>
                                            <span className="font-bold text-white">
                                                C$ {(selectedStockData.price * Number(quantity)).toLocaleString("es-NI", { minimumFractionDigits: 2 })}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-sm border-t border-white/10 pt-2">
                                            <span className="text-gray-400">Saldo disponible:</span>
                                            <span className={cn(
                                                "font-medium",
                                                (selectedStockData.price * Number(quantity)) > balance ? "text-red-400" : "text-green-400"
                                            )}>
                                                C$ {balance.toLocaleString("es-NI", { minimumFractionDigits: 2 })}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                <button
                                    className={cn(
                                        "w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all",
                                        !selectedStock || !quantity || !selectedBank || (selectedStockData && selectedStockData.price * Number(quantity) > balance)
                                            ? "bg-[#1b7e43] text-gray-400 cursor-not-allowed"
                                            : "bg-[#1fe066] from-green-500 to-emerald-600 text-white hover:shadow-lg hover:scale-105"
                                    )}
                                    disabled={!selectedStock || !quantity || !selectedBank || (selectedStockData && selectedStockData.price * Number(quantity) > balance)}
                                    onClick={handleBuy}
                                >
                                    <TrendingUp className="w-4 h-4" />
                                    Confirmar Compra
                                </button>
                            </div>
                        </div>

                        {/* Stock Info Card */}
                        {selectedStock && selectedStockData && (
                            <div className="bg-gradient-to-br from-[#1a1d24] to-[#14161a] border border-white/10 rounded-2xl p-6">
                                <div className="mb-6 flex items-center justify-between">
                                    <div>
                                        <h3 className="font-semibold text-white text-xl">{selectedStock}</h3>
                                        <p className="text-sm text-gray-400">{selectedStockData.company}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-white">C$ {selectedStockData.price.toFixed(2)}</p>
                                        <p className={cn(
                                            "flex items-center justify-end gap-1 text-sm font-medium",
                                            selectedStockData.change >= 0 ? "text-green-400" : "text-red-400"
                                        )}>
                                            {selectedStockData.change >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                                            {selectedStockData.change >= 0 ? "+" : ""}{selectedStockData.change}%
                                        </p>
                                    </div>
                                </div>
                                <div className="h-48 flex items-center justify-center bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-white/5">
                                    <div className="text-center">
                                        <TrendingUp className="w-12 h-12 text-blue-400 mx-auto mb-2" />
                                        <p className="text-gray-400 text-sm">Gráfico de tendencia</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Tab Content - Vender Acciones */}
                {activeTab === "vender" && (
                    <div className="animate-fade-in">
                        {holdings.length === 0 ? (
                            <div className="bg-gradient-to-br from-[#1a1d24] to-[#14161a] border border-white/10 rounded-2xl p-12 text-center">
                                <TrendingDown className="mx-auto h-16 w-16 text-gray-500 mb-4" />
                                <h3 className="mt-4 text-xl font-semibold text-white">Sin posiciones</h3>
                                <p className="text-gray-400  mt-2">No tienes acciones para vender. Compra algunas primero.</p>
                            </div>
                        ) : (
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                {holdings.map((holding) => {
                                    const gain = (holding.currentPrice - holding.avgPrice) * holding.shares;
                                    const gainPercent = ((holding.currentPrice - holding.avgPrice) / holding.avgPrice) * 100;
                                    const isPositive = gain >= 0;

                                    return (
                                        <div key={holding.ticker} className="bg-gradient-to-br from-[#1a1d24] to-[#14161a] border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all hover:scale-105">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20 font-semibold text-blue-400">
                                                    {holding.ticker.slice(0, 2)}
                                                </div>
                                                <span className={cn(
                                                    "flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                                                    isPositive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                                                )}>
                                                    {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                                                    {gainPercent.toFixed(2)}%
                                                </span>
                                            </div>
                                            <h4 className="font-semibold text-white">{holding.ticker}</h4>
                                            <p className="text-sm text-gray-400">{holding.company}</p>
                                            <div className="mt-3 space-y-1 text-sm">
                                                <div className="flex justify-between text-gray-300">
                                                    <span className="text-gray-500">Cantidad:</span>
                                                    <span>{holding.shares}</span>
                                                </div>
                                                <div className="flex justify-between text-gray-300">
                                                    <span className="text-gray-500">Precio compra:</span>
                                                    <span>C$ {holding.avgPrice.toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between text-gray-300">
                                                    <span className="text-gray-500">Precio actual:</span>
                                                    <span className="font-medium">C$ {holding.currentPrice.toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between border-t border-white/10 pt-2 mt-2">
                                                    <span className="text-gray-500">Ganancia:</span>
                                                    <span className={cn("font-semibold", isPositive ? "text-green-400" : "text-red-400")}>
                                                        {isPositive ? "+" : ""}C$ {gain.toLocaleString("es-NI", { minimumFractionDigits: 2 })}
                                                    </span>
                                                </div>
                                            </div>
                                            <button
                                                className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all"
                                                onClick={() => handleSellClick(holding.ticker)}
                                            >
                                                <TrendingDown className="w-4 h-4" />
                                                Vender
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}

                {/* Tab Content - Buscar Precios */}
                {activeTab === "buscar" && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="bg-gradient-to-br from-[#1a1d24] to-[#14161a] border border-white/10 rounded-2xl p-6">
                            <h3 className="mb-4 text-lg font-semibold text-white">Buscar Precios por Fecha</h3>
                            <div className="flex gap-4 flex-wrap">
                                <div className="flex-1 min-w-[200px]">
                                    <label className="text-sm font-medium text-gray-300">Empresa</label>
                                    <select
                                        value={searchFilter}
                                        onChange={(e) => setSearchFilter(e.target.value)}
                                        className="w-full mt-2 h-10 px-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="all">Todas las empresas</option>
                                        {stocks.map((stock) => (
                                            <option key={stock.ticker} value={stock.ticker} className="bg-[#14161a]">
                                                {stock.company}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex-1 min-w-[200px]">
                                    <label className="text-sm font-medium text-gray-300">Fecha</label>
                                    <Input type="date" className="mt-2" value={searchDate} onChange={(e) => setSearchDate(e.target.value)} />
                                </div>
                                <div className="flex items-end">
                                    <button className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all">
                                        <Search className="h-4 w-4" />
                                        Buscar
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            {stocks.map((stock) => (
                                <div key={stock.ticker} className="bg-gradient-to-br from-[#1a1d24] to-[#14161a] border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all hover:scale-105">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/20">
                                            <Building2 className="h-5 w-5 text-purple-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-white">{stock.ticker}</h4>
                                            <p className="text-xs text-gray-400">{stock.company}</p>
                                        </div>
                                    </div>
                                    <div className="text-2xl font-bold text-white">C$ {stock.price.toFixed(2)}</div>
                                    <div className={cn(
                                        "flex items-center gap-1 text-sm font-medium mt-1",
                                        stock.change >= 0 ? "text-green-400" : "text-red-400"
                                    )}>
                                        {stock.change >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                                        {stock.change >= 0 ? "+" : ""}{stock.change}%
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tab Content - Inversionistas */}
                {activeTab === "inversionistas" && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="bg-gradient-to-br from-[#1a1d24] to-[#14161a] border border-white/10 rounded-2xl p-6">
                            <div className="flex items-center gap-4 flex-wrap">
                                <div className="flex-1 min-w-[250px]">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                        <Input placeholder="Buscar inversionistas..." className="pl-10" />
                                    </div>
                                </div>
                                <select
                                    value={investorFilter}
                                    onChange={(e) => setInvestorFilter(e.target.value)}
                                    className="w-[180px] h-10 px-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="all">Todos</option>
                                    <option value="tech">Tecnología</option>
                                    <option value="bank">Banca</option>
                                    <option value="agri">Agrícola</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            {investors.map((investor) => (
                                <div key={investor.id} className="bg-gradient-to-br from-[#1a1d24] to-[#14161a] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all">
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                                            <Users className="h-6 w-6 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-white">{investor.name}</h4>
                                            <p className="text-sm text-gray-400">Enfoque: {investor.focus}</p>
                                            <div className="mt-3 flex gap-6">
                                                <div>
                                                    <p className="text-xs text-gray-500">Portafolio</p>
                                                    <p className="font-semibold text-white">C$ {investor.portfolio.toLocaleString("es-NI")}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">ROI</p>
                                                    <p className="font-semibold text-green-400">+{investor.roi}%</p>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all text-sm">
                                            Ver Perfil
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Sell Modal */}
                {sellModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                        <div className="bg-gradient-to-br from-[#1a1d24] to-[#14161a] border border-white/10 rounded-2xl p-6 max-w-md w-full">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-semibold text-white">Vender {sellTicker}</h3>
                                <button onClick={() => setSellModalOpen(false)} className="text-gray-400 hover:text-white">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <p className="text-gray-400 text-sm mb-6">
                                {sellHolding && `Tienes ${sellHolding.shares} acciones disponibles a C$ ${sellHolding.currentPrice.toFixed(2)} cada una.`}
                            </p>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Cantidad a vender</label>
                                    <Input
                                        type="number"
                                        placeholder={`Máx: ${sellHolding?.shares || 0}`}
                                        value={sellQuantity}
                                        onChange={(e) => setSellQuantity(e.target.value)}
                                        min="1"
                                        max={sellHolding?.shares}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Banco para recibir fondos</label>
                                    <select
                                        value={sellBank}
                                        onChange={(e) => setSellBank(e.target.value)}
                                        className="w-full h-10 px-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Selecciona un banco</option>
                                        {banks.map((bank) => (
                                            <option key={bank.value} value={bank.value} className="bg-[#14161a]">
                                                {bank.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {sellHolding && sellQuantity && (
                                    <div className="rounded-xl bg-white/5 p-4 space-y-2 border border-white/10">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">Total a recibir:</span>
                                            <span className="font-bold text-green-400">
                                                C$ {(sellHolding.currentPrice * Number(sellQuantity)).toLocaleString("es-NI", { minimumFractionDigits: 2 })}
                                            </span>
                                        </div>
                                        {(() => {
                                            const gain = (sellHolding.currentPrice - sellHolding.avgPrice) * Number(sellQuantity);
                                            const isPositive = gain >= 0;
                                            return (
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-400">Ganancia/Pérdida:</span>
                                                    <span className={cn("font-medium", isPositive ? "text-green-400" : "text-red-400")}>
                                                        {isPositive ? "+" : ""}C$ {gain.toLocaleString("es-NI", { minimumFractionDigits: 2 })}
                                                    </span>
                                                </div>
                                            );
                                        })()}
                                    </div>
                                )}
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => setSellModalOpen(false)}
                                    className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all"
                                >
                                    Cancelar
                                </button>
                                <button
                                    className={cn(
                                        "flex-1 px-4 py-2 rounded-xl font-semibold transition-all",
                                        !sellQuantity || !sellBank || Number(sellQuantity) > (sellHolding?.shares || 0)
                                            ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                                            : "bg-gradient-to-r from-red-500 to-rose-600 text-white hover:shadow-lg"
                                    )}
                                    onClick={handleSellConfirm}
                                    disabled={!sellQuantity || !sellBank || Number(sellQuantity) > (sellHolding?.shares || 0)}
                                >
                                    Confirmar Venta
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
