import {
  CreateTableCommand,
  CreateTableInput,
  DynamoDBClient,
  ListTablesCommand,
} from "@aws-sdk/client-dynamodb";
import { config as configEnv } from "dotenv-safe";
import {
  createTableInput,
  tableProperties,
} from "../constants/tablesProperties";

export let dbClient: DynamoDBClient;

export async function config() {
  // configuring environment variables
  configEnv({
    path: "./env/.env",
    example: "./env/.env.example",
  });

  // configuring dababase client
  try {
    dbClient = new DynamoDBClient({
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

async function configureDatabase(dbClient: DynamoDBClient) {
  const dbTables = await dbClient.send(new ListTablesCommand({}));
  for (const tableKey in tableProperties) {
    const table = tableProperties[tableKey];
    if (!dbTables.TableNames?.includes(table.name)) {
      console.log(`Table "${table.name}" not found. Creating Table.`);
      await dbClient.send(
        new CreateTableCommand(
          createTableInput(tableProperties[tableKey]) as CreateTableInput
        )
      );
      console.log(`Table "${tableKey}" created.`);
    }
  }
}
