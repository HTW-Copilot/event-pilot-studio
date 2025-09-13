export type UserRole = 'host' | 'organizer' | 'public';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  org?: string;
  bio?: string;
  phone?: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}