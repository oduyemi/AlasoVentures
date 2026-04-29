import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/utils/db";
import Testimony from "@/models/testimonial.model";

/**
 * GET ALL TESTIMONIALS (Admin)
 */
export async function GET() {
  try {
    await dbConnect();

    const testimonials = await Testimony.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      testimonials,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}


export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();

    const testimonial = await Testimony.create({
      fullname: body.fullname,
      email: body.email,
      who: body.who,
      testimony: body.testimony,
      status: "pending",
    });

    return NextResponse.json({
      success: true,
      testimonial,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}