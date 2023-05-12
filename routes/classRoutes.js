import express from "express";
import {
  createClass,
  deleteClass,
  getClasses,
  updateClass,
} from "../controllers/classController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authMiddleware, getClasses);
router.post("/", authMiddleware, createClass);
router.patch("/:id", authMiddleware, updateClass);
router.delete("/:id", authMiddleware, deleteClass);

export default router;
