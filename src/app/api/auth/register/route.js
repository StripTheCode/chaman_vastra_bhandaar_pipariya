import { db } from "../../../../lib/db.js";
import { UserModel } from "../../../../models/User.js";
import { signToken } from "../../../../lib/jwt.js";
import { apiSuccess, apiError } from "../../../../lib/apiResponse.js";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, password } = body;

    if (!name || !name.trim()) {
      return apiError("Full name is required", 400);
    }
    if (!email || !email.includes("@")) {
      return apiError("A valid email address is required", 400);
    }
    if (!password || password.length < 6) {
      return apiError("Password must be at least 6 characters", 400);
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check if user already exists by email
    const existing = await db.users.findOne((u) => (u.email || "").toLowerCase().trim() === cleanEmail);

    if (existing) {
      return apiError("An account with this email already exists", 409);
    }

    // Hash password
    const passwordHash = await UserModel.hashPassword(password);

    // Create user with 100 Welcome Points
    const userDoc = UserModel.createInitial({
      name,
      email: cleanEmail,
      phone: phone ? phone.trim() : "",
      passwordHash,
    });

    const createdUser = await db.users.create(userDoc);
    const sanitizedUser = UserModel.sanitize(createdUser);

    // Generate JWT token
    const token = signToken({
      userId: createdUser.id,
      email: createdUser.email,
      role: createdUser.role,
    });

    // Return response and set secure cookie for Web
    const response = apiSuccess(
      {
        user: sanitizedUser,
        token,
      },
      "Account created successfully! 100 Welcome Points credited.",
      201
    );

    response.cookies.set("chaman_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("[Register Error]:", err);
    return apiError("Internal server error during registration", 500);
  }
}
