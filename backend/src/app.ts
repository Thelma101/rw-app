const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const quizRoutes = require('./routes/quiz');
const questionsRoutes = require('./routes/questions');

dotenv.config();

const app = express();

// CORS configuration for production and development
const corsOptions = {
  origin: [
    'https://rw-app-seven.vercel.app',
    'http://localhost:3000',
    'http://localhost:5173'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/quiz', quizRoutes);
app.use('/api/v1/questions', questionsRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

module.exports = app;