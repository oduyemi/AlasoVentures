import CustomOrder from "@/models/customorder.model";
import { dbConnect } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const orders = await CustomOrder.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      orders,
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