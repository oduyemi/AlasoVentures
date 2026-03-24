import { NextResponse } from "next/server";
import { dbConnect } from "@/utils/db";
import User from "@/models/user.model";

export async function GET() {
  try {
    await dbConnect();

    const admins = await User.find({ role: "admin" }).select(
      "-password"
    );

    return NextResponse.json({ success: true, data: admins });
  } catch {
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}