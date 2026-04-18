"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeLead = exports.fetchLeads = exports.submitLead = void 0;
const zod_1 = require("zod");
const leadService = __importStar(require("../services/leadService"));
const emailService_1 = require("../services/emailService");
const leadSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, "Name must be at least 2 characters"),
    email: zod_1.z.string().email("Invalid email address"),
    phone: zod_1.z.string().min(10, "Phone number must be at least 10 digits"),
    services: zod_1.z.array(zod_1.z.string()).min(1, "Select at least one service"),
    message: zod_1.z.string().min(5, "Objectives must be at least 5 characters"),
    estimate: zod_1.z.number().nonnegative(),
});
const submitLead = async (req, res, next) => {
    try {
        const validatedData = leadSchema.parse(req.body);
        const lead = await leadService.createLead(validatedData);
        // Send email notification (don't await to keep response fast)
        (0, emailService_1.sendLeadNotification)(lead);
        res.status(201).json({
            success: true,
            message: "Lead captured successfully",
            data: lead,
        });
    }
    catch (error) {
        next(error); // Pass to global error handler
    }
};
exports.submitLead = submitLead;
const fetchLeads = async (req, res, next) => {
    try {
        const leads = await leadService.getAllLeads();
        res.json(leads);
    }
    catch (error) {
        next(error);
    }
};
exports.fetchLeads = fetchLeads;
const removeLead = async (req, res, next) => {
    try {
        await leadService.deleteLead(req.params.id);
        res.json({ success: true, message: "Lead record deleted" });
    }
    catch (error) {
        next(error);
    }
};
exports.removeLead = removeLead;
