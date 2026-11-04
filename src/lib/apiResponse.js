import { NextResponse } from "next/server.js";

/**
 * Standard Success JSON response for Web & Mobile clients
 */
export function apiSuccess(data, message = "Success", status = 200, extra = {}) {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
      ...extra,
    },
    { status }
  );
}

/**
 * Standard Error JSON response for Web & Mobile clients
 */
export function apiError(message = "An error occurred", status = 400, errors = null) {
  return NextResponse.json(
    {
      success: false,
      message,
      ...(errors ? { errors } : {}),
    },
    { status }
  );
}

/**
 * Standard Paginated JSON response for catalog lists
 */
export function apiPaginated(items, page = 1, limit = 20, total = 0, message = "Success") {
  const totalPages = Math.ceil(total / limit) || 1;
  return NextResponse.json(
    {
      success: true,
      message,
      data: items,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: Number(total),
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    },
    { status: 200 }
  );
}
