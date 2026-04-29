"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import axios from "@/utils/axios";
import { useRouter } from "next/navigation";

type Role = "user" | "admin";

export interface User {
  _id: string;
  fname: string;
  lname: string;
  email: string;
  role: Role;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthChecked: boolean;
  refreshUser: () => Promise<User | null>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
}

type MeResponse = {
  user: User;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null); 
  const [loading, setLoading] = useState(true);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  const fetchUser = useCallback(async () => {
    setLoading(true);

    try {
      const res = await axios.get<MeResponse>("/api/auth/me");

      setUser(res.data.user);
      return res.data.user;
    } catch (err: any) {
      if (err.response?.status === 401) {
        setUser(null);
      }
      return null;
    } finally {
      setLoading(false);
      setIsAuthChecked(true);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const logout = async () => {
    await axios.post("/api/auth/logout");
    setUser(null);
    router.push("/admin/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthChecked,
        refreshUser: fetchUser,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}