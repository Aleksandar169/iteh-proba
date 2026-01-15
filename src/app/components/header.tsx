"use client";

import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50">
      <div className="border-b border-amber-300 bg-gradient-to-r from-yellow-100 via-orange-100 to-yellow-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="h-24 flex items-center justify-between">
            
            
            <div className="flex items-center gap-10">
              
              
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="Veb pčelarstvo"
                  width={160}
                  height={80}
                  priority
                />
              </Link>

              
              <nav className="flex items-center gap-8">
                <Link
                  href="/aktivnosti"
                  className="text-base font-medium text-gray-800 hover:text-orange-600 transition"
                >
                  Aktivnosti
                </Link>
                <Link
                  href="/pcelinjak"
                  className="text-base font-medium text-gray-800 hover:text-orange-600 transition"
                >
                  Pčelinjak
                </Link>
                <Link
                  href="/dnevnik"
                  className="text-base font-medium text-gray-800 hover:text-orange-600 transition"
                >
                  Moj dnevnik
                </Link>
              </nav>
            </div>

           
            <button
              className="
                px-6 py-2.5 rounded-xl
                bg-orange-500 text-white font-semibold
                hover:bg-orange-600 transition
              "
            >
              Odjavi se
            </button>

          </div>
        </div>
      </div>
    </header>
  );
}
