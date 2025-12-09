import { MarketOverview } from "../components/ui/Dashboard/MarketOverview";
import { PortfolioBar } from "../components/ui/Dashboard/PortfolioBar";
import { PortfolioSummary } from "../components/ui/Dashboard/PortfolioSummary";
import { PositionCard } from "../components/ui/Dashboard/PositionCard";
import { QuickActions } from "../components/ui/Dashboard/QuickActions";
import { TopMovers } from "../components/ui/Dashboard/TopMovers";
import { TransactionsTable } from "../components/ui/Dashboard/TransactionTable";
import { useAuth } from "../context/AuthContext";
import { usePortfolio } from "../context/PortafolioContext";
import {
    PieChart,
} from "lucide-react";

export const Dashboard = () => {
    const { user } = useAuth();
    const { holdings } = usePortfolio();
    const displayName = user?.username?.split(" ")[0] || user?.username || "Inversionista";

    const positions = holdings.map((h) => ({
        company: h.company,
        ticker: h.ticker,
        shares: h.shares,
        currentPrice: h.currentPrice,
        change: h.currentPrice - h.avgPrice,
        changePercent: ((h.currentPrice - h.avgPrice) / h.avgPrice) * 100,
    }));

    return (
        <div>
            <PortfolioBar />

            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-white mb-2">
                        Dashboard
                    </h1>
                    <p className="text-gray-400">
                        Bienvenido de nuevo, <span className="text-white font-semibold">{displayName}</span>
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Main content */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Portfolio Summary */}
                        <PortfolioSummary />

                        {/* Quick Actions */}
                        <QuickActions />

                        {/* Positions Grid */}
                        <div>
                            <h2 className="mb-4 text-lg font-semibold text-white">Mis Posiciones</h2>
                            {positions.length === 0 ? (
                                <div className="bg-gradient-to-br from-[#1a1d24] to-[#14161a] border border-white/10 rounded-md p-12 text-center">
                                    <PieChart className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                                    <p className="text-gray-400 text-lg">No tienes posiciones activas</p>
                                    <p className="text-gray-500 text-sm mt-2">Compra acciones para comenzar a invertir</p>
                                </div>
                            ) : (
                                <div className="grid gap-4 sm:grid-cols-2">
                                    {positions.map((position, index) => (
                                        <div key={position.ticker} style={{ animationDelay: `${index * 100}ms` }}>
                                            <PositionCard {...position} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Transactions Table */}
                        <TransactionsTable />
                    </div>

                    {/* Sidebar widgets */}
                    <div className="space-y-6">
                        <MarketOverview />
                        <TopMovers />
                    </div>
                </div>
            </div>
        </div>
    );
};

