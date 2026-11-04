/**
 * Cloudinary Media Helper
 * Handles auto-format (f_auto), auto-quality (q_auto), responsive sizing,
 * and signed direct uploads for Admin Catalog.
 */

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || "chaman-heritage";
const API_KEY = process.env.CLOUDINARY_API_KEY || "";
const API_SECRET = process.env.CLOUDINARY_API_SECRET || "";

export const cloudinaryConfig = {
  cloudName: CLOUD_NAME,
  isConfigured: Boolean(API_KEY && API_SECRET),
};

/**
 * Generate high-performance WebP/AVIF auto-optimized Cloudinary image URL
 */
export function getOptimizedImageUrl(publicIdOrUrl, { width = 800, quality = "auto", crop = "limit" } = {}) {
  if (!publicIdOrUrl) return "/images/saree-champagne.jpg";

  // If local relative path (e.g. /images/saree-champagne.jpg), return directly
  if (publicIdOrUrl.startsWith("/")) {
    return publicIdOrUrl;
  }

  // If already Cloudinary URL, inject optimal transformation flags
  if (publicIdOrUrl.includes("res.cloudinary.com")) {
    return publicIdOrUrl.replace(
      "/upload/",
      `/upload/f_auto,q_${quality},w_${width},c_${crop}/`
    );
  }

  return publicIdOrUrl;
}

