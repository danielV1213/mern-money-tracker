const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// Define the schema for a transaction
const TransactionSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  dateTime: { type: Date, required: true },
  description: { type: String, required: true },
});

// Define the model for a transaction and pass the created schema to it.
const TransactionModel = model("Transaction", TransactionSchema);

module.exports = TransactionModel;