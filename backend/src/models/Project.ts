import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  caption: string;
  fileUrl: string;
  fileType: string;
  createdAt: Date;
}

const ProjectSchema: Schema = new Schema({
  title: { type: String, required: true },
  caption: { type: String, default: "" },
  fileUrl: { type: String, required: true },
  fileType: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IProject>("Project", ProjectSchema);
