import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.js'
import categoryRouter from './routes/category.js'
import cookieParser from 'cookie-parser';
import courseRouter from './routes/courses.js'
dotenv.config()

// Connect to MongoDB database
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

const app = express()

//middleware
app.use(express.json())
app.use(cookieParser());


// Routes
app.use('/api/user', userRouter)
app.use('/api/category', categoryRouter)
app.use("/api/courses", courseRouter);



app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });
