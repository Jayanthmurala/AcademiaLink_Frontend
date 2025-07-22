import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import axios from 'axios';
import apiClient from '../api/baseurl';
import endPoints from '../api/endPoints';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (userData: Partial<User>, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);
    try {
      const response = await apiClient({
        ...endPoints.login,
        data: {
          email,
          password,
        },
      });

      const { token, data: user } = response.data;

      localStorage.setItem('authToken', token);
      localStorage.setItem('currentUser', JSON.stringify(user));
      setCurrentUser(user);

      return {
        success: true,
        message: 'Login successful',
      };
    } catch (error: unknown) {
      let errorMessage = 'An unknown error occurred.';
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      return {
        success: false,
        message: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    userData: Partial<User>,
    password: string
  ): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);
    try {
      await apiClient({
        ...endPoints.register,
        data: {
          ...userData,
          password,
        },
      });
      return {
        success: true,
        message: 'Registration successful',
      };
    } catch (error: unknown) {
      let errorMessage = 'An unknown error occurred.';
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      return {
        success: false,
        message: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
  };

  const value: AuthContextType = {
    currentUser,
    login,
    register,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
