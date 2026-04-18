import express from "express";
import { uploadProject, getProjects, deleteProject, updateProject } from "../controllers/projectController";
import { upload } from "../config/multer";

const router = express.Router();

router.post("/", upload.single("file"), uploadProject);
router.get("/", getProjects);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;
