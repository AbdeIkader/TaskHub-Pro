import Joi from "joi";

//1-Sign Up Schema
const signUpSchema = Joi.object({
  userName: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({ tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string()
    .pattern(/^[A-Z][a-z0-9]{3,30}$/)
    .required(),
  cpassword: Joi.ref("password"),
  age: Joi.number().integer().min(15).max(80).required(),
  gender: Joi.string().valid("Male", "Female").required(),
  phone: Joi.string()
    .pattern(/^(01[0-2]|015|02)[0-9]{8}$/)
    .required(),
});

//2- Sign in schema

const signInSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string()
    .pattern(/^[A-Z][a-z0-9]{3,30}$/)
    .required(),
});

//3- Verify Email Schema

const verifySchema = Joi.object({
  token: Joi.string().required(),
});

//4- Change passowrd

const changePasswordSchema = Joi.object({
  oldPassword: Joi.string()
    .pattern(/^[A-Z][a-z0-9]{3,30}$/)
    .required(),
  newPassword: Joi.string()
    .pattern(/^[A-Z][a-z0-9]{3,30}$/)
    .required(),
  cPassword: Joi.ref("newPassword"),
});

//5- Update user

const updateUserSchema = Joi.object({
  userName: Joi.string().min(3).max(30).required(),
  phone: Joi.string()
    .pattern(/^(01[0-2]|015|02)[0-9]{8}$/)
    .required(),
  age: Joi.number().integer().min(15).max(80).required(),
});

//6-delete user(user must be logged in)

export {
  signUpSchema,
  signInSchema,
  verifySchema,
  changePasswordSchema,
  updateUserSchema,
};
