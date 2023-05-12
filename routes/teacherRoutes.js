import express from "express";

import { authMiddleware } from "../middleware/auth.js";
import {
  deleteTeacher,
  getTeacher,
  getTeachers,
  updateTeacher,
  updateTeacherPassword,
} from "../controllers/teacherController.js";

const router = express.Router();

router.get("/", authMiddleware, getTeachers);
router.get("/:id", authMiddleware, getTeacher);
router.patch("/:id", authMiddleware, updateTeacher);
router.delete("/:id", authMiddleware, deleteTeacher);
router.patch("/password", authMiddleware, updateTeacherPassword);

export default router;
