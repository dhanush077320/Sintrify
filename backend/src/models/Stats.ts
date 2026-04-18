import mongoose, { Schema, Document } from "mongoose";

export interface IStats extends Document {
  happyClients: number;
  projectsDelivered: number;
  updatedAt: Date;
}

const StatsSchema: Schema = new Schema({
  happyClients: { type: Number, default: 35 },
  projectsDelivered: { type: Number, default: 36 },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model<IStats>("Stats", StatsSchema);
