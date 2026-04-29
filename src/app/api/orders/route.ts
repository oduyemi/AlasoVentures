import { NextResponse } from "next/server";
import { dbConnect } from "@/utils/db";
import CustomOrder from "@/models/customorder.model";
import PreOrder from "@/models/preorder.model";
import FlashSale from "@/models/flashsale.model";

export async function GET() {
  try {
    await dbConnect();
    const [custom, pre, sales] = await Promise.all([
      CustomOrder.find(),
      PreOrder.find(),
      FlashSale.find(),
    ]);

    const orders = [
      ...custom.map((o) => ({
        id: o._id,
        customerName: `${o.fname} ${o.lname}`,
        email: o.email,
        phone: o.phone,
        title: o.outfit?.style || "Custom Order",
        type: "custom style",
        description: o.description,
        images: o.images,
        date: o.createdAt,
        status: o.status,
      })),

      ...pre.map((o) => ({
        id: o._id,
        customerName: o.fullname,
        email: o.email,
        phone: o.phone,
        title: o.style,
        type: "pre order",
        description: o.description,
        images: o.images,
        date: o.createdAt,
        status: o.status,
      })),

      ...sales.map((s) => ({
        id: s._id,
        customerName: "Flash Sale",
        email: "",
        phone: "",
        title: s.productName,
        type: "flash sale",
        description: s.desc,
        images: s.images,
        date: s.createdAt,
        status: s.status,
      })),
    ];

    // newest first
    orders.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return NextResponse.json({ success: true, orders });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}