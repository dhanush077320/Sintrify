import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import * as leadService from "../services/leadService";
import { sendLeadNotification } from "../services/emailService";

const leadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  services: z.array(z.string()).min(1, "Select at least one service"),
  message: z.string().min(2, "Objectives must be at least 2 characters"),
  estimate: z.number().nonnegative(),
});

export const submitLead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = leadSchema.parse(req.body);
    const lead = await leadService.createLead(validatedData);
    
    // Send email notification (don't await to keep response fast)
    sendLeadNotification(lead as any);
    
    res.status(201).json({
      success: true,
      message: "Lead captured successfully",
      data: lead,
    });
  } catch (error) {
    next(error); // Pass to global error handler
  }
};

export const fetchLeads = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const leads = await leadService.getAllLeads();
    res.json(leads);
  } catch (error) {
    next(error);
  }
};

export const removeLead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await leadService.deleteLead(req.params.id as string);
    res.json({ success: true, message: "Lead record deleted" });
  } catch (error) {
    next(error);
  }
};
