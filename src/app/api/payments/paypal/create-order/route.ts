import { NextResponse } from "next/server";
import { createOrder } from "@/lib/paypal";

export async function POST(request: Request) {
  try {
    const { amount } = await request.json();

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const order = await createOrder(amount);
    
    return NextResponse.json(order);
  } catch (error) {
    console.error("Failed to create PayPal order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
