'use client';

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Finance from "../assets/finance.png";
import Power from "../assets/power.png";
import Health from "../assets/Health.png"
import { Heart, MessageSquare, Share2 } from "lucide-react";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const surveys = [
  {
    image: Finance,
    category: "Finance",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    stats: {
      likes: "25K supported",
      comments: "4.5K",
      shares: "1.5K"
    }
  },
  {
    image: Power,
    category: "Power",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    stats: {
      likes: "25K supported",
      comments: "4.5K",
      shares: "1.5K"
    }
  },
  {
    image: Health,
    category: "Health",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    stats: {
      likes: "25K supported",
      comments: "4.5K",
      shares: "1.5K"
    }
  }
];

const SurverysAndReports = () => {
  return (
    <div className="min-h-[100vh] w-full px-4 py-8 md:px-8 lg:px-24 overflow-hidden pt-[8vh] flex flex-col items-center">
      <h1 className="text-2xl font-bold tracking-wide">Surveys And Reports</h1>

      <div className="flex gap-10 mt-[15vh] flex-wrap justify-center">
        {surveys.map((survey, index) => (
          <motion.div
            key={index}
            className="w-[325px]"
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="h-[200px] cursor-pointer bg-gray-100 w-full rounded-xl relative overflow-hidden">
              <Image
                src={survey.image}
                alt={`Survey ${index + 1}`}
                fill
                className="object-cover rounded-xl"
              />
            </div>
            <p className="mt-4 text-sm">{survey.category}</p>
            <h1 className="font-semibold text-lg">{survey.title}</h1>

            <div className="flex items-center gap-8 mt-2 flex-wrap">
              <div className="flex items-center gap-2">
                <Heart size={18} fill="red" color="red" />
                <p className="text-sm">{survey.stats.likes}</p>
              </div>

              <div className="flex items-center gap-2">
                <MessageSquare size={18} />
                <p className="text-sm">{survey.stats.comments}</p>
              </div>

              <div className="flex items-center gap-2">
                <Share2 size={18} />
                <p className="text-sm">{survey.stats.shares}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View All Button */}
      <motion.button
        className="rounded-sm text-gray-900 hover:text-purple-900 px-8 py-3 font-medium underline cursor-pointer mt-[15vh] hover:scale-105 transition-transform"
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        View All
      </motion.button>
    </div>
  );
};

export default SurverysAndReports;
