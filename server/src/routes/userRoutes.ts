import { Router } from "express";

import {
  getProfile,
  updateProfile,
  getAllUsers,
} from "../controllers/userController";
import { verifyToken } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getAllUsers);
router.get("/me", verifyToken, getProfile);
router.put("/me", verifyToken, updateProfile);

export default router;
