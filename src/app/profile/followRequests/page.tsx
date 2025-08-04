

// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from "next/navigation";

// import Image from 'next/image';

// import Header from "@/components/Header3"

// interface FollowRequest {
//   userId: string;
//   userName: string;
//   profile_image_url?: string;
// }

// export default function FollowRequests() {
//   const [requests, setRequests] = useState<FollowRequest[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [userId, setUserId] = useState<string | null>(null);

//   const router = useRouter();

//   useEffect(() => {
//     setUserId(localStorage.getItem("userId"));
//   }, []);

//   useEffect(() => {
//     const checkIfMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     checkIfMobile();
//     window.addEventListener('resize', checkIfMobile);
//     return () => window.removeEventListener('resize', checkIfMobile);
//   }, []);

//   const fetchFollowRequests = async () => {
//     if (!userId) return;

//     try {
//       const res = await fetch('/api/profile/me', {
//         method: 'GET',
//         headers: {
//           'x-user-id': userId,
//         },
//       });

//       const data = await res.json();
//       if (data && data.followRequests) {
//         setRequests(data.followRequests);
//       }
//     } catch (err) {
//       console.error('Error fetching follow requests:', err);
//     }
//   };

//   useEffect(() => {
//     if (userId) {
//       fetchFollowRequests();
//     }
//   }, [userId]);

//   const handleAccept = async (requesterId: string, e: React.MouseEvent) => {
//     e.stopPropagation();
//     if (!userId) return;

//     setLoading(true);
//     try {
//       const res = await fetch('/api/follow-request/accept', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'x-user-id': userId,
//         },
//         body: JSON.stringify({ requesterId }),
//       });

//       const data = await res.json();
//       if (data.success) {
//         setRequests(prev => prev.filter(r => r.userId !== requesterId));
//       }
//     } catch (err) {
//       console.error('Accept error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleReject = async (requesterId: string, e: React.MouseEvent) => {
//     e.stopPropagation();
//     if (!userId) return;

//     setLoading(true);
//     try {
//       const res = await fetch('/api/follow-request/reject', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'x-user-id': userId,
//         },
//         body: JSON.stringify({ requesterId }),
//       });

//       const data = await res.json();
//       if (data.success) {
//         setRequests(prev => prev.filter(r => r.userId !== requesterId));
//       }
//     } catch (err) {
//       console.error('Reject error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUserClick = (userId: string) => {
//     router.push(`/user/${userId}`);
//   };

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Main content */}
//       <div className="flex-1 overflow-auto">
//         {/* Header */}
//         <Header/>

//         {/* Follow Requests Content */}
//         <div className="">
//           {requests.length === 0 ? (
//             <div className="flex flex-col items-center bg-white rounded-xl shadow-sm p-6 min-h-[90vh] pt-[vh]">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
//               </svg>
//               <p className="text-gray-500 text-lg font-medium">No follow requests yet</p>
//               <p className="text-gray-400 text-sm mt-1">When you receive follow requests, they'll appear here</p>
//             </div>
//           ) : (
//             <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//               <div className="border-b border-gray-100 p-5">
//                 <h2 className="text-xl font-semibold text-gray-800">Follow Requests</h2>
//                 <p className="text-sm text-gray-500 mt-1">{requests.length} pending request{requests.length !== 1 ? 's' : ''}</p>
//               </div>
              
//               <div className="divide-y divide-gray-100">
//                 {requests.map(request => (
//                   <div
//                     key={request.userId}
//                     className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
//                     onClick={() => handleUserClick(request.userId)}
//                   >
//                     <div className="flex items-center gap-4">
//                       <div className="relative">
//                         <Image
//                           src={request.profile_image_url || '/default-avatar.png'}
//                           alt={request.userName}
//                           width={56}
//                           height={56}
//                           className="rounded-full object-cover border border-gray-200"
//                         />
//                         <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
//                             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                           </svg>
//                         </div>
//                       </div>
//                       <div>
//                         <span className="text-gray-800 font-medium block">{request.userName}</span>
//                         <span className="text-gray-500 text-sm">Wants to follow you</span>
//                       </div>
//                     </div>

