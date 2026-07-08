import { Router } from "express";

import { getProfile, updateProfile } from "../controllers/userController";
import { verifyToken } from "../middleware/authMiddleware";

const router = Router();

router.get("/me", verifyToken, getProfile);
router.put("/me", verifyToken, updateProfile);

export default router;