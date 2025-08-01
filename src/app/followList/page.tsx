// 'use client';

// import { useEffect, useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';

// import { Bell, Plus, Search, Settings, HelpCircle, Moon, MessageCircle, Share2, ChevronDown, Heart, ChevronRight, Notebook, Menu, X } from "lucide-react";
// import UserSearch from '@/components/UserSearch';
// import { toast } from 'react-hot-toast';

// import { useRouter } from "next/navigation";
// import CreateProjectModal from '@/components/create-project-modal';


// import Finance from "../assets/finance.png";
// import Home from "../../assets/Home.png";
// import Inbox from "../../assets/Inbox.png";
// import Notification from "../../assets/Notification.png";
// import Kate from "../../assets/Kate.png";
// import Eco from "../../assets/Eco.png";
// import Miro from "../../assets/Miro.png";
// import Abode from "../../assets/Abode.png";
// import Canvas from "../../assets/Canvas.png";
// import comment from "../../assets/comment.png";
// import share from "../../assets/share.png";
// import illustration from "../../assets/illustration.png";
// import Icon from "../../assets/Icons.png";
// import Retweet from "../../assets/retweet.png";



// interface UserSummary {
//   userId: string;
//   userName: string;
//   profile_image_url?: string;
// }

// export default function FollowList() {
//   const [followers, setFollowers] = useState<UserSummary[]>([]);
//   const [following, setFollowing] = useState<UserSummary[]>([]);
//   const [tab, setTab] = useState<'followers' | 'following'>('followers');
//   const [loading, setLoading] = useState(true);
//   const [isMobile, setIsMobile] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [isOn, setIsOn] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [processing, setProcessing] = useState<Record<string, boolean>>({});
//    const router = useRouter();
   
//   const id=localStorage.getItem("userId");
//     console.log(id)

//     const handleNext = (projectName: string, startFrom: string) => {
//         console.log("Project created:", { projectName, startFrom });
//         router.push(`/studio?title=${encodeURIComponent(projectName)}`);
//         setShowModal(false);
//     };


//   useEffect(() => {
//     const checkIfMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     checkIfMobile();
//     window.addEventListener('resize', checkIfMobile);
//     return () => window.removeEventListener('resize', checkIfMobile);
//   }, []);

//   useEffect(() => {
//     const fetchFollowList = async () => {
//       const userId = localStorage.getItem('userId');
//       if (!userId) return;

//       try {
//         const res = await fetch('/api/follow-list', {
//           method: 'GET',
//           headers: { 'x-user-id': userId },
//         });

//         const data = await res.json();
//         setFollowers(data.followers || []);
//         setFollowing(data.following || []);
//       } catch (err) {
//         console.error('Error fetching follow list:', err);
//         toast.error('Failed to load follow list');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFollowList();
//   }, []);

//   const handleFollow = async (userId: string) => {
//   try {
//     setProcessing(prev => ({ ...prev, [userId]: true }));
//     const currentUserId = localStorage.getItem('userId');
//     if (!currentUserId) return;

//     const res = await fetch(`/api/follow-request`, {
//       method: 'POST',
//       headers: { 
//         'Content-Type': 'application/json',
//         'x-user-id': currentUserId 
//       },
//       body: JSON.stringify({ userIdToRequest: userId }),
//     });

//     const data = await res.json();
    
//     if (!res.ok || !data.success) {
//       toast.error(data.message || 'Failed to send follow request');
//       return;
//     }

//     toast.success('Follow request sent successfully');
//   } catch (err) {
//     console.error('Error sending follow request:', err);
//     toast.error('Failed to send follow request');
//   } finally {
//     setProcessing(prev => ({ ...prev, [userId]: false }));
//   }
// };

//   const handleUnfollow = async (userId: string) => {
//     try {
//       setProcessing(prev => ({ ...prev, [userId]: true }));
//       const currentUserId = localStorage.getItem('userId');
//       if (!currentUserId) return;

//       // Optimistic update
//       setFollowing(prev => prev.filter(user => user.userId !== userId));

