import { prisma } from '../src/lib/prisma'

async function main() {
  console.log('Seeding database...')

  // Clear existing data
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  const categoriesData = [
    { name: 'Indian', slug: 'indian' },
    { name: 'Western', slug: 'western' },
    { name: 'Bohemian', slug: 'bohemian' },
    { name: 'Cuffs & Bracelets', slug: 'cuffs-bracelets' },
    { name: 'Rings', slug: 'rings' },
    { name: 'Mangtika', slug: 'mangtika' },
    { name: 'Kamabandh', slug: 'kamabandh' },
  ]

  const createdCategories: Record<string, unknown> = {}

  for (const cat of categoriesData) {
    createdCategories[cat.slug] = await prisma.category.create({ data: cat })
  }

  console.log('Categories created.')

  // Create Products
  const products = [
    {
      name: 'Kundan Bridal Mangtika',
      slug: 'kundan-bridal-mangtika',
      description: 'A traditional Indian Kundan Mangtika, perfect for weddings and festive occasions.',
      price: 45000, 
      images: ['/images/ring.png'], // using placeholders
      stock: 15,
      categoryId: createdCategories['mangtika'].id,
    },
    {
      name: 'Gold Plated Kamabandh',
      slug: 'gold-plated-kamabandh',
      description: 'An intricately designed gold-plated Kamabandh to accentuate your traditional Indian attire.',
      price: 85000, 
      images: ['/images/necklace.png'],
      stock: 10,
      categoryId: createdCategories['kamabandh'].id,
    },
    {
      name: 'Boho Silver Oxidized Cuff',
      slug: 'boho-silver-oxidized-cuff',
      description: 'A chunky, oxidized silver cuff bracelet with tribal motifs.',
      price: 32000, 
      images: ['/images/earrings.png'],
      stock: 22,
      categoryId: createdCategories['bohemian'].id,
    },
    {
      name: 'Minimalist Diamond Ring',
      slug: 'minimalist-diamond-ring',
      description: 'A sleek, Western-style solitaire diamond ring set in white gold.',
      price: 120000, 
      images: ['/images/ring.png'],
      stock: 8,
      categoryId: createdCategories['western'].id,
    },
    {
      name: 'Traditional Polki Set',
      slug: 'traditional-polki-set',
      description: 'A heavy Indian Polki necklace set with matching earrings.',
      price: 245000, 
      images: ['/images/necklace.png'],
      stock: 5,
      categoryId: createdCategories['indian'].id,
    },
    {
      name: 'Diamond Tennis Bracelet',
      slug: 'diamond-tennis-bracelet',
      description: 'A classic Western tennis bracelet featuring brilliant cut diamonds.',
      price: 185000, 
      images: ['/images/ring.png'],
      stock: 12,
      categoryId: createdCategories['cuffs-bracelets'].id,
    },
    {
      name: 'Vintage Emerald Ring',
      slug: 'vintage-emerald-ring',
      description: 'A timeless vintage ring with a stunning emerald center stone.',
      price: 155000,
      images: ['/images/ring.png'],
      stock: 7,
      categoryId: createdCategories['rings'].id,
    }
  ]

  for (const p of products) {
    await prisma.product.create({
      data: p
    })
  }

  console.log('Products created.')
  console.log('Seeding completed successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
