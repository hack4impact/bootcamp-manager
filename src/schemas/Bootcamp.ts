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
  name: String,
  end: Date,
});

export const SubmissionModel = model<Bootcamp>("Bootcamp", BootcampSchema);
