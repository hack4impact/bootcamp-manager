import { Document, model, Schema } from "mongoose";

export interface Bootcamp extends Document {
  chapterId: string;
  start: Date;
  name: string;
  end?: Date;
}

const BootcampSchema = new Schema({
  chapterId: String,
  start: Date,
  end: Date,
  name: String,
});

export const SubmissionModel = model<Bootcamp>("Bootcamp", BootcampSchema);
