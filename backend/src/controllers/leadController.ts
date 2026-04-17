import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import * as leadService from "../services/leadService";

const leadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  services: z.array(z.string()).min(1, "Select at least one service"),
  message: z.string().optional(),
  estimate: z.number().positive(),
});

export const submitLead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = leadSchema.parse(req.body);
    const lead = await leadService.createLead(validatedData);
    
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
