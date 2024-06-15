import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import kpiRoutes from './routes/kpi.js';
import productRoutes from './routes/product.js';
import transactionRoutes from './routes/transaction.js';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 1337;
const mongoURI = process.env.MONGO_URL;

// ES module equivalents for __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors()); // CORS Middleware

// Connect to MongoDB
mongoose.connect(mongoURI, {
  // Remove deprecated options
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => console.log(`${error} did not connect`));

// Example API endpoint
app.get('/api/data', (_req, res) => {
  const data = { message: 'Hello from the server!' };
  res.json(data);
});

// API routes
app.use('/api/kpi', kpiRoutes);
app.use('/api/product', productRoutes);
app.use('/api/transaction', transactionRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
