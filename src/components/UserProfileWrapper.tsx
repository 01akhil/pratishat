// components/UserProfileWrapper.tsx
'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import followIcon from '@/assets/follow.svg';
import CreateProjectModal from '@/components/create-project-modal';
import UserProfileClient from './UserProfileClient';
import UserSearch from './UserSearch';

interface Props {
  user: {
    _id: string;
    userName: string;
    email: string;
    dob?: string;
    gender?: string;
    profession?: string;
    experience?: number;
    nationality?: string;
    interests?: string[];
    bio?: string;
    profile_image_url?: string;
  };
}

export default function UserProfileWrapper({ user }: Props) {
  const [showModal, setShowModal] = useState(false);

  const handleNext = () => {
    // whatever your next action is
    setShowModal(false);
  };

  return (
    <div className="font-sans max-w-screen-xl mx-auto">
      {/* Header */}
      <header className="h-16 border-b border-gray-100 flex items-center justify-between px-4">
        <h1 className="text-2xl font-bold text-[#2d4b6d]">
          Prati<span className="text-[#a3d9c9]">Shat</span>
        </h1>
        <div className="flex items-center gap-4">
          <UserSearch />
          <button
            onClick={() => setShowModal(true)}
            className="text-[#000000] hover:text-gray-600 font-extrabold cursor-pointer"
          >
            <Plus size={23} />
          </button>
        </div>
      </header>

      {showModal && (
        <CreateProjectModal
          onCloseAction={() => setShowModal(false)}
          onNextAction={handleNext}
        />
      )}

      {/* Banner & Profile */}
      <div className="relative bg-gray-200 h-36">
        <div className="absolute -bottom-16 left-8">
          <div className="h-32 w-32 rounded-full bg-[#f8a7a1] border-4 border-white overflow-hidden">
            <Image
              src={
                user.profile_image_url ||
                'https://via.placeholder.com/150'
              }
              alt="Profile"
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <UserProfileClient user={user} />

      {/* Tabs */}
      <div className="flex justify-between border-t border-black px-40">
        <button className="px-6 py-3 border-b-2 border-gray-900">PROJECTS</button>
        <button className="px-6 py-3 text-gray-500">CONTRIBUTIONS</button>
        <button className="px-6 py-3 text-gray-500">ONGOING PROJECTS</button>
      </div>
    </div>
  );
}
