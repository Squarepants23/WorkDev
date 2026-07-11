import type { Request, Response } from "express";
import type { AuthRequest } from "../middleware/authMiddleware";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import transporter from "../config/mailer";

import User from "../models/User";

export async function register(req: Request, res: Response) {
  try {
    const { fullName, username, email, password } = req.body;

    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return res.status(400).json({
        message: "Email sudah digunakan.",
      });
    }

    const usernameExists = await User.findOne({ username });

    if (usernameExists) {
      return res.status(400).json({
        message: "Username sudah digunakan.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Register berhasil.",
      user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Terjadi kesalahan pada server.",
    });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Email atau password salah.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Email atau password salah.",
      });
    }

    console.log("User login _id:", user._id);

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET || "workdev-secret",
      {
        expiresIn: "7d",
      },
    );

    res.status(200).json({
      message: "Login berhasil.",
      token,
      user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Terjadi kesalahan pada server.",
    });
  }
}

export async function forgotPassword(req: Request, res: Response) {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "Email tidak ditemukan.",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 1000 * 60 * 15);

    await user.save();

    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Reset Password WorkDev",
      html: `
        <h2>Reset Password WorkDev</h2>

        <p>Halo ${user.fullName},</p>

        <p>Klik tombol berikut untuk membuat password baru.</p>

        <a href="${resetLink}">
          Reset Password
        </a>

        <p>Link berlaku selama 15 menit.</p>
      `,
    });

    return res.json({
      message: "Email reset password berhasil dikirim.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Terjadi kesalahan server.",
    });
  }
}

export async function resetPassword(req: Request, res: Response) {
  try {
    const { token } = req.params;

    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: {
        $gt: new Date(),
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "Token sudah tidak berlaku.",
      });
    }

    user.password = await bcrypt.hash(password, 10);

    user.resetPasswordToken = "";
    user.resetPasswordExpires = undefined;

    await user.save();

    return res.json({
      message: "Password berhasil diubah.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Terjadi kesalahan server.",
    });
  }
}

export async function me(req: AuthRequest, res: Response) {
  try {
    console.log("User ID dari token:", req.user?.id);

    const user = await User.findById(req.user?.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User tidak ditemukan.",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Terjadi kesalahan pada server.",
    });
  }
}

export async function updateProfile(req: AuthRequest, res: Response) {
  try {
    const {
      fullName,
      username,
      bio,
      location,
      developerRole,
      github,
      linkedin,
      linktree,
      portfolio,
    } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user?.id,
      {
        fullName,
        username,
        bio,
        location,
        developerRole,
        github,
        linkedin,
        linktree,
        portfolio,
      },
      {
        new: true,
      },
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User tidak ditemukan.",
      });
    }

    res.status(200).json({
      message: "Profile berhasil diperbarui.",
      user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Terjadi kesalahan pada server.",
    });
  }
}

export async function uploadAvatar(req: AuthRequest, res: Response) {
  try {
    const user = await User.findById(req.user?.id);

    if (!user) {
      return res.status(404).json({
        message: "User tidak ditemukan.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Silakan pilih gambar.",
      });
    }

    // Hapus foto lama jika ada
    if (user.avatar) {
      const oldPath = path.join(process.cwd(), user.avatar.replace(/^\//, ""));

      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    // Simpan foto baru
    user.avatar = `/uploads/avatars/${req.file.filename}`;

    await user.save();

    res.status(200).json({
      message: "Foto profil berhasil diperbarui.",
      avatar: user.avatar,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Terjadi kesalahan pada server.",
    });
  }
}
