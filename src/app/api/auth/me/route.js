import { db } from "../../../../lib/db.js";
import { UserModel } from "../../../../models/User.js";
import { extractUserFromRequest } from "../../../../lib/jwt.js";
import { apiSuccess, apiError } from "../../../../lib/apiResponse.js";

export async function GET(request) {
  try {
    const payload = extractUserFromRequest(request);
    if (!payload || !payload.userId) {
      return apiError("Unauthorized: Please sign in", 401);
    }

    const user = await db.users.findById(payload.userId);
    if (!user) {
      return apiError("User account not found", 404);
    }

    return apiSuccess({
      user: UserModel.sanitize(user),
    });
  } catch (err) {
    console.error("[Auth Me GET Error]:", err);
    return apiError("Internal server error", 500);
  }
}

export async function PUT(request) {
  try {
    const payload = extractUserFromRequest(request);
    if (!payload || !payload.userId) {
      return apiError("Unauthorized: Please sign in", 401);
    }

    const body = await request.json();
    const { name, phone, addresses } = body;

    const updates = {};
    if (name && name.trim()) updates.name = name.trim();
    if (phone !== undefined) updates.phone = phone.trim();
    if (Array.isArray(addresses)) updates.addresses = addresses;

    const updatedUser = await db.users.updateOne(
      (u) => String(u.id) === String(payload.userId),
      updates
    );

    if (!updatedUser) {
      return apiError("User account not found", 404);
    }

    return apiSuccess(
      { user: UserModel.sanitize(updatedUser) },
      "Profile updated successfully"
    );
  } catch (err) {
    console.error("[Auth Me PUT Error]:", err);
    return apiError("Internal server error updating profile", 500);
  }
}

