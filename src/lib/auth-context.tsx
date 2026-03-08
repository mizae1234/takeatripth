'use client';

import { useState, createContext, useContext, ReactNode, useEffect } from 'react';
import { Customer } from '@/types';

interface AuthContextType {
    customer: Customer | null;
    isLoggedIn: boolean;
    login: (customer: Customer) => void;
    logout: () => void;
    showAuthModal: boolean;
    setShowAuthModal: (show: boolean) => void;
}

const AuthContext = createContext<AuthContextType>({
    customer: null,
    isLoggedIn: false,
    login: () => { },
    logout: () => { },
    showAuthModal: false,
    setShowAuthModal: () => { },
});

export function AuthProvider({ children }: { children: ReactNode }) {
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [showAuthModal, setShowAuthModal] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('peemana_customer');
        if (saved) {
            try { setCustomer(JSON.parse(saved)); } catch { }
        }
    }, []);

    const login = (c: Customer) => {
        setCustomer(c);
        localStorage.setItem('peemana_customer', JSON.stringify(c));
        setShowAuthModal(false);
    };

    const logout = () => {
        setCustomer(null);
        localStorage.removeItem('peemana_customer');
    };

    return (
        <AuthContext.Provider value={{ customer, isLoggedIn: !!customer, login, logout, showAuthModal, setShowAuthModal }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
