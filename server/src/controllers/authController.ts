import type { Request, Response } from "express";
import bcrypt from "bcryptjs";

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
    res.status(500).json({
      message: "Terjadi kesalahan pada server.",
    });
  }
}