


'use client';

import { ChevronLeft } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="relative w-full">
      <nav className="w-full ">
        <div className="flex items-center gap-4">
          {/* Back Button - Only shown when not on homepage */}
          {pathname !== '/' && (
            <button 
              onClick={() => router.back()}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Go back"
            >
              <ChevronLeft className="h-6 w-6 text-gray-700" />
            </button>
          )}

          {/* Logo - Always left-aligned */}
          <h1
            className="text-2xl md:text-2xl font-bold text-gray-800 cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => router.push('/')}
          >
            Prati<span className="text-[#5BB89D]">Shat</span>
          </h1>
        </div>
      </nav>
    </header>
  );
};

export default Header;