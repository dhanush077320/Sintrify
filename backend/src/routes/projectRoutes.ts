import express from "express";
import { uploadProject, getProjects, deleteProject } from "../controllers/projectController";
import { upload } from "../config/multer";

const router = express.Router();

router.post("/", upload.single("file"), uploadProject);
router.get("/", getProjects);
router.delete("/:id", deleteProject);

export default router;
