import * as dotenv from "dotenv";
import express from "express";
import api from "./resources/api";

dotenv.config();

const app = express();

app.use("/api", api);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
