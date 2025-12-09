import { useState } from "react";
import { Eye, EyeOff, TrendingUp, UserPlus } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Input } from "../common/Input";

export function RegisterForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const { register, isLoading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!name || !email || !username || !password) {
            setError('Por favor complete todos los campos');
            return;
        }

        try {
            const success = await register(name, email, username, password);
            if (success) {
                navigate('/');
            } else {
                setError('Error al registrar usuario. Intente con otro usuario o correo.');
            }
        } catch {
            setError('Error al registrar usuario');
        }
    };

    return (
        <div className="min-h-screen flex justify-center text-white bg-[#111418]">
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
                        Únete a nuestra plataforma y comienza a gestionar tus inversiones hoy mismo.
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
                        <h1 className="text-2xl font-bold text-foreground">Crear Cuenta</h1>
                        <p className="text-muted-foreground mt-2">
                            Ingrese sus datos para registrarse
                        </p>
                    </div>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && <div className="text-red-500 text-sm text-center">{error}</div>}

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Nombre Completo</label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Juan Pérez"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="h-12"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Correo Electrónico</label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="juan@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="h-12"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Usuario</label>
                        <Input
                            id="username"
                            type="text"
                            placeholder="juanperez"
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
                        className="w-full h-12 bg-[#111e21] hover:bg-primary-hover font-medium rounded-md text-white mt-4"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="flex items-center space-x-2 justify-center">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                <span>Registrando...</span>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2 justify-center">
                                <UserPlus className="w-4 h-4" />
                                <span>Registrarse</span>
                            </div>
                        )}
                    </button>
                </form>

                {/* Footer */}
                <div className="pt-6 border-t text-center mt-6">
                    <p className="text-sm text-muted-foreground">
                        ¿Ya tienes una cuenta?{" "}
                        <Link to="/auth/login" className="text-[#1ae6ce] hover:underline font-medium">
                            Inicia Sesión
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
