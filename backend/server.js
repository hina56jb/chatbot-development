import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import weatherRoutes from './src/routes/weatherRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));
app.use(express.json());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Weather API is running' });
});

app.use('/api/weather', weatherRoutes);

app.listen(PORT, () => {
  console.log(`Weather API running on http://localhost:${PORT}`);
});
