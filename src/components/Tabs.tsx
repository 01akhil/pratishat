
'use client';

import { useState } from 'react';

export default function Tabs() {
  const [activeTab, setActiveTab] = useState('projects');

  return (
    <div className="w-full"> {/* Ensure full width container */}
      {/* Tab Navigation */}
      <div className="w-full border-t border-gray-200 overflow-x-auto no-scrollbar">
        <div className="flex min-w-full md:min-w-0 justify-between max-w-screen-xl mx-auto">
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex-1 py-3 text-center text-sm md:text-base whitespace-nowrap ${
              activeTab === 'projects'
                ? 'border-b-2 border-gray-900 text-gray-900 font-medium'
                : 'text-gray-500'
            }`}
          >
            PROJECTS
          </button>
          <button
            onClick={() => setActiveTab('contributions')}
            className={`flex-1 py-3 text-center text-sm md:text-base whitespace-nowrap ${
              activeTab === 'contributions'
                ? 'border-b-2 border-gray-900 text-gray-900 font-medium'
                : 'text-gray-500'
            }`}
          >
            CONTRIBUTIONS
          </button>
          <button
            onClick={() => setActiveTab('ongoing')}
            className={`flex-1 py-3 text-center text-sm md:text-base whitespace-nowrap ${
              activeTab === 'ongoing'
                ? 'border-b-2 border-gray-900 text-gray-900 font-medium'
                : 'text-gray-500'
            }`}
          >
             SAVED
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="w-full max-w-screen-xl flex justify-center mx-auto px-4 md:px-8 py-6">
        <div
          className={`tab-content ${
            activeTab === 'projects' ? 'active' : 'hidden'
          }`}
        >
          {/* Projects content */}
          <p>Projects content will appear here</p>
        </div>
        <div
          className={`tab-content ${
            activeTab === 'contributions' ? 'active' : 'hidden'
          }`}
        >
          {/* Contributions content */}
          <p>Contributions content will appear here</p>
        </div>
        <div
          className={`tab-content ${
            activeTab === 'ongoing' ? 'active' : 'hidden'
          }`}
        >
          {/* Ongoing projects content */}
          <p>Saved projects will appear here</p>
        </div>
      </div>
    </div>
  );
}