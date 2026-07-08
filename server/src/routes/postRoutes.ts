import { Router } from "express";

import { verifyToken } from "../middleware/authMiddleware";
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/postController";

const router = Router();

router.post("/", verifyToken, createPost);
router.get("/", verifyToken, getPosts);
router.get("/:id", verifyToken, getPostById);
router.put("/:id", verifyToken, updatePost);
router.delete("/:id", verifyToken, deletePost);

export default router;
