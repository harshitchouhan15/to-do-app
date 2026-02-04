import express from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getAllUsers,
} from "../controllers/task.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { asyncHandler } from "../lib/utils.js";

const router = express.Router();

router.use(verifyToken);

router.post("/", asyncHandler(createTask));
router.get("/", asyncHandler(getTasks));
router.put("/:id", asyncHandler(updateTask));
router.delete("/:id", asyncHandler(deleteTask));

router.get("/users/all", asyncHandler(getAllUsers));


export default router;
