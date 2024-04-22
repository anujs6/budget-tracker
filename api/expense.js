import { ListTablesCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  UpdateCommand,
  PutCommand,
  DynamoDBDocumentClient,
  ScanCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import crypto from "crypto";

const client = new DynamoDBClient({ region: "us-east-1" });
const docClient = DynamoDBDocumentClient.from(client);

export const fetchExpenses = async () => {
  const command = new ScanCommand({
    ProjectionExpression: "id, amount, category, description",
    TableName: "Expenses",
  });

  const response = await docClient.send(command);

  return response;
};

export const createExpenses = async ({ amount, category, description }) => {
  const uuid = crypto.randomUUID();
  const command = new PutCommand({
    TableName: "Expenses",
    Item: {
      id: uuid,
      amount,
      category,
      description,
    },
  });

  const response = await docClient.send(command);

  return response;
};

export const updateExpenses = async ({ id, amount, category, description }) => {
  const command = new UpdateCommand({
    TableName: "Expenses",
    Key: { id },
    UpdateExpression: "set amount = :a, category = :c, description: :d",
    ExpressionAttributeValues: {
      ":a": amount,
      ":c": category,
      ":d": description,
    },
    ReturnValues: "ALL_NEW",
  });

  const response = await docClient.send(command);

  return response;
};

export const deleteExpenses = async (id) => {
  const command = new DeleteCommand({
    TableName: "Expenses",
    Key: {
      id,
    },
  });

  const response = await docClient.send(command);

  return response;
};
