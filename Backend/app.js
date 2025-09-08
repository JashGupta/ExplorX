import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerkWebhooks.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());
app.use("/api/clerk", clerkWebhooks);

app.get('/', (req, res) => {
    res.send("Backend is working !");
})
export default app;