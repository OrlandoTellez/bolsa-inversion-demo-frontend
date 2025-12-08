import { createContext, useContext, useState, useEffect } from 'react';

interface User {
    id: string;
    name: string
    email: string;
    username: string;
    role: 'admin' | 'user';
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    isLoading: boolean;
}

// Usuarios de prueba (para desarrollo sin backend)
const mockUsers = [
    {
        id: '1',
        name: 'Administrador Demo',
        email: 'admin@bolsa.ni',
        username: 'admin',
        password: 'admin123',
        role: 'admin' as const
    },
    {
        id: '2',
        name: 'Usuario Demo',
        email: 'usuario@bolsa.ni',
        username: 'usuario',
        password: 'usuario123',
        role: 'user' as const
    }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (error) {
                localStorage.removeItem('user');
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (username: string, password: string): Promise<boolean> => {
        setIsLoading(true);

        // Primero intentar con usuarios de prueba
        const mockUser = mockUsers.find(
            u => (u.username === username || u.email === username) && u.password === password
        );

        if (mockUser) {
            // Usuario de prueba encontrado
            const { password: _, ...userWithoutPassword } = mockUser;
            setUser(userWithoutPassword);
            localStorage.setItem('user', JSON.stringify(userWithoutPassword));
            setIsLoading(false);
            return true;
        }

        // Si no es un usuario de prueba, intentar con el backend
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ username: username, password: password })
            });

            console.log(res);

            if (!res.ok) {
                setIsLoading(false);
                return false;
            }

            const data = await res.json();
            // data.user contiene toda la información
            setUser(data.user);
            localStorage.setItem('user', JSON.stringify(data.user));
            setIsLoading(false);
            return true;
        } catch (err) {
            console.error(err);
            setIsLoading(false);
            return false;
        }
    };


    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};