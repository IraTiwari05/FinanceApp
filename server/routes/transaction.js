
import express from "express";
import Transaction from "../models/Transaction.js";


const router = express.Router();

router.get("/transactions", async (req, res) => {
  try {
    {/*await Transaction.insertMany(convertedTransactions);*/}

    const transactions = await Transaction.find()
    .limit(50)
    .sort({createOn:-1});
   // Log fetched data
    res.status(200).json(transactions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;