//                     <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
//                       {isMobile ? (
//                         <>
//                           <button
//                             onClick={(e) => handleAccept(request.userId, e)}
//                             disabled={loading}
//                             className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200"
//                             aria-label="Accept"
//                           >
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                             </svg>
//                           </button>
//                           <button
//                             onClick={(e) => handleReject(request.userId, e)}
//                             disabled={loading}
//                             className="p-2 bg-white text-gray-700 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
//                             aria-label="Reject"
//                           >
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                             </svg>
//                           </button>
//                         </>
//                       ) : (
//                         <>
//                           <button
//                             onClick={(e) => handleAccept(request.userId, e)}
//                             disabled={loading}
//                             className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200 flex items-center gap-1"
//                           >
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                             </svg>
//                             Accept
//                           </button>
//                           <button
//                             onClick={(e) => handleReject(request.userId, e)}
//                             disabled={loading}
//                             className="px-4 py-2 bg-white text-gray-700 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors duration-200 flex items-center gap-1"
//                           >
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                             </svg>
//                             Reject
//                           </button>
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }






'use client';

import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import Header from "@/components/Header3";

interface User {
  userId: string;
  userName: string;
  profile_image_url?: string;
  profession?: string;
  interests?: string[];
}

interface FollowRequest extends User {
  isFollowing?: boolean;
  hasRequested?: boolean;
}

interface SuggestedProfile extends User {
  isFollowing: boolean;
  hasRequested: boolean;
}

