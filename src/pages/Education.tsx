import { useState } from "react";
import { Input } from "../components/common/Input";
import { Newspaper, AlertTriangle, FileText, Search, ExternalLink, Calendar, Tag, GraduationCap, BookOpen, TrendingUp, ShieldCheck, ArrowUpRight, X } from "lucide-react";
import { cn } from "../utils/cn";
import { Link } from "react-router-dom";

const newsArticles = [
    {
        id: 1,
        title: "LAFISE reporta crecimiento del 12% en el tercer trimestre",
        summary: "El grupo financiero LAFISE anunció resultados positivos con un incremento significativo en sus operaciones regionales.",
        date: "2024-01-15",
        category: "Empresas",
        company: "LAFISE",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop",
        type: "link",
        content: `El Grupo Financiero LAFISE ha reportado un impresionante crecimiento del 12% en sus utilidades netas durante el tercer trimestre del año fiscal 2024. Este resultado se atribuye principalmente a la expansión de su cartera de crédito en el sector PYME y al aumento en las transacciones digitales a través de su plataforma bancaria.

El CEO de LAFISE destacó que la estrategia de transformación digital ha sido clave para mejorar la eficiencia operativa y atraer a una nueva generación de clientes. "Estamos comprometidos con seguir innovando y ofreciendo soluciones financieras que impulsen el desarrollo económico de la región", afirmó en la conferencia de prensa.

Analistas del mercado sugieren que este desempeño podría influir positivamente en el precio de las acciones de la compañía en las próximas semanas, recomendando a los inversores mantener sus posiciones.`
    },
    {
        id: 2,
        title: "Informe Macroeconómico Enero 2024",
        summary: "Descarga el informe completo del BCN sobre las perspectivas económicas para el primer trimestre del año.",
        date: "2024-01-14",
        category: "Economía",
        company: null,
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop",
        type: "document",
        content: `El Banco Central de Nicaragua (BCN) ha publicado su informe macroeconómico mensual, donde destaca la decisión de mantener la Tasa de Referencia Monetaria (TRM) en su nivel actual del 7.0%. Esta medida busca equilibrar el control de la inflación con el fomento al crecimiento económico en un entorno global incierto.

Según el informe, la inflación doméstica ha mostrado signos de desaceleración, ubicándose dentro del rango meta establecido por la autoridad monetaria. Sin embargo, el BCN advierte sobre riesgos externos, como la volatilidad en los precios del petróleo y las tensiones geopolíticas, que podrían impactar la economía nacional.

El documento completo ofrece un análisis detallado de los principales indicadores económicos, incluyendo el PIB, la balanza comercial y las reservas internacionales, proporcionando información valiosa para la toma de decisiones de inversión.`
    },
    {
        id: 3,
        title: "Sector agrícola muestra recuperación tras temporada de lluvias",
        summary: "Las empresas del sector agrícola reportan mejores perspectivas para el cierre del año fiscal.",
        date: "2024-01-13",
        category: "Sectores",
        company: "AGRI",
        image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=250&fit=crop",
        type: "link",
        content: `Tras una temporada de lluvias favorable, el sector agrícola nicaragüense muestra signos robustos de recuperación. Las principales empresas agroindustriales, agrupadas bajo el índice AGRI, han revisado al alza sus proyecciones de producción para el ciclo 2024-2025.

El aumento en los rendimientos de cultivos clave como el café y el azúcar está impulsando el optimismo entre los inversores. Además, la demanda internacional de productos orgánicos ha abierto nuevas oportunidades de exportación para los productores locales.

Expertos recomiendan monitorear de cerca a las empresas con mayor exposición a mercados internacionales, ya que podrían beneficiarse significativamente de esta tendencia positiva. Sin embargo, advierten sobre la importancia de gestionar los riesgos climáticos a largo plazo.`
    },
    {
        id: 4,
        title: "Guía de Nuevas Regulaciones 2024",
        summary: "Documento oficial con el detalle de los cambios en el marco regulatorio para inversionistas.",
        date: "2024-01-12",
        category: "Regulación",
        company: null,
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=250&fit=crop",
        type: "document",
        content: `El Gobierno ha anunciado un paquete de reformas regulatorias destinadas a simplificar los trámites para la inversión extranjera en la Bolsa de Valores de Nicaragua. Estas nuevas normativas buscan aumentar la liquidez del mercado y atraer capitales internacionales.

Entre los cambios más destacados se encuentra la reducción de los requisitos burocráticos para el registro de inversores no residentes y la implementación de incentivos fiscales para la reinversión de utilidades.

Esta guía detalla paso a paso cómo los inversores extranjeros pueden aprovechar estas nuevas facilidades para diversificar sus portafolios en el mercado nicaragüense. Se espera que estas medidas dinamicen la actividad bursátil en el corto y mediano plazo.`
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
        url: "https://cdn2.hubspot.net/hubfs/559052/Guia%20para%20inversionistas%20principiantes.pdf"
    },
    {
        id: 2,
        title: "Reporte Anual BVDN 2023",
        type: "PDF",
        size: "8.2 MB",
        date: "2024-01-10",
        url: "https://www.bcn.gob.ni/sites/default/files/documentos/Informe%20Anual%202023.pdf"
    },
    {
        id: 3,
        title: "Manual de Análisis Técnico",
        type: "PDF",
        size: "5.1 MB",
        date: "2023-12-15",
        url: "https://docs.selfbank.es/productos/docs/12_claves_analisis_tecnico.pdf"
    },
    {
        id: 4,
        title: "Glosario de Términos Financieros",
        type: "Link",
        url: "https://bcn.gob.ni/sites/default/files/banco/glosario/Glosario_Terminos_BCN.pdf",
        date: "2023-11-20",
    },
];

