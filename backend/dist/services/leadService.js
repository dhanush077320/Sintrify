"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllLeads = exports.createLead = void 0;
const Lead_1 = __importDefault(require("../models/Lead"));
const createLead = async (leadData) => {
    const lead = new Lead_1.default(leadData);
    return await lead.save();
};
exports.createLead = createLead;
const getAllLeads = async () => {
    return await Lead_1.default.find().sort({ createdAt: -1 });
};
exports.getAllLeads = getAllLeads;