//       const res = await fetch(`/api/unfollow/${userId}`, {
//         method: 'POST',
//         headers: { 'x-user-id': currentUserId },
//       });

//       if (!res.ok) {
//         // Revert if API fails - we'd need to fetch the correct state here
//         const updatedRes = await fetch('/api/follow-list', {
//           method: 'GET',
//           headers: { 'x-user-id': currentUserId },
//         });
//         const data = await updatedRes.json();
//         setFollowing(data.following || []);
//         const error = await res.json();
//         toast.error(error.message || 'Failed to unfollow user');
//         return;
//       }

//       toast.success('Unfollowed successfully');
//     } catch (err) {
//       console.error('Error unfollowing user:', err);
//       // Revert on error - fetch correct state
//       const currentUserId = localStorage.getItem('userId');
//       if (currentUserId) {
//         const updatedRes = await fetch('/api/follow-list', {
//           method: 'GET',
//           headers: { 'x-user-id': currentUserId },
//         });
//         const data = await updatedRes.json();
//         setFollowing(data.following || []);
//       }
//       toast.error('Failed to unfollow user');
//     } finally {
//       setProcessing(prev => ({ ...prev, [userId]: false }));
//     }
//   };

//   const activeList = tab === 'followers' ? followers : following;

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Sidebar */}
//       <div className={`${isMobile ? (mobileMenuOpen ? 'fixed inset-0 z-40 w-64 bg-white' : 'hidden') : 'w-64'} border-r border-gray-100 p-6 flex flex-col overflow-y-auto scrollbar-hide`}>
//         {!isMobile && (
//           <div className="">
//             <h1 className="text-xl font-bold text-[#2d3e50]">
//               Prati<span className="text-[#a8d5ba]">Shat</span>
//             </h1>
//           </div>
//         )}
        
//         {/* Navigation */}
//         <nav className="space-y-4 mt-10">
//           <div className="flex items-center gap-3 text-gray-600 hover:text-gray-900 cursor-pointer">
//             <Image src={Home} alt="" width={15} height={20} className='h-[20px] w-[15px]'/>
//             <span className="text-sm">Home</span>
//           </div>
//           <div className="flex items-center gap-3 text-gray-600 hover:text-gray-900 cursor-pointer">
//             <Image src={Inbox} alt="" width={14} height={13.5} className='h-[13.5px] w-[14px]'/>
//             <span className="text-sm">Inbox</span>
//           </div>
//           <div className="flex items-center gap-3 text-gray-600 hover:text-gray-900 cursor-pointer">
//             <Image src={Notification} alt="" width={14} height={14} className='h-[14px] w-[14px]'/>
//             <span className="text-sm">Notifications</span>
//           </div>

//           <Link href='/studio' className='mt-3'>
//             <div className="flex items-center gap-3 mt-3 text-gray-600 hover:text-gray-900 cursor-pointer">
//               <Notebook className='text-gray-400 w-[16px]'/>
//               <span className="text-sm">Studio</span>
//             </div>
//           </Link>
//         </nav>

//         {/* Topics */}
//         <div className="mt-8">
//           <div className="flex items-center justify-between mb-4">
//             <span className="text-sm text-gray-500">Topics</span>
//             <button className="text-gray-400 hover:text-gray-600">
//               <Plus size={18} />
//             </button>
//           </div>

//           <div className="space-y-3">
            
//             <div className="flex items-center gap-3 cursor-pointer">
//                                             <div className="w-6 h-6 bg-blue-900 rounded-md flex items-center justify-center text-white text-xs">
//                                                 <Image src={Eco} alt="" />
//                                             </div>
//                                             <span className="text-sm font-semibold">Economics</span>
//                                         </div>