const alertStyles: Record<string, { bg: string; border: string; icon: string }> = {
    warning: { bg: "bg-yellow-500/10", border: "border-yellow-500/30", icon: "text-yellow-400" },
    info: { bg: "bg-blue-500/10", border: "border-blue-500/30", icon: "text-blue-400" },
    danger: { bg: "bg-red-500/10", border: "border-red-500/30", icon: "text-red-400" },
    success: { bg: "bg-green-500/10", border: "border-green-500/30", icon: "text-green-400" },
};

const learningModules = [
    {
        id: 1,
        title: "Fundamentos de Inversión",
        description: "Aprende los conceptos básicos: qué es una acción, cómo funciona la bolsa y por qué invertir.",
        icon: BookOpen,
        color: "text-blue-400",
        bg: "bg-blue-500/20",
        duration: "15 min"
    },
    {
        id: 2,
        title: "Análisis de Mercado",
        description: "Descubre cómo leer gráficos, entender tendencias y evaluar el desempeño de las empresas.",
        icon: TrendingUp,
        color: "text-green-400",
        bg: "bg-green-500/20",
        duration: "25 min"
    },
    {
        id: 3,
        title: "Gestión de Riesgos",
        description: "Estrategias esenciales para proteger tu capital y diversificar tu portafolio de manera inteligente.",
        icon: ShieldCheck,
        color: "text-purple-400",
        bg: "bg-purple-500/20",
        duration: "20 min"
    },
    {
        id: 4,
        title: "Instrumentos Financieros",
        description: "Conoce los diferentes tipos de inversiones disponibles: Bonos, Acciones, Fondos de Inversión.",
        icon: GraduationCap,
        color: "text-orange-400",
        bg: "bg-orange-500/20",
        duration: "30 min"
    }
];

export const Education = () => {
    const [activeTab, setActiveTab] = useState("noticias");
    const [filter, setFilter] = useState("all");
    const [selectedArticle, setSelectedArticle] = useState<typeof newsArticles[0] | null>(null);

    const tabs = [
        { value: "noticias", label: "Noticias", icon: Newspaper },
        { value: "aprender", label: "Aprende a Invertir", icon: GraduationCap },
        { value: "alertas", label: "Alertas del Mercado", icon: AlertTriangle },
        { value: "recursos", label: "Recursos", icon: FileText },
    ];

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-white bg-clip-text mb-2">
                    Educación Financiera
                </h1>
                <p className="text-gray-400">Noticias, alertas y recursos educativos</p>
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

            {/* Noticias */}
            {activeTab === "noticias" && (
                <div className="space-y-6 animate-fade-in">
                    <div className="bg-gradient-to-br from-[#1a1d24] to-[#14161a] border border-white/10 rounded-md p-4">
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
                                className="bg-gradient-to-br from-[#1a1d24] to-[#14161a] border border-white/10 rounded-md overflow-hidden hover:border-white/20 transition-all group"
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
                                        <button
                                            onClick={() => setSelectedArticle(article)}
                                            className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                                        >
                                            Leer más
                                            <ExternalLink className="h-3 w-3" />
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            )}

            {/* Aprende a Invertir */}
            {activeTab === "aprender" && (
                <div className="space-y-6 animate-fade-in">
                    <div className="bg-gradient-to-br from-[#1a1d24] to-[#14161a] border border-white/10 rounded-md p-8 text-center">
                        <GraduationCap className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-white mb-2">Academia de Inversionistas</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Domina el arte de invertir con nuestros módulos educativos diseñados para todos los niveles.
                            Desde conceptos básicos hasta estrategias avanzadas.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        {learningModules.map((module, index) => (
                            <div
                                key={module.id}
                                className="bg-gradient-to-br from-[#1a1d24] to-[#14161a] border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all group hover:scale-[1.02]"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="flex items-start gap-4">
                                    <div className={cn("p-3 rounded-xl", module.bg)}>
                                        <module.icon className={cn("w-8 h-8", module.color)} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                                                {module.title}
                                            </h3>
                                            <span className="text-xs font-medium text-gray-500 bg-white/5 px-2 py-1 rounded-full">
                                                {module.duration}
                                            </span>
                                        </div>
                                        <p className="text-gray-400 text-sm mb-4">
                                            {module.description}
                                        </p>
                                        <button className="w-full py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm font-medium hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                                            Comenzar Módulo
                                            <ArrowUpRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
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
                            className="bg-gradient-to-br from-[#1a1d24] to-[#14161a] border border-white/10 rounded-sm p-5 hover:border-white/20 transition-all"
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
                                <Link className="flex items-center gap-1 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all text-sm" to={resource.url} target="_blank">
                                    Descargar
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {/* Article Modal */}
            {selectedArticle && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
                    <div className="bg-[#14161a] border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="relative h-64 w-full">
                            <img
                                src={selectedArticle.image}
                                alt={selectedArticle.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#14161a] to-transparent"></div>
                            <button
                                onClick={() => setSelectedArticle(null)}
                                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-xs font-medium text-blue-400">
                                    {selectedArticle.category}
                                </span>
                                <span className="text-gray-400 text-sm flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {new Date(selectedArticle.date).toLocaleDateString("es-NI", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric"
                                    })}
                                </span>
                            </div>

                            <h2 className="text-2xl font-bold text-white mb-6 leading-tight">
                                {selectedArticle.title}
                            </h2>

                            <div className="prose prose-invert max-w-none">
                                {selectedArticle.content.split('\n\n').map((paragraph, idx) => (
                                    <p key={idx} className="text-gray-300 mb-4 leading-relaxed">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
                                <button
                                    onClick={() => setSelectedArticle(null)}
                                    className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-all font-medium"
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
