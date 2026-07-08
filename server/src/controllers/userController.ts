import type { Response } from "express";

import User from "../models/User";
import type { AuthRequest } from "../middleware/authMiddleware";

export async function getProfile(
  req: AuthRequest,
  res: Response
) {
  try {
    const user = await User.findById(req.user?.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User tidak ditemukan.",
      });
    }

    return res.json(user);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Terjadi kesalahan server.",
    });
  }
}

export async function updateProfile(
  req: AuthRequest,
  res: Response
) {
  try {
    const {
      fullName,
      username,
      bio,
      location,
      github,
      linkedin,
      portfolio,
    } = req.body;

    const user = await User.findById(req.user?.id);

    if (!user) {
      return res.status(404).json({
        message: "User tidak ditemukan.",
      });
    }

    user.fullName = fullName ?? user.fullName;
    user.username = username ?? user.username;
    user.bio = bio ?? user.bio;
    user.location = location ?? user.location;
    user.github = github ?? user.github;
    user.linkedin = linkedin ?? user.linkedin;
    user.portfolio = portfolio ?? user.portfolio;

    await user.save();

    return res.json({
      message: "Profile berhasil diperbarui.",
      user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Terjadi kesalahan server.",
    });
  }
}