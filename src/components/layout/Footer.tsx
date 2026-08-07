import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-muted/20">
      <div className="container mx-auto px-4 py-16 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <Link href="/" className="font-serif text-2xl font-bold tracking-tight mb-4 inline-block">
              SYNAS
            </Link>
            <p className="text-sm text-muted-foreground mt-2 max-w-xs">
              Curated fine jewelry for the modern aesthetic. Crafted with precision, worn with elegance.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/products" className="hover:text-primary transition-colors">All Jewelry</Link></li>
              <li><Link href="/products?category=rings" className="hover:text-primary transition-colors">Rings</Link></li>
              <li><Link href="/products?category=necklaces" className="hover:text-primary transition-colors">Necklaces</Link></li>
              <li><Link href="/products?category=earrings" className="hover:text-primary transition-colors">Earrings</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="/shipping" className="hover:text-primary transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
              <button type="submit" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Synas E-Commerce. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
