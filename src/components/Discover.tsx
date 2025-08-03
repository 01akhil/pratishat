
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import voice from "../assets/Speaking+and+Singing+Voice.jpg"
import survey from "../assets/survey1.jpg"
import connect from "../assets/connecting-people-avatars-vector.jpg"
import global from "../assets/global-trends-data-visualization.png"
import coin from "../assets/coin.jpg"

const features = [
  {
    title: 'Redeem Coins',
    content:
      'Participate in surveys and earn Pratishat Coins in your wallet. Redeem these coins for exciting gifts on our brand partners\' platforms.',
    image: coin // Example image path
  },
  {
    title: 'Makes Your Voice Valuable',
    content:
      'Your opinions and insights matter! By participating in surveys and research studies, you contribute to meaningful discussions, shape products and services, and influence decision-making processes.',
    image: voice
  },
  {
    title: 'Making Survey and Research',
    content:
      'We provide a seamless platform for conducting surveys and research, making data collection easy and efficient.',
    image: survey
  },
  {
    title: 'Connecting People',
    content:
      'Our platform fosters engagement by bringing together individuals, businesses, and researchers.',
    image: connect
  },
  {
    title: 'Visual Graphics',
    content:
      'Understanding data is easier with compelling visuals. We offer dynamic charts and interactive reports to make information clearer.',
    image: global
  },
];

const Discover = () => {
  return (
    <div className="min-h-screen w-full px-4 py-8 md:px-8 lg:px-24 pt-[8vh]">
      <div className="flex flex-col items-center justify-center mb-12">
        <h1 className="text-[#8D8D8C] mb-2 text-sm md:text-sm">FEATURES</h1>
        <h1 className="font-bold text-2xl md:text-2xl tracking-wide">Discover Our App</h1>
      </div>

      {/* Feature Sections */}
      <div className="space-y-12 md:space-y-16">
        {features.map((feature, index) => {
          const isEven = index % 2 === 0;
          const animationX = isEven ? -100 : 100;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: animationX }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.3 }}
              className={`flex flex-col md:flex-row items-center justify-between gap-8 ${
                isEven ? 'md:gap-0' : 'md:gap-40'
              }`}
            >
              {/* Left or Right Image */}
              {isEven ? (
                <>
                  <div className="w-full md:w-[50%] order-2 md:order-1">
                    <h1 className="font-bold text-xl md:text-xl mb-4 md:mb-6">{feature.title}</h1>
                    <p className="text-[#8D8D8C] text-sm md:text-base">{feature.content}</p>
                  </div>
                  <div className="h-48 md:h-[32vh] w-full md:w-[28%] rounded-xl order-1 md:order-2 relative">
                    <Image 
                      src={feature.image}
                      
                      alt={feature.title}
                      fill
                      className="object-cover rounded-xl"
                    />
                    
                  </div>
                </>
              ) : (
                <>
                  <div className="h-48 md:h-[32vh] w-full md:w-[28%] rounded-xl order-1 relative">
                    <Image 
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover rounded-xl"
                    />
                  </div>
                  <div className="w-full md:w-[50%] order-2">
                    <h1 className="font-bold text-xl md:text-xl mb-4 md:mb-6">{feature.title}</h1>
                    <p className="text-[#8D8D8C] text-sm md:text-base">{feature.content}</p>
                  </div>
                </>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Discover;