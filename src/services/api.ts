/**
 * API Service for Bolsa de Inversiones Nicaragua
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5050';

// Helper to get auth headers
const getAuthHeaders = (): HeadersInit => {
    const token = localStorage.getItem('access_token');
    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    };
};

// Generic fetch wrapper with error handling
async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            ...getAuthHeaders(),
            ...options.headers,
        },
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: 'Error de conexión con el servidor' }));
        throw new Error(error.detail || `Error ${response.status}`);
    }

    return response.json();
}

// AUTH API 

export interface LoginRequest {
    username: string;
    password: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    username: string;
    role: 'admin' | 'user';
}

export interface LoginResponse {
    user: User;
    access_token: string;
    token_type: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    username: string;
    password: string;
}

export const authAPI = {
    login: (data: LoginRequest) =>
        fetchAPI<LoginResponse>('/auth/login', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    register: (data: RegisterRequest) =>
        fetchAPI<User>('/auth/register', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    getCurrentUser: () =>
        fetchAPI<User>('/auth/me'),
};

// STOCKS API 

export interface Stock {
    ticker: string;
    company: string;
    price: number;
    change: number;
}

export interface StockHistoryPoint {
    date: string;
    value: number;
}

export interface StockHistory {
    ticker: string;
    company: string;
    history: StockHistoryPoint[];
}

export const stocksAPI = {
    getAll: () =>
        fetchAPI<Stock[]>('/stocks'),

    getByTicker: (ticker: string) =>
        fetchAPI<Stock>(`/stocks/${ticker}`),

    getHistory: (ticker: string, months: number = 6) =>
        fetchAPI<StockHistory>(`/stocks/${ticker}/history?months=${months}`),
};

// PORTFOLIO API 

export interface Holding {
    ticker: string;
    company: string;
    shares: number;
    avgPrice: number;
    currentPrice: number;
    purchaseDate: string;
}

export interface PortfolioSummary {
    totalValue: number;
    totalInvested: number;
    totalGainLoss: number;
    totalGainLossPercent: number;
    balance: number;
    holdings: Holding[];
}

export interface BalanceResponse {
    balance: number;
}

export const portfolioAPI = {
    getSummary: () =>
        fetchAPI<PortfolioSummary>('/portfolio'),

    getHoldings: () =>
        fetchAPI<Holding[]>('/portfolio/holdings'),

    getBalance: () =>
        fetchAPI<BalanceResponse>('/portfolio/balance'),
};

// TRANSACTIONS API 

export interface Transaction {
    id: string;
    type: 'compra' | 'venta';
    ticker: string;
    company: string;
    shares: number;
    price: number;
    total: number;
    date: string;
    bank: string;
}

export interface TransactionRequest {
    ticker: string;
    shares: number;
    bank: string;
}

export const transactionsAPI = {
    getAll: () =>
        fetchAPI<Transaction[]>('/transactions'),

    buy: (data: TransactionRequest) =>
        fetchAPI<Transaction>('/transactions/buy', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    sell: (data: TransactionRequest) =>
        fetchAPI<Transaction>('/transactions/sell', {
            method: 'POST',
            body: JSON.stringify(data),
        }),
};

// Export all APIs
export const api = {
    auth: authAPI,
    stocks: stocksAPI,
    portfolio: portfolioAPI,
    transactions: transactionsAPI,
};

export default api;
