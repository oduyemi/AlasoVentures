import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import User from "@/models/user.model";
import { getCurrentUser, requireRole } from "@/utils/auth";
import { sendOnboardingMail } from "../../../../helper/sendOnboardingMail";


export async function GET() {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
    const roleError = requireRole(user, ["admin"]);
    if (roleError) return roleError;
  
    const admins = await User.find({ role: "admin" }).select("-password");
  
    return NextResponse.json(admins);
}



export async function POST(req: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const roleError = requireRole(currentUser, ["admin"]);
  if (roleError) return roleError;

  const { fname, lname, email } = await req.json();

  const exists = await User.findOne({ email });
  if (exists) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const tempPassword = crypto.randomBytes(6).toString("hex");
  const hashed = await bcrypt.hash(tempPassword, 10);

  await User.create({
    fname,
    lname,
    email,
    password: hashed,
    role: "admin",
    firstLogin: true,
  });

  await sendOnboardingMail(email, tempPassword);

  return NextResponse.json({ message: "Admin created successfully" });
}