import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/utils/db";
import Product from "@/models/product.model";

/**
 * GET ALL PRODUCTS
 */
export async function GET() {
  try {
    await dbConnect();

    const products = await Product.find().sort({ createdAt: -1 }).lean();

    return NextResponse.json({
      success: true,
      products,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

/**
 * CREATE PRODUCT
 * (expects imageUrl already uploaded from frontend or Cloudinary route)
 */
export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();

    const product = await Product.create({
      name: body.name,
      imageUrl: body.imageUrl,

      category: body.category,
      subcategory: body.subcategory || undefined,
      customType: body.customType || null,

      isFlashSales: body.isFlashSales || false,

      pricing: body.pricing,
      inventory: body.inventory,
      sales: body.sales,
    });

    return NextResponse.json({
      success: true,
      product,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}