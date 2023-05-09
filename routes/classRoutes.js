import express from "express";
import {
  createClass,
  deleteClass,
  getClasses,
  updateClass,
} from "../controllers/classController.js";

const router = express.Router();

router.get("/", getClasses);
router.post("/", createClass);
router.patch("/:id", updateClass);
router.delete("/:id", deleteClass);

export default router;
