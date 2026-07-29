import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const HONEYPOT_PATHS = ["/admin-login", "/api/private", "/api/internal/auth"];

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  response.headers.set("X-Grand-Security", "active");
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  response.headers.set("Cross-Origin-Resource-Policy", "same-site");

  if (HONEYPOT_PATHS.includes(request.nextUrl.pathname)) {
    response.headers.set("X-Honeypot-Triggered", "1");
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
