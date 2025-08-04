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
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [isOn, setIsOn] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [userId, setUserId] = useState<string | null>(null);

//   const router = useRouter();

//   useEffect(() => {
//     // This code only runs on the client side
//     setUserId(localStorage.getItem("userId"));
//     console.log(localStorage.getItem("userId"));
//   }, []);

//   const handleNext = (projectName: string, startFrom: string) => {
//     console.log("Project created:", { projectName, startFrom });
//     router.push(`/studio?title=${encodeURIComponent(projectName)}`);
//     setShowModal(false);
//   };

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

//   const handleAccept = async (requesterId: string) => {
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

//   const handleReject = async (requesterId: string) => {
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

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Main content */}
//       <div className="flex-1 overflow-auto">
//         {/* Header */}
//         <Header/>

//         {/* Follow Requests Content */}
//         <div className="">
//           {requests.length === 0 ? (
//             <div className=" flex flex-col items-center   bg-white rounded-xl shadow-sm p-6 min-h-[90vh] pt-[vh]">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
//               </svg>
//               <p className="text-gray-500 text-lg font-medium">No follow requests yet</p>
//               <p className="text-gray-400 text-sm mt-1">When you receive follow requests, they'll appear here</p>
//             </div>
//           ) : (
//             <div className="bg-white rounded-xl shadow-sm  overflow-hidden">
//               <div className="border-b border-gray-100 p-5">
//                 <h2 className="text-xl font-semibold text-gray-800">Follow Requests</h2>
//                 <p className="text-sm text-gray-500 mt-1">{requests.length} pending request{requests.length !== 1 ? 's' : ''}</p>
//               </div>
              
//               <div className="divide-y divide-gray-100 ">
//                 {requests.map(request => (
//                   <div
//                     key={request.userId}
//                     className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors duration-150"
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

//                     <div className="flex gap-3">
//                       {isMobile ? (
//                         <>
//                           <button
//                             onClick={() => handleAccept(request.userId)}
//                             disabled={loading}
//                             className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200"
//                             aria-label="Accept"
//                           >
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                             </svg>
//                           </button>
//                           <button
//                             onClick={() => handleReject(request.userId)}
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
//                             onClick={() => handleAccept(request.userId)}
//                             disabled={loading}
//                             className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200 flex items-center gap-1"
//                           >
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                             </svg>
//                             Accept
//                           </button>
//                           <button
//                             onClick={() => handleReject(request.userId)}
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

import Header from "@/components/Header3"

interface FollowRequest {
  userId: string;
  userName: string;
  profile_image_url?: string;
}

export default function FollowRequests() {
  const [requests, setRequests] = useState<FollowRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

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

  const fetchFollowRequests = async () => {
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
    if (userId) {
      fetchFollowRequests();
    }
  }, [userId]);

  const handleAccept = async (requesterId: string, e: React.MouseEvent) => {
    e.stopPropagation();
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

  const handleReject = async (requesterId: string, e: React.MouseEvent) => {
    e.stopPropagation();
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

  const handleUserClick = (userId: string) => {
    router.push(`/user/${userId}`);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <Header/>

        {/* Follow Requests Content */}
        <div className="">
          {requests.length === 0 ? (
            <div className="flex flex-col items-center bg-white rounded-xl shadow-sm p-6 min-h-[90vh] pt-[vh]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <p className="text-gray-500 text-lg font-medium">No follow requests yet</p>
              <p className="text-gray-400 text-sm mt-1">When you receive follow requests, they'll appear here</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="border-b border-gray-100 p-5">
                <h2 className="text-xl font-semibold text-gray-800">Follow Requests</h2>
                <p className="text-sm text-gray-500 mt-1">{requests.length} pending request{requests.length !== 1 ? 's' : ''}</p>
              </div>
              
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
                        <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
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
                            disabled={loading}
                            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200"
                            aria-label="Accept"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </button>
                          <button
                            onClick={(e) => handleReject(request.userId, e)}
                            disabled={loading}
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
                            disabled={loading}
                            className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200 flex items-center gap-1"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Accept
                          </button>
                          <button
                            onClick={(e) => handleReject(request.userId, e)}
                            disabled={loading}
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}