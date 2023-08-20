import express from "express";
import { auth } from "../../middleware/auth.js";
import {
  addTask,
  deleteTask,
  getAllTasks,
  getTasksOfOneUser,
  updateTask,
} from "./task.controller.js";
import { validation } from "../../middleware/validation.js";
import { addTaskSchema, updateTaskSchema } from "./task.validation.js";
const router = express.Router();

router.post("/addTask", validation(addTaskSchema, "body"), auth, addTask);
router.put(
  "/updateTask/:_id",
  validation(updateTaskSchema, "body"),
  auth,
  updateTask
);
router.delete("/deleteTask/:_id", auth, deleteTask);
router.get("/getAllTasks", auth, getAllTasks);
router.get("/getTasksOfOneUser", auth, getTasksOfOneUser);

export default router;
