import { Router } from "express";
import { celebrate } from "celebrate";
import verifyAuth from "../../../middlewares/auth/verifyAuth";
import { createOne, getAll, getOne, updateOne } from "./users.controller";
import {
  createOneRule,
  getAllRule,
  getOneRule,
  updateOneRule,
} from "./users.validator";

const router = Router();

router
  .route("/")
  .post(
    verifyAuth({ password: true }),
    celebrate({ body: createOneRule }),
    createOne
  )
  .get(verifyAuth, celebrate({ query: getAllRule }), getAll);

router
  .route("/:id")
  .get(verifyAuth, celebrate({ params: getOneRule }), getOne)
  .put(verifyAuth({ password: true }), updateOneRule, updateOne);

export default router;
