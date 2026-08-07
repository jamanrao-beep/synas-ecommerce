import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "My Profile | SYNAS",
  description: "User profile and account settings",
};

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto px-4 py-16 md:px-8 max-w-4xl min-h-[60vh]">
      <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8">My Profile</h1>
      
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Name</h3>
            <p className="text-lg font-medium">{session.user?.name || "N/A"}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Email</h3>
            <p className="text-lg">{session.user?.email}</p>
          </div>
          
          <div className="pt-6 border-t flex gap-4">
            <Button variant="outline" asChild>
              <Link href="/api/auth/signout">Sign Out</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
