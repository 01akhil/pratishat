
'use client';

import React, { useEffect } from 'react';
import Image from "next/image";
import Hero1 from "../assets/Hero.png";
import { Button } from "@/components/ui/button";
import Header1 from "@/components/Header1";
import { useRouter } from "next/navigation";
import { UserButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { LogIn } from 'lucide-react';

const Hero = () => {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      // Assuming you get chat_id from user data or a backend call
      const chatId = user?.id; // Example: using user ID as chat ID
      console.log(chatId);
      router.push(`/dashboard`);
    }
  }, [user, router]);

  return (
    <div className="min-h-[100vh] w-full px-4 py-8 md:px-8 lg:px-16 overflow-hidden">
      {/* Header with integrated auth */}
      <div className="flex justify-between items-center mb-8">
        <Header1 />
        {/* <div className="flex items-center mb-[10vh]">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              Sign in
            </Link>
          </SignedOut> 
        </div> */}
      </div>

      {/* Main Content */}
      <div className="mx-auto w-full">
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-8">
          {/* Image Column - Shown first on mobile */}
          <div className="relative w-full md:w-[40%] order-1 md:order-2">
            <Image 
              src={Hero1} 
              alt="Hero" 
              className="w-full max-w-xs md:max-w-md mx-auto"
              priority
              width={500}
              height={500}
            />
          </div>

          {/* Text Column - Shown second on mobile */}
          <div className="w-full md:w-[60%] pt-0 md:pt-10 text-center md:text-left order-2 md:order-1">
            <p className="mb-4 text-sm font-medium uppercase tracking-wider text-indigo-600">
              INTRODUCING A NEW WORLD OF INFO MEDIA
            </p>
            <h1 className="mb-8 text-4xl md:text-[60px] font-semibold leading-[1.2] md:leading-[65px] text-gray-900 tracking-wide">
              Survey the World, <br /> Connect with Minds!
            </h1>
            
            <SignedIn>
              <Link href="/dashboard">
                <Button className="rounded-full bg-purple-500 px-8 py-3 font-medium text-white transition-all hover:bg-purple-600">
                  Go to Dashboard
                </Button>
              </Link>
            </SignedIn>
            
            <SignedOut>
              <Link href="/login">
                <Button className="rounded-full bg-purple-500 px-8 py-3 font-medium text-white transition-all hover:bg-purple-600">
                  Get Started <LogIn className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </SignedOut>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;