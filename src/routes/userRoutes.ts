// File: routes/userRoutes.ts

import express from 'express';
import { 
  registerUser, 
  loginUser, 
  getUserById, 
  updateUser, 
  deleteUser, 
  listUsers 
} from '../services/userServices';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;
  await registerUser(res, email, password, name);
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  await loginUser(res, email, password);
});

// Get user by ID
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  await getUserById(res, id);
});

// Update user
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { email, name, role } = req.body;
  await updateUser(res, id, { email, name, role });
});

// Delete user
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  await deleteUser(res, id);
});

// List users
router.get('/', async (req, res) => {
  const { role } = req.query;
  await listUsers(res, role ? { role: String(role) } : undefined);
});

export default router;
