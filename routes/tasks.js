import express from "express";
const router = express.Router();
import controllersFuns from "../controllers/tasks.js";
const { getAllTasks, createNewTask, getSingleTask, updateTask, deleteTask } =
  controllersFuns;
router.route("/").get(getAllTasks).post(createNewTask);
router.route("/:id").get(getSingleTask).patch(updateTask).delete(deleteTask);
export default router;
