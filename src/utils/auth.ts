import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  role: "staff" | "admin";
}

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
};
