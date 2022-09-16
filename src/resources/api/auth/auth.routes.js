import { Router } from "express";
import { login, protectedRoute } from "./auth.controller";
import verifyAuth from "../../../middlewares/auth/verifyAuth";

const router = Router();

router.post("/login", login);

// The route to protect
router.get("/protected", verifyAuth, protectedRoute);

export default router;
