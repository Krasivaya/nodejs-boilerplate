import * as dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();

app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to the API",
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening on port ${port}.`));
