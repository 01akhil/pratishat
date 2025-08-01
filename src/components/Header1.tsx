'use client'; // Required for using hooks and interactive elements

import { ChevronLeft } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      {pathname !== '/' && (
        <ChevronLeft
          className="absolute left-[3vh] mt-[0.9vh] cursor-pointer"
          onClick={() => router.back()}
        />
      )}
      <nav className="mb-16 md:mb-16">
        <div
          className="text-2xl font-bold text-gray-800 cursor-pointer"
          onClick={() => router.push('/')}
        >
          Prati<span className="text-[#5BB89D]">Shat</span>
        </div>
      </nav>
    </>
  );
};

export default Header;
