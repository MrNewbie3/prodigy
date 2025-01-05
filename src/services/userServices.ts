// File: services/userService.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendResponse } from '../utils/response'; // Menggunakan template response API
import { Response } from 'express';

const prisma = new PrismaClient();
const JWT_SECRET = 'your-secret-key'; // Replace with a strong secret key

// Register a new user
export const registerUser = async (res: Response, email: string, password: string, name: string) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    return sendResponse(res, "SUCCESS", {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
    });
  } catch (error) {
    return sendResponse(res, "BAD_REQUEST", null);
  }
};

// Login user
export const loginUser = async (res: Response, email: string, password: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return sendResponse(res, "NOT_FOUND", null);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return sendResponse(res, "BAD_REQUEST", null);

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    return sendResponse(res, "SUCCESS", { token, user });
  } catch (error) {
    return sendResponse(res, "INTERNAL_SERVER_ERROR", null);
  }
};

// Get user by ID
export const getUserById = async (res: Response, id: number) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return sendResponse(res, "NOT_FOUND", null);
    return sendResponse(res, "SUCCESS", user);
  } catch (error) {
    return sendResponse(res, "INTERNAL_SERVER_ERROR", null);
  }
};

// Update user details
export const updateUser = async (res: Response, id: number, data: Partial<{ email: string; name: string; role: string }>) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data,
    });
    return sendResponse(res, "SUCCESS", updatedUser);
  } catch (error) {
    return sendResponse(res, "BAD_REQUEST", null);
  }
};

// Delete user
export const deleteUser = async (res: Response, id: number) => {
  try {
    await prisma.user.delete({ where: { id } });
    return sendResponse(res, "SUCCESS", { message: "User deleted successfully" });
  } catch (error) {
    return sendResponse(res, "NOT_FOUND", null);
  }
};

// List all users (with optional filters)
export const listUsers = async (res: Response, filters?: { role?: string }) => {
  try {
    const users = await prisma.user.findMany({
      where: filters,
      orderBy: { createdAt: 'desc' },
    });
    return sendResponse(res, "SUCCESS", users);
  } catch (error) {
    return sendResponse(res, "INTERNAL_SERVER_ERROR", null);
  }
};
