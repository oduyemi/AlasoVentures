import { NextResponse } from "next/server";
import { dbConnect } from "@/utils/db";
import User from "@/models/user.model";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await params; 

    const body = await req.json();

    const updated = await User.findByIdAndUpdate(
      id,
      {
        fname: body.fname,
        lname: body.lname,
        email: body.email,
      },
      { new: true }
    ).select("-password");

    return NextResponse.json({ success: true, data: updated });
  } catch {
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}