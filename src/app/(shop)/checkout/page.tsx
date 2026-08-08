"use client";

import { useState } from "react";
import { useCart } from "@/lib/store/useCart";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getCartTotal, clearCart } = useCart();
  const total = getCartTotal();
  
  // Need to provide NEXT_PUBLIC_PAYPAL_CLIENT_ID in env
  const initialOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test",
    currency: "USD",
    intent: "capture",
  };

  const createOrder = async () => {
    try {
      const response = await fetch("/api/payments/paypal/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total / 100 }),
      });
      const orderData = await response.json();

      if (orderData.id) {
        return orderData.id;
      } else {
        const errorDetail = orderData?.details?.[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          : JSON.stringify(orderData);
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Failed to create order:", error);
      throw error;
    }
  };

  const onApprove = async (data: any, actions: any) => {
    try {
      const response = await fetch("/api/payments/paypal/capture-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderID: data.orderID }),
      });
      const orderData = await response.json();
      const errorDetail = orderData?.details?.[0];

      if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
        return actions.restart();
      } else if (errorDetail) {
        throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
      } else if (!orderData.purchase_units) {
        throw new Error(JSON.stringify(orderData));
      } else {
        const transaction =
          orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
          orderData?.purchase_units?.[0]?.payments?.authorizations?.[0];
        
        console.log("Capture result", orderData, JSON.stringify(orderData, null, 2));
        
        // Handle successful payment
        clearCart();
        alert(`Transaction ${transaction.status}: ${transaction.id}`);
        router.push("/");
      }
    } catch (error) {
      console.error(error);
      alert("Sorry, your transaction could not be processed.");
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="font-serif text-3xl font-bold mb-4">Checkout</h1>
        <p className="text-muted-foreground mb-8">Your cart is empty.</p>
        <Button onClick={() => router.push("/products")}>Continue Shopping</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 md:py-24">
      <h1 className="font-serif text-3xl md:text-4xl font-bold mb-12">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
        {/* Checkout Form */}
        <div className="flex-1">
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold border-b pb-2">Shipping Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input id="zip" required />
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <h2 className="text-xl font-semibold border-b pb-2">Payment Details</h2>
              <div className="rounded-md border p-4 bg-white relative z-0">
                <PayPalScriptProvider options={initialOptions}>
                  <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                    style={{ layout: "vertical", shape: "rect", color: "black" }}
                  />
                </PayPalScriptProvider>
              </div>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-[400px] shrink-0">
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 sticky top-28 border border-gray-100">
            <h2 className="font-serif text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
              {items.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.name} x {item.quantity}</span>
                  <span>{formatPrice((item.price * item.quantity) / 100)}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-border pt-4 mb-4">
              <div className="flex justify-between items-end">
                <span className="font-semibold">Total</span>
                <span className="font-serif text-xl font-bold">{formatPrice(total / 100)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}