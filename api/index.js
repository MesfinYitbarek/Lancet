import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.js'
dotenv.config()
mongoose.connect("mongodb+srv://mesfinyitbarek55:12348109@lancet.4n0vn.mongodb.net/?retryWrites=true&w=majority&appName=Lancet").then(()=> {
    console.log("Connected to Mongo")
}).catch ((err) => {
    console.log(err)
})

const app = express()

//middleware
app.use(express.json())

app.use('/api/user', userRouter)


app.listen(3000, ()=> {
    console.log("Server is running on port 3000")
})


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });
