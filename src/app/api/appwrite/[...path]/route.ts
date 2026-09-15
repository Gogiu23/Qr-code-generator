import { NextRequest, NextResponse } from "next/server";

const APPWRITE_ENDPOINT =
  process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1";

// Headers salteados al reenviar la request del navegador hacia Appwrite:
// son específicos de esta conexión (host/largo) y Node los recalcula solo.
const SKIP_REQUEST_HEADERS = new Set([
  "host",
  "connection",
  "content-length",
  "accept-encoding",
]);

// Headers salteados al devolver la respuesta de Appwrite al navegador:
// vienen calculados para el body comprimido que ya decodificó fetch().
const SKIP_RESPONSE_HEADERS = new Set([
  "content-encoding",
  "content-length",
  "transfer-encoding",
  "connection",
]);

/**
 * Appwrite Cloud emite la cookie de sesión con domain=.appwrite.io, lo que la
 * vuelve una cookie de terceros para nuestro dominio y muchos navegadores la
 * bloquean (Safari, Firefox estricto, Chrome con third-party cookies
 * deshabilitadas). Al sacarle el atributo "domain", queda asociada a este
 * mismo origen y deja de ser de terceros.
 *
 * También le sacamos "expires"/"max-age" para que quede como cookie de
 * sesión del navegador: así el navegador la borra solo al cerrarse por
 * completo (no en un refresh, que preserva las cookies de sesión).
 */
function sanitizeSessionCookie(cookie: string): string {
  return cookie
    .replace(/;\s*domain=[^;]+/gi, "")
    .replace(/;\s*expires=[^;]+/gi, "")
    .replace(/;\s*max-age=[^;]+/gi, "");
}

async function proxy(req: NextRequest, path: string[]): Promise<NextResponse> {
  const upstreamUrl = `${APPWRITE_ENDPOINT}/${path.join("/")}${req.nextUrl.search}`;

  const headers = new Headers();
  req.headers.forEach((value, key) => {
    if (!SKIP_REQUEST_HEADERS.has(key.toLowerCase())) headers.set(key, value);
  });

  const hasBody = !["GET", "HEAD"].includes(req.method);

  const upstreamRes = await fetch(upstreamUrl, {
    method: req.method,
    headers,
    body: hasBody ? await req.arrayBuffer() : undefined,
    redirect: "manual",
  });

  const resHeaders = new Headers();
  upstreamRes.headers.forEach((value, key) => {
    if (key.toLowerCase() === "set-cookie") return;
    if (SKIP_RESPONSE_HEADERS.has(key.toLowerCase())) return;
    resHeaders.set(key, value);
  });

  const setCookies =
    typeof upstreamRes.headers.getSetCookie === "function"
      ? upstreamRes.headers.getSetCookie()
      : upstreamRes.headers.get("set-cookie")
        ? [upstreamRes.headers.get("set-cookie") as string]
        : [];

  for (const cookie of setCookies) {
    resHeaders.append("set-cookie", sanitizeSessionCookie(cookie));
  }

  // Las respuestas 204/205/304 no pueden llevar body: el constructor de
  // Response tira si les pasás uno, aunque esté vacío (ej. al cerrar sesión).
  const isNullBodyStatus = [204, 205, 304].includes(upstreamRes.status);
  const body = isNullBodyStatus ? null : await upstreamRes.arrayBuffer();

  return new NextResponse(body, {
    status: upstreamRes.status,
    headers: resHeaders,
  });
}

interface RouteParams {
  params: Promise<{ path: string[] }>;
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  return proxy(req, (await params).path);
}
export async function POST(req: NextRequest, { params }: RouteParams) {
  return proxy(req, (await params).path);
}
export async function PUT(req: NextRequest, { params }: RouteParams) {
  return proxy(req, (await params).path);
}
export async function PATCH(req: NextRequest, { params }: RouteParams) {
  return proxy(req, (await params).path);
}
export async function DELETE(req: NextRequest, { params }: RouteParams) {
  return proxy(req, (await params).path);
}
