import { taskModel } from "../../../database/models/task.model.js";
import { userModel } from "../../../database/models/user.model.js";
import { AppError } from "../../utils/AppError.js";
import { catchAsycError } from "../../utils/catchAsyncErrors.js";

//1-add task with status (toDo)(user must be logged in)

const addTask = catchAsycError(async (req, res) => {
  let userId = req.user.id;
  let { title, description, status, assignTo, deadLine } = req.body;
  const assign = await userModel.findById(assignTo);
  console.log(assign);
  if (!assign) {
    next(new AppError("User you want to assign this task is not exist", 404));
  }

  const addTask = await taskModel.create({
    title,
    description,
    status,
    userId,
    assignTo,
    deadLine,
  });
  if (addTask) {
    res.json({ message: "Task Added succesfully", addTask });
  } else {
    res.json({ Message: "Task didn't added" });
    next(new AppError("Task didn't added", 400));
  }
});

//2-update task (title , description , status) (user must be logged in) (creator only can update task)

const updateTask = catchAsycError(async (req, res) => {
  let { _id } = req.params;
  let { title, description, status, assignTo } = req.body;
  let task = await taskModel.findById(_id);
  console.log(task);
  if (!task) {
    next(new AppError("Task is not exist", 404));
  }
  if (task.userId.toString() != req.user._id) {
    next(new AppError("You not allow to update this task", 403));
  }
  const assign = await userModel.findById(assignTo);
  if (!assign) {
    next(new AppError("User you want to assign this task is not exist", 404));
  }
  const updateTask = await taskModel.findByIdAndUpdate(
    _id,
    { title, description, status },
    { new: true }
  );
  if (updateTask) {
    res.json({ message: "Task updated successfully", updateTask });
  } else {
    next(new AppError("Not updated something went wrong", 400));
  }
});

//3-delete task(user must be logged in) (creator only can delete task)

const deleteTask = catchAsycError(async (req, res) => {
  const { _id } = req.params;

  let task = await taskModel.findById(_id);
  if (!task) {
    next(new AppError("Task is not exist", 404));
  }
  if (task.userId.toString() != req.user._id) {
    next(new AppError("You not allow to delete this task", 403));
  }
  const deleteTask = await taskModel.findByIdAndDelete(_id);
  if (deleteTask) {
    res.json({ Message: "Task deleted successfully", task });
  } else {
    next(new AppError("Task is not deleted something went wrong", 400));
  }
});

//4-get all tasks with user data

const getAllTasks = catchAsycError(async (req, res) => {
  let getAllTasks = await taskModel.find({}).populate([
    {
      path: "userId",
      select: "userName email phone age gender ",
    },
    {
      path: "assignTo",
      select: "userName email phone age gender",
    },
  ]);
  res.json({ Message: "Success", getAllTasks });
});

//5-get tasks of oneUser with user data userId (user must be logged in)

const getTasksOfOneUser = catchAsycError(async (req, res) => {
  const { id } = req.user;
  const tasksOfOneUser = await taskModel.find({ userId: id }).populate([
    {
      path: "userId",
      select: "userName email phone age",
    },
    {
      path: "assignTo",
      select: "userName email phone age",
    },
  ]);
  if (tasksOfOneUser) {
    res.json({ Message: "Success", tasksOfOneUser });
  } else {
    next(new AppError("Not updated something went wrong", 400));
  }
});

//6-get all tasks that not done after deadline

const allLateTasks = catchAsycError(async (req, res) => {
  const { id } = req.user;
  let currentDate = new Date();

  console.log(currentDate);
  const tasks = await taskModel
    .find({ assignTo: id, deadline: { $lt: currentDate } })
    .populate([
      {
        path: "userId",
        select: "userName email phone",
      },
      {
        path: "assignTo",
        select: "userName email phone",
      },
    ]);
  return res.json({ message: "Done", tasks });
});

export {
  addTask,
  updateTask,
  deleteTask,
  getAllTasks,
  getTasksOfOneUser,
  allLateTasks,
};
