import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "chaman_luxury_pipariya_secret_jwt_key_2026";
const JWT_EXPIRES_IN = "30d";

/**
 * Sign JWT token for user session
 */
export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

/**
 * Verify and decode JWT token
 */
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}

/**
 * Extract user token from NextRequest (supports Web cookie + Mobile Bearer header)
 */
export function extractUserFromRequest(request) {
  try {
    // 1. Try Mobile Bearer header first: "Authorization: Bearer <token>"
    const authHeader = request.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.substring(7).trim();
      const decoded = verifyToken(token);
      if (decoded) return decoded;
    }

    // 2. Try Web HTTP-only or standard cookie
    if (request.cookies && typeof request.cookies.get === "function") {
      const cookie = request.cookies.get("chaman_token");
      if (cookie && cookie.value) {
        const decoded = verifyToken(cookie.value);
        if (decoded) return decoded;
      }
    }
  } catch (e) {
    return null;
  }
  return null;
}

