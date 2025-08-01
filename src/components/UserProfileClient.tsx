
'use client';

import { useRef, useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import Image from 'next/image';
import followIcon from '@/assets/follow.svg';

interface Props {
  user: {
    _id: string;
    userName: string;
    gender?: string;
    profession?: string;
    experience?: number;
    nationality?: string;
    interests?: string[];
    bio?: string;
    dob?: string;
    profile_image_url?: string;
  };
}

export default function UserProfileClient({ user }: Props) {
  const [showMore, setShowMore] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [maxHeight, setMaxHeight] = useState('0px');
  const contentRef = useRef<HTMLDivElement>(null);

  const [hasRequested, setHasRequested] = useState(false);


  const age = user.dob
    ? Math.floor((Date.now() - new Date(user.dob).getTime()) / (1000 * 60 * 60 * 24 * 365.25))
    : 'N/A';

  const handleFollow = async () => {
  try {
    const currentUserId = localStorage.getItem('userId');
    console.log("saransh ki id", currentUserId);
    console.log("akhilesh ki id", user._id);
   

    console.log(currentUserId);
    if (!currentUserId) {
      alert('You must be logged in');
      return;
    }

    const res = await fetch(`/api/follow-request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': currentUserId, // ✅ manually sent
      },
      body: JSON.stringify({ userIdToRequest: user._id }), // this is target user
    });

    const data = await res.json();
    if (data.success) {
      setIsFollowing(true);
    } else {
      alert(data.message || 'Something went wrong');
    }
  } catch (err) {
    console.error('Follow request error:', err);
    alert('Error sending follow request');
  }
};


  useEffect(() => {
  // 🔹 Animate sliding section
  if (showMore && contentRef.current) {
    setMaxHeight(`${contentRef.current.scrollHeight}px`);
  } else {
    setMaxHeight('0px');
  }

  // 🔹 Check follow status
  const currentUserId = localStorage.getItem('userId');
  if (!currentUserId) return;

  fetch('/api/follow-request/status', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-user-id': currentUserId,
    },
    body: JSON.stringify({ targetUserId: user._id }),
  })
    .then(res => res.json())
    .then(data => {
      setIsFollowing(data.isFollowing);
      setHasRequested(data.hasRequested);
    })
    .catch(err => console.error('Status check error:', err));

}, [showMore, user._id]); // 👈 combined dependencies


  return (
    <div className="pt-20 px-8 pb-6 font-sans">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-semibold flex items-center gap-2 text-gray-900">
            {user.userName}
            <span className="text-sm text-gray-500">
              ({user.gender === 'Male' ? 'He/Him' : 'She/Her'})
            </span>
          </h2>
          <p className="text-gray-600 mt-1 text-base">
            {user.profession} <span className="text-sm">({user.experience} yrs)</span>
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {user.nationality} ·{' '}
            <button
              onClick={() => setShowMore(!showMore)}
              className="text-blue-700 hover:underline transition-colors font-medium"
            >
              Know More
            </button>
          </p>
        </div>

        <div className="flex flex-col items-end gap-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-1.5 text-sm shadow-sm transition">
            <div className="flex items-center gap-2">
              <Send className="w-4 h-4" /> Message
            </div>
          </button>

          <button
            onClick={handleFollow}
            disabled={isFollowing}
            className={`flex items-center gap-2 border ${
              isFollowing ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100 text-gray-700'
            } border-gray-300 rounded-full px-4 py-1.5 text-sm transition-all shadow-sm`}
          >
            <Image src={followIcon} alt="follow" className="h-4 w-4" />
            {isFollowing ? 'Following' : hasRequested ? 'Requested' : 'Follow'}

          </button>
        </div>
      </div>

      {/* Smooth sliding details */}
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-700 ease-in-out mt-6"
        style={{ maxHeight }}
      >
        <div className="p-5 border border-gray-200 rounded-xl bg-white shadow-md space-y-3">
          <p className="text-gray-700">
            <span className="font-medium text-gray-900">Age:</span> {age}
          </p>
          <p className="text-gray-700">
            <span className="font-medium text-gray-900">Interests:</span>{' '}
            {user.interests?.join(', ') || 'None'}
          </p>
          <p className="text-gray-700">
            <span className="font-medium text-gray-900">Bio:</span>{' '}
            {user.bio || 'No bio available.'}
          </p>
        </div>
      </div>
    </div>
  );
}
