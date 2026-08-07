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
        <Link href="/" className="absolute top-8 left-8 z-10">
          <Image src="/images/logo.png" alt="SYNAS" width={140} height={70} className="object-contain drop-shadow-lg" />
        </Link>
      </div>
      
      {/* Right side - Form */}
      <div className="flex w-full lg:w-1/2 flex-col justify-center items-center p-8 sm:p-12 md:p-24 bg-white relative">
        <Link href="/" className="lg:hidden absolute top-8 left-8">
          <Image src="/images/logo.png" alt="SYNAS" width={120} height={60} className="object-contain" />
        </Link>
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
