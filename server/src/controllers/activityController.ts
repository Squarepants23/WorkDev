import type { Request, Response } from "express";
import User from "../models/User";

export async function getRecentActivity(
  _req: Request,
  res: Response,
) {
  try {
    const users = await User.find()
      .select(
        "fullName avatar isOnline lastActive"
      )
      .sort({
        lastActive: -1,
      })
      .limit(10);

    return res.json(users);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
}