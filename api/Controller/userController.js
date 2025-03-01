import User from "../models/User.js";
import bcryptjs from "bcryptjs"
import errorHandler from "../utilis/error.js";
import jwt from "jsonwebtoken"

export const signup = async (req,res) => {
   const {username, email, password, role} = req.body
   const hashedPassword = bcryptjs.hashSync(password, 10)
   
   const existingUser = await User.findOne({email})
   if(existingUser ) return res.status(400).json("Email already exist")

    const newUser = new User({username, email, password: hashedPassword, role})

    try {
        await newUser.save()
        res.status(201).json("user created successfully")
    } catch (error) {
        res.status(500).json(error)
    }
}

export const signin = async (req, res, next) => {
    const { username, password } = req.body;
    try {
      // Find user by username
      const validUser = await User.findOne({ username });
      if (!validUser) return next(errorHandler(404, 'User not found!'));
  
      // Validate Password
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if (!validPassword) return next(errorHandler(401, 'Invalid password!'));
  
      // Generate JWT token
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      const { password: pass, ...rest } = validUser._doc;
      res
        .cookie('access_token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' })
        .status(200)
        .json(rest);
    } catch (error) {
      next(error);
    }
  };



  export const signout = async (req, res, next) => {
    try {
      res.clearCookie("access_token");
      res.status(200).json("User has been logged out!");
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
  
 
  
  
  export const deleteUser = async (req, res, next) => {
    const users = await User.findById(req.params.id);
  
    if (!users) {
      return next(errorHandler(404, "User not found!"));
    }
  
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted!");
    } catch (error) {
      next(error);
    }
  }
  
  export const updateAdmin = async (req, res, next) => {
    try {
      if (req.body.password) {
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
      }
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            avatar: req.body.avatar,
            role: req.body.role,
          },
        },
        { new: true }
      );
  
      const { passowrd, ...rest } = updatedUser._doc;
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  }