//                                         <div className="flex items-center gap-3 cursor-pointer">
//                                 <div className="w-6 h-6 bg-yellow-500 rounded-md flex items-center justify-center text-white text-xs">
//                                     <Image src={Miro} alt="" />
//                                 </div>
//                                 <span className="text-black text-sm font-semibold">Politics</span>
//                             </div>
//                             <div className="flex items-center gap-3 cursor-pointer">
//                                 <div className="w-6 h-6 bg-red-500 rounded-md flex items-center justify-center text-white text-xs">
//                                     <Image src={Abode} alt="" />
//                                 </div>
//                                 <span className="text-black text-sm font-semibold">Health</span>
//                             </div>
//                             <div className="flex items-center gap-3 cursor-pointer">
//                                 <div className="w-6 h-6 bg-blue-500 rounded-md flex items-center justify-center text-white text-xs">
//                                     <Image src={Canvas} alt="" />
//                                 </div>
//                                 <span className="text-black text-sm font-semibold">Lifestyle</span>
//                             </div>

//           </div>
//         </div>

//         {/* Groups */}
//         <div className="mt-8">
//           <div className="flex items-center justify-between mb-4">
//             <span className="text-sm text-gray-500">Groups</span>
//             <button className="text-gray-400 hover:text-gray-600">
//               <Plus size={18} />
//             </button>
//           </div>

//             <div className="space-y-3">
//                                       <div className="flex items-center gap-3 cursor-pointer">
//                                           <div className="w-6 h-6 bg-blue-900 rounded-md flex items-center justify-center text-white text-xs">
//                                               <Image src={Eco} alt="" />
//                                           </div>
//                                           <span className="text-black text-sm font-semibold">Figma</span>
//                                       </div>
//                                       <div className="flex items-center gap-3 cursor-pointer">
//                                           <div className="w-6 h-6 bg-yellow-500 rounded-md flex items-center justify-center text-white text-xs">
//                                               <Image src={Miro} alt="" />
//                                           </div>
//                                           <span className="text-black text-sm font-semibold">Miro</span>
//                                       </div>
//                                       <div className="flex items-center gap-3 cursor-pointer">
//                                           <div className="w-6 h-6 bg-red-500 rounded-md flex items-center justify-center text-white text-xs">
//                                               <Image src={Abode} alt="" />
//                                           </div>
//                                           <span className="text-black text-sm font-semibold">Adobe</span>
//                                       </div>
//                                       <div className="flex items-center gap-3 cursor-pointer">
//                                           <div className="w-6 h-6 bg-blue-500 rounded-md flex items-center justify-center text-white text-xs">
//                                               <Image src={Canvas} alt="" />
//                                           </div>
//                                           <span className="text-black text-sm font-semibold">Canva</span>
//                                       </div>
//                                   </div>
          
//         </div>

//         {/* Bottom items */}
//         <div className="mt-10 space-y-4">
//           <div className="flex items-center gap-3 text-gray-600 hover:text-gray-900 cursor-pointer">
//             <Settings size={20} />
//             <span className="text-sm font-semibold">Settings</span>
//           </div>
//           <div className="flex items-center gap-3 text-gray-600 hover:text-gray-900 cursor-pointer">
//             <HelpCircle size={20} />
//             <span className="text-sm font-semibold">Help & support</span>
//           </div>

//           {/* Dark mode toggle */}
//           <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
//             <div className="flex items-center gap-3">
//               <Moon size={20} className="text-gray-500" />
//               <span className="text-gray-600 text-sm font-semibold">Dark Mode</span>
//             </div>
//             <div
//               className={`w-12 h-6 flex items-center px-1 rounded-full cursor-pointer transition-all ${
//                 isOn ? "bg-blue-500" : "bg-gray-400"
//               }`}
//               onClick={() => setIsOn(!isOn)}
//             >
//               <div
//                 className={`w-4 h-4 bg-white rounded-full transition-all ${
//                   isOn ? "translate-x-6" : "translate-x-0"
//                 }`}
//               ></div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main content */}
//       <div className="flex-1 overflow-auto">
//         {/* Header */}
//        <header className="h-16 border-b border-gray-100 flex items-center justify-between px-4 md:px-6 md:justify-end gap-4">
                        
//                         <div className="flex items-center gap-4 ml-10">
//                           {isMobile && (
//                             <div className="md:hidden">
//                                 <h1 className="text-xl font-bold text-[#2d3e50]">
//                                     Prati<span className="text-[#a8d5ba]">Shat</span>
//                                 </h1>
//                             </div>
//                         )}

