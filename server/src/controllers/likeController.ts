import type { Response } from "express";
import type { AuthRequest } from "../middleware/authMiddleware";

import Like from "../models/Like";

export async function toggleLike(
  req: AuthRequest,
  res: Response
) {
  try {
    const { id } = req.params;

    const existingLike = await Like.findOne({
      user: req.user?.id,
      project: id,
    });

    if (existingLike) {
      await existingLike.deleteOne();

      return res.json({
        liked: false,
        message: "Like dihapus.",
      });
    }

    await Like.create({
      user: req.user?.id,
      project: id,
    });

    return res.json({
      liked: true,
      message: "Project disukai.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Terjadi kesalahan server.",
    });
  }
}

export async function getLikeInfo(
  req: AuthRequest,
  res: Response
) {
  try {
    const { id } = req.params;

    const likeCount = await Like.countDocuments({
      project: id,
    });

    let isLiked = false;

    if (req.user) {
      const existingLike = await Like.findOne({
        user: req.user.id,
        project: id,
      });

      isLiked = !!existingLike;
    }

    return res.json({
      likeCount,
      isLiked,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Terjadi kesalahan server.",
    });
  }
}