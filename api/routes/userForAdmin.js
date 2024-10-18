import express from "express";
import { verifyToken } from "../utilis/verifyUser.js";
import { users } from "../Controller/userController.js";
import { deleteAdmin, deleteUser, updateAdmin, updateUser, userEdit } from "../Controller/userForAdminController.js";


const userForAdminRouter = express.Router();

userForAdminRouter.get("/users", users);
userForAdminRouter.get("/userEdit/:id", userEdit);
userForAdminRouter.post('/update/:id', verifyToken, updateUser)
userForAdminRouter.delete('/delete/:id', verifyToken, deleteUser)
userForAdminRouter.put('/updateAdmin/:id', verifyToken, updateAdmin)
userForAdminRouter.delete('/deleteAdmin/:id', verifyToken, deleteAdmin)
export default userForAdminRouter;
