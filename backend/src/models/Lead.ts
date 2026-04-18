import mongoose, { Schema, Document } from "mongoose";

export interface ILead extends Document {
  name: string;
  email: string;
  phone: string;
  services: string[];
  message: string;
  estimate: number;
  status: "new" | "contacted" | "closed";
  createdAt: Date;
}

const LeadSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  services: { type: [String], required: true },
  message: { type: String, required: true },
  estimate: { type: Number, required: true },
  status: { type: String, default: "new" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ILead>("Lead", LeadSchema);
