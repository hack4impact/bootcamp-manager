import { Schema, model, Document } from "mongoose";

export interface User extends Document {
  _id: string;
  name: string;
  chapterName: string;
  chapterId: string;
}

const UserSchema = new Schema({
  _id: String,
  name: String,
  chapterName: String,
  chapterId: String,
});

export const UserModel = model<User>("User", UserSchema);
