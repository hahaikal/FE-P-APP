'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode'; 

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  isLoading: boolean;
}

interface JwtPayload {
  exp: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const expiry = localStorage.getItem('tokenExpiry');

    if (token && expiry && new Date().getTime() < parseInt(expiry, 10)) {
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('tokenExpiry');
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  }, []);

  const login = (token: string) => {
    try {
      const decoded: JwtPayload = jwtDecode(token);
      const expiry = decoded.exp * 1000; // Konversi detik ke milidetik

      localStorage.setItem('accessToken', token);
      localStorage.setItem('tokenExpiry', expiry.toString());
      setIsAuthenticated(true);
      router.push('/admin/status');
    } catch (error) {
      console.error("Gagal mendekode token:", error);
      logout(); // Jika token tidak valid, langsung logout
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('tokenExpiry');
    setIsAuthenticated(false);
    router.push('/admin/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}