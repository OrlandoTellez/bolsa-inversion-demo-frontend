import {
    Activity,
    ShoppingCart,
    BarChart3,
    Clock,
} from "lucide-react";

export const QuickActions = () => {
    const actions = [
        {
            label: "Comprar Acciones",
            icon: ShoppingCart,
            color: "from-green-500 to-emerald-600",
            hoverColor: "hover:from-green-600 hover:to-emerald-700",
        },
        {
            label: "Ver Mercado",
            icon: BarChart3,
            color: "from-blue-500 to-cyan-600",
            hoverColor: "hover:from-blue-600 hover:to-cyan-700",
        },
        {
            label: "Análisis",
            icon: Activity,
            color: "from-purple-500 to-pink-600",
            hoverColor: "hover:from-purple-600 hover:to-pink-700",
        },
        {
            label: "Historial",
            icon: Clock,
            color: "from-orange-500 to-yellow-600",
            hoverColor: "hover:from-orange-600 hover:to-yellow-700",
        },
    ];

    return (
        <div>
            <h2 className="mb-4 text-lg font-semibold text-white">Acciones Rápidas</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {actions.map((action, index) => (
                    <button
                        key={action.label}
                        className={`bg-gradient-to-r ${action.color} ${action.hoverColor} p-4 rounded-md text-white font-semibold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group`}
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <action.icon className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                        <span>{action.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};
