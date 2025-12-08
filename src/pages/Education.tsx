import { useState } from "react";
import { Input } from "../components/common/Input";
import { Newspaper, AlertTriangle, FileText, Search, ExternalLink, Calendar, Tag, Download } from "lucide-react";
import { cn } from "../utils/cn";

const newsArticles = [
    {
        id: 1,
        title: "LAFISE reporta crecimiento del 12% en el tercer trimestre",
        summary: "El grupo financiero LAFISE anunció resultados positivos con un incremento significativo en sus operaciones regionales.",
        date: "2024-01-15",
        category: "Empresas",
        company: "LAFISE",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop",
    },
    {
        id: 2,
        title: "Banco Central ajusta tasas de interés de referencia",
        summary: "El BCN decidió mantener las tasas estables ante el panorama económico actual, favoreciendo la estabilidad del mercado.",
        date: "2024-01-14",
        category: "Economía",
        company: null,
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop",
    },
    {
        id: 3,
        title: "Sector agrícola muestra recuperación tras temporada de lluvias",
        summary: "Las empresas del sector agrícola reportan mejores perspectivas para el cierre del año fiscal.",
        date: "2024-01-13",
        category: "Sectores",
        company: "AGRI",
        image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=250&fit=crop",
    },
    {
        id: 4,
        title: "Nuevas regulaciones para inversionistas extranjeros",
        summary: "El gobierno anuncia cambios en el marco regulatorio que facilitan la inversión extranjera en la bolsa local.",
        date: "2024-01-12",
        category: "Regulación",
        company: null,
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=250&fit=crop",
    },
];

const marketAlerts = [
    {
        id: 1,
        type: "warning",
        title: "Volatilidad elevada en CEMEX",
        message: "Se detectó un incremento del 15% en el volumen de transacciones de CEMEX. Se recomienda precaución.",
        time: "Hace 2 horas",
    },
    {
        id: 2,
        type: "info",
        title: "Dividendos LAFISE programados",
        message: "LAFISE pagará dividendos el 25 de enero. Fecha de registro: 20 de enero.",
        time: "Hace 5 horas",
    },
    {
        id: 3,
        type: "danger",
        title: "Suspensión temporal BANCEN",
        message: "Las operaciones de BANCEN estarán suspendidas mañana por asamblea extraordinaria de accionistas.",
        time: "Hace 8 horas",
    },
    {
        id: 4,
        type: "success",
        title: "Nuevo máximo histórico AGRI",
        message: "AGRI alcanzó un nuevo máximo histórico de C$ 58.30 durante la sesión de hoy.",
        time: "Hace 1 día",
    },
];

const resources = [
    {
        id: 1,
        title: "Guía para Inversionistas Principiantes",
        type: "PDF",
        size: "2.5 MB",
        date: "2024-01-01",
    },
    {
        id: 2,
        title: "Reporte Anual BVDN 2023",
        type: "PDF",
        size: "8.2 MB",
        date: "2024-01-10",
    },
    {
        id: 3,
        title: "Manual de Análisis Técnico",
        type: "PDF",
        size: "5.1 MB",
        date: "2023-12-15",
    },
    {
        id: 4,
        title: "Glosario de Términos Financieros",
        type: "Link",
        url: "#",
        date: "2023-11-20",
    },
];

const alertStyles: Record<string, { bg: string; border: string; icon: string }> = {
    warning: { bg: "bg-yellow-500/10", border: "border-yellow-500/30", icon: "text-yellow-400" },
    info: { bg: "bg-blue-500/10", border: "border-blue-500/30", icon: "text-blue-400" },
    danger: { bg: "bg-red-500/10", border: "border-red-500/30", icon: "text-red-400" },
    success: { bg: "bg-green-500/10", border: "border-green-500/30", icon: "text-green-400" },
};

