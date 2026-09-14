import { Client, Account, TablesDB } from "appwrite";

const client = new Client();

const endpoint =
  process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1";
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "";

client.setEndpoint(endpoint).setProject(projectId);

export const account = new Account(client);
export const tablesDB = new TablesDB(client);
export const APPWRITE_DATABASE_ID =
  process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "";
export const APPWRITE_TABLE_ID =
  process.env.NEXT_PUBLIC_APPWRITE_TABLE_ID || "";
export { client };
