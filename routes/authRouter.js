import express from "express";
import validator from "express-validator";
import { login, register, logout, activate, refresh } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";
import GoogleStrategy from "passport-google-oauth";
import passport from "passport";

const router = express.Router();

router.post(
  "/register",
  [
    validator.check("email", "wrong email").isEmail(),
    validator
      .check("password", "password should be 4-10 symbols length")
      .isLength({ min: 4, max: 10 }),
  ],
  register
);
router.post("/login", login);
router.post("/logout",logout)
router.get("/activate/:link",activate);
router.get("/refresh",refresh);

export default router;
