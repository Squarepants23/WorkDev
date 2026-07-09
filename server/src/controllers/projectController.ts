import type { Request, Response } from "express";
import Project from "../models/Project";

export async function getAllProjects(
  _req: Request,
  res: Response
) {
  try {
    const projects = await Project.find()
      .populate("owner", "fullName username avatar")
      .sort({ createdAt: -1 });

    return res.json(projects);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Terjadi kesalahan server.",
    });
  }
}