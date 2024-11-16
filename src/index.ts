import express from 'express';
import mongoose from 'mongoose';
import { getAllTrafficData, getTotalTrafficCount, getRecentTrafficCount, getFilteredTrafficCount, getTrafficByTimestampRange } from './controllers/TrafficController';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/VYU')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('Could not connect to MongoDB:', err);
    process.exit(1);
  });

// Define Routes
app.get('/traffic', getAllTrafficData);
app.get('/traffic/total', getTotalTrafficCount);
app.get('/traffic/recent', getRecentTrafficCount);
app.get('/traffic/filtered', getFilteredTrafficCount);
app.get('/traffic/range', getTrafficByTimestampRange);


// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
