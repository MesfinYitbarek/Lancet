import express from "express";
import {
  deleteUser,
  signin,
  signout,
  signup,
  updateAdmin,
  users,
} from "../Controller/userController.js";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.get("/signout", signout);
userRouter.get("/users", users);
userRouter.post("/update", updateAdmin);
userRouter.delete("/delete/:id", deleteUser);

export default userRouter;