export default function FollowRequests() {
  const [requests, setRequests] = useState<FollowRequest[]>([]);
  const [suggestedProfiles, setSuggestedProfiles] = useState<SuggestedProfile[]>([]);
  const [loading, setLoading] = useState({
    requests: true,
    suggestions: true
  });
  const [isMobile, setIsMobile] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [processing, setProcessing] = useState<Record<string, boolean>>({});

  const router = useRouter();

  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
  }, []);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const fetchData = async () => {
    if (!userId) return;

    try {
      // Fetch both requests and suggested profiles in parallel
      const [requestsRes, suggestedRes] = await Promise.all([
        fetch('/api/profile/me', {
          method: 'GET',
          headers: { 'x-user-id': userId },
        }),
        fetch('/api/suggested-profiles', {
          method: 'GET',
          headers: { 'x-user-id': userId },
        })
      ]);

      const [requestsData, suggestedData] = await Promise.all([
        requestsRes.json(),
        suggestedRes.json()
      ]);

      if (requestsData && requestsData.followRequests) {
        setRequests(requestsData.followRequests.map((req: any) => ({
          userId: req.userId._id.toString(),
          userName: req.userId.userName,
          profile_image_url: req.userId.profile_image_url,
          isFollowing: false,
          hasRequested: true
        })));
      }

      if (suggestedData) {
        setSuggestedProfiles(suggestedData.map((user: any) => ({
          userId: user._id.toString(),
          userName: user.userName,
          profile_image_url: user.profile_image_url,
          profession: user.profession,
          interests: user.interests,
          isFollowing: false,
          hasRequested: false
        })));
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      toast.error('Failed to load data');
    } finally {
      setLoading({ requests: false, suggestions: false });
    }
  };

  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId]);

  const handleAccept = async (requesterId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!userId) return;

    setProcessing(prev => ({ ...prev, [requesterId]: true }));
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
        toast.success('Request accepted');
      }
    } catch (err) {
      console.error('Accept error:', err);
      toast.error('Failed to accept request');
    } finally {
      setProcessing(prev => ({ ...prev, [requesterId]: false }));
    }
  };

  const handleReject = async (requesterId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!userId) return;

    setProcessing(prev => ({ ...prev, [requesterId]: true }));
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
        toast.success('Request rejected');
      }
    } catch (err) {
      console.error('Reject error:', err);
      toast.error('Failed to reject request');
    } finally {
      setProcessing(prev => ({ ...prev, [requesterId]: false }));
    }
  };

  const handleFollow = async (userIdToFollow: string) => {
    if (!userId) return;

    setProcessing(prev => ({ ...prev, [userIdToFollow]: true }));
    try {
      const res = await fetch('/api/follow-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': userId,
        },
        body: JSON.stringify({ userIdToRequest: userIdToFollow }),
      });

      const data = await res.json();
      if (data.success) {
        setSuggestedProfiles(prev => prev.map(user => 
          user.userId === userIdToFollow ? { ...user, hasRequested: true } : user
        ));
        toast.success('Follow request sent');
      }
    } catch (err) {
      console.error('Follow error:', err);
      toast.error('Failed to send follow request');
    } finally {
      setProcessing(prev => ({ ...prev, [userIdToFollow]: false }));
    }
  };

  const handleUserClick = (userId: string) => {
    router.push(`/user/${userId}`);
  };

  const renderFollowButton = (user: SuggestedProfile) => {
    if (user.hasRequested) {
      return (
        <button 
          disabled
          className="px-4 py-1.5 text-sm font-medium rounded-full border border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed"
        >
          Requested
        </button>
      );
    }

    return (
      <button 
        onClick={(e) => {
          e.stopPropagation();
          handleFollow(user.userId);
        }}
        disabled={processing[user.userId]}
        className="px-4 py-1.5 text-sm font-medium rounded-full border border-gray-300 bg-white text-blue-600 hover:bg-blue-50 transition-colors disabled:opacity-50"
      >
        {processing[user.userId] ? 'Processing...' : 'Follow'}
      </button>
    );
  };

  const isLoading = loading.requests || loading.suggestions;

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 overflow-auto">
        <Header/>

        <div className="max-w-4xl mx-auto p-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              {/* Follow Requests Section */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
                <div className="border-b border-gray-100 p-5">
                  <h2 className="text-xl font-semibold text-gray-800">Follow Requests</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {requests.length} pending request{requests.length !== 1 ? 's' : ''}
                  </p>
                </div>

                {requests.length === 0 ? (
                  <div className="p-8 flex flex-col items-center justify-center text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <p className="text-gray-500 text-lg font-medium">No follow requests yet</p>
                    <p className="text-gray-400 text-sm mt-1">When you receive follow requests, they'll appear here</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {requests.map(request => (
                      <div
                        key={request.userId}
                        className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                        onClick={() => handleUserClick(request.userId)}
                      >
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <Image
                              src={request.profile_image_url || '/default-avatar.png'}
                              alt={request.userName}
                              width={56}
                              height={56}
                              className="rounded-full object-cover border border-gray-200"
                            />
                          </div>
                          <div>
                            <span className="text-gray-800 font-medium block">{request.userName}</span>
                            <span className="text-gray-500 text-sm">Wants to follow you</span>
                          </div>
                        </div>

                        <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
                          {isMobile ? (
                            <>
                              <button
                                onClick={(e) => handleAccept(request.userId, e)}
                                disabled={processing[request.userId]}
                                className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200"
                                aria-label="Accept"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </button>
                              <button
                                onClick={(e) => handleReject(request.userId, e)}
                                disabled={processing[request.userId]}
                                className="p-2 bg-white text-gray-700 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                                aria-label="Reject"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={(e) => handleAccept(request.userId, e)}
                                disabled={processing[request.userId]}
                                className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200 flex items-center gap-1"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Accept
                              </button>
                              <button
                                onClick={(e) => handleReject(request.userId, e)}
                                disabled={processing[request.userId]}
                                className="px-4 py-2 bg-white text-gray-700 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors duration-200 flex items-center gap-1"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Reject
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Suggested Profiles Section */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="border-b border-gray-100 p-5">
                  <h3 className="text-lg font-medium text-gray-900">Suggested Profiles</h3>
                  <p className="text-gray-500 text-sm mt-1">Discover new people to follow</p>
                </div>

                {suggestedProfiles.length === 0 ? (
                  <div className="p-8 flex flex-col items-center justify-center text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-500">No suggestions available</h3>
                    <p className="text-gray-400 mt-1">You might be following everyone already!</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {suggestedProfiles.map(user => (
                      <div
                        key={user.userId}
                        className="p-4 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                        onClick={() => handleUserClick(user.userId)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 flex-1">
                            <div className="relative">
                              <Image
                                src={user.profile_image_url || '/default-avatar.png'}
                                alt={user.userName}
                                width={48}
                                height={48}
                                className="rounded-full object-cover border border-gray-200"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-gray-800 font-medium">{user.userName}</h4>
                              {user.profession && (
                                <p className="text-gray-500 text-sm">{user.profession}</p>
                              )}
                              {user.interests && user.interests.length > 0 && (
                                <p className="text-gray-400 text-xs mt-1">
                                  Interests: {user.interests.slice(0, 3).join(', ')}
                                  {user.interests.length > 3 ? '...' : ''}
                                </p>
                              )}
                            </div>
                          </div>
                          {renderFollowButton(user)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}