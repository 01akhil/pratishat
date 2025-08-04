


// 'use client';

// import { useEffect, useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { toast } from 'react-hot-toast';
// import { useRouter } from "next/navigation";
// import Header from "@/components/Header3";

// interface UserSummary {
//   userId: string;
//   userName: string;
//   profile_image_url?: string;
//   profession?: string;
//   interests?: string[];
//   isFollowing?: boolean;
//   hasRequested?: boolean;
// }

// // Type guard to check if error has message property
// function isErrorWithMessage(error: unknown): error is { message: string } {
//   return (
//     typeof error === 'object' &&
//     error !== null &&
//     'message' in error &&
//     typeof (error as Record<string, unknown>).message === 'string'
//   );
// }

// export default function FollowList() {
//   const [followers, setFollowers] = useState<UserSummary[]>([]);
//   const [following, setFollowing] = useState<UserSummary[]>([]);
//   const [suggestedProfiles, setSuggestedProfiles] = useState<UserSummary[]>([]);
//   const [tab, setTab] = useState<'followers' | 'following'>('followers');
//   const [loading, setLoading] = useState({
//     main: true,
//     suggested: true
//   });
//   const [processing, setProcessing] = useState<Record<string, boolean>>({});
//   const router = useRouter();

//   useEffect(() => {
//     const fetchData = async () => {
//       const userId = localStorage.getItem('userId');
//       if (!userId) return;

//       try {
//         // Fetch follow list
//         const followRes = await fetch('/api/follow-list', {
//           headers: { 'x-user-id': userId },
//         });
        
//         if (!followRes.ok) throw new Error('Failed to load follow list');
        
//         const followData = await followRes.json();
        
//         const followersWithStatus = followData.followers?.map((follower: any) => ({
//           userId: follower.userId._id.toString(),
//           userName: follower.userId.userName,
//           profile_image_url: follower.userId.profile_image_url,
//           isFollowing: followData.following?.some(
//             (f: any) => f.userId._id.toString() === follower.userId._id.toString()
//           ),
//           hasRequested: followData.pendingRequests?.some(
//             (r: any) => r.userId._id.toString() === follower.userId._id.toString()
//           )
//         })) || [];

//         const followingWithStatus = followData.following?.map((followed: any) => ({
//           userId: followed.userId._id.toString(),
//           userName: followed.userId.userName,
//           profile_image_url: followed.userId.profile_image_url,
//           isFollowing: true,
//           hasRequested: false
//         })) || [];

//         setFollowers(followersWithStatus);
//         setFollowing(followingWithStatus);
//         setLoading(prev => ({ ...prev, main: false }));

//         // Fetch suggested profiles
//         const suggestedRes = await fetch('/api/suggested-profiles', {
//           headers: { 'x-user-id': userId },
//         });
        
//         if (!suggestedRes.ok) throw new Error('Failed to load suggestions');
        
//         const suggestedData = await suggestedRes.json();
        
//         setSuggestedProfiles(suggestedData.map((user: any) => ({
//           userId: user._id.toString(),
//           userName: user.userName,
//           profile_image_url: user.profile_image_url,
//           profession: user.profession,
//           interests: user.interests,
//           isFollowing: false,
//           hasRequested: false
//         })));
//         setLoading(prev => ({ ...prev, suggested: false }));

//       } catch (err) {
//         console.error('Error fetching data:', err);
//         toast.error(isErrorWithMessage(err) ? err.message : 'Failed to load data');
//         setLoading({ main: false, suggested: false });
//       }
//     };

//     fetchData();
//   }, []);

//   const handleFollow = async (userId: string, isSuggested = false) => {
//     try {
//       setProcessing(prev => ({ ...prev, [userId]: true }));
//       const currentUserId = localStorage.getItem('userId');
//       if (!currentUserId) return;

//       const res = await fetch('/api/follow-request', {
//         method: 'POST',
//         headers: { 
//           'Content-Type': 'application/json',
//           'x-user-id': currentUserId 
//         },
//         body: JSON.stringify({ userIdToRequest: userId }),
//       });

//       const data = await res.json();
      
//       if (!res.ok || !data.success) {
//         throw new Error(data.message || 'Failed to send follow request');
//       }

//       // Update state based on where the follow action came from
//       if (isSuggested) {
//         setSuggestedProfiles(prev => prev.map(user => 
//           user.userId === userId ? { ...user, hasRequested: true } : user
//         ));
//       } else {
//         setFollowers(prev => prev.map(user => 
//           user.userId === userId ? { ...user, hasRequested: true } : user
//         ));
//       }

//       toast.success('Follow request sent');
//     } catch (err) {
//       console.error('Follow error:', err);
//       toast.error(isErrorWithMessage(err) ? err.message : 'Failed to follow user');
//     } finally {
//       setProcessing(prev => ({ ...prev, [userId]: false }));
//     }
//   };

//   const handleUnfollow = async (userId: string) => {
//     try {
//       setProcessing(prev => ({ ...prev, [userId]: true }));
//       const currentUserId = localStorage.getItem('userId');
//       if (!currentUserId) return;

//       const res = await fetch(`/api/unfollow/${userId}`, {
//         method: 'POST',
//         headers: { 'x-user-id': currentUserId },
//       });

//       if (!res.ok) {
//         throw new Error('Failed to unfollow');
//       }

//       // Update all relevant lists
//       setFollowers(prev => prev.map(user => 
//         user.userId === userId ? { ...user, isFollowing: false, hasRequested: false } : user
//       ));
//       setFollowing(prev => prev.filter(user => user.userId !== userId));
//       setSuggestedProfiles(prev => prev.map(user => 
//         user.userId === userId ? { ...user, isFollowing: false, hasRequested: false } : user
//       ));

//       toast.success('Unfollowed successfully');
//     } catch (err) {
//       console.error('Unfollow error:', err);
//       toast.error(isErrorWithMessage(err) ? err.message : 'Failed to unfollow');
//     } finally {
//       setProcessing(prev => ({ ...prev, [userId]: false }));
//     }
//   };

//   const renderFollowButton = (user: UserSummary, isSuggested = false) => {
//     if (user.isFollowing) {
//       return (
//         <button 
//           onClick={() => handleUnfollow(user.userId)}
//           disabled={processing[user.userId]}
//           className="px-4 py-1.5 text-sm font-medium rounded-full border border-gray-300 bg-white text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
//         >
//           {processing[user.userId] ? 'Processing...' : 'Unfollow'}
//         </button>
//       );
//     }

//     if (user.hasRequested) {
//       return (
//         <button 
//           disabled
//           className="px-4 py-1.5 text-sm font-medium rounded-full border border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed"
//         >
//           Requested
//         </button>
//       );
//     }

//     return (
//       <button 
//         onClick={() => handleFollow(user.userId, isSuggested)}
//         disabled={processing[user.userId]}
//         className="px-4 py-1.5 text-sm font-medium rounded-full border border-gray-300 bg-white text-blue-600 hover:bg-blue-50 transition-colors disabled:opacity-50"
//       >
//         {processing[user.userId] ? 'Processing...' : 'Follow'}
//       </button>
//     );
//   };

//   const activeList = tab === 'followers' ? followers : following;

//   return (
//     <div className="flex h-screen bg-gray-50">
//       <div className="flex-1 overflow-auto">
//         <Header/>
        
//         <div className="max-w-4xl mx-auto p-4">
//           {/* Follow List Section */}
//           <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
//             <div className="border-b border-gray-100 p-5">
//               <div className="flex">
//                 <button
//                   onClick={() => setTab('followers')}
//                   className={`px-6 py-3 text-sm font-medium border-b-2 ${
//                     tab === 'followers' 
//                       ? 'border-blue-500 text-blue-600' 
//                       : 'border-transparent text-gray-500 hover:text-gray-700'
//                   }`}
//                 >
//                   Followers
//                   <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
//                     {followers.length}
//                   </span>
//                 </button>
//                 <button
//                   onClick={() => setTab('following')}
//                   className={`px-6 py-3 text-sm font-medium border-b-2 ${
//                     tab === 'following' 
//                       ? 'border-blue-500 text-blue-600' 
//                       : 'border-transparent text-gray-500 hover:text-gray-700'
//                   }`}
//                 >
//                   Following
//                   <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
//                     {following.length}
//                   </span>
//                 </button>
//               </div>
//             </div>

