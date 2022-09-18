import express from "express";
import BodyParser from "body-parser";
import { errors } from "celebrate";
import api from "./resources/api";

const app = express();

app.use(BodyParser.json());

app.use("/api", api);
app.use(errors());

export default app;
