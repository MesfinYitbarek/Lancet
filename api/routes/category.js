import express from "express";
import { create, deletecatagory, display, displayForEdit, updatecatagory } from "../Controller/categoryController.js";
import { verifyToken } from "../utilis/verifyUser.js";
const categoryRouter = express.Router();

categoryRouter.post("/create", create)
categoryRouter.get("/display", display)
categoryRouter.get("/category/:id", displayForEdit);
categoryRouter.delete("/deletecatagory/:id",verifyToken, deletecatagory);
categoryRouter.put("/updatecatagory/:id",verifyToken, updatecatagory);

export default categoryRouter