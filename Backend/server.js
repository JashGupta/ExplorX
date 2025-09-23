import express from "express";
import "dotenv/config";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import connectToDb from "./DB/db.js";
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/userRouter.js";
import hotelRouter from "./routes/hotelRouter.js";

connectToDb();
const app = express();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

app.use("/api/clerk", clerkWebhooks);

app.get("/", (req, res) => res.send("Backend is working!"));
app.use("/api/user", userRouter);
app.use("/api/hotels", hotelRouter);

const PORT = process.env.PORT ||  3000;

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})
