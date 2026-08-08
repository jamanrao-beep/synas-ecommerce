"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/store/useCart";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, ShieldCheck } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getCartTotal } = useCart();
  const total = getCartTotal();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 flex flex-col items-center text-center">
        <div className="bg-muted w-24 h-24 rounded-full flex items-center justify-center mb-8">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="font-serif text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-muted-foreground max-w-md mb-8">
          Looks like you haven&apos;t added anything to your cart yet. Discover our collection of fine jewelry.
        </p>
        <Button asChild size="lg" className="rounded-full px-8">
          <Link href="/products">Shop New Arrivals</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 md:py-24">
      <h1 className="font-serif text-3xl md:text-4xl font-bold mb-12">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
        {/* Cart Items List */}
        <div className="flex-1 space-y-8">
          {items.map((item) => (
            <div key={item.id} className="flex gap-6 py-6 border-b border-border/60">
              <Link href={`/products/${item.slug}`} className="relative h-32 w-24 sm:h-40 sm:w-32 bg-gray-50 rounded-md overflow-hidden shrink-0">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 text-xs text-muted-foreground">No image</div>
                )}
              </Link>

              <div className="flex flex-col flex-1 justify-between">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <Link href={`/products/${item.slug}`} className="font-serif text-lg sm:text-xl font-medium hover:text-primary transition-colors">
                      {item.name}
                    </Link>
                    <p className="text-muted-foreground text-sm mt-1">{formatPrice(item.price / 100)}</p>
                  </div>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors p-2 -mr-2"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex justify-between items-end mt-4">
                  <div className="flex items-center border border-input rounded-md overflow-hidden">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 hover:bg-muted transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 hover:bg-muted transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="font-medium">{formatPrice((item.price * item.quantity) / 100)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-[400px] shrink-0">
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 sticky top-28 border border-gray-100">
            <h2 className="font-serif text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4 text-sm mb-6">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>{formatPrice(total / 100)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Taxes</span>
                <span>Calculated at checkout</span>
              </div>
            </div>
            
            <div className="border-t border-border pt-4 mb-8">
              <div className="flex justify-between items-end">
                <span className="font-semibold text-lg">Estimated Total</span>
                <span className="font-serif text-2xl font-bold">{formatPrice(total / 100)}</span>
              </div>
            </div>

            <Button asChild size="lg" className="w-full h-14 rounded-full text-base">
              <Link href="/checkout">
                Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4" /> Secure checkout powered by PayPal
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}