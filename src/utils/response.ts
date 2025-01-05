// File: response.ts

import { Response } from 'express';

// Define common response messages
const RESPONSE_MESSAGES = {
  SUCCESS: "Operation successful",
  BAD_REQUEST: "Bad request",
  UNAUTHORIZED: "Unauthorized",
  FORBIDDEN: "Forbidden",
  NOT_FOUND: "Resource not found",
  INTERNAL_SERVER_ERROR: "Internal server error",
};

// Define the structure of the response body
interface ApiResponse<T> {
  success: boolean;
  code: number;
  message: string;
  data: T | null;
}

/**
 * Standardizes the API response
 * @param res - Express Response object
 * @param status - Predefined status key (e.g., "SUCCESS", "BAD_REQUEST")
 * @param data - Response data (optional)
 */
export const sendResponse = <T>(
  res: Response,
  status: keyof typeof RESPONSE_MESSAGES,
  data: T | null = null
): Response<ApiResponse<T>> => {
  const code = getStatusCode(status);
  const success = code >= 200 && code < 300;
  const message = RESPONSE_MESSAGES[status];

  const responseBody: ApiResponse<T> = {
    success,
    code,
    message,
    data,
  };

  return res.status(code).json(responseBody);
};

/**
 * Maps predefined status keys to HTTP status codes
 * @param status - Predefined status key
 * @returns The corresponding HTTP status code
 */
const getStatusCode = (status: keyof typeof RESPONSE_MESSAGES): number => {
  switch (status) {
    case "SUCCESS":
      return 200;
    case "BAD_REQUEST":
      return 400;
    case "UNAUTHORIZED":
      return 401;
    case "FORBIDDEN":
      return 403;
    case "NOT_FOUND":
      return 404;
    case "INTERNAL_SERVER_ERROR":
      return 500;
    default:
      return 500;
  }
};

// Example usage:
// sendResponse(res, "SUCCESS", { id: 1, name: "Example" });
