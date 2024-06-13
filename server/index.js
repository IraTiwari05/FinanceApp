
// index.js

import express from 'express';
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



