import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getRazorpayClient } from "@/lib/payments";

const schema = z.object({
  amount: z.number().positive()
});

export async function POST(request: NextRequest) {
  const { amount } = schema.parse(await request.json());
  const client = getRazorpayClient();

  if (!client) {
    return NextResponse.json({
      mock: true,
      orderId: `mock_order_${Date.now()}`,
      amount
    });
  }

  const order = await client.orders.create({
    amount: amount * 100,
    currency: "INR",
    receipt: `receipt_${Date.now()}`
  });

  return NextResponse.json(order);
}
