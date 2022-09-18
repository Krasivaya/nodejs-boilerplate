import express from "express";
import { errors } from "celebrate";
import api from "./resources/api";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", api);
app.use(errors());

export default app;
