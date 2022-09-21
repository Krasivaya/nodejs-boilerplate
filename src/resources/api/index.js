import { Router } from "express";
import auth from "./auth/auth.routes";
import users from "./users/users.routes";
import activities from "./activities/activities.routes";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    message: "Welcome to the API",
  });
});

router.use("/auth", auth);
router.use("/users", users);
router.use("/activities", activities);

export default router;
