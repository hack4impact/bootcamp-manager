import { Document, model, Schema } from "mongoose";

export interface Submission extends Document {
  assignmentId: string;
  user: string;
  link: string;
  reviewed: boolean;
  submissionDate: Date;
}

const SubmissionSchema = new Schema({
  assignmentId: String,
  link: String,
  reviewed: Boolean,
  submissionDate: Date,
  user: [{ type: Schema.Types.String, ref: "User" }],
});

export const SubmissionModel = model<Submission>(
  "Submission",
  SubmissionSchema
);
