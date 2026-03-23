import { NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const folder = searchParams.get("folder")
    if (!folder) {
      return NextResponse.json(
        { error: "Folder is required" },
        { status: 400 }
      )
    }

    const result = await cloudinary.search
      .expression(`public_id:${folder}/*`)
      .sort_by("created_at", "desc")
      .max_results(50)
      .execute()

    return NextResponse.json(result.resources || [])
  } catch (error) {
    console.error("Cloudinary search error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}