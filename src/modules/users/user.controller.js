import { userModel } from "../../../DB/models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { sendEmail } from "../../../email/nodemailer.js";
import { catchAsycError } from "../../utils/catchAsyncErrors.js";
import { AppError } from "../../utils/AppError.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dbqw4t4st",
  api_key: "913514873627719",
  api_secret: "atfT-bht8ES6pWTX7GJWF4i6gIg",
});

//1-Sign Up

const signUp = catchAsycError(async (req, res, next) => {
  const { userName, email, password, cpassword, age, gender, phone } = req.body;

  if (password == cpassword) {
    const isUserExist = await userModel.findOne({ email });

    if (isUserExist) {
      return next(new AppError(`User is already exist`, 409));
    } else {
      const hash = bcrypt.hashSync(password, 8);

      cloudinary.uploader.upload(req.file.path, async function (error, result) {
        console.log(result);
        const addUser = await userModel.insertMany({
          userName,
          email,
          password: hash,
          age,
          gender,
          phone,
          profileImg: result.secure_url,
        });
        sendEmail({ email });
        res.json({ Message: "User added succesfully", addUser });
      });
    }
  } else {
    next(new AppError(`Password and conform password doesn't match`, 400));
  }
});

//2-Verify Email

const verifiedEmail = catchAsycError(async (req, res, next) => {
  let { token } = req.params;

  jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
    if (err) {
      next(new AppError(err.message, 403));
    } else {
      await userModel.findOneAndUpdate(
        { email: decoded.email },
        { isVerified: true }
      );
      res.json({ Message: "Verified" });
    }
  });
});

//3-Sign In

const signIn = catchAsycError(async (req, res, next) => {
  const { email, password } = req.body;
  const isUserExist = await userModel.findOne({ email });

  if (isUserExist) {
    let match = bcrypt.compareSync(password, isUserExist.password);
    if (match) {
      await userModel.findOneAndUpdate(
        { _id: isUserExist._id },
        {
          isOnline: true,
          isDeleted: false,
        },
        { new: true }
      );

      let token = jwt.sign(
        { id: isUserExist._id, email: isUserExist.email },
        process.env.JWT_KEY
      );
      res.json({ Message: "User logged succesfully with token", token });
    } else {
      next(
        new AppError(
          "Password you provided is not the same in the database",
          401
        )
      );
    }
  } else {
    next(new AppError("User is not exsit", 404));
  }
});

//4-changePassword

const changePassword = catchAsycError(async (req, res, next) => {
  let { _id } = req.user;
  let { oldPassword, newPassword, cPassword } = req.body;

  if (newPassword === cPassword) {
    let match = bcrypt.compareSync(oldPassword, req.user.password);

    if (match) {
      const hash = bcrypt.hashSync(newPassword, 8);
      let updatedPassword = await userModel.updateOne(
        { _id },
        { password: hash }
      );
      res.json({ Message: "Password Changed Successfully!", updatedPassword });
    } else {
      next(
        new AppError(
          "Password you entered does not match the password found in the database",
          401
        )
      );
    }
  } else {
    next(new AppError("New Password does not match the confirm password", 400));
  }
});

//

const getAllUsers = catchAsycError(async (req, res, next) => {
  const getAllUsers = await userModel.find({});

  res.json({ message: "success", getAllUsers });
});

//5-Update User

const updateUser = catchAsycError(async (req, res, next) => {
  const { _id } = req.user;
  const { userName, phone, age } = req.body;
  let updatedUser = await userModel.findByIdAndUpdate(
    { _id },
    { userName, phone, age },
    { new: true }
  );

  if (updatedUser) {
    res.json({ Message: "User updated succesfully", updatedUser });
  } else {
    next(new AppError("Something went error in updtae", 500));
  }
});
//6-delete user(user must be logged in)

const deleteUser = catchAsycError(async (req, res, next) => {
  const { _id } = req.user;
  const userDelete = await userModel.findByIdAndDelete({ _id });

  if (userDelete) {
    res.json({ Message: "User deleted succesfully", userDelete });
  } else {
    next(new AppError("User is not found", 404));
  }
});
//6-soft delete(user must be logged in)

const softDelete = catchAsycError(async (req, res, next) => {
  const { _id } = req.user;

  let updateUser = await userModel.findOneAndUpdate(
    { _id },
    { isDeleted: true, isOnline: false },
    { new: true }
  );

  if (updateUser) {
    res.json({ Message: "User soft deleted succesfully", updateUser });
  } else {
    next(new AppError("User was not found", 404));
  }
});

//7-logout

const logOut = catchAsycError(async (req, res, next) => {
  const { _id } = req.user;

  let updateUser = await userModel.findOneAndUpdate(
    { _id },
    { isOnline: false },
    { new: true }
  );
  if (updateUser) {
    res.json({ Message: "User logout succesfuly", updateUser });
  } else {
    next(new AppError("User was not found", 404));
  }
});
export {
  signUp,
  verifiedEmail,
  signIn,
  getAllUsers,
  changePassword,
  updateUser,
  deleteUser,
  softDelete,
  logOut,
};
