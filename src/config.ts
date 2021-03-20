import mongoose from "mongoose";
import { config as configEnv } from "dotenv-safe";

export async function config() {
  // configuring env variables
  configEnv({
    path: "./env/.env",
    example: "./env/.env.example",
  });

  // configuring mongodb instance
  await mongoose.connect(process.env.MONGO_URL as string);
}
