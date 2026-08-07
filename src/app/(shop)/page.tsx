import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ShopHome() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full bg-[#f8f8f8] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-clean.png"
            alt="Elegant diamond jewelry collection"
            fill
            sizes="100vw"
            className="object-cover object-right md:object-center opacity-90"
            priority
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 md:px-8">
          <div className="max-w-xl space-y-6 bg-white/40 backdrop-blur-md p-8 md:p-12 rounded-2xl shadow-sm border border-white/20">
            <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight tracking-tight text-gray-900">
              Timeless Elegance
            </h1>
            <p className="text-lg md:text-xl text-gray-800 max-w-md font-sans font-medium">
              Discover our new collection of ethically sourced, handcrafted fine jewelry designed for the modern romantic.
            </p>
            <div className="pt-4">
              <Button asChild size="lg" className="rounded-full px-8 bg-gray-900 text-white hover:bg-gray-800">
                <Link href="/products">
                  Shop the Collection <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="border-b bg-white py-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x">
            <div className="flex flex-col items-center justify-center p-4">
              <Truck className="h-8 w-8 mb-4 text-gray-400 stroke-[1.5]" />
              <h3 className="font-semibold font-serif text-lg">Complimentary Shipping</h3>
              <p className="text-sm text-gray-500 mt-2">On all orders over $500 worldwide.</p>
            </div>
            <div className="flex flex-col items-center justify-center p-4">
              <ShieldCheck className="h-8 w-8 mb-4 text-gray-400 stroke-[1.5]" />
              <h3 className="font-semibold font-serif text-lg">Lifetime Warranty</h3>
              <p className="text-sm text-gray-500 mt-2">Guaranteed quality and craftsmanship.</p>
            </div>
            <div className="flex flex-col items-center justify-center p-4">
              <Clock className="h-8 w-8 mb-4 text-gray-400 stroke-[1.5]" />
              <h3 className="font-semibold font-serif text-lg">30-Day Returns</h3>
              <p className="text-sm text-gray-500 mt-2">Hassle-free returns and exchanges.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 bg-[#fafafa]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
            <div className="h-px w-16 bg-black mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/products?category=rings" className="group relative h-[400px] overflow-hidden bg-gray-100 flex items-center justify-center">
              <Image
                src="/images/ring.png"
                alt="Rings"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/20" />
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-8 py-3 text-center transition-transform duration-500 group-hover:-translate-y-2">
                <h3 className="font-serif text-xl font-semibold">Rings</h3>
              </div>
            </Link>
            
            <Link href="/products?category=necklaces" className="group relative h-[400px] overflow-hidden bg-gray-100 flex items-center justify-center">
              <Image
                src="/images/necklace.png"
                alt="Necklaces"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/20" />
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-8 py-3 text-center transition-transform duration-500 group-hover:-translate-y-2">
                <h3 className="font-serif text-xl font-semibold">Necklaces</h3>
              </div>
            </Link>

            <Link href="/products?category=earrings" className="group relative h-[400px] overflow-hidden bg-gray-100 flex items-center justify-center">
              <Image
                src="/images/earrings.png"
                alt="Earrings"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/20" />
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-8 py-3 text-center transition-transform duration-500 group-hover:-translate-y-2">
                <h3 className="font-serif text-xl font-semibold">Earrings</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">New Arrivals</h2>
              <div className="h-px w-16 bg-black"></div>
            </div>
            <Link href="/products" className="text-sm font-medium hover:underline underline-offset-4 hidden md:block">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* We will map over actual products here later, for now placeholders */}
            {[
              { id: 1, name: "Solitaire Diamond Ring", price: "$2,450", image: "/images/ring.png" },
              { id: 2, name: "Classic Gold Chain", price: "$850", image: "/images/necklace.png" },
              { id: 3, name: "Pearl Drop Earrings", price: "$1,200", image: "/images/earrings.png" },
              { id: 4, name: "Eternity Band", price: "$1,850", image: "/images/ring.png" }
            ].map((product) => (
              <Link key={product.id} href={`/products/${product.id}`} className="group flex flex-col">
                <div className="relative aspect-square mb-4 bg-gray-50 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-serif text-lg">{product.name}</h3>
                <p className="text-gray-500 mt-1 font-light">{product.price}</p>
              </Link>
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
            <Button variant="outline" asChild className="w-full">
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}