//             {loading.main ? (
//               <div className="p-8 flex flex-col items-center justify-center">
//                 <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
//                 <p className="text-gray-500">Loading connections...</p>
//               </div>
//             ) : activeList.length === 0 ? (
//               <div className="p-8 flex flex-col items-center justify-center text-center">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
//                 </svg>
//                 <h3 className="text-lg font-medium text-gray-500">No {tab} yet</h3>
//                 <p className="text-gray-400 mt-1">
//                   {tab === 'followers' 
//                     ? "When people follow you, they'll appear here" 
//                     : "People you follow will appear here"}
//                 </p>
//               </div>
//             ) : (
//               <div className="divide-y divide-gray-100">
//                 {activeList.map((user) => (
//                   <div key={user.userId} className="p-4 hover:bg-gray-50 transition-colors duration-150">
//                     <div className="flex items-center justify-between">
//                       <Link href={`/user/${user.userId}`} className="flex items-center gap-4 flex-1">
//                         <div className="relative">
//                           <Image
//                             src={user.profile_image_url || '/default-avatar.png'}
//                             alt={user.userName}
//                             width={48}
//                             height={48}
//                             className="rounded-full object-cover border border-gray-200"
//                           />
//                         </div>
//                         <div>
//                           <h4 className="text-gray-800 font-medium">{user.userName}</h4>
//                           <p className="text-gray-500 text-sm">{tab === 'followers' ? 'Follows you' : 'You follow'}</p>
//                         </div>
//                       </Link>
//                       {renderFollowButton(user)}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Suggested Profiles Section */}
//           <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//             <div className="border-b border-gray-100 p-5">
//               <h3 className="text-lg font-medium text-gray-900">Suggested Profiles</h3>
//               <p className="text-gray-500 text-sm mt-1">Discover new people to follow</p>
//             </div>

//             {loading.suggested ? (
//               <div className="p-8 flex flex-col items-center justify-center">
//                 <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
//                 <p className="text-gray-500">Loading suggestions...</p>
//               </div>
//             ) : suggestedProfiles.length === 0 ? (
//               <div className="p-8 flex flex-col items-center justify-center text-center">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
//                 </svg>
//                 <h3 className="text-lg font-medium text-gray-500">No suggestions available</h3>
//                 <p className="text-gray-400 mt-1">You might be following everyone already!</p>
//               </div>
//             ) : (
//               <div className="divide-y divide-gray-100">
//                 {suggestedProfiles.map((user) => (
//                   <div key={user.userId} className="p-4 hover:bg-gray-50 transition-colors duration-150">
//                     <div className="flex items-center justify-between">
//                       <Link href={`/user/${user.userId}`} className="flex items-center gap-4 flex-1">
//                         <div className="relative">
//                           <Image
//                             src={user.profile_image_url || '/default-avatar.png'}
//                             alt={user.userName}
//                             width={48}
//                             height={48}
//                             className="rounded-full object-cover border border-gray-200"
//                           />
//                         </div>
//                         <div className="flex-1">
//                           <h4 className="text-gray-800 font-medium">{user.userName}</h4>
//                           {user.profession && (
//                             <p className="text-gray-500 text-sm">{user.profession}</p>
//                           )}
//                           {user.interests && user.interests.length > 0 && (
//                             <p className="text-gray-400 text-xs mt-1">
//                               Interests: {user.interests.slice(0, 3).join(', ')}
//                               {user.interests.length > 3 ? '...' : ''}
//                             </p>
//                           )}
//                         </div>
//                       </Link>
//                       {renderFollowButton(user, true)}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import Header from "@/components/Header3";

