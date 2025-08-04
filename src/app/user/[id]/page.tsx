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
import Header from "@/components/Header3";
import Tabs from "@/components/Tabs";

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
      <Header/>
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
      <UserProfileClient user={user} />

      {/* Tabs */}
      <Tabs/>
    </div>
  );
}




