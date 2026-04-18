"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const db_1 = __importDefault(require("./config/db"));
const leadRoutes_1 = __importDefault(require("./routes/leadRoutes"));
const projectRoutes_1 = __importDefault(require("./routes/projectRoutes"));
const errorHandler_1 = require("./middleware/errorHandler");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Connect to Database
(0, db_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev")); // Professional request logging
// Static Files
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
// Routes
app.use("/api/leads", leadRoutes_1.default);
app.use("/api/projects", projectRoutes_1.default);
// Global Error Handler
app.use(errorHandler_1.errorHandler);
app.listen(PORT, () => {
    console.log(`🚀 Professional Server running on http://localhost:${PORT}`);
});
