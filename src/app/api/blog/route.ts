import { NextResponse } from "next/server";
import { dbConnect } from "@/utils/db";
import Blog from "@/models/blog.model";

export async function GET() {
  await dbConnect();

  const blogs = await Blog.find().sort({ createdAt: -1 });

  return NextResponse.json(blogs);
}

export async function POST(req: Request) {
  await dbConnect();

  const body = await req.json();

  const blog = await Blog.create({
    title: body.title,
    excerpt: body.excerpt,
    image: body.image,
    category: body.category,
    content: body.content,
  });

  return NextResponse.json(blog);
}