interface UserSummary {
  userId: string;
  userName: string;
  profile_image_url?: string;
  profession?: string;
  interests?: string[];
  isFollowing?: boolean;
  hasRequested?: boolean;
}

function isErrorWithMessage(error: unknown): error is { message: string } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  );
}

export default function FollowList() {
  const [followers, setFollowers] = useState<UserSummary[]>([]);
  const [following, setFollowing] = useState<UserSummary[]>([]);
  const [suggestedProfiles, setSuggestedProfiles] = useState<UserSummary[]>([]);
  const [tab, setTab] = useState<'followers' | 'following'>('followers');
  const [isLoading, setIsLoading] = useState(true);
  const [processing, setProcessing] = useState<Record<string, boolean>>({});
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) return;

      try {
        setIsLoading(true);
        
        // Fetch both follow list and suggested profiles in parallel
        const [followRes, suggestedRes] = await Promise.all([
          fetch('/api/follow-list', { headers: { 'x-user-id': userId } }),
          fetch('/api/suggested-profiles', { headers: { 'x-user-id': userId } })
        ]);

        if (!followRes.ok) throw new Error('Failed to load follow list');
        if (!suggestedRes.ok) throw new Error('Failed to load suggestions');

        const [followData, suggestedData] = await Promise.all([
          followRes.json(),
          suggestedRes.json()
        ]);
        
        // Process followers data
        const followersWithStatus = followData.followers?.map((follower: any) => ({
          userId: follower.userId._id.toString(),
          userName: follower.userId.userName,
          profile_image_url: follower.userId.profile_image_url,
          isFollowing: followData.following?.some(
            (f: any) => f.userId._id.toString() === follower.userId._id.toString()
          ),
          hasRequested: followData.pendingRequests?.some(
            (r: any) => r.userId._id.toString() === follower.userId._id.toString()
          )
        })) || [];

        // Process following data
        const followingWithStatus = followData.following?.map((followed: any) => ({
          userId: followed.userId._id.toString(),
          userName: followed.userId.userName,
          profile_image_url: followed.userId.profile_image_url,
          isFollowing: true,
          hasRequested: false
        })) || [];

        // Process suggested profiles
        const suggestedProfilesWithStatus = suggestedData.map((user: any) => ({
          userId: user._id.toString(),
          userName: user.userName,
          profile_image_url: user.profile_image_url,
          profession: user.profession,
          interests: user.interests,
          isFollowing: false,
          hasRequested: false
        }));

        setFollowers(followersWithStatus);
        setFollowing(followingWithStatus);
        setSuggestedProfiles(suggestedProfilesWithStatus);

      } catch (err) {
        console.error('Error fetching data:', err);
        toast.error(isErrorWithMessage(err) ? err.message : 'Failed to load data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFollow = async (userId: string, isSuggested = false) => {
    try {
      setProcessing(prev => ({ ...prev, [userId]: true }));
      const currentUserId = localStorage.getItem('userId');
      if (!currentUserId) return;

      const res = await fetch('/api/follow-request', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-user-id': currentUserId 
        },
        body: JSON.stringify({ userIdToRequest: userId }),
      });

      const data = await res.json();
      
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to send follow request');
      }

      // Update state
      if (isSuggested) {
        setSuggestedProfiles(prev => prev.map(user => 
          user.userId === userId ? { ...user, hasRequested: true } : user
        ));
      } else {
        setFollowers(prev => prev.map(user => 
          user.userId === userId ? { ...user, hasRequested: true } : user
        ));
      }

      toast.success('Follow request sent');
    } catch (err) {
      console.error('Follow error:', err);
      toast.error(isErrorWithMessage(err) ? err.message : 'Failed to follow user');
    } finally {
      setProcessing(prev => ({ ...prev, [userId]: false }));
    }
  };

  const handleUnfollow = async (userId: string) => {
    try {
      setProcessing(prev => ({ ...prev, [userId]: true }));
      const currentUserId = localStorage.getItem('userId');
      if (!currentUserId) return;

      const res = await fetch(`/api/unfollow/${userId}`, {
        method: 'POST',
        headers: { 'x-user-id': currentUserId },
      });

      if (!res.ok) {
        throw new Error('Failed to unfollow');
      }

      // Update all relevant lists
      setFollowers(prev => prev.map(user => 
        user.userId === userId ? { ...user, isFollowing: false, hasRequested: false } : user
      ));
      setFollowing(prev => prev.filter(user => user.userId !== userId));
      setSuggestedProfiles(prev => prev.map(user => 
        user.userId === userId ? { ...user, isFollowing: false, hasRequested: false } : user
      ));

      toast.success('Unfollowed successfully');
    } catch (err) {
      console.error('Unfollow error:', err);
      toast.error(isErrorWithMessage(err) ? err.message : 'Failed to unfollow');
    } finally {
      setProcessing(prev => ({ ...prev, [userId]: false }));
    }
  };

  const renderFollowButton = (user: UserSummary, isSuggested = false) => {
    if (user.isFollowing) {
      return (
        <button 
          onClick={() => handleUnfollow(user.userId)}
          disabled={processing[user.userId]}
          className="px-4 py-1.5 text-sm font-medium rounded-full border border-gray-300 bg-white text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
        >
          {processing[user.userId] ? 'Processing...' : 'Unfollow'}
        </button>
      );
    }

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
        onClick={() => handleFollow(user.userId, isSuggested)}
        disabled={processing[user.userId]}
        className="px-4 py-1.5 text-sm font-medium rounded-full border border-gray-300 bg-white text-blue-600 hover:bg-blue-50 transition-colors disabled:opacity-50"
      >
        {processing[user.userId] ? 'Processing...' : 'Follow'}
      </button>
    );
  };

  const activeList = tab === 'followers' ? followers : following;

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
              {/* Follow List Section */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
                <div className="border-b border-gray-100 p-5">
                  <div className="flex">
                    <button
                      onClick={() => setTab('followers')}
                      className={`px-6 py-3 text-sm font-medium border-b-2 ${
                        tab === 'followers' 
                          ? 'border-blue-500 text-blue-600' 
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Followers
                      <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                        {followers.length}
                      </span>
                    </button>
                    <button
                      onClick={() => setTab('following')}
                      className={`px-6 py-3 text-sm font-medium border-b-2 ${
                        tab === 'following' 
                          ? 'border-blue-500 text-blue-600' 
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Following
                      <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                        {following.length}
                      </span>
                    </button>
                  </div>
                </div>

                {activeList.length === 0 ? (
                  <div className="p-8 flex flex-col items-center justify-center text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-500">No {tab} yet</h3>
                    <p className="text-gray-400 mt-1">
                      {tab === 'followers' 
                        ? "When people follow you, they'll appear here" 
                        : "People you follow will appear here"}
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {activeList.map((user) => (
                      <div key={user.userId} className="p-4 hover:bg-gray-50 transition-colors duration-150">
                        <div className="flex items-center justify-between">
                          <Link href={`/user/${user.userId}`} className="flex items-center gap-4 flex-1">
                            <div className="relative">
                              <Image
                                src={user.profile_image_url || '/default-avatar.png'}
                                alt={user.userName}
                                width={48}
                                height={48}
                                className="rounded-full object-cover border border-gray-200"
                              />
                            </div>
                            <div>
                              <h4 className="text-gray-800 font-medium">{user.userName}</h4>
                              <p className="text-gray-500 text-sm">{tab === 'followers' ? 'Follows you' : 'You follow'}</p>
                            </div>
                          </Link>
                          {renderFollowButton(user)}
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
                    {suggestedProfiles.map((user) => (
                      <div key={user.userId} className="p-4 hover:bg-gray-50 transition-colors duration-150">
                        <div className="flex items-center justify-between">
                          <Link href={`/user/${user.userId}`} className="flex items-center gap-4 flex-1">
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
                          </Link>
                          {renderFollowButton(user, true)}
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