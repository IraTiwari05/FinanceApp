import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import kpiRouter from './routes/kpi.js'; // Adjust the path as per your project structure
import productRouter from './routes/product.js'; // Adjust the path as per your project structure
import transactionRouter from './routes/transaction.js'; // Adjust the path as per your project structure

dotenv.config();

const app = express();
const port = process.env.PORT || 1337;
const mongoURI = process.env.MONGO_URL;

// Connect to MongoDB
mongoose.connect(mongoURI!, {

});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Serve static files from the "dist" directory
app.use(express.static(path.join(__dirname, 'dist')));

// Middleware to parse JSON bodies
app.use(express.json());

// Example API endpoint
app.get('/api/data', (_req: Request, res: Response) => {
  const data = { message: 'Hello from the server!' };
  res.json(data);
});

// Routes
app.use('/api/kpi', kpiRouter);
app.use('/api/product', productRouter);
app.use('/api/transaction', transactionRouter);

// Serve index.html for any other route to support client-side routing
app.get('*', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
