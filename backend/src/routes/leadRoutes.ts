import { Router } from "express";
import * as leadController from "../controllers/leadController";

const router = Router();

router.post("/", leadController.submitLead);
router.get("/", leadController.fetchLeads);
router.delete("/:id", leadController.removeLead);

export default router;
