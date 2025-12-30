import express from "express";
import { login, register, me, logout } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { asyncHandler } from "../lib/utils.js";

const router = express.Router();

router.post("/register", asyncHandler(register));
router.post("/login", asyncHandler(login));
router.get("/me", verifyToken, asyncHandler(me));
router.post("/logout", asyncHandler(logout));

export default router;
