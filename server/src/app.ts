import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes";
import postRoutes from "./routes/postRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

app.get("/", (_req, res) => {
  res.send("WorkDev Backend is Running!");
});

export default app;