import { Router } from "express";
import { celebrate } from "celebrate";
import {
  changePassword,
  login,
  logout,
  resetCode,
  resetPassword,
  signup,
} from "./auth.controller";
import verifyAuth from "../../../middlewares/auth/verifyAuth";
import {
  changePasswordRule,
  loginRule,
  resetCodeRule,
  resetPasswordRule,
  signupRule,
} from "./auth.validator";

const router = Router();

router.post("/signup", celebrate({ body: signupRule }), signup);
router.post("/login", celebrate({ body: loginRule }), login);
router.post("/logout", verifyAuth, logout);
router.put(
  "/change-password",
  verifyAuth,
  celebrate({ body: changePasswordRule }),
  changePassword
);
router.post("/reset-code", celebrate({ body: resetCodeRule }), resetCode);
router.post(
  "/reset-password",
  celebrate({ body: resetPasswordRule }),
  resetPassword
);

export default router;
