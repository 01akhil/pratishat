'use client';

import { ChevronDown, Plus, Search } from 'lucide-react';
import Image from 'next/image';
import followIcon from '@/assets/follow.svg';
import UserProfileClient from '@/components/UserProfileClient';
import UserSearch from '@/components/UserSearch';
import Loader1 from '@/components/Loader1'
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import CreateProjectModal from '@/components/create-project-modal';

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

export default function UserProfilePage({ params }: Props) {
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [hasRequested, setHasRequested] = useState(false);
  const [statusLoading, setStatusLoading] = useState(true);

   const [showModal, setShowModal] = useState(false);

    const id=localStorage.getItem("userId");
    console.log(id)

    const handleNext = (projectName: string, startFrom: string) => {
        console.log("Project created:", { projectName, startFrom });
        router.push(`/studio?title=${encodeURIComponent(projectName)}`);
        setShowModal(false);
    };


  useEffect(() => {
    const localId = localStorage.getItem('userId');
    if (localId === params.id) {
      router.replace(`/profile/${params.id}`);
      return;
    }

    const fetchUserData = async () => {
      try {
        const res = await fetch('/api/user/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: params.id }),
        });

        const data = await res.json();
        if (res.ok) {
          setUser(data.user);
        } else {
          console.error(data.error);
        }
      } catch (err) {
        console.error('Something went wrong:', err);
      } finally {
        setLoading(false);
      }
    };

    const fetchFollowStatus = async () => {
      const localUserId = localStorage.getItem('userId');
      if (!localUserId) return;

      try {
        const res = await fetch('/api/follow-status', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-user-id': localUserId,
          },
          body: JSON.stringify({ targetUserId: params.id }),
        });

        const data = await res.json();
        if (res.ok) {
          setIsFollowing(data.isFollowing);
          setHasRequested(data.hasRequested);
        }
      } catch (err) {
        console.error('Error fetching follow status:', err);
      } finally {
        setStatusLoading(false);
      }
    };

    fetchUserData();
    fetchFollowStatus();
  }, [params.id, router]);

  if (loading) return <div className="p-8 text-center">
    <Loader1/>
  </div>;
  if (!user) return <div className="p-8 text-center">User not found.</div>;

  return (
    <div className="font-sans max-w-screen-xl mx-auto">
      {/* Header */}
      <header className="h-16 border-b border-gray-100 flex items-center justify-between px-4 md:px-6 md:justify-end gap-4">
                             
                             <div className="flex items-center gap-4 ml-10">
                               
                                 <div className='ml-[18vw] flex items-center gap-4 '>
                                   <button className="text-gray-400 hover:text-gray-600 mr-[0vh] w-[30vw] ">
                                     
                                     <UserSearch />
                                 </button>
                                 <button
                                     onClick={() => setShowModal(true)}
                                     className="text-[#000000] hover:text-gray-600 font-extrabold cursor-pointer"
                                 >
                                     <Plus size={23} />
                                 </button>
                                  <button
             onClick={() => router.push(`/user/${id}`)}
             className="text-[#000000] hover:text-blue-600 font-medium"
           >
             My Profile
           </button>
                                 
                                 </div>
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
              src={user.profile_image_url || 'https://dummyimage.com/128x128/f8a7a1/fff.png&text=Profile'}
              alt="Profile"
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
       
      </div>

      {/* Profile Info */}
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

