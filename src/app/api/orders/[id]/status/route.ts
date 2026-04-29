import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/utils/db";
import CustomOrder from "@/models/customorder.model";
import PreOrder from "@/models/preorder.model";
import FlashSale from "@/models/flashsale.model";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await context.params; 
    const { status, source } = await req.json();

    let updated;

    switch (source) {
      case "custom":
        updated = await CustomOrder.findByIdAndUpdate(
          id,
          { status },
          { new: true }
        );
        break;

      case "pre":
        updated = await PreOrder.findByIdAndUpdate(
          id,
          { status },
          { new: true }
        );
        break;

      case "sale":
        updated = await FlashSale.findByIdAndUpdate(
          id,
          { status },
          { new: true }
        );
        break;

      default:
        return NextResponse.json(
          { success: false, message: "Invalid source type" },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      order: updated,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}