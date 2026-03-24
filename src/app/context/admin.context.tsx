"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


interface Admin {
  _id: string;
  fname: string;
  lname: string;
  email: string;
  role: "admin";
}

interface AdminResponse {
  admin: Admin;
}

interface AdminContextType {
  admin: Admin | null;
  loading: boolean;
  refreshAdmin: () => Promise<void>;
  logoutAdmin: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchAdmin = useCallback(async () => {
    try {
      const res = await axios.get<AdminResponse>("/api/admin/me", {
        withCredentials: true,
      });

      setAdmin(res.data.admin);
    } catch {
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const logoutAdmin = async () => {
    try {
      await axios.post(
        "/api/auth/logout",
        {},
        { withCredentials: true }
      );

      setAdmin(null);
      router.push("/admin");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  useEffect(() => {
    fetchAdmin();
  }, []);

  return (
    <AdminContext.Provider
      value={{
        admin,
        loading,
        refreshAdmin: fetchAdmin,
        logoutAdmin,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);

  if (!context) {
    throw new Error("useAdmin must be used inside AdminProvider");
  }

  return context;
}