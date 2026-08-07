import Link from "next/link";
import { Search, ShoppingBag, User } from "lucide-react";
import { Button } from "@/components/ui/button";

import Image from "next/image";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-24 items-center justify-between px-4 md:px-8">
        
        {/* Left Logo */}
        <div className="flex shrink-0 items-center">
          <Link href="/">
            <Image 
              src="/images/logo.png" 
              alt="Synas Handcrafted Heritage" 
              width={140} 
              height={50} 
              className="object-contain w-auto h-16"
              priority
            />
          </Link>
        </div>

        {/* Center Navigation */}
        <nav className="hidden lg:flex flex-1 justify-center items-center gap-6 xl:gap-8">
          <Link href="/products?category=indian" className="text-sm font-medium hover:text-primary/80 transition-colors whitespace-nowrap">
            Indian
          </Link>
          <Link href="/products?category=western" className="text-sm font-medium hover:text-primary/80 transition-colors whitespace-nowrap">
            Western
          </Link>
          <Link href="/products?category=bohemian" className="text-sm font-medium hover:text-primary/80 transition-colors whitespace-nowrap">
            Bohemian
          </Link>
          <Link href="/products?category=cuffs-bracelets" className="text-sm font-medium hover:text-primary/80 transition-colors whitespace-nowrap">
            Cuffs & Bracelets
          </Link>
          <Link href="/products?category=rings" className="text-sm font-medium hover:text-primary/80 transition-colors whitespace-nowrap">
            Rings
          </Link>
          <Link href="/products?category=mangtika" className="text-sm font-medium hover:text-primary/80 transition-colors whitespace-nowrap">
            Mangtika
          </Link>
          <Link href="/products?category=kamabandh" className="text-sm font-medium hover:text-primary/80 transition-colors whitespace-nowrap">
            Kamabandh
          </Link>
        </nav>

        {/* Right Icons */}
        <div className="flex items-center justify-end gap-4">
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Link href="/login">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
          </Link>
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