//                             <div className='ml-[18vw] flex items-center gap-4 '>
//                               <button className="text-gray-400 hover:text-gray-600 mr-[0vh] w-[30vw] ">
                                
//                                 <UserSearch />
//                             </button>
//                             <button
//                                 onClick={() => setShowModal(true)}
//                                 className="text-[#000000] hover:text-gray-600 font-extrabold cursor-pointer"
//                             >
//                                 <Plus size={23} />
//                             </button>
//                              <button
//         onClick={() => router.push(`/user/${id}`)}
//         className="text-[#000000] hover:text-blue-600 font-medium"
//       >
//         My Profile
//       </button>
                            
//                             </div>
//                         </div>
//                     </header>

//                     {showModal && (
//                         <CreateProjectModal
//                             onCloseAction={() => setShowModal(false)}
//                             onNextAction={handleNext}
//                         />
//                     )}

//         {/* Follow List Content */}
//         <div className="">
//           <div className="bg-white rounded-xl shadow-sm overflow-hidden min-h-[90vh]">
//             <div className="border-b border-gray-100 p-5">
             
//               <div className="flex mt-4">
//                 <button
//                   onClick={() => setTab('followers')}
//                   className={`px-6 py-3 text-sm font-medium border-b-2 ${
//                     tab === 'followers' 
//                       ? 'border-blue-500 text-blue-600' 
//                       : 'border-transparent text-gray-500 hover:text-gray-700'
//                   }`}
//                 >
//                   Followers
//                   {followers.length > 0 && (
//                     <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
//                       {followers.length}
//                     </span>
//                   )}
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
//                   {following.length > 0 && (
//                     <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
//                       {following.length}
//                     </span>
//                   )}
//                 </button>
//               </div>
//             </div>

//             {loading ? (
//               <div className="p-8 flex flex-col items-center justify-center">
//                 <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
//                 <p className="text-gray-500">Loading...</p>
//               </div>
//             ) : activeList.length === 0 ? (
//               <div className="p-8 flex flex-col items-center justify-center text-center">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
//                 </svg>
//                 <h3 className="text-lg font-medium text-gray-500">No {tab} yet</h3>
//                 <p className="text-gray-400 mt-1 max-w-md">
//                   {tab === 'followers' 
//                     ? "When people follow you, they'll appear here" 
//                     : "People you follow will appear here"}
//                 </p>
//               </div>
//             ) : (
//               <div className="divide-y divide-gray-100">
//                 {activeList.map((user) => (
//                   // <div key={user.userId} className="p-4 hover:bg-gray-50 transition-colors duration-150">
//                   //   <div className="flex items-center justify-between">
//                   //     <div className="flex items-center gap-4">
//                   //       <div className="relative">
//                   //         <Image
//                   //           src={user.profile_image_url || '/default-avatar.png'}
//                   //           alt={user.userName}
//                   //           width={48}
//                   //           height={48}
//                   //           className="rounded-full object-cover border border-gray-200"
//                   //         />
//                   //         <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
//                   //           <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
//                   //             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                   //           </svg>
//                   //         </div>
//                   //       </div>
//                   //       <div>
//                   //         <h4 className="text-gray-800 font-medium">{user.userName}</h4>
//                   //         <p className="text-gray-500 text-sm">{tab === 'followers' ? 'Follows you' : 'You follow'}</p>
//                   //       </div>
//                   //     </div>
//                   //     {tab === 'followers' ? (
//                   //       <button 
//                   //         onClick={() => handleFollow(user.userId)}
//                   //         disabled={processing[user.userId]}
//                   //         className="text-blue-600 hover:text-blue-800 text-sm font-medium disabled:opacity-50"
//                   //       >
//                   //         {processing[user.userId] ? 'Processing...' : 'Follow back'}
//                   //       </button>
//                   //     ) : (
//                   //       <button 
//                   //         onClick={() => handleUnfollow(user.userId)}
//                   //         disabled={processing[user.userId]}
//                   //         className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50"
//                   //       >
//                   //         {processing[user.userId] ? 'Processing...' : 'Unfollow'}
//                   //       </button>
//                   //     )}
//                   //   </div>
//                   // </div>


