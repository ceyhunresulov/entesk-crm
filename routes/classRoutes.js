import express from "express";
import {
  createClass,
  deleteClass,
  updateClass,
} from "../controllers/classController.js";

const router = express.Router();

router.post("/", createClass);
router.put("/:id", updateClass);
router.delete("/:id", deleteClass);

export default router;
