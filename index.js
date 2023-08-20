process.on("uncaughtException", (err) => {
  console.log("Error", err);
});

import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { dbConnect } from "./database/dbConnection.js";
import userRouter from "./src/modules/users/user.routes.js";
import taskRouter from "./src/modules/tasks/task.routes.js";
import { AppError } from "./src/utils/AppError.js";
import { errorHandling } from "./src/middleware/errorHandlingMiddleware.js";

const app = express();
const PORT = 4000;

app.use(express.json());
dbConnect();
app.use(userRouter);
app.use(taskRouter);

app.use("*", (req, res, next) => {
  next(new AppError(`Invalid Url ${req.originalUrl}`, 404));
});

app.use(errorHandling);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  //To handle the errors outside express
  console.log("Error", err);
});
