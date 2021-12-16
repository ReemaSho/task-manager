import Task from "../models/task.js";
import asyncWrapper from "../middleware/async.js";
import { creatCustomError } from "../errors/custom-error.js";
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
  //other options for responses , but it should be the same in all responses and should match the frontend part:
  //  res.status(200).json({ tasks,amount:tasks.length  });for the number of tasks
  //res.status(200).json({status:"success or true",data :{tasks,nbHits:tasks.length}})
});
const createNewTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});
const getSingleTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return next(creatCustomError(`No task with id ${taskID}`, 404));
  }
  res.status(201).json({ task });
});
const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
    //we use overwrite with put not patch , cuz the with put the expectation is to update the whole item , while with patch is to update just the properties that we are passing in.
    //overwrite: true,
  });
  if (!task) {
    return next(creatCustomError(`No task with id ${taskID}`, 404));
  }
  res.status(200).json({ task });
});
const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findByIdAndDelete({ _id: taskID });
  if (!task) {
    return next(creatCustomError(`No task with id ${taskID}`, 404));
  }
  res.status(200).json({ status: "success" });
});
export default {
  getAllTasks,
  createNewTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
