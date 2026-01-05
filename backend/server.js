import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/dbConnection.js";
import userRouter from "./routes/User.js";
import characterRouter from "./routes/Character.js";
import messageRouter from "./routes/Message.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB();
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      
    ],
    credentials: true,
  })
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/auth", userRouter);
app.use("/api/character", characterRouter);
app.use("/api/chat", messageRouter);
app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
