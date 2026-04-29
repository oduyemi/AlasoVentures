import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/utils/db";
import HeroCTA from "@/models/herocta.model";

/**
 * GET ALL CTAs
 */
export async function GET() {
  try {
    await dbConnect();
    const ctas = await HeroCTA.find().sort({ order: 1 }).lean();
    return NextResponse.json({
      success: true,
      ctas,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

/**
 * CREATE CTA
 */
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const cta = await HeroCTA.create({
      image: body.image,
      label: body.label,
      title: body.title,
      buttonText: body.buttonText,
      link: body.link,
      order: body.order || 0,
    });

    return NextResponse.json({
      success: true,
      cta,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}