import { NextResponse } from "next/server";
import { dbConnect } from "@/utils/db";
import Product from "@/models/product.model";
import CustomOrder from "@/models/customorder.model";
import PreOrder from "@/models/preorder.model";
import FlashSale from "@/models/flashsale.model";

export async function GET() {
  try {
    await dbConnect();
    const [
      productsCount,
      customOrdersCount,
      preOrdersCount,
      flashSalesCount,
    ] = await Promise.all([
      Product.countDocuments(),
      CustomOrder.countDocuments(),
      PreOrder.countDocuments(),
      FlashSale.countDocuments({ status: "active" }),
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        products: productsCount,
        customOrders: customOrdersCount,
        bookings: preOrdersCount,
        flashSales: flashSalesCount,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}