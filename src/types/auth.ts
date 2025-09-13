export type UserRole = 'event_host' | 'htw_staff' | 'venue_host';

export interface User {
  id: string;
  email: string;
  name: string;
  roles: UserRole[]; // Users can have multiple roles
  org?: string;
  bio?: string;
  phone?: string;
  avatar?: string;
  verified_at?: string;
}

export interface LoginMode {
  mode: 'event_host' | 'venue_host';
  title: string;
  description: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}