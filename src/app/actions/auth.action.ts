import axios from "axios";



export async function loginUser(email: string, password: string) {
  const res = await axios.post(
    "/api/auth/login",
    { email, password },
    { withCredentials: true }
  );
  return res.data;
}


export const logout = async () => {
  await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });
};