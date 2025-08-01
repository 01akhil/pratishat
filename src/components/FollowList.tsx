'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface UserSummary {
  userId: string;
  userName: string;
  profile_image_url?: string;
}

export default function FollowList() {
  const [followers, setFollowers] = useState<UserSummary[]>([]);
  const [following, setFollowing] = useState<UserSummary[]>([]);
  const [tab, setTab] = useState<'followers' | 'following'>('followers');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowList = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) return;

      try {
        const res = await fetch('/api/follow-list', {
          method: 'GET',
          headers: { 'x-user-id': userId },
        });

        const data = await res.json();
        setFollowers(data.followers || []);
        setFollowing(data.following || []);
      } catch (err) {
        console.error('Error fetching follow list:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowList();
  }, []);

  const activeList = tab === 'followers' ? followers : following;

  return (
    <div className="max-w-xl mx-auto py-6 px-4">
      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={() => setTab('followers')}
          className={`px-4 py-2 rounded ${
            tab === 'followers' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Followers
        </button>
        <button
          onClick={() => setTab('following')}
          className={`px-4 py-2 rounded ${
            tab === 'following' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Following
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500 text-center">Loading...</p>
      ) : activeList.length === 0 ? (
        <p className="text-gray-500 text-center">No {tab} found.</p>
      ) : (
        <ul className="space-y-4">
          {activeList.map((user) => (
            <li key={user.userId} className="flex items-center justify-between bg-white p-3 shadow rounded">
              <div className="flex items-center gap-3">
                <Image
                  src={user.profile_image_url || '/default-avatar.png'}
                  alt={user.userName}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <span className="text-gray-800 font-medium">{user.userName}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
