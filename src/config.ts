import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { config as configEnv } from "dotenv-safe";

export let dbClient: DynamoDB;

export async function config() {
  // configuring environment variables
  configEnv({
    path: "./env/.env",
    example: "./env/.env.example",
  });

  // configuring dababase client
  try {
    dbClient = new DynamoDB({
      endpoint: process.env.DYNAMODB_ENDPOINT || undefined,
      region: process.env.DYNAMODB_REGION,
    });
    await configureDatabase(dbClient);
  } catch (err) {
    throw new Error(
      `DynamoDB config failed: ${err} \nIf using a local DynamoDB instance, please add or check the DYNAMODB_ENPOINT environment variable in the .env file.`
    );
  }
}

async function configureDatabase(dbClient: DynamoDB) {
  await dbClient.listTables({});
}
