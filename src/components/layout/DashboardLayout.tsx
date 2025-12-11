import { useState } from "react";
import { Bell, Search, Wallet } from "lucide-react";
import { Input } from "../common/Input";
import { AppSidebar } from "./AppSideBar";
import { useAuth } from "../../context/AuthContext";
import { usePortfolio } from "../../context/PortafolioContext";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export function DashboardLayout({ children, }: DashboardLayoutProps) {
    const [collapsed, setCollapsed] = useState(false);
    const { logout } = useAuth();
    const { balance, totalValue } = usePortfolio();

    const sidebarWidth = 288; // w-64
    const sidebarCollapsedWidth = 72; // w-18

    // Total portfolio = cash balance + holdings value
    const totalPortfolio = balance + totalValue;

    return (
        <div className="min-h-screen bg-gray-50">
            <AppSidebar
                onLogout={logout}
                collapsed={collapsed}
                onToggle={() => setCollapsed(!collapsed)}
            />

            {/* Contenido principal */}
            <div
                className="flex flex-col min-h-screen transition-all duration-300"
                style={{ marginLeft: collapsed ? sidebarCollapsedWidth : sidebarWidth }}
            >
                {/* Header */}
                <header className="h-16 bg-[#14161a] text-white border-b border-white/10 flex items-center justify-between px-6 sticky top-0 z-10">
                    <div className="flex items-center space-x-4">
                        <div className="hidden md:flex items-center space-x-2 max-w-md">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Buscar acciones, empresas..."
                                    className="pl-10 h-9 w-full"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-6">
                        {/* Portfolio Balance */}
                        <div className="flex items-center gap-4">
                            <div className="hidden lg:flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-lg">
                                <Wallet className="h-5 w-5 text-gray-400" />
                                <div className="text-right">
                                    <p className="text-[10px] text-gray-400 uppercase tracking-wide">Saldo Disponible</p>
                                    <p className="text-sm font-bold text-white">
                                        C$ {balance.toLocaleString("es-NI", { minimumFractionDigits: 2 })}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg">
                                <Wallet className="h-5 w-5 text-green-400" />
                                <div className="text-right">
                                    <p className="text-[10px] text-gray-400 uppercase tracking-wide">Portafolio Total</p>
                                    <p className="text-sm font-bold text-green-400">
                                        C$ {totalPortfolio.toLocaleString("es-NI", { minimumFractionDigits: 2 })}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Notifications */}
                        <button className="relative">
                            <Bell className="h-5 w-5 text-white" />
                            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px]">
                                3
                            </span>

                        </button>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 bg-[#111418] overflow-auto p-6">{children}</main>
            </div>
        </div>
    );
}