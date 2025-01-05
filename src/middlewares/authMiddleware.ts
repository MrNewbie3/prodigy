// File: middleware/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { sendResponse } from '../utils/response';

const JWT_SECRET = process.env.PRIVATE_KEY; // Replace with your actual secret key

/**
 * Middleware to verify JWT and authenticate user
 */
export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendResponse(res, "UNAUTHORIZED", null);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET as string) as { userId: number; role: string };//+
    // Attach user information to request object
    req.user = { id: decoded.userId, role: decoded.role };

    next();
  } catch (error) {
    return sendResponse(res, "UNAUTHORIZED", null);
  }
};

/**
 * Middleware to authorize user based on role
 * @param roles - Array of roles that are allowed to access the route
 */
export const authorizeRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return sendResponse(res, "FORBIDDEN", null);
    }

    next();
  };
};

// Example usage in a route:
// router.get('/admin', authenticateUser, authorizeRole(['admin']), (req, res) => { ... });
