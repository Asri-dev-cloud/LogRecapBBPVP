import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import quizRoutes from './routes/quiz.js';
import leaderboardRoutes from './routes/leaderboard.js';
import materialRoutes from './routes/material.js';
import adminRoutes from './routes/admin.js';
import noteRoutes from './routes/note.js';

import http from 'http';
import { initSocket } from './socket.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware bawaan dan CORS
app.use(cors());
app.use(express.json());

// Registrasi Route API
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/materials', materialRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/notes', noteRoutes);

// Health check endpoint untuk memantau status server
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'LogRecap API is running' });
});

// Penanganan error global (Global Error Handler)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

const server = http.createServer(app);
initSocket(server);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
