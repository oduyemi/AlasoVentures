export const authFetch = async (url: string, options: RequestInit = {}) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
  
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
  
    if (res.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("auth_user");
  
      if (typeof window !== "undefined") {
        window.location.href = "/admin/login";
      }
  
      throw new Error("Unauthorized");
    }
  
    return res;
  };