import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/utils/db";
import PreOrder from "@/models/preorder.model";

/**
 * GET ALL PRE-ORDERS
 */
export async function GET() {
  try {
    await dbConnect();
    const orders = await PreOrder.find().sort({ createdAt: -1 });
    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

/**
 * CREATE PRE-ORDER
 */
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const order = await PreOrder.create({
      fullname: body.fullname,
      email: body.email,
      phone: body.phone,
      style: body.style,
      description: body.description,
      additionalInfo: body.additionalInfo,
      images: body.images || [],
      status: "pending",
    });

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