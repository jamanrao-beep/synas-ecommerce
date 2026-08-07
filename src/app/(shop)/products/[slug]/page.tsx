import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import { ArrowLeft, Check, ShieldCheck, Truck } from "lucide-react";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const product = await prisma.product.findUnique({
    where: { slug: resolvedParams.slug },
    include: { category: true },
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 md:py-24">
      <Link href="/products" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to all products
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
        {/* Product Image */}
        <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              No image available
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-center">
          <div className="mb-2 text-sm font-medium text-muted-foreground tracking-wide uppercase">
            <Link href={`/products?category=${product.category.slug}`} className="hover:text-primary transition-colors">
              {product.category.name}
            </Link>
          </div>
          
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-light mb-8">{formatPrice(product.price / 100)}</p>
          
          <p className="text-muted-foreground mb-12 leading-relaxed">
            {product.description}
          </p>
          
          <div className="space-y-4 mb-12">
            <AddToCartButton 
              product={{
                id: product.id,
                name: product.name,
                price: product.price,
                slug: product.slug,
                image: product.images[0] || "",
              }}
            />
            
            {product.stock > 0 ? (
              <p className="text-sm text-green-600 flex items-center justify-center font-medium">
                <Check className="mr-2 h-4 w-4" /> In stock and ready to ship
              </p>
            ) : (
              <p className="text-sm text-destructive flex items-center justify-center font-medium">
                Out of stock
              </p>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-6 pt-8 border-t">
            <div className="flex items-start gap-3">
              <Truck className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold">Free Shipping</h4>
                <p className="text-xs text-muted-foreground mt-1">On all orders over $500.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold">Lifetime Warranty</h4>
                <p className="text-xs text-muted-foreground mt-1">Quality guaranteed.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}