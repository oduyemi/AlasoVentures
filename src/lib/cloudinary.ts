import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


export async function getFolderContents(path: string) {
  try {
    const [subfoldersResult, filesResult] = await Promise.all([
      cloudinary.api.sub_folders(path),
      cloudinary.search
        .expression(`folder:${path}`)
        .max_results(100)
        .execute(),
    ]);

    return {
      path,
      folders: (subfoldersResult.folders || []).map((f: any) => f.name),

      files: (filesResult.resources || []).map((file: any) => {
        const name =
          file.display_name ||
          file.original_filename ||
          file.public_id.split("/").pop();

        return {
          id: file.public_id,
          name,
          format: file.format,
          url: file.secure_url,
          resourceType: file.resource_type,
          width: file.width,
          height: file.height,
          bytes: file.bytes,
          createdAt: file.created_at,
        };
      }),
    };
  } catch (error: any) {
    console.error("Cloudinary folder fetch error:", {
      path,
      message: error?.message,
    });

    return {
      path,
      folders: [],
      files: [],
    };
  }
}



export async function uploadCustomOrderImage(
  fileBuffer: Buffer
): Promise<string> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "kofo/custom",
        resource_type: "image",

        transformation: [
          {
            width: 1500,
            crop: "limit",
          },
          {
            quality: "auto",
          },
          {
            fetch_format: "auto",
          },
        ],

        overwrite: false,
        invalidate: true,
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error.message);
          return reject(error);
        }

        if (!result) {
          return reject(new Error("Upload failed"));
        }

        resolve(result.secure_url);
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
}


export async function deleteCustomOrderImage(
  publicId: string
): Promise<boolean> {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });

    return result.result === "ok";
  } catch (error: any) {
    console.error("Cloudinary delete error:", {
      publicId,
      message: error?.message,
    });

    return false;
  }
}


export async function deleteMultipleCustomOrderImages(
  publicIds: string[]
): Promise<boolean> {
  try {
    await cloudinary.api.delete_resources(publicIds, {
      resource_type: "image",
    });

    return true;
  } catch (error: any) {
    console.error("Cloudinary bulk delete error:", {
      publicIds,
      message: error?.message,
    });

    return false;
  }
}


export async function uploadProduct(
  fileBuffer: Buffer
): Promise<string> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "kofo/products", 
        resource_type: "image",

        transformation: [
          { width: 1500, crop: "limit" },
          { quality: "auto" },
          { fetch_format: "auto" },
        ],

        overwrite: false,
        invalidate: true,
      },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error("Upload failed"));

        resolve(result.secure_url);
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
}


export async function uploadHeroSlideImage(
  fileBuffer: Buffer,
  publicId?: string
): Promise<{ url: string; public_id: string }> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "kofo/carousel",
        resource_type: "image",
        overwrite: true,
        invalidate: true,
        public_id: publicId,

        transformation: [
          { width: 1600, crop: "limit" },
          { quality: "auto" },
          { fetch_format: "auto" },
        ],
      },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error("Upload failed"));

        resolve({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
}