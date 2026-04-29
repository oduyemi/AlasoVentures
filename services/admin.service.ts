import { authFetch } from "./authFetch";

export const adminService = {
  async getAdmins() {
    const res = await authFetch("/api/admin");
    if (!res.ok) throw new Error("Failed to fetch admins");
    return res.json();
  },

  async createAdmin(data: {
    fname: string;
    lname: string;
    email: string;
    password: string;
  }) {
    const res = await authFetch("/api/admin", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to create admin");
    }

    return res.json();
  },

  async removeAdmin(id: string) {
    const res = await authFetch(`/api/admin/remove/${id}`, {
      method: "PATCH",
    });

    if (!res.ok) throw new Error("Failed to remove admin");
    return res.json();
  },
};