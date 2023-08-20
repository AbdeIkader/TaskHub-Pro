import express from "express";
import {
  changePassword,
  deleteUser,
  logOut,
  signIn,
  signUp,
  softDelete,
  updateUser,
  verifiedEmail,
} from "./user.controller.js";
import { auth } from "../../middleware/auth.js";
import {
  changePasswordSchema,
  signInSchema,
  signUpSchema,
  updateUserSchema,
  verifySchema,
} from "./user.validation.js";
import { validation } from "../../middleware/validation.js";
const router = express.Router();

router.post("/signUp", validation(signUpSchema, "body"), signUp);
router.get("/verify/:token", validation(verifySchema, "params"), verifiedEmail);
router.post("/signIn", validation(signInSchema, "body"), signIn);
router.patch(
  "/changePassword",
  validation(changePasswordSchema, "body"),
  auth,
  changePassword
);
router.put(
  "/updateUser",
  validation(updateUserSchema, "body"),
  auth,
  updateUser
);
router.delete("/deleteUser", auth, deleteUser);
router.patch("/softDelete", auth, softDelete);
router.patch("/logOut", auth, logOut);

export default router;