//                   <div key={user.userId} className="p-4 hover:bg-gray-50 transition-colors duration-150">
//   <div className="flex items-center justify-between">
//     <Link href={`/user/${user.userId}`} className="flex items-center gap-4 flex-1">
//       <div className="relative">
//         <Image
//           src={user.profile_image_url || '/default-avatar.png'}
//           alt={user.userName}
//           width={48}
//           height={48}
//           className="rounded-full object-cover border border-gray-200"
//         />
//         <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
//             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//           </svg>
//         </div>
//       </div>
//       <div>
//         <h4 className="text-gray-800 font-medium">{user.userName}</h4>
//         <p className="text-gray-500 text-sm">{tab === 'followers' ? 'Follows you' : 'You follow'}</p>
//       </div>
//     </Link>
//     {tab === 'followers' ? (
//       <button 
//         onClick={() => handleFollow(user.userId)}
//         disabled={processing[user.userId]}
//         className="text-blue-600 hover:text-blue-800 text-sm font-medium disabled:opacity-50"
//       >
//         {processing[user.userId] ? 'Processing...' : 'Follow back'}
//       </button>
//     ) : (
//       <button 
//         onClick={() => handleUnfollow(user.userId)}
//         disabled={processing[user.userId]}
//         className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50"
//       >
//         {processing[user.userId] ? 'Processing...' : 'Unfollow'}
//       </button>
//     )}
//   </div>
// </div>
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

import { Bell, Plus, Search, Settings, HelpCircle, Moon, MessageCircle, Share2, ChevronDown, Heart, ChevronRight, Notebook, Menu, X } from "lucide-react";
import UserSearch from '@/components/UserSearch';
import { toast } from 'react-hot-toast';

import { useRouter } from "next/navigation";
import CreateProjectModal from '@/components/create-project-modal';

