import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

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
    token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for saved session
        const savedUser = localStorage.getItem('user');
        const savedToken = localStorage.getItem('access_token');

        if (savedUser && savedToken) {
            try {
                setUser(JSON.parse(savedUser));
                setToken(savedToken);
            } catch (error) {
                localStorage.removeItem('user');
                localStorage.removeItem('access_token');
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (username: string, password: string): Promise<boolean> => {
        setIsLoading(true);

        try {
            // Call the backend API
            const response = await authAPI.login({ username, password });

            // Store user and token
            setUser(response.user);
            setToken(response.access_token);
            localStorage.setItem('user', JSON.stringify(response.user));
            localStorage.setItem('access_token', response.access_token);

            setIsLoading(false);
            return true;
        } catch (err) {
            console.error('Login error:', err);
            setIsLoading(false);
            return false;
        }
    };


    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading, token }}>
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