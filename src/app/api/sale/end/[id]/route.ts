import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/utils/db";
import FlashSale from "@/models/flashsale.model";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await context.params;
    const sale = await FlashSale.findByIdAndUpdate(
      id,
      {
        status: "expired",
        endDate: new Date(),
      },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      sale,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}