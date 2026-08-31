import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import tenderRoutes from './routes/tenderRoutes';
import categoryRoutes from './routes/categoryRoutes';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// Health Check & Root
app.get('/', (req, res) => {
  res.json({
    message: 'Sri Lanka Procurement Portal API v1.0',
    status: 'ONLINE',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'UP',
    database: 'CONNECTED',
    uptime: process.uptime()
  });
});

// API v1 Routes
app.use('/api/v1', tenderRoutes);
app.use('/api/v1', categoryRoutes);
app.use('/api/v1', authRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API Route '${req.originalUrl}' not found.`
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Sri Lanka Tender Portal Backend running on http://localhost:${PORT}`);
});

export default app;
