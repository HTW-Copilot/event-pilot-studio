import { createContext, useContext, useState, ReactNode } from 'react';
import { AuthState, User, UserRole } from '@/types/auth';

interface AuthContextType extends AuthState {
  login: (email: string, roles: UserRole[]) => void;
  logout: () => void;
  switchRole: (roles: UserRole[]) => void;
  hasRole: (role: UserRole) => boolean;
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
      roles: ['event_host'],
      org: 'HTW Demo',
    },
    isAuthenticated: true,
    isLoading: false,
  });

  const login = (email: string, roles: UserRole[]) => {
    const primaryRole = roles[0];
    const userName = primaryRole === 'htw_staff' ? 'HTW Staff' : 
                    primaryRole === 'venue_host' ? 'Venue Host' : 'Event Host';
    const userOrg = primaryRole === 'htw_staff' ? 'HTW Organization' : 'Demo Company';

    setAuthState({
      user: {
        id: '1',
        email,
        name: userName,
        roles,
        org: userOrg,
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

  const switchRole = (roles: UserRole[]) => {
    if (authState.user) {
      const primaryRole = roles[0];
      const userName = primaryRole === 'htw_staff' ? 'HTW Staff' : 
                      primaryRole === 'venue_host' ? 'Venue Host' : 'Event Host';
      const userOrg = primaryRole === 'htw_staff' ? 'HTW Organization' : 'Demo Company';

      setAuthState({
        ...authState,
        user: {
          ...authState.user,
          roles,
          name: userName,
          org: userOrg,
        },
      });
    }
  };

  const hasRole = (role: UserRole): boolean => {
    return authState.user?.roles.includes(role) || false;
  };

  return (
    <AuthContext.Provider value={{ 
      ...authState, 
      login, 
      logout, 
      switchRole, 
      hasRole 
    }}>
      {children}
    </AuthContext.Provider>
  );
};