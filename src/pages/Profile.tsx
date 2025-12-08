import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/common/Input";
import { useAuth } from "../context/AuthContext";
import {
    User,
    Mail,
    Phone,
    Building2,
    Calendar,
    Shield,
    Bell,
    Lock,
    CreditCard,
    LogOut,
    TrendingUp,
    Briefcase,
    Edit,
} from "lucide-react";
import { cn } from "../utils/cn";

export const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("personal");

    if (!user) {
        navigate("/auth");
        return null;
    }

    const handleLogout = () => {
        logout();
        navigate("/auth");
    };

    const tabs = [
        { value: "personal", label: "Personal", icon: User },
        { value: "seguridad", label: "Seguridad", icon: Lock },
        { value: "notificaciones", label: "Notificaciones", icon: Bell },
        { value: "facturacion", label: "Facturación", icon: CreditCard },
    ];

    const notificationSettings = [
        { title: "Alertas de Precio", desc: "Cuando una acción alcance tu precio objetivo", enabled: true },
        { title: "Transacciones", desc: "Confirmación de compras y ventas", enabled: true },
        { title: "Noticias del Mercado", desc: "Resumen diario de noticias financieras", enabled: false },
        { title: "Dividendos", desc: "Pagos de dividendos programados", enabled: true },
        { title: "Reportes Semanales", desc: "Resumen de rendimiento de tu portafolio", enabled: false },
    ];

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                    Mi Perfil
                </h1>
                <p className="text-gray-400">Gestiona tu información personal y preferencias</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Profile Card */}
                <div className="lg:col-span-1">
                    <div className="bg-gradient-to-br from-[#1a1d24] to-[#14161a] border border-white/10 rounded-2xl p-6 animate-fade-in">
                        <div className="flex flex-col items-center text-center">
                            <div className={cn(
                                "flex h-24 w-24 items-center justify-center rounded-full mb-4",
                                user.role === "admin" ? "bg-yellow-500/20" : "bg-blue-500/20"
                            )}>
                                {user.role === "admin" ? (
                                    <Shield className="h-12 w-12 text-yellow-400" />
                                ) : (
                                    <User className="h-12 w-12 text-blue-400" />
                                )}
                            </div>
                            <h2 className="text-xl font-bold text-white">{user.name}</h2>
                            <p className="text-gray-400">{user.email}</p>
                            <span className={cn(
                                "mt-2 inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium",
                                user.role === "admin"
                                    ? "bg-yellow-500/20 text-yellow-400"
                                    : "bg-blue-500/20 text-blue-400"
                            )}>
                                {user.role}
                            </span>

                            <div className="w-full mt-6 pt-6 border-t border-white/10">
                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <div>
                                        <div className="flex items-center justify-center gap-1 text-gray-400 mb-1">
                                            <Briefcase className="h-4 w-4" />
                                        </div>
                                        <p className="text-lg font-bold text-white">
                                            C$ 250,000
                                        </p>
                                        <p className="text-xs text-gray-500">Portafolio</p>
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-center gap-1 text-gray-400 mb-1">
                                            <TrendingUp className="h-4 w-4" />
                                        </div>
                                        <p className="text-lg font-bold text-green-400">+31.08%</p>
                                        <p className="text-xs text-gray-500">Rentabilidad</p>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 hover:bg-red-500/20 transition-all"
                            >
                                <LogOut className="h-4 w-4" />
                                Cerrar Sesión
                            </button>
                        </div>
                    </div>
                </div>

                {/* Settings Tabs */}
                <div className="lg:col-span-2">
                    {/* Custom Tabs */}
                    <div className="bg-gradient-to-br from-[#1a1d24] to-[#14161a] border border-white/10 rounded-2xl p-2 mb-6">
                        <div className="flex gap-2 overflow-x-auto">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.value}
                                    onClick={() => setActiveTab(tab.value)}
                                    className={cn(
                                        "flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all whitespace-nowrap text-sm",
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

                    {/* Personal Info */}
                    {activeTab === "personal" && (
                        <div className="bg-gradient-to-br from-[#1a1d24] to-[#14161a] border border-white/10 rounded-2xl p-6 animate-fade-in">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-white">Información Personal</h3>
                                <button className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all text-sm">
                                    <Edit className="h-4 w-4" />
                                    Editar
                                </button>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Nombre Completo</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                        <Input value={user.name} readOnly className="pl-10 bg-white/5" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Correo Electrónico</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                        <Input value={user.email} readOnly className="pl-10 bg-white/5" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Teléfono</label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                        <Input value="+505 8888-8888" readOnly className="pl-10 bg-white/5" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Banco Principal</label>
                                    <div className="relative">
                                        <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                        <Input value="BAC Nicaragua" readOnly className="pl-10 bg-white/5" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Fecha de Registro</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                        <Input
                                            value={new Date().toLocaleDateString("es-NI", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            })}
                                            readOnly
                                            className="pl-10 bg-white/5"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Rol</label>
                                    <div className="relative">
                                        <Shield className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                        <Input value={user.role} readOnly className="pl-10 bg-white/5" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Security */}
                    {activeTab === "seguridad" && (
                        <div className="bg-gradient-to-br from-[#1a1d24] to-[#14161a] border border-white/10 rounded-2xl p-6 animate-fade-in">
                            <h3 className="text-lg font-semibold text-white mb-6">Seguridad de la Cuenta</h3>

                            <div className="space-y-6">
                                <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20">
                                            <Lock className="h-5 w-5 text-blue-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-white">Cambiar Contraseña</h4>
                                            <p className="text-sm text-gray-400">Última actualización hace 3 meses</p>
                                        </div>
                                    </div>
                                    <button className="px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all text-sm">
                                        Cambiar
                                    </button>
                                </div>

                                <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/20">
                                            <Shield className="h-5 w-5 text-green-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-white">Autenticación de Dos Factores</h4>
                                            <p className="text-sm text-gray-400">Añade una capa extra de seguridad</p>
                                        </div>
                                    </div>
                                    {/* Toggle Switch */}
                                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-500 transition-colors">
                                        <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition-transform" />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/20">
                                            <Mail className="h-5 w-5 text-yellow-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-white">Alertas de Seguridad</h4>
                                            <p className="text-sm text-gray-400">Notificaciones de inicio de sesión</p>
                                        </div>
                                    </div>
                                    {/* Toggle Switch */}
                                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-500 transition-colors">
                                        <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Notifications */}
                    {activeTab === "notificaciones" && (
                        <div className="bg-gradient-to-br from-[#1a1d24] to-[#14161a] border border-white/10 rounded-2xl p-6 animate-fade-in">
                            <h3 className="text-lg font-semibold text-white mb-6">Preferencias de Notificación</h3>

                            <div className="space-y-4">
                                {notificationSettings.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                                        <div>
                                            <h4 className="font-medium text-white">{item.title}</h4>
                                            <p className="text-sm text-gray-400">{item.desc}</p>
                                        </div>
                                        {/* Toggle Switch */}
                                        <button className={cn(
                                            "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                                            item.enabled ? "bg-blue-500" : "bg-gray-600"
                                        )}>
                                            <span className={cn(
                                                "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                                                item.enabled ? "translate-x-6" : "translate-x-1"
                                            )} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Billing */}
                    {activeTab === "facturacion" && (
                        <div className="bg-gradient-to-br from-[#1a1d24] to-[#14161a] border border-white/10 rounded-2xl p-6 animate-fade-in">
                            <h3 className="text-lg font-semibold text-white mb-6">Métodos de Pago</h3>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 rounded-lg border border-blue-500/30 bg-blue-500/10">
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20">
                                            <CreditCard className="h-5 w-5 text-blue-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-white">Cuenta BAC Nicaragua</h4>
                                            <p className="text-sm text-gray-400">****-****-****-4521 • Predeterminada</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-medium text-blue-400 bg-blue-500/20 px-2 py-1 rounded-full">
                                        Principal
                                    </span>
                                </div>

                                <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5">
                                            <CreditCard className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-white">Cuenta Banpro</h4>
                                            <p className="text-sm text-gray-400">****-****-****-8912</p>
                                        </div>
                                    </div>
                                    <button className="px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all text-sm">
                                        Seleccionar
                                    </button>
                                </div>

                                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all mt-4">
                                    <CreditCard className="h-4 w-4" />
                                    Agregar Método de Pago
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
