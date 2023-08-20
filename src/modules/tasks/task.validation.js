import Joi from "joi";

//1-add task with status (toDo)(user must be logged in)

const addTaskSchema = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  description: Joi.string().min(3).max(200).required(),
  status: Joi.string().valid("ToDo", "doing", "done").default("ToDo"),
  assignTo: Joi.string().hex().length(24),
  deadLine: Joi.date().iso().required(),
});
//2-update task (title , description , status) (user must be logged in) (creator only can update task)

const updateTaskSchema = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  description: Joi.string().min(3).max(200).required(),
  status: Joi.string().valid("ToDo", "doing", "done").default("ToDo"),
  assignTo: Joi.string().hex().length(24),
  deadLine: Joi.date().iso().required(),
});
export { addTaskSchema, updateTaskSchema };
