import { Router } from "express";
import passport from "passport";

import {
  register,
  login,
  forgotPassword,
  resetPassword,
  me,
  updateProfile,
  uploadAvatar,
  setOffline,
  ping,
} from "../controllers/authController";
import { verifyToken } from "../middleware/authMiddleware";
import upload from "../middleware/uploadMiddleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "http://localhost:5173/login",
  }),
  (req, res) => {
    const { token } = req.user as { token: string };

    res.redirect(`http://localhost:5173/oauth-success?token=${token}`);
  },
);

router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user:email"],
  }),
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    session: false,
    failureRedirect: "http://localhost:5173/login",
  }),
  (req, res) => {
    const { token } = req.user as { token: string };

    res.redirect(`http://localhost:5173/oauth-success?token=${token}`);
  },
);

router.get("/me", verifyToken, me);

router.post("/offline", verifyToken, setOffline);

router.post("/ping", verifyToken, ping);

router.put("/me", verifyToken, updateProfile);

router.post("/avatar", verifyToken, upload.single("avatar"), uploadAvatar);

export default router;
