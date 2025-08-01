
// 'use client';

// import React, { useRef } from 'react';
// import Image from 'next/image';
// import { motion } from 'framer-motion';
// import John from '../assets/john_profile_picure.jpeg';

// const fadeUp = {
//   hidden: { opacity: 0, y: 50 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { staggerChildren: 0.3, duration: 0.8, ease: 'easeOut' },
//   },
// };

// const fadeLeft = {
//   hidden: { opacity: 0, x: -50 },
//   visible: {
//     opacity: 1,
//     x: 0,
//     transition: { staggerChildren: 0.3, duration: 0.8, ease: 'easeOut' },
//   },
// };

// const fadeRight = {
//   hidden: { opacity: 0, x: 50 },
//   visible: {
//     opacity: 1,
//     x: 0,
//     transition: { staggerChildren: 0.3, duration: 0.8, ease: 'easeOut' },
//   },
// };

// const testimonials = [
//   {
//     id: 1,
//     heightClass: 'h-[65%]',
//     bgColor: 'bg-[#e9ebfd]',
//     content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti accusantium in voluptatum!',
//   },
//   {
//     id: 2,
//     heightClass: 'h-[35%]',
//     bgColor: 'bg-[#ededf6]',
//     content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti accusantium in voluptatum!',
//     textSize: 'text-md',
//   },
//   {
//     id: 3,
//     heightClass: 'h-[35%]',
//     bgColor: 'bg-[#f5f5f6]',
//     content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti accusantium in voluptatum!',
//     textSize: 'text-md',
//   },
//   {
//     id: 4,
//     heightClass: 'h-[65%]',
//     bgColor: 'bg-[#f5f5f6]',
//     content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti accusantium in voluptatum!',
//   },
//   {
//     id: 5,
//     heightClass: 'h-[35%]',
//     bgColor: 'bg-[#f5f5f6]',
//     content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti accusantium in voluptatum!',
//     textSize: 'text-md',
//   },
//   {
//     id: 6,
//     heightClass: 'h-[65%]',
//     bgColor: 'bg-[#f5f5f6]',
//     content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti accusantium in voluptatum!',
//   },
// ];

// const Testimonials = () => {
//   const sliderRef = useRef<HTMLDivElement>(null);

//   const scrollLeft = () => {
//     if (sliderRef.current) {
//       sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
//     }
//   };

//   const scrollRight = () => {
//     if (sliderRef.current) {
//       sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
//     }
//   };

//   return (
//     <div className="min-h-screen p-4 md:p-8 lg:p-12 overflow-x-hidden">
//       <div className="max-w-7xl mx-auto p-2">
//         <h1 className="text-2xl  md:text-5xl lg:text-3xl font-semibold text-gray-700 text-center mb-12 md:mb-16 lg:mb-10">
//           People just like you
//           <br />
//           are already using Pratishat
//         </h1>

//         {/* Desktop layout (3 columns) */}
//         <div className="hidden md:flex gap-3 ml-[8vw]">
//           {[0, 2, 4].map((startIdx, colIdx) => (
//             <div key={colIdx} className="h-[80vh] w-[24vw] flex flex-col gap-2">
//               {testimonials.slice(startIdx, startIdx + 2).map((testimonial, i) => {
//                 const variant =
//                   colIdx === 0
//                     ? i === 0
//                       ? 'fadeUp'
//                       : 'fadeLeft'
//                     : colIdx === 1
//                     ? i === 0
//                       ? 'fadeLeft'
//                       : 'fadeUp'
//                     : i === 0
//                     ? 'fadeUp'
//                     : 'fadeRight';

//                 return (
//                   <TestimonialCard
//                     key={testimonial.id}
//                     testimonial={testimonial}
//                     variant={variant}
//                   />
//                 );
//               })}
//             </div>
//           ))}
//         </div>

//         {/* Mobile layout (horizontal slider) */}
//         <div className="md:hidden relative mt-10">
//           <div
//             ref={sliderRef}
//             className="flex overflow-x-auto scrollbar-hide space-x-4 py-4 px-2"
//             style={{ scrollSnapType: 'x mandatory' }}
//           >
//             {testimonials.map((testimonial) => (
//               <div
//                 key={testimonial.id}
//                 className="flex-shrink-0 w-[80vw]"
//                 style={{ scrollSnapAlign: 'start' }}
//               >
//                 <TestimonialCard testimonial={testimonial} fullHeight variant="fadeUp" />
//               </div>
//             ))}
//           </div>

//           {/* Arrows */}
//           <button
//             onClick={scrollLeft}
//             className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
//           >
//             &larr;
//           </button>
//           <button
//             onClick={scrollRight}
//             className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
//           >
//             &rarr;
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const TestimonialCard = ({
//   testimonial,
//   fullHeight = false,
//   variant = 'fadeUp',
// }: {
//   testimonial: any;
//   fullHeight?: boolean;
//   variant?: 'fadeUp' | 'fadeLeft' | 'fadeRight';
// }) => {
//   const variants = {
//     fadeUp,
//     fadeLeft,
//     fadeRight,
//   };

//   return (
//     <motion.div
//       className={`w-full ${testimonial.bgColor} ${
//         fullHeight ? 'h-[60vh]' : testimonial.heightClass
//       } rounded-md p-4 flex flex-col justify-between hover:scale-95 transition-transform`}
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ once: true }}
//       variants={variants[variant]}
//     >
//       <h1 className={testimonial.textSize || 'text-md'}>
//         {testimonial.content}
//       </h1>

