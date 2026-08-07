"use client";

import { useState } from "react";
import { useCart } from "@/lib/store/useCart";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getCartTotal, clearCart } = useCart();
  const total = getCartTotal();
  const [loading, setLoading] = useState(false);

  // In a real app, you would use Stripe Elements here.
  // For now, we simulate a checkout process.
  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call to create PaymentIntent
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Simulate successful payment
      clearCart();
      router.push("/orders"); // Or a success page
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
          <form onSubmit={handleCheckout} className="space-y-8">
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
              <div className="p-4 bg-muted/50 rounded-md border flex items-center justify-center text-sm text-muted-foreground">
                <Lock className="mr-2 h-4 w-4" />
                Stripe integration will go here
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full h-14 rounded-full text-base" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {loading ? "Processing..." : `Pay ${formatPrice(total / 100)}`}
            </Button>
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