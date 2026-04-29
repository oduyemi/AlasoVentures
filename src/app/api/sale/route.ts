import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/utils/db";
import FlashSale from "@/models/flashsale.model";

/**
 * GET ALL FLASH SALES
 */
export async function GET() {
  try {
    await dbConnect();
    const sales = await FlashSale.find().sort({ createdAt: -1 });
    return NextResponse.json({
      success: true,
      sales,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

/**
 * CREATE FLASH SALE
 */
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const sale = await FlashSale.create({
      productName: body.productName,
      desc: body.desc,
      originalPrice: body.originalPrice,
      salePrice: body.salePrice,
      images: body.images,
      quantity: body.quantity,
      startDate: body.startDate,
      endDate: body.endDate,
      status: "active",
    });

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