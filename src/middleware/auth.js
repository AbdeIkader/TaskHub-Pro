import jwt from "jsonwebtoken";
import { userModel } from "../../DB/models/user.model.js";
import { catchAsycError } from "../utils/catchAsyncErrors.js";

export const auth = catchAsycError(async (req, res, next) => {
  let { token } = req.headers;

  let decode = jwt.verify(token, process.env.JWT_KEY);

  if (decode) {
    let user = await userModel.findById(decode.id);
    if (user) {
      if (user.isDeleted) {
        return res.json("This Email is deleted");
      } else if (!user.isOnline) {
        return res.json("User is not logged in yet");
      } else {
        req.user = user;
        next();
      }
    } else {
      return res.json("User was not found");
    }
  } else {
    return res.json({ Message: "Token was not found" });
  }
});
