import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found', path: req.originalUrl });
  });

export default app;
