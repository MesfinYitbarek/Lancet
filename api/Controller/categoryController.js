import Category from "../models/Category.js";
import errorHandler from "../utilis/error.js";

//category creation
export const create = async (req, res, next) => {
  const { name, userRef } = req.body;
  const newCatagory = new Category({
    name,
    userRef,
  });
  try {
    await newCatagory.save();
    res.status(201).json("Catagory created successfull");
  } catch (error) {
    next(error);
  }
};

//category display
export const display = async (req, res, next) => {
  try {
    const catagory = await Category.find();
    res.json(catagory);
  } catch (error) {
    next(error);
  }
};

// category display for edit
export const displayForEdit = async (req, res, next) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// update catagory
export const updatecatagory = async (req, res, next) => {
  const catagory = await Category.findById(req.params.id);
  if (!catagory) {
    return next(errorHandler(404, " Catagory not found"));
  }
  // if (req.user.id !== catagory.userRef) {
  //   return next(errorHandler(401, " You can only update your own catagory!"));
  // }

  try {
    const updatedCatagory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedCatagory);
  } catch (error) {
    next(error);
  }
};

//delete catagory
export const deletecatagory = async (req, res, next) => {
  const catagory = await Category.findById(req.params.id);

  if (!catagory) {
    return next(errorHandler(404, "Catagory not found!"));
  }

  // if (req.user.id !== catagory.userRef) {
  //   return next(errorHandler(401, "You can only delete your own catagory!"));
  // }

  try {
    await Category.findByIdAndDelete(req.params.id);
  } catch (error) {
    next(error);
  }
};