import Finance from "../assets/finance.png";
import Home from "../../assets/Home.png";
import Inbox from "../../assets/Inbox.png";
import Notification from "../../assets/Notification.png";
import Kate from "../../assets/Kate.png";
import Eco from "../../assets/Eco.png";
import Miro from "../../assets/Miro.png";
import Abode from "../../assets/Abode.png";
import Canvas from "../../assets/Canvas.png";
import comment from "../../assets/comment.png";
import share from "../../assets/share.png";
import illustration from "../../assets/illustration.png";
import Icon from "../../assets/Icons.png";
import Retweet from "../../assets/retweet.png";

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
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOn, setIsOn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [processing, setProcessing] = useState<Record<string, boolean>>({});
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // This code will only run on the client side
    setUserId(localStorage.getItem("userId"));
    console.log(localStorage.getItem("userId"));
  }, []);

  const handleNext = (projectName: string, startFrom: string) => {
    console.log("Project created:", { projectName, startFrom });
    router.push(`/studio?title=${encodeURIComponent(projectName)}`);
    setShowModal(false);
  };

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

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
        toast.error('Failed to load follow list');
      } finally {
        setLoading(false);
      }
    };

    fetchFollowList();
  }, []);

  const handleFollow = async (userId: string) => {
    try {
      setProcessing(prev => ({ ...prev, [userId]: true }));
      const currentUserId = localStorage.getItem('userId');
      if (!currentUserId) return;

      const res = await fetch(`/api/follow-request`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-user-id': currentUserId 
        },
        body: JSON.stringify({ userIdToRequest: userId }),
      });

      const data = await res.json();
      
      if (!res.ok || !data.success) {
        toast.error(data.message || 'Failed to send follow request');
        return;
      }

      toast.success('Follow request sent successfully');
    } catch (err) {
      console.error('Error sending follow request:', err);
      toast.error('Failed to send follow request');
    } finally {
      setProcessing(prev => ({ ...prev, [userId]: false }));
    }
  };

  const handleUnfollow = async (userId: string) => {
    try {
      setProcessing(prev => ({ ...prev, [userId]: true }));
      const currentUserId = localStorage.getItem('userId');
      if (!currentUserId) return;

      // Optimistic update
      setFollowing(prev => prev.filter(user => user.userId !== userId));

      const res = await fetch(`/api/unfollow/${userId}`, {
        method: 'POST',
        headers: { 'x-user-id': currentUserId },
      });

      if (!res.ok) {
        // Revert if API fails - we'd need to fetch the correct state here
        const updatedRes = await fetch('/api/follow-list', {
          method: 'GET',
          headers: { 'x-user-id': currentUserId },
        });
        const data = await updatedRes.json();
        setFollowing(data.following || []);
        const error = await res.json();
        toast.error(error.message || 'Failed to unfollow user');
        return;
      }

      toast.success('Unfollowed successfully');
    } catch (err) {
      console.error('Error unfollowing user:', err);
      // Revert on error - fetch correct state
      const currentUserId = localStorage.getItem('userId');
      if (currentUserId) {
        const updatedRes = await fetch('/api/follow-list', {
          method: 'GET',
          headers: { 'x-user-id': currentUserId },
        });
        const data = await updatedRes.json();
        setFollowing(data.following || []);
      }
      toast.error('Failed to unfollow user');
    } finally {
      setProcessing(prev => ({ ...prev, [userId]: false }));
    }
  };

  const activeList = tab === 'followers' ? followers : following;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${isMobile ? (mobileMenuOpen ? 'fixed inset-0 z-40 w-64 bg-white' : 'hidden') : 'w-64'} border-r border-gray-100 p-6 flex flex-col overflow-y-auto scrollbar-hide`}>
        {!isMobile && (
          <div className="">
            <h1 className="text-xl font-bold text-[#2d3e50]">
              Prati<span className="text-[#a8d5ba]">Shat</span>
            </h1>
          </div>
        )}
        
        {/* Navigation */}
        <nav className="space-y-4 mt-10">
          <div className="flex items-center gap-3 text-gray-600 hover:text-gray-900 cursor-pointer">
            <Image src={Home} alt="" width={15} height={20} className='h-[20px] w-[15px]'/>
            <span className="text-sm">Home</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600 hover:text-gray-900 cursor-pointer">
            <Image src={Inbox} alt="" width={14} height={13.5} className='h-[13.5px] w-[14px]'/>
            <span className="text-sm">Inbox</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600 hover:text-gray-900 cursor-pointer">
            <Image src={Notification} alt="" width={14} height={14} className='h-[14px] w-[14px]'/>
            <span className="text-sm">Notifications</span>
          </div>

          <Link href='/studio' className='mt-3'>
            <div className="flex items-center gap-3 mt-3 text-gray-600 hover:text-gray-900 cursor-pointer">
              <Notebook className='text-gray-400 w-[16px]'/>
              <span className="text-sm">Studio</span>
            </div>
          </Link>
        </nav>

        {/* Topics */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500">Topics</span>
            <button className="text-gray-400 hover:text-gray-600">
              <Plus size={18} />
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-6 h-6 bg-blue-900 rounded-md flex items-center justify-center text-white text-xs">
                <Image src={Eco} alt="" />
              </div>
              <span className="text-sm font-semibold">Economics</span>
            </div>

            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-6 h-6 bg-yellow-500 rounded-md flex items-center justify-center text-white text-xs">
                <Image src={Miro} alt="" />
              </div>
              <span className="text-black text-sm font-semibold">Politics</span>
            </div>
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-6 h-6 bg-red-500 rounded-md flex items-center justify-center text-white text-xs">
                <Image src={Abode} alt="" />
              </div>
              <span className="text-black text-sm font-semibold">Health</span>
            </div>
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-6 h-6 bg-blue-500 rounded-md flex items-center justify-center text-white text-xs">
                <Image src={Canvas} alt="" />
              </div>
              <span className="text-black text-sm font-semibold">Lifestyle</span>
            </div>
          </div>
        </div>

        {/* Groups */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500">Groups</span>
            <button className="text-gray-400 hover:text-gray-600">
              <Plus size={18} />
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-6 h-6 bg-blue-900 rounded-md flex items-center justify-center text-white text-xs">
                <Image src={Eco} alt="" />
              </div>
              <span className="text-black text-sm font-semibold">Figma</span>
            </div>
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-6 h-6 bg-yellow-500 rounded-md flex items-center justify-center text-white text-xs">
                <Image src={Miro} alt="" />
              </div>
              <span className="text-black text-sm font-semibold">Miro</span>
            </div>
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-6 h-6 bg-red-500 rounded-md flex items-center justify-center text-white text-xs">
                <Image src={Abode} alt="" />
              </div>
              <span className="text-black text-sm font-semibold">Adobe</span>
            </div>
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-6 h-6 bg-blue-500 rounded-md flex items-center justify-center text-white text-xs">
                <Image src={Canvas} alt="" />
              </div>
              <span className="text-black text-sm font-semibold">Canva</span>
            </div>
          </div>
        </div>

        {/* Bottom items */}
        <div className="mt-10 space-y-4">
          <div className="flex items-center gap-3 text-gray-600 hover:text-gray-900 cursor-pointer">
            <Settings size={20} />
            <span className="text-sm font-semibold">Settings</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600 hover:text-gray-900 cursor-pointer">
            <HelpCircle size={20} />
            <span className="text-sm font-semibold">Help & support</span>
          </div>

          {/* Dark mode toggle */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <Moon size={20} className="text-gray-500" />
              <span className="text-gray-600 text-sm font-semibold">Dark Mode</span>
            </div>
            <div
              className={`w-12 h-6 flex items-center px-1 rounded-full cursor-pointer transition-all ${
                isOn ? "bg-blue-500" : "bg-gray-400"
              }`}
              onClick={() => setIsOn(!isOn)}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full transition-all ${
                  isOn ? "translate-x-6" : "translate-x-0"
                }`}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="h-16 border-b border-gray-100 flex items-center justify-between px-4 md:px-6 md:justify-end gap-4">
          <div className="flex items-center gap-4 ml-10">
            {isMobile && (
              <div className="md:hidden">
                <h1 className="text-xl font-bold text-[#2d3e50]">
                  Prati<span className="text-[#a8d5ba]">Shat</span>
                </h1>
              </div>
            )}

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
                onClick={() => userId && router.push(`/user/${userId}`)}
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

        {/* Follow List Content */}
        <div className="">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden min-h-[90vh]">
            <div className="border-b border-gray-100 p-5">
              <div className="flex mt-4">
                <button
                  onClick={() => setTab('followers')}
                  className={`px-6 py-3 text-sm font-medium border-b-2 ${
                    tab === 'followers' 
                      ? 'border-blue-500 text-blue-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Followers
                  {followers.length > 0 && (
                    <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                      {followers.length}
                    </span>
                  )}
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
                  {following.length > 0 && (
                    <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                      {following.length}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {loading ? (
              <div className="p-8 flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                <p className="text-gray-500">Loading...</p>
              </div>
            ) : activeList.length === 0 ? (
              <div className="p-8 flex flex-col items-center justify-center text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-500">No {tab} yet</h3>
                <p className="text-gray-400 mt-1 max-w-md">
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
                          <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-gray-800 font-medium">{user.userName}</h4>
                          <p className="text-gray-500 text-sm">{tab === 'followers' ? 'Follows you' : 'You follow'}</p>
                        </div>
                      </Link>
                      {tab === 'followers' ? (
                        <button 
                          onClick={() => handleFollow(user.userId)}
                          disabled={processing[user.userId]}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium disabled:opacity-50"
                        >
                          {processing[user.userId] ? 'Processing...' : 'Follow back'}
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleUnfollow(user.userId)}
                          disabled={processing[user.userId]}
                          className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50"
                        >
                          {processing[user.userId] ? 'Processing...' : 'Unfollow'}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}