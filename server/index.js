
// index.js
// index.js

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import kpiRoutes from './routes/kpi.js';
import productRoutes from './routes/product.js';
import transactionRoutes from './routes/transaction.js';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 1337;
const mongoURI = process.env.MONGO_URL;

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
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => console.log(`${error} did not connect`));

// Serve static files from the "dist" directory
app.use(express.static(path.join(__dirname, 'dist')));

// Example API endpoint
app.get('/api/data', (_req, res) => {
  const data = { message: 'Hello from the server!' };
  res.json(data);
});

// API routes
app.use('/api/kpi', kpiRoutes);
app.use('/api/product', productRoutes);
app.use('/api/transaction', transactionRoutes);

// Serve index.html for any other route to support client-side routing
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

/*import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import kpiRoutes from './routes/kpi.js';
import productRoutes from "./routes/product.js";
import transactionRoutes from './routes/transaction.js';
import Transaction from './models/Transaction.js'
import Product from './models/Product.js'
import KPI from './models/KPI.js'
import { convertedKpis,products,transactions } from './data/data.js';

// CONFIGURATIONS 
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors()); // CORS Middleware

// Default route
app.get("/", (req, res) => {
  res.send("Server is running");
});


// Routes
app.use("/kpi", kpiRoutes);
app.use("/product",productRoutes);
app.use("/transaction",transactionRoutes)
// MONGOOSE SETUP 
const PORT = process.env.PORT || 10000;
mongoose
  .connect(process.env.MONGO_URL
  )
  .then(async () => {
    app.listen(PORT, () => console.log(`Server port: ${PORT}`));

    
  })
  .catch((error) => console.log(`${error} did not connect`));
*/


