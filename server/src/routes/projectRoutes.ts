import { Router } from "express";

import {
  createProject,
  getAllProjects,
  getMyProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

import {
  createComment,
  getComments,
  deleteComment,
  updateComment,
} from "../controllers/commentController.js";

import { toggleLike, getLikeInfo } from "../controllers/likeController.js";

import { verifyToken } from "../middleware/authMiddleware.js";
import uploadProject from "../middleware/uploadProject.js";

const router = Router();

router.get("/", getAllProjects);
router.get("/my", verifyToken, getMyProjects);
router.get("/:id", getProjectById);

router.post("/", verifyToken, uploadProject.single("thumbnail"), createProject);

router.put(
  "/:id",
  verifyToken,
  uploadProject.single("thumbnail"),
  updateProject,
);

router.delete("/:id", verifyToken, deleteProject);

router.post("/:id/like", verifyToken, toggleLike);

router.get("/:id/likes", verifyToken, getLikeInfo);

router.get("/:id/comments", getComments);

router.post("/:id/comments", verifyToken, createComment);

router.delete("/comments/:commentId", verifyToken, deleteComment);

router.put("/comments/:commentId", verifyToken, updateComment);

export default router;
