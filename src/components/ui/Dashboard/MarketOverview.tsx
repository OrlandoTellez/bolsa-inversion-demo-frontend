import {
    Activity,
} from "lucide-react";

export const MarketOverview = () => {
    const marketData = [
        { name: "BVDN Index", value: "1,234.56", change: "+12.34", changePercent: "+1.01%", isPositive: true },
        { name: "Volumen", value: "2.5M", change: "-0.5M", changePercent: "-16.67%", isPositive: false },
        { name: "Empresas Activas", value: "42", change: "+2", changePercent: "+5.00%", isPositive: true },
    ];

    return (
        <div className="bg-gradient-to-br from-[#1a1d24] to-[#14161a] border border-white/10 rounded-md p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-400" />
                Resumen del Mercado
            </h3>
            <div className="space-y-4">
                {marketData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-md hover:bg-white/10 transition-colors">
                        <div>
                            <p className="text-gray-400 text-sm">{item.name}</p>
                            <p className="text-white font-bold text-lg">{item.value}</p>
                        </div>
                        <div className="text-right">
                            <p className={`font-semibold ${item.isPositive ? "text-green-400" : "text-red-400"}`}>
                                {item.change}
                            </p>
                            <p className={`text-sm ${item.isPositive ? "text-green-400" : "text-red-400"}`}>
                                {item.changePercent}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
