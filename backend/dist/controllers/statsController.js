"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStats = exports.getStats = void 0;
const Stats_1 = __importDefault(require("../models/Stats"));
const getStats = async (req, res, next) => {
    try {
        let stats = await Stats_1.default.findOne();
        if (!stats) {
            // Create default if none exists
            stats = await Stats_1.default.create({ happyClients: 35, projectsDelivered: 36 });
        }
        res.json(stats);
    }
    catch (error) {
        next(error);
    }
};
exports.getStats = getStats;
const updateStats = async (req, res, next) => {
    try {
        const { happyClients, projectsDelivered } = req.body;
        let stats = await Stats_1.default.findOne();
        if (stats) {
            stats.happyClients = happyClients;
            stats.projectsDelivered = projectsDelivered;
            stats.updatedAt = new Date();
            await stats.save();
        }
        else {
            stats = await Stats_1.default.create({ happyClients, projectsDelivered });
        }
        res.json(stats);
    }
    catch (error) {
        next(error);
    }
};
exports.updateStats = updateStats;
