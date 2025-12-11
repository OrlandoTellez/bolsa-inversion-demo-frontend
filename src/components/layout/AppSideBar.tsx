import { NavLink } from "react-router-dom";
import {
    LogOut,
    TrendingUp,
    UserCircle,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { navigationItems } from "../../routes/AppRoutes";
import { adminItems } from "../../routes/AppRoutes";
import { profileItems } from "../../routes/AppRoutes";

interface AppSidebarProps {
    onLogout: () => void;
    collapsed: boolean;
    onToggle: () => void;
}

export function AppSidebar({ onLogout, collapsed, onToggle }: AppSidebarProps) {
    const { user } = useAuth();

    const getNavCls = (active: boolean) =>
        active
            ? "bg-[#142a2c] text-[#1fe066] "
            : "text-white";

    return (
        <div
            className={`flex flex-col h-screen fixed bg-[#14161a] border-r border-white/10  transition-all duration-300 ${collapsed ? "w-16" : "w-64"
                }`}
        >
            {/* Header */}
            <div className="bg-[#14161a] flex items-center justify-between p-4 border-b border-white/10 ">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 p-1 bg-[#162e2f] rounded-lg flex items-center justify-center">
                        <TrendingUp className="h-8 w-8 text-primary-foreground text-[#1fe066]" />
                    </div>
                    {!collapsed && (
                        <div className="flex flex-col">
                            <h2 className="text-lg font-semibold truncate text-white">Bolsa de valores</h2>
                            <p className="text-xs text-gray-500 truncate text-white">de Nicaragua</p>
                        </div>
                    )}
                </div>
                <button
                    onClick={onToggle}
                    className="text-white"
                >
                    {collapsed ? "»" : "«"}
                </button>
            </div>

            {/* Navigation */}
            <nav className="bg-[#14161a] flex-1 overflow-y-auto px-2 py-4 space-y-2">
                <div>
                    {!collapsed && (
                        <p className="text-xs text-white uppercase mb-2">Navegación Principal</p>
                    )}
                    {navigationItems.map((item) => (
                        <NavLink
                            key={item.title}
                            to={item.url}
                            className={({ isActive }) =>
                                `flex items-center p-2 rounded-lg ${getNavCls(isActive)}`
                            }
                        >
                            <item.icon
                                className={`w-5 h-5 ${collapsed ? "mx-auto" : "mr-3"}`}
                            />
                            {!collapsed && <span>{item.title}</span>}
                        </NavLink>
                    ))}
                </div>

                <div className="mt-4">
                    {!collapsed && (
                        <p className="text-xs text-gray-400 uppercase mb-2">Administración</p>
                    )}
                    {adminItems.map((item) => (
                        <NavLink
                            key={item.title}
                            to={item.url}
                            className={({ isActive }) =>
                                `flex text-white items-center p-2 rounded-lg ${getNavCls(isActive)}`
                            }
                        >
                            <item.icon
                                className={`w-5 h-5 ${collapsed ? "mx-auto" : "mr-3"}`}
                            />
                            {!collapsed && <span>{item.title}</span>}
                        </NavLink>
                    ))}
                </div>
            </nav>

            {/* Footer */}
            <div className="bg-[#14161a] p-4 border-t border-white/10">
                {!collapsed ? (
                    <div className="space-y-4">
                        {
                            profileItems.map((item) => (
                                <NavLink
                                    key={item.title}
                                    to={item.url}
                                    className="flex items-center space-x-3 p-3 bg-[#111418] rounded-lg"
                                >
                                    <UserCircle className="w-8 h-8 text-[#fff]" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-gray-100 font-medium truncate">{user?.name}</p>
                                        <p className="text-xs text-gray-400 truncate">{user?.role}</p>
                                    </div>
                                </NavLink>
                            ))
                        }
                        <button
                            onClick={onLogout}
                            className="w-full flex items-center p-2 text-red-600 hover:bg-red-100 rounded-lg"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Cerrar Sesión
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col space-y-2 gap-2">
                        {
                            profileItems.map((item) => (
                                <NavLink
                                    key={item.title}
                                    to={item.url}
                                    className="flex items-center justify-center bg-[#111418] rounded-lg"
                                >
                                    <UserCircle className="w-5 h-5 text-[#fff]" />
                                </NavLink>
                            ))
                        }
                        <button
                            onClick={onLogout}
                            className="w-8 h-8 p-0 mx-auto text-red-600 hover:bg-red-100 rounded-lg flex items-center justify-center"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}