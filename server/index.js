
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
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL
    //useNewUrlParser: true,
    //useUnifiedTopology: true,
  )
  .then(async () => {
    app.listen(PORT, () => console.log(`Server port: ${PORT}`));

    // Optionally add data once or as needed
    //await mongoose.connection.db.dropDatabase();
     //await KPI.insertMany(convertedKpis);
    //Product.insertMany(products);
    //Transaction.insertMany(transactions);
  })
  .catch((error) => console.log(`${error} did not connect`));


  /*import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import kpiRoutes from './routes/kpi.js';
import KPI from './models/KPI.js'
import { convertedKpis } from './data/data.js';

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

app.use((req, res, next) => {
  console.log('Incoming request:', req.method, req.path);
  next();
});
// Routes
app.use("/kpi", kpiRoutes);


// MONGOOSE SETUP 
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL
 //  useNewUrlParser:true,
  // useUnifiedTopology:true,
  )
  .then(async () => {
    app.listen(PORT, () => console.log(`Server port: ${PORT}`));

    // Optionally add data once or as needed
    // await mongoose.connection.db.dropDatabase();
    // await KPI.insertMany(kpis);
  })
  .catch((error) => console.log(`${error} did not connect`));

*/