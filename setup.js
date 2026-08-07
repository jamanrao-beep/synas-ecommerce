/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const dirs = [
  'prisma',
  'src/app/(shop)/products/[slug]',
  'src/app/(shop)/cart',
  'src/app/(shop)/checkout',
  'src/app/(shop)/orders/[id]',
  'src/app/(auth)/login',
  'src/app/(auth)/signup',
  'src/app/admin/products',
  'src/app/admin/orders',
  'src/app/admin/coupons',
  'src/app/api/auth/[...nextauth]',
  'src/app/api/products/[slug]',
  'src/app/api/cart',
  'src/app/api/orders',
  'src/app/api/coupons',
  'src/app/api/payments/create-intent',
  'src/app/api/payments/webhook',
  'src/app/api/admin',
  'src/components/layout',
  'src/components/product',
  'src/components/cart',
  'src/components/checkout',
  'src/components/ui',
  'src/lib',
  'src/hooks',
  'src/store'
];

dirs.forEach(d => {
  fs.mkdirSync(path.join(__dirname, d), { recursive: true });
});

const files = {
  'prisma/schema.prisma': `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
}`,
  'src/app/(shop)/page.tsx': 'export default function ShopHome() { return <div>Shop Home</div>; }',
  'src/app/(shop)/products/page.tsx': 'export default function ProductsPage() { return <div>Products</div>; }',
  'src/app/(shop)/products/[slug]/page.tsx': 'export default function ProductPage() { return <div>Product Detail</div>; }',
  'src/app/(shop)/cart/page.tsx': 'export default function CartPage() { return <div>Cart</div>; }',
  'src/app/(shop)/checkout/page.tsx': 'export default function CheckoutPage() { return <div>Checkout</div>; }',
  'src/app/(shop)/orders/page.tsx': 'export default function OrdersPage() { return <div>Orders</div>; }',
  'src/app/(shop)/orders/[id]/page.tsx': 'export default function OrderPage() { return <div>Order Detail</div>; }',
  'src/app/(auth)/login/page.tsx': 'export default function LoginPage() { return <div>Login</div>; }',
  'src/app/(auth)/signup/page.tsx': 'export default function SignupPage() { return <div>Signup</div>; }',
  'src/app/admin/page.tsx': 'export default function AdminDashboard() { return <div>Admin Dashboard</div>; }',
  'src/app/admin/products/page.tsx': 'export default function AdminProducts() { return <div>Manage Products</div>; }',
  'src/app/admin/orders/page.tsx': 'export default function AdminOrders() { return <div>Manage Orders</div>; }',
  'src/app/admin/coupons/page.tsx': 'export default function AdminCoupons() { return <div>Manage Coupons</div>; }',
  'src/app/api/auth/[...nextauth]/route.ts': 'export { GET, POST } from "@/lib/auth";',
  'src/app/api/products/route.ts': 'export async function GET() { return Response.json([]); }\nexport async function POST() { return Response.json({}); }',
  'src/app/api/products/[slug]/route.ts': 'export async function GET() { return Response.json({}); }',
  'src/app/api/cart/route.ts': 'export async function GET() { return Response.json({}); }',
  'src/app/api/orders/route.ts': 'export async function GET() { return Response.json([]); }',
  'src/app/api/coupons/route.ts': 'export async function GET() { return Response.json([]); }',
  'src/app/api/payments/create-intent/route.ts': 'export async function POST() { return Response.json({}); }',
  'src/app/api/payments/webhook/route.ts': 'export async function POST() { return Response.json({}); }',
  'src/lib/prisma.ts': `import { PrismaClient } from '@prisma/client'\n\nconst globalForPrisma = globalThis as unknown as {\n  prisma: PrismaClient | undefined\n}\n\nexport const prisma = globalForPrisma.prisma ?? new PrismaClient()\n\nif (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma`,
  'src/lib/auth.ts': 'export const GET = () => {};\nexport const POST = () => {};',
  'src/lib/stripe.ts': 'import Stripe from "stripe";\nexport const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: "2024-06-20" as any });',
  'src/lib/utils.ts': 'export function formatPrice(price: number) { return `$${price.toFixed(2)}`; }',
  '.env': 'DATABASE_URL="file:./dev.db"\nNEXTAUTH_SECRET="secret"\nSTRIPE_SECRET_KEY="sk_test_..."\n'
};

Object.entries(files).forEach(([file, content]) => {
  fs.writeFileSync(path.join(__dirname, file), content);
});

console.log('Setup complete');
