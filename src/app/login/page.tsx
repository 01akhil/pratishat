// 'use client';

// import React, { useEffect, useState } from 'react';
// import Image from 'next/image';
// import Hero1 from '../../assets/Hero.png';
// import Login from '@/components/Login';
// import Header from "@/components/Header";

// const LoginPage = () => {
//   const [isVisible, setIsVisible] = useState(false);

//   // Trigger animation on mount
//   useEffect(() => {
//     const timer = setTimeout(() => setIsVisible(true), 100);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div className="h-[100vh] w-full px-4 py-8 md:px-8 lg:px-16 overflow-hidden bg-gradient-to-br from-[#777EFF]/50 via-white/70 to-[#e0c4e6]">
//       {/* Navigation */}
//       <Header />

//       {/* Main Content */}
//       <div className="mx-auto w-full">
//         <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full">
          
//           {/* Left Column - Text Content (Login Form with CSS animation) */}
//           <div
//             className={`transition-all duration-700 ease-in-out transform ${
//               isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
//             } w-full md:w-[60%]`}
//           >
//             <Login />
//           </div>

//           {/* Right Column - Image */}
//           <div className="relative w-full md:w-[40%] mb-12 md:mb-0">
//             <Image
//               src={Hero1}
//               alt="Hero"
//               className="w-full max-w-xs md:max-w-md mx-auto"
//               priority
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


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
    <div className="min-h-screen w-full px-4 py-8 md:px-8 lg:px-16 bg-gradient-to-br from-[#777EFF]/50 via-white/70 to-[#e0c4e6]">
      {/* Navigation */}
      <Header />

      {/* Main Content */}
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between w-full gap-8">
          
          {/* Left Column - Login Form (always comes first in DOM for better mobile UX) */}
          <div
            className={`transition-all duration-700 ease-in-out transform ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            } w-full lg:w-[50%] max-w-md`}
          >
            <Login />
          </div>

          {/* Right Column - Image (hidden on mobile, shown on tablets and up) */}
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