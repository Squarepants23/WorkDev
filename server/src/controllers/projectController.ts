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

export async function updateProject(
  req: AuthRequest,
  res: Response
) {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        message: "Project tidak ditemukan.",
      });
    }

    if (project.owner.toString() !== req.user?.id) {
      return res.status(403).json({
        message: "Anda tidak memiliki akses.",
      });
    }

    project.title = req.body.title;
    project.description = req.body.description;
    project.category = req.body.category;
    project.status = req.body.status;

    project.techStack =
      typeof req.body.techStack === "string"
        ? req.body.techStack
            .split(",")
            .map((item: string) => item.trim())
        : req.body.techStack;

    project.repositoryUrl = req.body.repositoryUrl;
    project.projectUrl = req.body.projectUrl;

    if (req.file) {
      project.thumbnail = `/uploads/projects/${req.file.filename}`;
    }

    await project.save();

    return res.json({
      message: "Project berhasil diperbarui.",
      project,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Terjadi kesalahan server.",
    });
  }
}

export async function deleteProject(
  req: AuthRequest,
  res: Response
) {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        message: "Project tidak ditemukan.",
      });
    }

    if (project.owner.toString() !== req.user?.id) {
      return res.status(403).json({
        message: "Anda tidak memiliki akses.",
      });
    }

    await Project.findByIdAndDelete(id);

    return res.json({
      message: "Project berhasil dihapus.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Terjadi kesalahan server.",
    });
  }
}