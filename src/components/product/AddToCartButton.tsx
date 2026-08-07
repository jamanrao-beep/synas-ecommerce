"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/store/useCart";
import { Check, ShoppingBag } from "lucide-react";

export function AddToCartButton({ 
  product 
}: { 
  product: { id: string; name: string; price: number; slug: string; image: string } 
}) {
  const addItem = useCart((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      slug: product.slug,
      image: product.image,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Button 
      size="lg" 
      className="w-full text-base h-14 rounded-full transition-all duration-300" 
      onClick={handleAdd}
      variant={added ? "secondary" : "default"}
    >
      {added ? (
        <>
          <Check className="mr-2 h-5 w-5" /> Added to Cart
        </>
      ) : (
        <>
          <ShoppingBag className="mr-2 h-5 w-5" /> Add to Cart
        </>
      )}
    </Button>
  );
}
