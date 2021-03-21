import {
  AttributeDefinition,
  AttributeValue,
  CreateTableInput,
  KeySchemaElement,
} from "@aws-sdk/client-dynamodb";
import { getDynamoKeyType } from "../src/db/dynamoFormat";

export interface Table {
  name: string;
  primaryKeys: AttributeDefinition[];
}

export const tableProperties: Record<string, Table> = {
  usersTable: {
    name: "Users",
    primaryKeys: [
      {
        AttributeName: "SLACK_ID",
        AttributeType: "S",
      },
    ],
  },
};

// Creates object required to create the table in dynamoDB
export function createTableInput(table: Table): CreateTableInput | undefined {
  return {
    TableName: table.name,
    AttributeDefinitions: table.primaryKeys,
    KeySchema: table.primaryKeys.map(({ AttributeName }) => {
      const schema: KeySchemaElement = {
        AttributeName,
        KeyType: "HASH",
      };
      return schema;
    }),
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
    StreamSpecification: {
      StreamEnabled: false,
    },
  };
}

// Returns primary key objects in DynamoDB format given primary key values and the table name
// Throws error if it cannot find a primary key value
export function CompilePrimaryKeyObjects(
  table: Table,
  values: Record<string, any>
): { [key: string]: AttributeValue } | undefined {
  if (!validatePrimaryKeys(table, values)) return undefined;
  const keys: Record<string, any> = {};
  table.primaryKeys.forEach(({ AttributeName, AttributeType }) => {
    if (!values[AttributeName as string])
      throw new Error(
        `Incorrect object used for table ${table.name}. Object value: ${values}.`
      );
    keys[AttributeName as string] = {};
    keys[AttributeName as string][AttributeType as string] =
      values[AttributeName as string];
  });
  return keys;
}

export function validatePrimaryKeys(
  table: Table,
  values: Record<string, any>
): boolean {
  table.primaryKeys.forEach(({ AttributeName, AttributeType }) => {
    if (
      !values[`${AttributeName}`] ||
      getDynamoKeyType(values[`${AttributeName}`]) !== AttributeType
    ) {
      return false;
    }
  });
  return true;
}

export const TableNames = Object.values(tableProperties).map(
  (table) => table.name
);
