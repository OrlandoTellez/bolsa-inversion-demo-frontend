import { useState } from "react";
import { Shield, Eye, EyeOff, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Input } from "../common/Input";

export function LoginForm() {
    const [username, setUsername] = useState('admin@bolsa.ni');
    const [password, setPassword] = useState('admin123');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const { login, isLoading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!username || !password) {
            setError('Por favor ingrese email y contraseña');
            return;
        }

        try {
            const success = await login(username, password);
            if (success) {
                navigate('/');
            } else {
                setError('Credenciales incorrectas');
            }
        } catch {
            setError('Error al iniciar sesión');
        }
    };

    if (error) return <div>Error: {error}</div>;


    return (
        <div className="min-h-screen flex  justify-center text-white bg-[#111418]">
            <div className="bg-[#111e21] w-full shadow-2xl flex flex-col justify-center p-20 space-y-8">
                <div className="text-center">
                    <div className="flex justify-center mb-6">
                        <div className="flex h-16 w-16 items-center justify-center bg-[#1ae6ce] rounded-2xl bg-primary">
                            <TrendingUp className="h-8 w-8 text-primary-foreground text-black" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-foreground mb-4">
                        Bolsa de Valores de Nicaragua
                    </h1>
                    <p className="text-muted-foreground text-lg text-gray-400">
                        Plataforma de gestión de inversiones. Administra tu portafolio, compra y vende acciones de forma segura.
                    </p>
                    <div className="mt-8 grid grid-cols-3 gap-6 text-center">
                        <div>
                            <p className="text-3xl font-bold text-primary">C$ 985M</p>
                            <p className="text-sm text-muted-foreground">Cap. de Mercado</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-success">+12.5%</p>
                            <p className="text-sm text-muted-foreground">Retorno Anual</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-foreground">1,500+</p>
                            <p className="text-sm text-muted-foreground">Inversionistas</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full shadow-2xl flex flex-col justify-center p-8 mt-18 ">
                {/* Encabezado */}
                <div className="text-center space-y-6">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Bienvenido</h1>
                        <p className="text-muted-foreground mt-2">
                            Inicie sesion para iniciar la simulación
                        </p>
                    </div>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Correo Electrónico</label>
                        <Input
                            id="username"
                            type="text"
                            placeholder="doctor@hospital.gob.ni"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="h-12"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium">
                            Contraseña
                        </label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="h-12 pr-12"
                            />
                            <button
                                type="button"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full h-12 bg-[#111e21] hover:bg-primary-hover font-medium rounded-md text-white"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="flex items-center space-x-2 justify-center">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                <span>Verificando...</span>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2 justify-center">
                                <Shield className="w-4 h-4" />
                                <span>Iniciar Sesión</span>
                            </div>
                        )}
                    </button>
                </form>

                {/* Footer */}
                <div className="pt-6 border-t text-center">
                    <p className="text-xs text-muted-foreground">
                        Esta es una demostración. Los datos son ficticios.
                    </p>
                </div>
            </div>
        </div>
    );
}