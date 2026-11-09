"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfile, UserRole } from "@/types";
import { mockDb } from "@/lib/store/mock-db";

interface AuthContextType {
  user: UserProfile | null;
  currentRole: UserRole;
  isAuthenticated: boolean;
  isSuperAdmin: boolean;
  login: (email: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, fullName: string, phone: string, roles?: UserRole[]) => Promise<UserProfile>;
  switchRole: (newRole: UserRole) => boolean;
  hasRole: (role: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [currentRole, setCurrentRole] = useState<UserRole>("SUPER_ADMIN");

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
    setCurrentRole("NORMAL_USER");
  };

  const register = async (
    email: string,
    fullName: string,
    phone: string,
    roles: UserRole[] = ["NORMAL_USER"]
  ) => {
    const newUser = mockDb.register(email, fullName, phone, roles);
    setUser(newUser);
    setCurrentRole(newUser.currentRole);
    return newUser;
  };

  const isSuperAdmin = !!(user && user.roles.includes("SUPER_ADMIN"));

  const hasRole = (role: UserRole): boolean => {
    if (!user) return false;
    return user.roles.includes(role);
  };

  const switchRole = (newRole: UserRole): boolean => {
    if (!user) return false;

    // RBAC Security Check: Only allow switching if explicitly assigned or user is Super Admin
    const isAllowed = user.roles.includes(newRole) || isSuperAdmin;
    if (isAllowed) {
      mockDb.setCurrentRole(newRole);
      setUser({ ...user, currentRole: newRole });
      setCurrentRole(newRole);
      return true;
    }

    console.warn(`[RBAC Access Denied]: User ${user.email} is not authorized for role ${newRole}`);
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        currentRole,
        isAuthenticated: !!user,
        isSuperAdmin,
        login,
        logout,
        register,
        switchRole,
        hasRole,
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
