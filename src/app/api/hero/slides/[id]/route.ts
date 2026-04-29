import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/utils/db";
import HeroSlide from "@/models/heroslide.model";

/**
 * UPDATE SLIDE
 */
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await context.params; 
    const body = await req.json();

    const updated = await HeroSlide.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      slide: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

/**
 * DELETE SLIDE
 */
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await context.params; 

    await HeroSlide.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Slide deleted",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}