import express from "express";
import { verifyToken } from "../utilis/verifyUser.js";
import { allCoursesForAdmin, courseDetails, courseEdit, courses, createCourses, deletecourses, personalcourses, toggleApproval, updatecourses } from "../Controller/courseController.js";
const courseRouter = express.Router();

courseRouter.post("/createCourses", verifyToken, createCourses);
courseRouter.get("/courses", courses);
courseRouter.get("/allCourses", allCoursesForAdmin);
courseRouter.patch("/approve/:id", toggleApproval);
courseRouter.get("/personalcourses/:id",verifyToken, personalcourses);
courseRouter.get("/courseDetails/:id", courseDetails);
courseRouter.get("/courseEdit/:id", courseEdit);
courseRouter.delete("/delete/:id",verifyToken, deletecourses);
courseRouter.put("/updatecourses/:id",verifyToken, updatecourses);


export default courseRouter;