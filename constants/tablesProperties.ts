import { CreateTableInput } from "@aws-sdk/client-dynamodb";

const tableProperties: CreateTableInput[] = [
  {
    TableName: "Users",
    AttributeDefinitions: [
      {
        AttributeName: "SLACK_ID",
        AttributeType: "S",
      },
    ],
    KeySchema: [
      {
        AttributeName: "SLACK_ID",
        KeyType: "HASH",
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
    StreamSpecification: {
      StreamEnabled: false,
    },
  },
];

export function GetTable(tableName: string) {
  return tableProperties.find((table) => table.TableName === tableName);
}

export const TableNames = tableProperties.map((table) => table.TableName);
