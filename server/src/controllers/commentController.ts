import type { Response } from "express";
import type { AuthRequest } from "../middleware/authMiddleware";

import Comment from "../models/Comment";
import Project from "../models/Project";

export async function createComment(
  req: AuthRequest,
  res: Response
) {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        message: "Project tidak ditemukan.",
      });
    }

    const comment = await Comment.create({
      project: id,
      user: req.user?.id,
      content,
    });

    return res.status(201).json({
      message: "Komentar berhasil ditambahkan.",
      comment,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Terjadi kesalahan server.",
    });
  }
}

export async function getComments(
  req: AuthRequest,
  res: Response
) {
  try {
    const { id } = req.params;

    const comments = await Comment.find({
      project: id,
    })
      .populate("user", "fullName username avatar")
      .sort({
        createdAt: -1,
      });

    return res.json(comments);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Terjadi kesalahan server.",
    });
  }
}

export async function deleteComment(
  req: AuthRequest,
  res: Response
) {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        message: "Komentar tidak ditemukan.",
      });
    }

    if (comment.user.toString() !== req.user?.id) {
      return res.status(403).json({
        message: "Anda tidak memiliki akses.",
      });
    }

    await comment.deleteOne();

    return res.json({
      message: "Komentar berhasil dihapus.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Terjadi kesalahan server.",
    });
  }
}

export async function updateComment(
  req: AuthRequest,
  res: Response
) {
  try {
    const { commentId } = req.params;
    const { content } = req.body;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        message: "Komentar tidak ditemukan.",
      });
    }

    if (comment.user.toString() !== req.user?.id) {
      return res.status(403).json({
        message: "Anda tidak memiliki akses.",
      });
    }

    comment.content = content;

    await comment.save();

    return res.json({
      message: "Komentar berhasil diperbarui.",
      comment,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Terjadi kesalahan server.",
    });
  }
}