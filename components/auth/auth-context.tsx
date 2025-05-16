import { authClient } from '@/lib/auth-client';
import { User } from 'better-auth';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  updateUserPreferences: (preferences: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data, isPending } = authClient.useSession();
  const [isLoading, setIsLoading] = useState(true);

  const updateUserPreferences = (preferences: any) => {
    window.alert('Update preferences logic');
  };

  return (
    <AuthContext.Provider
      value={{
        user: data?.user as User,
        isLoading,
        isAuthenticated: !!data?.user,
        updateUserPreferences,
      }}
    >
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
