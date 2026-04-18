"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProject = exports.deleteProject = exports.getProjects = exports.uploadProject = void 0;
const Project_1 = __importDefault(require("../models/Project"));
const uploadProject = async (req, res) => {
    try {
        const { title, caption } = req.body;
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: "Please upload a file" });
        }
        const newProject = new Project_1.default({
            title,
            caption,
            fileUrl: file.path,
            fileType: file.mimetype
        });
        await newProject.save();
        res.status(201).json(newProject);
    }
    catch (error) {
        res.status(500).json({ message: "Error uploading project", error });
    }
};
exports.uploadProject = uploadProject;
const getProjects = async (req, res) => {
    try {
        const projects = await Project_1.default.find().sort({ createdAt: -1 });
        res.status(200).json(projects);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching projects", error });
    }
};
exports.getProjects = getProjects;
const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project_1.default.findById(id);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        await Project_1.default.findByIdAndDelete(id);
        res.status(200).json({ message: "Project deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting project", error });
    }
};
exports.deleteProject = deleteProject;
const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, caption } = req.body;
        const file = req.file;
        const project = await Project_1.default.findById(id);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        project.title = title || project.title;
        project.caption = caption || project.caption;
        if (file) {
            project.fileUrl = file.path;
            project.fileType = file.mimetype;
        }
        await project.save();
        res.status(200).json(project);
    }
    catch (error) {
        console.error("Detailed Update Error:", error);
        res.status(500).json({
            message: "Error updating project",
            error: error.message || "Unknown server error"
        });
    }
};
exports.updateProject = updateProject;
