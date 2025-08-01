

'use client';

import React from 'react';
import { Users } from 'lucide-react';

const Features = () => {
  return (
    <div className='min-h-screen w-full px-4 py-8 md:px-8 lg:px-24'>
      <div className='flex flex-col md:flex-row h-full gap-4 md:gap-2'>
        {/* Left Card - Will appear first on mobile */}
        <div className="rounded-md w-full md:w-[35vw] bg-white/80 p-6 md:p-8 shadow-lg transition-shadow hover:shadow-xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-blue-500 p-2">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">Non-biased free democratic voice</h2>
          </div>

          <div className="space-y-6">
            {[
              {
                title: "Open Participation",
                desc: "Anyone can share their opinions without restrictions ensuring inclusivity."
              },
              {
                title: "Community Moderation",
                desc: "Users can report biased or misleading content to maintain fairness on the platform"
              },
              {
                title: "Diverse Representation",
                desc: "Encourages a wide range of perspectives, preventing dominance by any single group."
              }
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-black"></div>
                  <h3 className="font-semibold text-gray-800 text-base">{item.title}</h3>
                </div>
                <p className="pl-5 text-gray-500 text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <button className="mt-6 rounded-sm bg-purple-500 px-6 py-2 md:px-8 md:py-3 font-medium text-white transition-all hover:bg-purple-600 cursor-pointer w-full md:w-auto">
            Share your views
          </button>
        </div>

        {/* Right Cards - Will appear second on mobile */}
        <div className='flex flex-col gap-4 md:gap-2 w-full md:flex-1'>
          {/* Top Right Card */}
          <div className="rounded-lg bg-white/80 p-6 md:p-8 shadow-lg transition-shadow hover:shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-xl bg-blue-500 p-2">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-lg font-semibold text-gray-800">Community of high thinkers from around the globe</h2>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-black"></div>
                <h3 className="font-semibold text-gray-800 text-base">Knowledge Sharing</h3>
              </div>
              <div className='pl-5 space-y-4'>
                <p className="text-gray-500 text-sm">
                  Users can share research, insights, and thought-provoking content that challenges existing ideas and fosters learning.
                </p>
                <p className="text-gray-500 text-sm">
                  Encourages members to post articles, case studies, and discussions that inspire intellectual growth
                </p>
              </div>
            </div>

            <button className="mt-4 rounded-sm bg-purple-500 px-6 py-2 md:px-8 md:py-3 font-medium text-white transition-all hover:bg-purple-600 cursor-pointer w-full md:w-auto md:float-right">
              Join Community
            </button>
          </div>

          {/* Bottom Right Cards */}
          <div className='flex flex-col md:flex-row gap-4 md:gap-2'>
            {[
              {
                title: "Research Hub",
                desc: "A centralized platform where users can access research materials.",
                action: "Explore"
              },
              {
                title: "Pratishat Coins",
                desc: "Participate in surveys and earn Pratishat Coins in your wallet. Redeem these coins for exciting gifts",
                action: "Participate"
              }
            ].map((card, index) => (
              <div
                key={index}
                className='rounded-lg bg-white/80 p-6 md:p-8 shadow-lg transition-shadow hover:shadow-xl flex-1'
              >
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-xl bg-blue-500 p-2">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800 md:w-[20vw]">
                    {index === 0 ? "Best place for all your research needs" : "Earn Rewards"}
                  </h2>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-black"></div>
                    <h3 className="font-semibold text-gray-800 text-base">{card.title}</h3>
                  </div>
                  <div className='pl-5'>
                    <p className="text-gray-500 text-sm">
                      {card.desc}
                    </p>
                  </div>

                  <button className="group relative rounded-sm text-purple-500 ml-[35vh] px-8 py-3 font-medium cursor-pointer">
  {card.action}
  <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
</button>


                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;