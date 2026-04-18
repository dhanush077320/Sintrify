"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projectController_1 = require("../controllers/projectController");
const multer_1 = require("../config/multer");
const router = express_1.default.Router();
router.post("/", multer_1.upload.single("file"), projectController_1.uploadProject);
router.get("/", projectController_1.getProjects);
router.delete("/:id", projectController_1.deleteProject);
exports.default = router;
