import express from 'express';
import * as userController from '../controllers/userController';
import { authenticateToken } from '../config/authMiddleware';

const router = express.Router();

// Public Routes (No Authentication Required)
router.post('/users', userController.createUser); // Signup (if applicable)

// Protected Routes (Require Authentication)
router.get('/', authenticateToken, userController.getUsers);
router.get('/users/:id', authenticateToken, userController.getUser);
router.put('/:id', authenticateToken, userController.updateUser);
router.delete('/:id', authenticateToken, userController.deleteUser);

export default router;
