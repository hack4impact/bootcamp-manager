import { WebClient } from "@slack/web-api";
import { config as configEnv } from "dotenv-safe";
import mongoose from "mongoose";
import { setAirtableData } from "./utils/loadAirtableData";

export let slackWebClient: WebClient;

export async function config() {
  // configuring environment variables
  configEnv({
    path: "./env/.env",
    example: "./env/.env.example",
  });

  try {
    slackWebClient = new WebClient(process.env.SLACK_TOKEN);
    await slackWebClient.users.list();
  } catch (err) {
    console.error("Slack Web Client unable to connect.", err);
  }

  try {
    await setAirtableData();
  } catch (err) {
    console.error("Unable to load airtable data.", err);
  }

  // configuring dababase client
  try {
    await mongoose.connect(process.env.MONGODB_URL as string);
  } catch (err) {
    throw new Error(`MongoDB config failed: ${err}`);
  }
}
