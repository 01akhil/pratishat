'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';



interface FollowRequest {
  userId: string;
  userName: string;
  profile_image_url?: string;
}

export default function FollowRequests() {
  const [requests, setRequests] = useState<FollowRequest[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchFollowRequests = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    try {
      const res = await fetch('/api/profile/me', {
        method: 'GET',
        headers: {
          'x-user-id': userId,
        },
      });

      const data = await res.json();
      if (data && data.followRequests) {
        setRequests(data.followRequests);
      }
    } catch (err) {
      console.error('Error fetching follow requests:', err);
    }
  };

  useEffect(() => {
    fetchFollowRequests();
  }, []);

  const handleAccept = async (requesterId: string) => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    setLoading(true);
    try {
      const res = await fetch('/api/follow-request/accept', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': userId,
        },
        body: JSON.stringify({ requesterId }),
      });

      const data = await res.json();
      if (data.success) {
        setRequests(prev => prev.filter(r => r.userId !== requesterId));
      }
    } catch (err) {
      console.error('Accept error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (requesterId: string) => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    setLoading(true);
    try {
      const res = await fetch('/api/follow-request/reject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': userId,
        },
        body: JSON.stringify({ requesterId }),
      });

      const data = await res.json();
      if (data.success) {
        setRequests(prev => prev.filter(r => r.userId !== requesterId));
      }
    } catch (err) {
      console.error('Reject error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (requests.length === 0) return <p className="text-gray-500">No follow requests.</p>;

  return (
    <div className="space-y-4">
      {requests.map(request => (
        <div
          key={request.userId}
          className="flex items-center justify-between bg-white p-4 shadow-md rounded-lg"
        >
          <div className="flex items-center gap-4">
            <Image
              src={request.profile_image_url || '/default-avatar.png'}
              alt={request.userName}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            <span className="text-gray-800 font-medium">{request.userName}</span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => handleAccept(request.userId)}
              disabled={loading}
              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Accept
            </button>
            <button
              onClick={() => handleReject(request.userId)}
              disabled={loading}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
