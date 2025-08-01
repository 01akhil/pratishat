
import connectDB from '@/lib/mongoose/db';
import User from '@/lib/mongoose/models/User';
import {Plus } from 'lucide-react';
import Image from 'next/image';
import followIcon from '@/assets/follow.svg';
import ProfileClient from '../../../components/ProfileClient';
import FollowRequests from '@/components/FollowRequests'
import UserSearch from '@/components/UserSearch';

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
      <header className="h-16 border-b border-gray-100 flex items-center justify-between px-4">
        <h1 className="text-2xl font-bold text-[#2d4b6d]">
          Prati<span className="text-[#a3d9c9]">Shat</span>
        </h1>
        <div className="flex items-center gap-4">
          <UserSearch/>
          <Plus size={23} className="text-black cursor-pointer" />
         
        </div>
      </header>

      {/* Banner & Profile */}
      <div className="relative bg-gray-200 h-36">
        {/* <Image src={null} alt="banner" fill className="object-cover" /> */}
        <div className="absolute -bottom-16 left-8">
          <div className="h-32 w-32 rounded-full bg-[#f8a7a1] border-4 border-white overflow-hidden">
            <Image
              src={user.profile_image_url || 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.facebook.com%2Furrandomgeek%2F&psig=AOvVaw2URN8ytiAYglsWQ6rWgIcu&ust=1751826999194000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLiv1KOupo4DFQAAAAAdAAAAABAE'}
              alt="Profile"
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Profile Info */}
        <ProfileClient user={JSON.parse(JSON.stringify(user))} />

      {/* Tabs */}
      <div className="flex justify-between border-t border-black px-40">
        <button className="px-6 py-3 border-b-2 border-gray-900">PROJECTS</button>
        <button className="px-6 py-3 text-gray-500">CONTRIBUTIONS</button>
        <button className="px-6 py-3 text-gray-500">ONGOING PROJECTS</button>
      </div>
    </div>
  );
}
