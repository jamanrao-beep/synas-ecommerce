import { NextResponse } from "next/server";
import { captureOrder } from "@/lib/paypal";

export async function POST(request: Request) {
  try {
    const { orderID } = await request.json();

    if (!orderID) {
      return NextResponse.json({ error: "Invalid order ID" }, { status: 400 });
    }

    const captureData = await captureOrder(orderID);
    
    return NextResponse.json(captureData);
  } catch (error) {
    console.error("Failed to capture PayPal order:", error);
    return NextResponse.json(
      { error: "Failed to capture order" },
      { status: 500 }
    );
  }
}
