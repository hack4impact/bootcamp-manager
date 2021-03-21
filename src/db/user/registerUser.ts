import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import {
  tableProperties,
  Table,
  validatePrimaryKeys,
} from "../../../constants/tablesProperties";
import User from "../../../types/user";
import { dbClient } from "../../config";
import { convertObjectToDynamoFormat as convertItemToDynamoFormat } from "../objectToDynamoFormat";

export default async function (user: User) {
  if (!validatePrimaryKeys(tableProperties.usersTable as Table, user)) {
    throw new Error(
      `Primary keys not found for table ${tableProperties.usersTable.name}. Object value: ${user}`
    );
  }
  const dynamoDBObject = convertItemToDynamoFormat(user);
  await dbClient.send(
    new PutItemCommand({
      Item: dynamoDBObject,
      TableName: tableProperties.usersTable.name,
    })
  );
}
