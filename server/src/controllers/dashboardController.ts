import type { Request, Response } from "express";
import User from "../models/User";
import Project from "../models/Project";

export async function getDashboardStats(req: Request, res: Response) {
  try {
    const totalMembers = await User.countDocuments();

    const totalProjects = await Project.countDocuments();

    const onlineNow = await User.countDocuments({ isOnline: true });

    res.json({
      totalMembers,
      totalProjects,
      onlineNow,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
}
