
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Hero1 from '../../assets/Hero.png';
import Login from '@/components/Login';
import Header from "@/components/Header";

const LoginPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full px-4 sm:px-6 py-8 md:px-8 lg:px-16 bg-gradient-to-br from-[#777EFF]/50 via-white/70 to-[#e0c4e6]">
      {/* Navigation */}
      <Header />

      {/* Main Content */}
      <div className="mx-auto w-full max-w-7xl mt-[7vh] sm:mt-0 md:mt-0 lg:mt-0 xl:mt-0">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between w-full gap-4 sm:gap-8">
          
          {/* Left Column - Login Form */}
          <div
            className={`transition-all duration-700 ease-in-out transform ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            } w-full max-w-md mx-auto sm:mx-0`}
          >
            <Login />
          </div>

          {/* Right Column - Image */}
          <div className="hidden md:block relative w-full lg:w-[45%]">
            <Image
              src={Hero1}
              alt="Illustration of app interface"
              className="w-full max-w-lg mx-auto"
              priority
              quality={85}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;