
import bcryptjs from "bcryptjs";
import errorHandler from "../utilis/error.js";
import User from "../models/User.js";


export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, " You can only update your own account!"));
  try {
    if (req.body.passowrd) {
      req.body.password = bcryptjs.hashSync(req.body.passowrd, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          passowrd: req.body.passowrd,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { passowrd, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only delete your own account!"));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("User has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const users = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// display users for editing based on there id
// Get user for editing
export const userEdit = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Validate MongoDB ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ success: false, message: "Invalid user ID format" });
    }

    const user = await User.findById(id).select('-password'); // Exclude password
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// Delete user
export const deleteAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ success: false, message: "Invalid user ID format" });
    }

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Update user
export const updateAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, email, password, avatar, role } = req.body;

    // Validate MongoDB ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ success: false, message: "Invalid user ID format" });
    }

    // Check if user exists
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Prepare update object
    const updateData = {
      username,
      email,
      avatar,
      role
    };

    // Only hash and update password if provided
    if (password) {
      updateData.password = bcryptjs.hashSync(password, 10);
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    ).select('-password'); // Exclude password from response

    res.status(200).json({ 
      success: true, 
      message: 'User updated successfully',
      data: updatedUser 
    });
  } catch (error) {
    // Handle specific errors
    if (error.code === 11000) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email or username already exists' 
      });
    }
    next(error);
  }
};