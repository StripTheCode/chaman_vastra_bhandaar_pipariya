import { db } from "../../../../lib/db.js";
import { UserModel } from "../../../../models/User.js";
import { signToken } from "../../../../lib/jwt.js";
import { apiSuccess, apiError } from "../../../../lib/apiResponse.js";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return apiError("Email and password are required", 400);
    }

    const cleanEmail = email.toLowerCase().trim();
    const user = await db.users.findOne((u) => u.email === cleanEmail);

    if (!user) {
      return apiError("Invalid email or password", 401);
    }

    // Verify bcrypt password
    const isMatch = await UserModel.verifyPassword(password, user.passwordHash);
    if (!isMatch) {
      return apiError("Invalid email or password", 401);
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

