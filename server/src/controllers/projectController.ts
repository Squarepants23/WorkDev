import type { Request, Response } from "express";
import Project from "../models/Project";
import type { AuthRequest } from "../middleware/authMiddleware";

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

export async function getProjectById(
  req: Request,
  res: Response
) {
  try {
    const project = await Project.findById(req.params.id)
      .populate("owner", "fullName username avatar");

    if (!project) {
      return res.status(404).json({
        message: "Project tidak ditemukan.",
      });
    }

    return res.json(project);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Terjadi kesalahan server.",
    });
  }
}

export async function createProject(
  req: AuthRequest,
  res: Response
) {
  try {
    const {
      title,
      description,
      category,
      techStack,
      status,
      repositoryUrl,
      projectUrl,
    } = req.body;

    const project = await Project.create({
      title,
      description,
      thumbnail: req.file ? `/uploads/projects/${req.file.filename}` : "",
      category,
      techStack,
      status,
      repositoryUrl,
      projectUrl,
      owner: req.user?.id,
    });

    return res.status(201).json({
      message: "Project berhasil dibuat.",
      project,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Terjadi kesalahan server.",
    });
  }
}