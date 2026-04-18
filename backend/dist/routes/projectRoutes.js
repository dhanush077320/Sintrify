"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projectController_1 = require("../controllers/projectController");
const cloudinary_1 = require("../config/cloudinary");
const router = express_1.default.Router();
router.post("/", cloudinary_1.cloudUpload.single("file"), projectController_1.uploadProject);
router.get("/", projectController_1.getProjects);
router.put("/:id", cloudinary_1.cloudUpload.single("file"), projectController_1.updateProject);
router.delete("/:id", projectController_1.deleteProject);
exports.default = router;