export const Education = () => {
    const [activeTab, setActiveTab] = useState("noticias");
    const [filter, setFilter] = useState("all");

    const tabs = [
        { value: "noticias", label: "Noticias", icon: Newspaper },
        { value: "alertas", label: "Alertas del Mercado", icon: AlertTriangle },
        { value: "recursos", label: "Recursos", icon: FileText },
    ];

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                    Educación Financiera
                </h1>
                <p className="text-gray-400">Noticias, alertas y recursos educativos</p>
            </div>

            {/* Custom Tabs */}
            <div className="bg-gradient-to-br from-[#1a1d24] to-[#14161a] border border-white/10 rounded-2xl p-2 mb-6">
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

            {/* Noticias */}
            {activeTab === "noticias" && (
                <div className="space-y-6 animate-fade-in">
                    <div className="bg-gradient-to-br from-[#1a1d24] to-[#14161a] border border-white/10 rounded-2xl p-4">
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="relative flex-1 min-w-[250px]">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <Input placeholder="Buscar noticias..." className="pl-10" />
                            </div>
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="h-10 px-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all" className="bg-[#14161a]">Todas las noticias</option>
                                <option value="recent" className="bg-[#14161a]">Más recientes</option>
                                <option value="empresas" className="bg-[#14161a]">Por empresa</option>
                                <option value="economia" className="bg-[#14161a]">Economía</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        {newsArticles.map((article, index) => (
                            <article
                                key={article.id}
                                className="bg-gradient-to-br from-[#1a1d24] to-[#14161a] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all group"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="aspect-video overflow-hidden">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-5">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="px-2 py-1 bg-blue-500/20 border border-blue-500/30 rounded-lg text-xs font-medium text-blue-400 flex items-center gap-1">
                                            <Tag className="h-3 w-3" />
                                            {article.category}
                                        </span>
                                        {article.company && (
                                            <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-medium text-gray-300">
                                                {article.company}
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                                        {article.title}
                                    </h3>
                                    <p className="text-sm text-gray-400 mb-4 line-clamp-2">{article.summary}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="flex items-center gap-1 text-xs text-gray-500">
                                            <Calendar className="h-3 w-3" />
                                            {new Date(article.date).toLocaleDateString("es-NI", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </span>
                                        <button className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 transition-colors">
                                            Ver más
                                            <ExternalLink className="h-3 w-3" />
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            )}

            {/* Alertas */}
            {activeTab === "alertas" && (
                <div className="space-y-4 animate-fade-in">
                    {marketAlerts.map((alert, index) => {
                        const styles = alertStyles[alert.type];
                        return (
                            <div
                                key={alert.id}
                                className={cn(
                                    "bg-gradient-to-br from-[#1a1d24] to-[#14161a] border-l-4 rounded-2xl p-4",
                                    styles.bg,
                                    styles.border
                                )}
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="flex items-start gap-4">
                                    <div className={cn("mt-0.5", styles.icon)}>
                                        <AlertTriangle className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-white">{alert.title}</h4>
                                        <p className="text-sm text-gray-400 mt-1">{alert.message}</p>
                                        <span className="text-xs text-gray-500 mt-2 block">{alert.time}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Recursos */}
            {activeTab === "recursos" && (
                <div className="grid gap-4 md:grid-cols-2 animate-fade-in">
                    {resources.map((resource, index) => (
                        <div
                            key={resource.id}
                            className="bg-gradient-to-br from-[#1a1d24] to-[#14161a] border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20">
                                    <FileText className="h-6 w-6 text-blue-400" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-white">{resource.title}</h4>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-xs text-gray-300">
                                            {resource.type}
                                        </span>
                                        {resource.size && (
                                            <span className="text-xs text-gray-500">{resource.size}</span>
                                        )}
                                    </div>
                                    <span className="text-xs text-gray-500 mt-2 block">
                                        {new Date(resource.date).toLocaleDateString("es-NI")}
                                    </span>
                                </div>
                                <button className="flex items-center gap-1 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all text-sm">
                                    {resource.type === "PDF" ? (
                                        <>
                                            <Download className="h-3 w-3" />
                                            Descargar
                                        </>
                                    ) : (
                                        <>
                                            <ExternalLink className="h-3 w-3" />
                                            Abrir
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
