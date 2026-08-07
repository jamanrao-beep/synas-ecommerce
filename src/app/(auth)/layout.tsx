import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex w-full">
      {/* Left side - Image */}
      <div className="hidden lg:flex w-1/2 relative bg-gray-50 items-center justify-center">
        <Image
          src="/images/hero-clean.png"
          alt="Premium jewelry collection"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/10" />
        <Link href="/" className="absolute top-8 left-8 z-10 text-white font-serif text-3xl font-bold">
          SYNAS
        </Link>
      </div>
      
      {/* Right side - Form */}
      <div className="flex w-full lg:w-1/2 flex-col justify-center items-center p-8 sm:p-12 md:p-24 bg-white relative">
        <Link href="/" className="lg:hidden absolute top-8 left-8 font-serif text-2xl font-bold">
          SYNAS
        </Link>
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
