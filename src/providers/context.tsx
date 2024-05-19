"use client";
import { createContext, useContext } from "react";

type AuthContextType = {
  user?: {
    id: string | number;
    email: string;
  };
};

type AuthProviderProps = {
  user?: {
    id: string | number;
    email: string;
  };
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ user, children }: AuthProviderProps) {
  const value = { user };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }
  return context;
};
