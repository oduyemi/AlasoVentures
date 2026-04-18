import { NextResponse } from "next/server";
import User from "@/models/user.model";
import { getCurrentUser, requireRole } from "@/utils/auth";

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
  ) {
    const currentUser = await getCurrentUser();
    if (!currentUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
    const roleError = requireRole(currentUser, ["admin"]);
    if (roleError) return roleError;
  
    const user = await User.findById(params.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
  
    user.role = "user";
    await user.save();
  
    return NextResponse.json({ message: "Admin removed" });
  }