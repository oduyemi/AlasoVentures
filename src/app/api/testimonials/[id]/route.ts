import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/utils/db";
import Testimony from "@/models/testimonial.model";

/**
 * UPDATE STATUS (Admin moderation)
 */
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await context.params; 
    const { status } = await req.json();
    const allowed = ["pending", "approved", "disapproved"];
    if (!allowed.includes(status)) {
      return NextResponse.json(
        { success: false, message: "Invalid status" },
        { status: 400 }
      );
    }

    const updated = await Testimony.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      testimonial: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

/**
 * DELETE TESTIMONIAL
 */
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await context.params;
    await Testimony.findByIdAndDelete(id);
    return NextResponse.json({
      success: true,
      message: "Deleted",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}