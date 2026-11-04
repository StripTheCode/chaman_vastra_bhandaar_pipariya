import { apiSuccess } from "../../../../lib/apiResponse.js";

export async function POST() {
  const response = apiSuccess(null, "Logged out successfully");
  response.cookies.set("chaman_token", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });
  return response;
}

