import { apiSuccess, apiError } from "../../../../lib/apiResponse.js";
import { cloudinaryConfig } from "../../../../lib/cloudinary.js";
import fs from "fs";
import path from "path";


/**
 * POST /api/upload/cloudinary
 * Uploads media for product or category listings
 */
export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return apiError("No file uploaded", 400);
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // If Cloudinary credentials are set in environment, upload to Cloudinary:
    if (cloudinaryConfig.isConfigured) {
      try {
        // Upload via Cloudinary REST API
        const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`;
        const base64Data = `data:${file.type};base64,${buffer.toString("base64")}`;

        const uploadRes = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            file: base64Data,
            upload_preset: "ml_default",
          }),
        });

        if (uploadRes.ok) {
          const json = await uploadRes.json();
          return apiSuccess(
            { url: json.secure_url, publicId: json.public_id },
            "Image uploaded to Cloudinary successfully"
          );
        }
      } catch (e) {
        console.warn("[Cloudinary Direct Upload Failed, saving locally]:", e.message);
      }
    }

    // Local Fallback: Save to public/images/uploads/
    const uploadsDir = path.join(process.cwd(), "public", "images", "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const safeFilename = `upload_${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const filePath = path.join(uploadsDir, safeFilename);
    fs.writeFileSync(filePath, buffer);

    const relativeUrl = `/images/uploads/${safeFilename}`;
    return apiSuccess(
      { url: relativeUrl },
      "Image saved to store uploads directory"
    );
  } catch (err) {
    console.error("[Upload Error]:", err);
    return apiError("Failed to upload image", 500);
  }
}