//       <div className="flex gap-2 items-center mt-4">
//         <div className="relative h-10 w-10 rounded-full overflow-hidden">
//           <Image src={John} alt="John" fill className="object-cover" />
//         </div>
//         <div>
//           <h1 className="text-xs">John</h1>
//           <h1 className="text-sm font-semibold">Canada</h1>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default Testimonials;





'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, Easing } from 'framer-motion';
import John from '../assets/john_profile_picure.jpeg';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      staggerChildren: 0.3, 
      duration: 0.8, 
      ease: "easeOut" as Easing 
    },
  },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { 
      staggerChildren: 0.3, 
      duration: 0.8, 
      ease: "easeOut" as Easing 
    },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { 
      staggerChildren: 0.3, 
      duration: 0.8, 
      ease: "easeOut" as Easing 
    },
  },
};

const testimonials = [
  {
    id: 1,
    heightClass: 'h-[65%]',
    bgColor: 'bg-[#e9ebfd]',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti accusantium in voluptatum!',
  },
  {
    id: 2,
    heightClass: 'h-[35%]',
    bgColor: 'bg-[#ededf6]',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti accusantium in voluptatum!',
    textSize: 'text-md',
  },
  {
    id: 3,
    heightClass: 'h-[35%]',
    bgColor: 'bg-[#f5f5f6]',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti accusantium in voluptatum!',
    textSize: 'text-md',
  },
  {
    id: 4,
    heightClass: 'h-[65%]',
    bgColor: 'bg-[#f5f5f6]',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti accusantium in voluptatum!',
  },
  {
    id: 5,
    heightClass: 'h-[35%]',
    bgColor: 'bg-[#f5f5f6]',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti accusantium in voluptatum!',
    textSize: 'text-md',
  },
  {
    id: 6,
    heightClass: 'h-[65%]',
    bgColor: 'bg-[#f5f5f6]',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti accusantium in voluptatum!',
  },
];

const Testimonials = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 lg:p-12 overflow-x-hidden">
      <div className="max-w-7xl mx-auto p-2">
        <h1 className="text-2xl md:text-5xl lg:text-3xl font-semibold text-gray-700 text-center mb-12 md:mb-16 lg:mb-10">
          People just like you
          <br />
          are already using Pratishat
        </h1>

        {/* Desktop layout (3 columns) */}
        <div className="hidden md:flex gap-3 ml-[8vw]">
          {[0, 2, 4].map((startIdx, colIdx) => (
            <div key={colIdx} className="h-[80vh] w-[24vw] flex flex-col gap-2">
              {testimonials.slice(startIdx, startIdx + 2).map((testimonial, i) => {
                const variant =
                  colIdx === 0
                    ? i === 0
                      ? 'fadeUp'
                      : 'fadeLeft'
                    : colIdx === 1
                    ? i === 0
                      ? 'fadeLeft'
                      : 'fadeUp'
                    : i === 0
                    ? 'fadeUp'
                    : 'fadeRight';

                return (
                  <TestimonialCard
                    key={testimonial.id}
                    testimonial={testimonial}
                    variant={variant}
                  />
                );
              })}
            </div>
          ))}
        </div>

        {/* Mobile layout (horizontal slider) */}
        <div className="md:hidden relative mt-10">
          <div
            ref={sliderRef}
            className="flex overflow-x-auto scrollbar-hide space-x-4 py-4 px-2"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex-shrink-0 w-[80vw]"
                style={{ scrollSnapAlign: 'start' }}
              >
                <TestimonialCard testimonial={testimonial} fullHeight variant="fadeUp" />
              </div>
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={scrollLeft}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
          >
            &larr;
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
          >
            &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

interface TestimonialCardProps {
  testimonial: {
    id: number;
    heightClass: string;
    bgColor: string;
    content: string;
    textSize?: string;
  };
  fullHeight?: boolean;
  variant?: 'fadeUp' | 'fadeLeft' | 'fadeRight';
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
  fullHeight = false,
  variant = 'fadeUp',
}) => {
  const variants = {
    fadeUp,
    fadeLeft,
    fadeRight,
  };

  return (
    <motion.div
      className={`w-full ${testimonial.bgColor} ${
        fullHeight ? 'h-[60vh]' : testimonial.heightClass
      } rounded-md p-4 flex flex-col justify-between hover:scale-95 transition-transform`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={variants[variant]}
    >
      <h1 className={testimonial.textSize || 'text-md'}>
        {testimonial.content}
      </h1>

      <div className="flex gap-2 items-center mt-4">
        <div className="relative h-10 w-10 rounded-full overflow-hidden">
          <Image src={John} alt="John" fill className="object-cover" />
        </div>
        <div>
          <h1 className="text-xs">John</h1>
          <h1 className="text-sm font-semibold">Canada</h1>
        </div>
      </div>
    </motion.div>
  );
};

export default Testimonials;