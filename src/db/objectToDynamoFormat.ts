export function convertObjectToDynamoFormat(object: Record<string, any>) {
  const dynamoObject: Record<string, any> = {};
  for (const key of Object.keys(object)) {
    const dynamoKeyType = getDynamoKeyType(object[key]);
    dynamoObject[key] = {};
    dynamoObject[key][`${dynamoKeyType}`] = object[key];
  }
  return dynamoObject;
}

export function getDynamoKeyType(item: any) {
  let keyType: string;
  switch (typeof item) {
    case "string":
      keyType = "S";
      break;
    case "number":
      keyType = "N";
      break;
    default:
      throw new Error(`Unable to find key type of item with value : ${item}`);
  }
  return keyType;
}
