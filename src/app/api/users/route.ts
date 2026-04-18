import { NextResponse } from "next/server";
import User from "@/models/user.model";
import { getCurrentUser, requireRole } from "@/utils/auth";


export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const roleError = requireRole(user, ["admin"]);
  if (roleError) return roleError;

  const users = await User.find().select("-password");

  return NextResponse.json(users);
}