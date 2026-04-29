import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/utils/db";
import HeroCTA from "@/models/herocta.model";

/**
 * UPDATE CTA
 */
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await context.params;
    const body = await req.json();

    const updated = await HeroCTA.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      cta: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

/**
 * DELETE CTA
 */
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await context.params; 

    await HeroCTA.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "CTA deleted",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}