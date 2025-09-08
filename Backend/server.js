import express from "express";
import "dotenv/config";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import connectToDb from "./DB/db.js";
import clerkWebhooks from "./controllers/clerkWebhooks.js";

connectToDb();
const app = express();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

app.post("/api/clerk", express.raw({ type: "application/json" }), clerkWebhooks);

app.get("/", (req, res) => res.send("Backend is working!"));

app.get("/test-db", async (req, res) => {
  await connectToDb();
  res.send("heyy");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})
