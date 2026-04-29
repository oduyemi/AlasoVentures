import CustomOrder from "@/models/customorder.model";
import { dbConnect } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await context.params; // ✅ unwrap here

    const { status } = await req.json();

    const allowedStatuses = [
      "ordered",
      "processing",
      "ready",
      "shipped",
      "complete",
      "cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: "Invalid status" },
        { status: 400 }
      );
    }

    const updated = await CustomOrder.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      order: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}