import express from "express";
import { uploadProject, getProjects, deleteProject, updateProject } from "../controllers/projectController";
import { cloudUpload } from "../config/cloudinary";

const router = express.Router();

router.post("/", cloudUpload.single("file"), uploadProject);
router.get("/", getProjects);
router.put("/:id", cloudUpload.single("file"), updateProject);
router.delete("/:id", deleteProject);

export default router;
