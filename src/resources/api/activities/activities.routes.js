import { celebrate } from "celebrate";
import { Router } from "express";
import verifyAuth from "../../../middlewares/auth/verifyAuth";
import { getAll } from "./activities.controller";
import { getAllRule } from "./activities.validor";

const router = Router();

router.get("/", verifyAuth(), celebrate({ query: getAllRule }), getAll);

export default router;
