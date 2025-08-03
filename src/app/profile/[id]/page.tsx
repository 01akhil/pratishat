

import connectDB from '@/lib/mongoose/db';
import User from '@/lib/mongoose/models/User';
import {Plus } from 'lucide-react';
import Image from 'next/image';
import followIcon from '@/assets/follow.svg';
import ProfileClient from '../../../components/ProfileClient';
import FollowRequests from '@/components/FollowRequests'
import UserSearch from '@/components/UserSearch';
import Tabs from '@/components/Tabs'

interface Props {
  params: { id: string };
}

interface UserType {
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
}

export default async function UserProfilePage({ params }: Props) {
  await connectDB();

  const user = (await User.findById(params.id).lean()) as unknown as UserType;

  if (!user) return <div className="p-8 text-center">User not found.</div>;

  const age = user.dob ? Math.floor((Date.now() - new Date(user.dob).getTime()) / (1000 * 60 * 60 * 24 * 365.25)) : 'N/A';

  return (
    <div className="font-sans max-w-screen-xl mx-auto">
      {/* Header */}
      <header className="h-16 border-b border-gray-100 flex items-center justify-between px-4 md:px-6">
        <h1 className="text-xl md:text-2xl font-bold text-[#2d4b6d]">
          Prati<span className="text-[#a3d9c9]">Shat</span>
        </h1>
        <div className="flex items-center gap-3 md:gap-4">
          <UserSearch/>
          <Plus size={20} className="text-black cursor-pointer md:w-6 md:h-6" />
        </div>
      </header>

      {/* Banner & Profile */}
      <div className="relative bg-gray-200 h-28 md:h-36">
        <div className="absolute -bottom-12 md:-bottom-16 left-4 md:left-8">
          <div className="h-24 w-24 md:h-32 md:w-32 rounded-full bg-gray-200 border-4 border-white overflow-hidden">
            <Image
              src={user.profile_image_url || 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.facebook.com%2Furrandomgeek%2F&psig=AOvVaw2URN8ytiAYglsWQ6rWgIcu&ust=1751826999194000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLiv1KOupo4DFQAAAAAdAAAAABAE'}
              alt="Profile"
              width={128}
              height={128}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <ProfileClient user={JSON.parse(JSON.stringify(user))} />

      {/* Tabs */}
      <Tabs/>
    </div>
  );
}