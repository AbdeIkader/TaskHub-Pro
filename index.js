process.on("uncaughtException", (err) => {
  console.log("Error", err);
});

import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { dbConnect } from "./DB/dbConnection.js";
import userRouter from "./src/modules/Users/user.routes.js";
import taskRouter from "./src/modules/Tasks/task.routes.js";
import { AppError } from "./src/utils/AppError.js";
import { errorHandling } from "./src/middleware/errorHandlingMiddleware.js";

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(express.static('uploads'));
app.use(userRouter);
app.use(taskRouter);

dbConnect();

app.use("*", (req, res, next) => {
  next(new AppError(`Invalid Url ${req.originalUrl}`, 404));
});

app.use(errorHandling);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log("Error", err);
});
