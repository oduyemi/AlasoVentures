import { NextResponse } from "next/server";
import { dbConnect } from "@/utils/db";
import Blog from "@/models/blog.model";

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await dbConnect();

  const { id } = await context.params; 
  const body = await req.json();

  const updated = await Blog.findByIdAndUpdate(id, body, {
    new: true,
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await dbConnect();

  const { id } = await context.params; 

  await Blog.findByIdAndDelete(id);

  return NextResponse.json({ success: true });
}