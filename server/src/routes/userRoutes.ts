import { Router } from "express";

import {
  getProfile,
  updateProfile,
  getAllUsers,
  getUserById,
} from "../controllers/userController";
import { verifyToken } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getAllUsers);
router.get("/me", verifyToken, getProfile);
router.get("/:id", getUserById);
router.put("/me", verifyToken, updateProfile);

export default router;
