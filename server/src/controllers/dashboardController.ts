import type { Request, Response } from "express";
import User from "../models/User";

export async function getDashboardStats(
  req: Request,
  res: Response
) {
  try {
    const totalMembers = await User.countDocuments();

    res.json({
      totalMembers,
      totalProjects: 0,
      activeDevelopers: totalMembers,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
}