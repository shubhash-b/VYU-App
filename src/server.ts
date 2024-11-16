import express, { Application } from 'express';
import dotenv from 'dotenv';
import connectDB from './database';
import widgetRoutes from './routes/widgetRoutes';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/widgets', widgetRoutes);

// Connect to MongoDB and Start Server
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
