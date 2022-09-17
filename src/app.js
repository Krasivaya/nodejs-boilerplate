import express from "express";
import api from "./resources/api";

const app = express();

app.use("/api", api);

export default app;
