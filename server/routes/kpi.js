
import express from "express";
import KPI from "../models/KPI.js";
import { convertedKpis } from "../data/data.js";

const router = express.Router();

router.get("/kpis", async (req, res) => {
  try {
    {/*await KPI.insertMany(convertedKpis);*/}

    const fetchedKpis = await KPI.find();
   // Log fetched data
    res.status(200).json(fetchedKpis);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;


