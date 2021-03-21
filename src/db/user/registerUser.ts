import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import {
  tableProperties,
  Table,
  validatePrimaryKeys,
} from "../../../constants/tablesProperties";
import User from "../../../types/user";
import { dbClient } from "../../config";
import { convertObjectToAttributeValues } from "../dynamoFormat";

export default async function (user: User) {
  if (!validatePrimaryKeys(tableProperties.usersTable as Table, user)) {
    throw new Error(
      `Primary keys not found for table ${tableProperties.usersTable.name}. Object value: ${user}`
    );
  }
  const dynamoDBObject = convertObjectToAttributeValues(user);
  await dbClient.send(
    new PutItemCommand({
      Item: dynamoDBObject,
      TableName: tableProperties.usersTable.name,
    })
  );
}
