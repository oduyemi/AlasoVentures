import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function getFolderContents(path: string) {
  try {
    const [subfoldersResult, filesResult] = await Promise.all([
      cloudinary.api.sub_folders(path),
      cloudinary.search
        .expression(`folder:${path}`)
        .max_results(100)
        .execute(),
    ])

    return {
      path,
      folders: (subfoldersResult.folders || []).map(
        (f: any) => f.name
      ),
      files: (filesResult.resources || []).map((file: any) => {
        const name =
          file.display_name || // ✅ real uploaded filename (best)
          file.original_filename || // fallback
          file.public_id.split("/").pop() // last resort
      
        return {
          id: file.public_id,
          name,
          format: file.format,
          url: file.secure_url,
          resourceType: file.resource_type,
        }
      }),      
    }
  } catch (error: any) {
    /**
     * Cloudinary throws when:
     * - folder does not exist
     * - folder has never had an asset
     * - path is valid but empty
     *
     * We NEVER want to crash the API.
     */
    console.error("Cloudinary error:", {
      path,
      message: error?.message,
    })

    // Graceful fallback — treat as empty folder
    return {
      path,
      folders: [],
      files: [],
    }
  }
}
