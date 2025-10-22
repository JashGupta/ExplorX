import express from "express";
import "dotenv/config";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import connectToDb from "./DB/db.js";
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/userRouter.js";
import hotelRouter from "./routes/hotelRouter.js";
import connectCloudinary from "./configs/cloudinary.js";
import roomRouter from "./routes/roomRouter.js";

connectToDb();
connectCloudinary();
const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/clerk", express.raw({ type: "application/json" }), clerkWebhooks);
app.use(clerkMiddleware());

app.get("/", (req, res) => res.send("Backend is working!"));
app.use("/api/user", userRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/rooms", roomRouter);

const PORT = process.env.PORT ||  3000;

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})
