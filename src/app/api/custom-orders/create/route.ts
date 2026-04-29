import { uploadCustomOrderImage } from "@/lib/cloudinary";
import CustomOrder from "@/models/customorder.model";
import { dbConnect } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";


const safeParse = (value: FormDataEntryValue | null, field: string) => {
  try {
    if (!value) throw new Error(`${field} is required`);
    return JSON.parse(value as string);
  } catch {
    throw new Error(`Invalid JSON in ${field}`);
  }
};

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const formData = await req.formData();
    const files = formData.getAll("images") as File[];
    if (!files.length) {
      return NextResponse.json(
        { success: false, message: "At least one image is required" },
        { status: 400 }
      );
    }

    if (files.length > 5) {
      return NextResponse.json(
        { success: false, message: "Maximum 5 images allowed" },
        { status: 400 }
      );
    }

    const imageUrls: string[] = [];
    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        return NextResponse.json(
          { success: false, message: "Only image files are allowed" },
          { status: 400 }
        );
      }

      if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          {
            success: false,
            message: "Each image must be under 5MB",
          },
          { status: 400 }
        );
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const url = await uploadCustomOrderImage(buffer);

      imageUrls.push(url);
    }

    const outfit = safeParse(formData.get("outfit"), "outfit");
    const sizes = safeParse(formData.get("sizes"), "sizes");
    const order = await CustomOrder.create({
      fname: String(formData.get("fname") || "").trim(),
      lname: String(formData.get("lname") || "").trim(),
      email: String(formData.get("email") || "").trim().toLowerCase(),
      phone: String(formData.get("phone") || "").trim(),
      outfit,
      sizes,
      fabricType: String(formData.get("fabricType") || "").trim(),
      fabricColor: String(formData.get("fabricColor") || "").trim(),
      quantity: Number(formData.get("quantity") || 1),

      description: String(formData.get("description") || "").trim(),
      additionalInfo: String(formData.get("additionalInfo") || "").trim(),
      measurementNotes: String(formData.get("measurementNotes") || "").trim(),
      images: imageUrls,
      status: "ordered",
    });

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error: any) {
    console.error("Create custom order error:", error.message);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}