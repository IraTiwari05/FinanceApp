// Product.js

import express from "express";
import Product from "../models/Product.js";
//import { convertedProducts } from "../data/data.js";

const router = express.Router();

router.get("/products", async (req, res) => {
  try {
    const products=await Product.find();
   // Log fetched data
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;