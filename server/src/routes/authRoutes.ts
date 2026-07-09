import { Router } from "express";

import {
  register,
  login,
  me,
  updateProfile,
  uploadAvatar,
} from "../controllers/authController";
import { verifyToken } from "../middleware/authMiddleware";
import upload from "../middleware/uploadMiddleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", verifyToken, me);
router.put("/me", verifyToken, updateProfile);
router.post(
  "/avatar",
  verifyToken,
  upload.single("avatar"),
  uploadAvatar
);

export default router;
