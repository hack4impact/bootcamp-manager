import { config as configEnv } from "dotenv-safe";
import { mongoose } from "@typegoose/typegoose";

export async function config() {
  // configuring environment variables
  configEnv({
    path: "./env/.env",
    example: "./env/.env.example",
  });

  // configuring dababase client
  try {
    await mongoose.connect(process.env.MONGODB_URL as string);
  } catch (err) {
    throw new Error(`MongoDB config failed: ${err}`);
  }
}
