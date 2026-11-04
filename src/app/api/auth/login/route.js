import { db } from "../../../../lib/db.js";
import { UserModel } from "../../../../models/User.js";
import { signToken } from "../../../../lib/jwt.js";
import { apiSuccess, apiError } from "../../../../lib/apiResponse.js";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password, identifier } = body;
    const loginIdentifier = (identifier || email || "").trim();

    if (!loginIdentifier || !password) {
      return apiError("Mobile number or Email and password are required", 400);
    }

    const cleanInput = loginIdentifier.toLowerCase();
    const digitsOnly = loginIdentifier.replace(/\D/g, "");

    // Search user by email or by phone number
    const user = await db.users.findOne((u) => {
      const uEmail = (u.email || "").toLowerCase().trim();
      const uPhone = (u.phone || "").replace(/\D/g, "");

      // Match email directly
      if (uEmail && uEmail === cleanInput) return true;

      // Match phone digits (exact match, or endsWith match for country codes like +91)
      if (digitsOnly.length >= 10 && uPhone) {
        if (uPhone === digitsOnly || uPhone.endsWith(digitsOnly) || digitsOnly.endsWith(uPhone)) {
          return true;
        }
      }
      return false;
    });

    if (!user) {
      return apiError("Invalid Mobile/Email or password", 401);
    }

    // Verify bcrypt password
    const isMatch = await UserModel.verifyPassword(password, user.passwordHash);
    if (!isMatch) {
      return apiError("Invalid Mobile/Email or password", 401);
    }

    const sanitizedUser = UserModel.sanitize(user);

    // Generate JWT token
    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const response = apiSuccess(
      {
        user: sanitizedUser,
        token,
      },
      "Logged in successfully"
    );

    response.cookies.set("chaman_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("[Login Error]:", err);
    return apiError("Internal server error during login", 500);
  }
}
