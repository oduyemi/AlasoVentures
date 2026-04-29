import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/utils/db";
import FlashSale from "@/models/flashsale.model";

/**
 * UPDATE FLASH SALE
 */
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await context.params;
    const body = await req.json();
    const updated = await FlashSale.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      sale: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

/**
 * DELETE FLASH SALE
 */
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await context.params; 

    await FlashSale.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Flash sale deleted",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}