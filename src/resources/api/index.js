import { Router } from "express";
import auth from "./auth/auth.routes";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    message: "Welcome to the API",
  });
});

router.use("/auth", auth);

export default router;
