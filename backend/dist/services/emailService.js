"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendLeadNotification = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const createTransporter = () => {
    return nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
};
const sendLeadNotification = async (lead) => {
    console.log("Attempting to send notification for lead:", lead.name);
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error("❌ EMAIL ERROR: Credentials missing in .env or Render Environment Variables.");
        return;
    }
    const transporter = createTransporter();
    const mailOptions = {
        from: `"Sintrify Engine" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: `🚀 New Lead: ${lead.name}`,
        html: `
      <div style="font-family: sans-serif; max-width: 600px; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #6366f1;">New Appointment Booking</h2>
        <p>A new customer has just completed the Architectural Roadmap tool.</p>
        
        <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Client Name:</strong> ${lead.name}</p>
          <p><strong>Email:</strong> ${lead.email}</p>
          <p><strong>Phone:</strong> ${lead.phone}</p>
          <p><strong>Services:</strong> ${lead.services.join(", ")}</p>
          <p><strong>Objectives:</strong> ${lead.message}</p>
        </div>
      </div>
    `,
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("✅ EMAIL SUCCESS: Notification sent!", info.response);
    }
    catch (error) {
        console.error("❌ NODEMAILER ERROR:", error);
    }
};
exports.sendLeadNotification = sendLeadNotification;
