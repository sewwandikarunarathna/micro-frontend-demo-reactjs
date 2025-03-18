import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dataService } from '../services/DataService';

type AuthContextType = {
  isLoggedIn: boolean;
  loginContext: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Initialize state from localStorage on mount
  useEffect(() => {
    const token = dataService.token;
    setIsLoggedIn(!!token);
  }, []);

  const loginContext = async(role: string) => {
    dataService.setAccessToken('');
    setIsLoggedIn(!!dataService.token);
    navigate('/home');
  };

  const logout = () => {
    dataService.removeAccessToken();
    setIsLoggedIn(false);
    // navigate('/authLogin');
  };

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'token') {
        console.log('handle storage',!!e.newValue);
        setIsLoggedIn(!!e.newValue);
        }
        console.log('handle storage outside',!!e.newValue);
    };
  
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, loginContext, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  console.log('context', context);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};