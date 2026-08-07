import Link from "next/link";
import { Search, ShoppingBag, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-8">
        {/* Left Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/products" className="text-sm font-medium hover:text-primary/80 transition-colors">
            Collections
          </Link>
          <Link href="/products?category=rings" className="text-sm font-medium hover:text-primary/80 transition-colors">
            Rings
          </Link>
          <Link href="/products?category=necklaces" className="text-sm font-medium hover:text-primary/80 transition-colors">
            Necklaces
          </Link>
        </nav>

        {/* Center Logo */}
        <div className="flex-1 md:flex-none text-center">
          <Link href="/" className="font-serif text-3xl font-bold tracking-tight">
            SYNAS
          </Link>
        </div>

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
