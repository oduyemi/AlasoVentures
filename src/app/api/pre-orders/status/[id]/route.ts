import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/utils/db";
import PreOrder from "@/models/preorder.model";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await context.params; 
    const { status } = await req.json();

    const order = await PreOrder.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}