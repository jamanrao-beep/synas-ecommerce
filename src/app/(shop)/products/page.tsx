import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const resolvedParams = await searchParams;
  const categoryFilter = resolvedParams.category;
  const searchQuery = resolvedParams.q;

  // Build the query
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {};
  if (categoryFilter) {
    where.category = { slug: categoryFilter };
  }
  if (searchQuery) {
    where.name = { contains: searchQuery, mode: "insensitive" };
  }

  const products = await prisma.product.findMany({
    where,
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  const categories = await prisma.category.findMany();

  return (
    <div className="container mx-auto px-4 md:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h1 className="font-serif text-3xl md:text-4xl font-bold">
          {categoryFilter 
            ? categories.find(c => c.slug === categoryFilter)?.name || "Collection"
            : searchQuery 
            ? `Search: ${searchQuery}`
            : "All Jewelry"}
        </h1>
        
        {/* Simple Search Form */}
        <form className="flex gap-2" action="/products" method="GET">
          <input 
            type="text" 
            name="q"
            defaultValue={searchQuery}
            placeholder="Search products..." 
            className="flex h-9 w-full md:w-64 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
          <Button type="submit">Search</Button>
        </form>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-48 shrink-0">
          <h3 className="font-semibold mb-4">Categories</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link 
                href="/products" 
                className={`hover:text-primary transition-colors ${!categoryFilter ? 'font-medium text-primary' : 'text-muted-foreground'}`}
              >
                All
              </Link>
            </li>
            {categories.map(category => (
              <li key={category.id}>
                <Link 
                  href={`/products?category=${category.slug}`}
                  className={`hover:text-primary transition-colors ${categoryFilter === category.slug ? 'font-medium text-primary' : 'text-muted-foreground'}`}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {products.length === 0 ? (
            <div className="text-center py-24 text-muted-foreground">
              No products found. Try adjusting your filters.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <Link key={product.id} href={`/products/${product.slug}`} className="group flex flex-col">
                  <div className="relative aspect-square mb-4 bg-gray-50 overflow-hidden rounded-md">
                    {product.images[0] && (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <h3 className="font-serif text-lg">{product.name}</h3>
                  <p className="text-muted-foreground text-sm mb-1">{product.category.name}</p>
                  <p className="font-medium mt-auto pt-2">{formatPrice(product.price / 100)}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}