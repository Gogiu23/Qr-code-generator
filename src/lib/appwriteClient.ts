import { Client, Account, TablesDB, Storage } from "appwrite";

const client = new Client();

// Las llamadas del navegador van a /api/appwrite (mismo origen), que las reenvía
// a Appwrite Cloud. Así la cookie de sesión queda en nuestro dominio en vez del
// de Appwrite, evitando que el navegador la bloquee por ser "de terceros".
// El SDK arma sus URLs con `new URL(endpoint + path)`, así que necesita una URL
// absoluta: la resolvemos contra el origin actual del navegador. Del lado del
// servidor (prerender/build) no hay `window`; como ahí nunca se llega a usar
// este cliente para pedidos reales, alcanza con cualquier URL absoluta válida.
const endpoint =
  typeof window !== "undefined"
    ? `${window.location.origin}/api/appwrite`
    : "http://localhost/api/appwrite";
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "";

client.setEndpoint(endpoint).setProject(projectId);

export const account = new Account(client);
export const tablesDB = new TablesDB(client);
export const storage = new Storage(client);
export const APPWRITE_DATABASE_ID =
  process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "";
export const APPWRITE_TABLE_ID =
  process.env.NEXT_PUBLIC_APPWRITE_TABLE_ID || "";
export const APPWRITE_AVATARS_BUCKET_ID =
  process.env.NEXT_PUBLIC_APPWRITE_AVATARS_BUCKET_ID || "avatars";
export { client };
