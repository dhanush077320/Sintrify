import { Request, Response, NextFunction } from "express";
import Stats from "../models/Stats";

export const getStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let stats = await Stats.findOne();
    if (!stats) {
      // Create default if none exists
      stats = await Stats.create({ happyClients: 35, projectsDelivered: 36 });
    }
    res.json(stats);
  } catch (error) {
    next(error);
  }
};

export const updateStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { happyClients, projectsDelivered } = req.body;
    let stats = await Stats.findOne();
    
    if (stats) {
      stats.happyClients = happyClients;
      stats.projectsDelivered = projectsDelivered;
      stats.updatedAt = new Date();
      await stats.save();
    } else {
      stats = await Stats.create({ happyClients, projectsDelivered });
    }
    
    res.json(stats);
  } catch (error) {
    next(error);
  }
};
