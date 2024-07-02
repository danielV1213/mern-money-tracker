require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.API_PORT || 4040;

app.use(cors());
app.use(express.json());
app.get("/api/test", (req, res) => {
  res.json("The app is running!");
});

app.post("/api/transaction", (req, res) => {
  res.json(req.body);
});

app.listen(port);
