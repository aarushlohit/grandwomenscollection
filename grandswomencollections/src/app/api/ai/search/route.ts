import { NextRequest, NextResponse } from "next/server";
import { products } from "@/lib/data/catalog";
import { searchProducts } from "@/lib/search";

export async function POST(request: NextRequest) {
  const { query } = (await request.json()) as { query: string };
  const results = searchProducts(products, query).slice(0, 6);
  return NextResponse.json({ results });
}
