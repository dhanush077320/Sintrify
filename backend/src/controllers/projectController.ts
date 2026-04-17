import { Request, Response } from "express";
import Project from "../models/Project";
import fs from "fs";
import path from "path";

export const uploadProject = async (req: Request, res: Response) => {
  try {
    const { title, caption } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "Please upload a file" });
    }

    const newProject = new Project({
      title,
      caption,
      fileUrl: `/uploads/${file.filename}`,
      fileType: file.mimetype
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: "Error uploading project", error });
  }
};

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects", error });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Delete file from filesystem
    const filePath = path.join(__dirname, "../../", project.fileUrl);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await Project.findByIdAndDelete(id);
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting project", error });
  }
};
