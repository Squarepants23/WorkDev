import type { Response } from "express";
import type { AuthRequest } from "../middleware/authMiddleware";

import Post from "../models/Post";

export async function createPost(req: AuthRequest, res: Response) {
  try {
    const { content, image } = req.body;

    if (!content) {
      return res.status(400).json({
        message: "Content wajib diisi.",
      });
    }

    const post = await Post.create({
      author: req.user?.id,
      content,
      image: image || "",
    });

    res.status(201).json({
      message: "Postingan berhasil dibuat.",
      post,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Terjadi kesalahan pada server.",
    });
  }
}

export async function getPosts(req: AuthRequest, res: Response) {
  try {
    const posts = await Post.find()
      .populate("author", "fullName username")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Terjadi kesalahan pada server.",
    });
  }
}

export async function getPostById(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;

    const post = await Post.findById(id).populate(
      "author",
      "fullName username"
    );

    if (!post) {
      return res.status(404).json({
        message: "Postingan tidak ditemukan.",
      });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Terjadi kesalahan pada server.",
    });
  }
}

export async function updatePost(
  req: AuthRequest,
  res: Response
) {
  try {
    const { id } = req.params;
    const { content, image } = req.body;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        message: "Postingan tidak ditemukan.",
      });
    }

    if (post.author.toString() !== req.user?.id) {
      return res.status(403).json({
        message: "Anda tidak memiliki akses.",
      });
    }

    post.content = content ?? post.content;
    post.image = image ?? post.image;

    await post.save();

    res.status(200).json({
      message: "Postingan berhasil diperbarui.",
      post,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Terjadi kesalahan pada server.",
    });
  }
}

export async function deletePost(
  req: AuthRequest,
  res: Response
) {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        message: "Postingan tidak ditemukan.",
      });
    }

    if (post.author.toString() !== req.user?.id) {
      return res.status(403).json({
        message: "Anda tidak memiliki akses.",
      });
    }

    await Post.findByIdAndDelete(id);

    res.status(200).json({
      message: "Postingan berhasil dihapus.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Terjadi kesalahan pada server.",
    });
  }
}