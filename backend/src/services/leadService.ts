import Lead, { ILead } from "../models/Lead";

export const createLead = async (leadData: Partial<ILead>) => {
  const lead = new Lead(leadData);
  return await lead.save();
};

export const getAllLeads = async () => {
  return await Lead.find().sort({ createdAt: -1 });
};
