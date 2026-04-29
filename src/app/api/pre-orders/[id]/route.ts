import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/utils/db";
import PreOrder from "@/models/preorder.model";

/**
 * UPDATE PRE-ORDER
 */
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await context.params; 
    const body = await req.json();

    const updated = await PreOrder.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      order: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

/**
 * DELETE PRE-ORDER
 */
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await context.params; 

    await PreOrder.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Pre-order deleted",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}