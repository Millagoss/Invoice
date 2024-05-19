"use client";
import { createContext, useContext } from "react";

type AuthContextType = {
  userId: string | null;
};

type AuthProviderProps = {
  userId: string | null;
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ userId, children }: AuthProviderProps) {
  const value = {
    userId,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }
  return context;
};
