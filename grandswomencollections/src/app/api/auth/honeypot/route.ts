import { NextResponse } from "next/server";

export async function POST() {
  // Production decoy routes are mapped by Cloudflare to the isolated honeypot project.
  return new NextResponse("Not found", { status: 404, headers: { "Cache-Control": "no-store" } });
}
