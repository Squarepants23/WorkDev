import express from "express";
import cors from "cors";
import path from "path";

import session from "express-session";
import passport from "./config/passport";

import authRoutes from "./routes/authRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import postRoutes from "./routes/postRoutes";
import projectRoutes from "./routes/projectRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "workdev_secret",
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/users", userRoutes);

app.get("/", (_req, res) => {
  res.send("WorkDev Backend is Running!");
});

export default app;