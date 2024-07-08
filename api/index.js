require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Transaction = require("./models/Transaction.js");

const app = express();
const port = process.env.API_PORT || 4040;
const mongoUrl = process.env.MONGO_URL;

app.use(cors());
app.use(express.json());

app.get("/api/test", (req, res) => {
  res.json("The app is running!");
});

app.post("/api/transaction", async (req, res) => {
  await mongoose.connect(mongoUrl);
  const { name, price, dateTime, description } = req.body;
  const transaction = await Transaction.create({ name, price, dateTime, description });
  res.json(transaction);
});

app.get('/api/transactions', async (req, res) => {
  await mongoose.connect(mongoUrl);
  const transactions =  await Transaction.find();
  res.json(transactions);
})

app.listen(port);
