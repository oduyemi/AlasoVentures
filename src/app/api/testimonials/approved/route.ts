import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/utils/db";
import Testimony from "@/models/testimonial.model";

/**
 * GET ALL APPROVED TESTIMONIALS
 */


export async function GET() {
    try {
      await dbConnect();
  
      const testimonials = await Testimony.find({
        status: "approved",
      })
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