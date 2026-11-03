"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfile, UserRole } from "@/types";
import { mockDb } from "@/lib/store/mock-db";

interface AuthContextType {
  user: UserProfile | null;
  currentRole: UserRole;
  isAuthenticated: boolean;
  login: (email: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, fullName: string, phone: string, roles?: UserRole[]) => Promise<UserProfile>;
  switchRole: (newRole: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [currentRole, setCurrentRole] = useState<UserRole>('SUPER_ADMIN');

  useEffect(() => {
    const cur = mockDb.getCurrentUser();
    if (cur) {
      setUser(cur);
      setCurrentRole(cur.currentRole);
    }
  }, []);

  const login = async (email: string): Promise<boolean> => {
    const u = mockDb.login(email);
    if (u) {
      setUser(u);
      setCurrentRole(u.currentRole);
      return true;
    }
    return false;
  };

  const logout = () => {
    mockDb.logout();
    setUser(null);
    setCurrentRole('NORMAL_USER');
  };

  const register = async (email: string, fullName: string, phone: string, roles: UserRole[] = ['NORMAL_USER']) => {
    const newUser = mockDb.register(email, fullName, phone, roles);
    setUser(newUser);
    setCurrentRole(newUser.currentRole);
    return newUser;
  };

  const switchRole = (newRole: UserRole) => {
    if (user && user.roles.includes(newRole)) {
      mockDb.setCurrentRole(newRole);
      setUser({ ...user, currentRole: newRole });
      setCurrentRole(newRole);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        currentRole,
        isAuthenticated: !!user,
        login,
        logout,
        register,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
