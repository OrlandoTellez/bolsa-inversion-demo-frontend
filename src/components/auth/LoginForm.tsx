import { useState } from "react";
import { Shield, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Input } from "../common/Input";

export function LoginForm() {
    const [username, setUsername] = useState('orlandogabrieltellez@gmail.com');
    const [password, setPassword] = useState('123456');
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
            if (true) {
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
            <div className="w-full bg-[#111e21]">
                <h1>Hola mundo</h1>
            </div>
            <div className="w-full shadow-2xl flex flex-col justify-center p-8 space-y-8">
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