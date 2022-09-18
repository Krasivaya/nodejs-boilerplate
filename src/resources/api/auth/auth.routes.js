import { Router } from "express";
import { celebrate } from "celebrate";
import { login, protectedRoute, signup } from "./auth.controller";
import verifyAuth from "../../../middlewares/auth/verifyAuth";
import { loginRule, signupRule } from "./auth.validator";

const router = Router();

router.post("/signup", celebrate({ body: signupRule }), signup);
router.post("/login", celebrate({ body: loginRule }), login);

// The route to protect
router.get("/protected", verifyAuth, protectedRoute);

export default router;
