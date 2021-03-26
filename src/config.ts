import { WebClient } from "@slack/web-api";
import mongoose from "mongoose";
import { setAirtableData } from "./utils/loadAirtableData";

export let slackWebClient: WebClient;

export async function config() {
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
