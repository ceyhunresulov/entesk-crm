import express from "express";
import {
  createStudent,
  deleteStudent,
  getStudents,
  updateStudent,
  getStudent,
  loginStudent,
} from "../controllers/studentController.js";

const router = express.Router();

router.get("/", getStudents);
router.get("/:id", getStudent);
router.post("/sign", createStudent);
router.post("/login", loginStudent);
router.patch("/:id", updateStudent);
router.delete("/:id", deleteStudent);
export default router;
