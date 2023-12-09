import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.js";
// import taskRouter from "./routes/task.js";
import { errorMiddleware } from "./middlewares/error.js";

dotenv.config();

export const app = express();
const PORT = process.env.PORT || 3000;

// Using Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Using routes
app.use("/api", userRouter);


app.get("/", (req, res) => {
  res.send("Nice working");
});


// Using Error Middleware
app.use(errorMiddleware);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
      console.log("Connected to Database");
    });
  })
  .catch((error) => {
    console.error(error);
  });
