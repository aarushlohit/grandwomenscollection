import { NextResponse } from "next/server";
import { products } from "@/lib/data/catalog";

export async function POST() {
  return NextResponse.json({
    extracted: {
      category: "occasionwear",
      color: "Black",
      occasion: "party"
    },
    results: products.slice(0, 2)
  });
}
