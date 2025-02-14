import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'fJJIMf7Zhhg7CxIBZPP2dQ2nGQGj7k8h9rCDwo4O02Is';

interface AuthRequest extends Request {
  user?: any;
}

// Middleware to verify JWT
export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Access denied' });
    return; // Ensure function stops execution
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach user payload to request
    next(); // Move to next middleware
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
    return; // Explicitly return to satisfy TypeScript
  }
};
