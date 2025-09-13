import { createContext, useContext, useState, ReactNode } from 'react';
import { AuthState, User, UserRole } from '@/types/auth';

interface AuthContextType extends AuthState {
  login: (email: string, role: UserRole) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: {
      id: '1',
      email: 'demo@htwweek.org',
      name: 'Demo User',
      role: 'host',
      org: 'HTW Demo',
    },
    isAuthenticated: true,
    isLoading: false,
  });

  const login = (email: string, role: UserRole) => {
    setAuthState({
      user: {
        id: '1',
        email,
        name: role === 'organizer' ? 'HTW Organizer' : 'Event Host',
        role,
        org: role === 'organizer' ? 'HTW Organization' : 'Demo Company',
      },
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const switchRole = (role: UserRole) => {
    if (authState.user) {
      setAuthState({
        ...authState,
        user: {
          ...authState.user,
          role,
          name: role === 'organizer' ? 'HTW Organizer' : 'Event Host',
          org: role === 'organizer' ? 'HTW Organization' : 'Demo Company',
        },
      });
    }
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};