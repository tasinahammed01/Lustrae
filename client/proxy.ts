import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isDev = process.env.NODE_ENV === "development";
const API_HOST = isDev ? "http://localhost:5000" : process.env.API_HOST || "http://localhost:5000";

export const config = {
  matcher: ["/api/:path*"],
};

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const target = new URL(`${pathname.replace("/api", "/api")}${search}`, API_HOST);
  const proxyRequest = new Request(target, request);
  return fetch(proxyRequest);
}
