import { Router } from "express";

import {
  createProject,
  getAllProjects,
  getProjectById,
} from "../controllers/projectController";

import { verifyToken } from "../middleware/authMiddleware";
import uploadProject from "../middleware/uploadProject";

const router = Router();

router.get("/", getAllProjects);
router.get("/:id", getProjectById);

router.post(
  "/",
  verifyToken,
  uploadProject.single("thumbnail"),
  createProject
);

export default router;