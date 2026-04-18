import nodemailer from "nodemailer";
import { ILead } from "../models/Lead";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendLeadNotification = async (lead: ILead) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn("Email credentials missing. Notification not sent.");
    return;
  }

  const mailOptions = {
    from: `"Sintrify Engine" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER, // Send it to yourself
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
        
        <p style="font-size: 0.9rem; color: #666;">
          You can view this lead and manage your portfolio in the <a href="https://sintrify.vercel.app/login" style="color: #6366f1;">Admin Panel</a>.
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Notification email sent to admin");
  } catch (error) {
    console.error("Error sending lead notification email:", error);
  }
};
