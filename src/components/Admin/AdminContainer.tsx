"use client";
import { useEffect, useState } from "react";
import { AdminsTable, AdminUser } from "./Administrators";
import { adminService } from "../../../services/admin.service";
import { useToast } from "@chakra-ui/react";

export default function AdminsContainer() {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const fetchAdmins = async () => {
    try {
      setLoading(true);

      const data = await adminService.getAdmins();

      const formatted = data.map((a: any) => ({
        id: a._id,
        fname: a.fname,
        lname: a.lname,
        email: a.email,
        role: a.role,
        image: a.image,
        lastLogin: a.lastLogin,
        createdAt: a.createdAt,
      }));

      setAdmins(formatted);
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleCreateAdmin = async (data: any) => {
    try {
      await adminService.createAdmin(data);

      toast({
        title: "Success",
        description: "Admin created successfully",
        status: "success",
      });

      fetchAdmins();
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        status: "error",
      });
    }
  };

  const handleRemoveAdmin = async (id: string) => {
    try {
      await adminService.removeAdmin(id);

      setAdmins((prev) => prev.filter((a) => a.id !== id));

      toast({
        title: "Removed",
        status: "success",
      });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        status: "error",
      });
    }
  };

  return (
    <AdminsTable
      admins={admins}
      loading={loading}
      onCreateAdmin={handleCreateAdmin}
      onRemoveAdmin={handleRemoveAdmin}
    />
  );
}