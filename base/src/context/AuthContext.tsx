import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dataService } from '../services/DataService';

type AuthContextType = {
  isLoggedIn: boolean;
  isAuthChecked: boolean;
  userType: string;
  loginContext: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false); // Add loading state
  const [userType, setUserType] = useState('');
  const navigate = useNavigate();

  // Initialize state from localStorage on mount
  useEffect(() => {
    const initializeAuth = async () => {
      const token = dataService.token;
      if (token) {
        setIsLoggedIn(true);
        // const decodedToken = decodeToken(token); // Decode token synchronously
        const userData = dataService.token
            ? typeof dataService.token === "string"
              ? await dataService.decodeToken(dataService.token)
              : null
            : null;
            console.log('userdata', userData);
        setUserType(userData.userType); // Set user type from token
      } else {
        setIsLoggedIn(false);
        setUserType('');
      }
      // setIsLoggedIn(!!token);
      setIsAuthChecked(true);
    };

    initializeAuth();
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
    <AuthContext.Provider value={{ isLoggedIn, isAuthChecked, userType, loginContext, logout }}>
      {isAuthChecked ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};