import { NextResponse } from "next/server";
import { headers } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";

interface JwtPayload {
  userId: string;
  role: "user" | "admin";
}

type Role = "user" | "admin";

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
  } catch {
    return null;
  }
};


export const getCurrentUser = async () => {
  const headerList = await headers();
  const authHeader = headerList.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.split(" ")[1];

  const decoded = verifyToken(token);
  if (!decoded) return null;

  return await User.findById(decoded.userId).select("-password");
};

// Role guard
export const requireRole = (user: any, roles: Role[]) => {
  if (!user || !roles.includes(user.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  return null;
};


export async function handleLogin(req: Request, allowedRole: Role) {
  const { email, password } = await req.json();

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  if (user.role !== allowedRole) {
    return NextResponse.json(
      { error: `Access denied: ${allowedRole}s only` },
      { status: 403 }
    );
  }

  const token = jwt.sign(
    { userId: user._id.toString(), role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  return NextResponse.json({
    token, 
    user: {
      _id: user._id,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      role: user.role,
    },
    firstLogin: user.firstLogin
  });
}