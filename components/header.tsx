import Link from "next/link";
import { Search, ShoppingCart, Menu, User, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="relative w-32 h-8">
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-[#02475b]">
                    Apollo
                  </span>
                  <span className="text-2xl font-bold text-[#ff6f61]">
                    24/7
                  </span>
                </div>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search doctors, medicines, etc."
                className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff6f61] focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-6">
              <Link
                href="#"
                className="flex flex-col items-center text-[#02475b] hover:text-[#ff6f61]">
                <Phone className="h-5 w-5" />
                <span className="text-xs mt-1">Consult</span>
              </Link>
              <Link
                href="#"
                className="flex flex-col items-center text-[#02475b] hover:text-[#ff6f61]">
                <ShoppingCart className="h-5 w-5" />
                <span className="text-xs mt-1">Pharmacy</span>
              </Link>
              <Link
                href="#"
                className="flex flex-col items-center text-[#02475b] hover:text-[#ff6f61]">
                <User className="h-5 w-5" />
                <span className="text-xs mt-1">Account</span>
              </Link>
            </div>
            <Button className="bg-[#ff6f61] hover:bg-[#ff5c4d] text-white">
              Book Lab Test
            </Button>
            <Button variant="ghost" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
