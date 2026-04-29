import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/utils/db";
import HeroSlide from "@/models/heroslide.model";

/**
 * GET ALL SLIDES
 */
export async function GET() {
  try {
    await dbConnect();
    const slides = await HeroSlide.find().sort({ order: 1 }).lean();
    return NextResponse.json({
      success: true,
      slides,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

/**
 * CREATE SLIDE
 */
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const slide = await HeroSlide.create({
      title: body.title,
      description: body.description,
      image: body.image, 
      ctaText: body.ctaText,
      ctaLink: body.ctaLink,
      order: body.order || 0,
    });

    return NextResponse.json({
      success: true,
      slide,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}