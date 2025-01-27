import Course from "../models/Course.js";
import errorHandler from "../utilis/error.js";

// create courses
export const createCourses = async (req, res, next) => {
  const {
    title,
    imageUrl,
    description,
    duration,
    isPaid,
    price,
    userRef,
    catagory,
    level,
    instructor,
    requirements,
    learningObjectives,
    reviews,
    curriculum,
    createdAt,
    updatedAt,
  } = req.body;
  const newCourse = new Course({
    title,
    imageUrl,
    description,
    duration,
    isPaid,
    price,
    userRef,
    catagory,
    level,
    instructor,
    requirements,
    learningObjectives,
    reviews,
    curriculum,
    createdAt,
    updatedAt,
  });
  try {
    await newCourse.save();
    res.status(201).json("Course created successfull");
  } catch (error) {
    next(error);
  }
};

// approved course display
export const courses = async (req, res, next) => {
  try {
    const approvedCourses = await Course.find({ isApproved: true });
    res.json(approvedCourses);
  } catch (error) {
    next(error);
  }
};

// all course display for admin
export const allCoursesForAdmin = async (req, res, next) => {
  try {
    const allCourses = await Course.find();
    res.json(allCourses);
  } catch (error) {
    next(error);
  }
};

//admin to approve or unapprove a course.
export const toggleApproval = async (req, res, next) => {
  const { id } = req.params;

  try {
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Toggle approval status
    course.isApproved = !course.isApproved;
    await course.save();

    res.status(200).json({ message: `Course ${course.isApproved ? "approved" : "unapproved"}` });
  } catch (error) {
    next(error);
  }
};

// course detail display
export const courseDetails = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//Private course display for instructor
export const personalcourses = async (req, res, next) => {
  if (req.user.id == req.params.id) {
    try {
      const courses = await Course.find({ userRef: req.params.id });
      res.status(200).json(courses);
    } catch (error) {
      next(error);
    }
  }
};

//course delete
export const deletecourses = async (req, res, next) => {
  const listing = await Course.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, "Course not found!"));
  }

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only delete your own course!"));
  }

  try {
    await Course.findByIdAndDelete(req.params.id);
  } catch (error) {
    next(error);
  }
};

// course update
export const updatecourses = async (req, res, next) => {
  const courses = await Course.findById(req.params.id);
  if (!courses) {
    return next(errorHandler(404, " Course not found"));
  }
  if (req.user.id !== courses.userRef) {
    return next(errorHandler(401, " You can only update your own courses!"));
  }

  try {
    const updatedcourses = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedcourses);
  } catch (error) {
    next(error);
  }
};

//display courses for editing based on there id
export const courseEdit = async (req, res, next) => {
  const { id } = req.params;

  try {
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    console.error("Error fetching Course:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
