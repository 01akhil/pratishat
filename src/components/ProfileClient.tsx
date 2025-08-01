// 'use client';

// import { useRef, useState, useEffect } from 'react';
// import { Send } from 'lucide-react';
// import { useRouter } from 'next/navigation';

// interface Props {
//   user: {
//     _id: string;
//     userName: string;
//     gender?: string;
//     profession?: string;
//     experience?: number;
//     nationality?: string;
//     interests?: string[];
//     bio?: string;
//     dob?: string;
//     profile_image_url?: string;
//   };
// }

// export default function ProfileClient({ user }: Props) {
//   const [showMore, setShowMore] = useState(false);
//   const [maxHeight, setMaxHeight] = useState('0px');
//   const contentRef = useRef<HTMLDivElement>(null);
//   const router = useRouter();

//   const age = user.dob
//     ? Math.floor((Date.now() - new Date(user.dob).getTime()) / (1000 * 60 * 60 * 24 * 365.25))
//     : 'N/A';

//   const handleFollowRequestClick = () => {
//     router.push(`/profile/followRequests`);
//   };

//   useEffect(() => {
//     if (showMore && contentRef.current) {
//       setMaxHeight(`${contentRef.current.scrollHeight}px`);
//     } else {
//       setMaxHeight('0px');
//     }
//   }, [showMore]);

//   return (
//     <div className="pt-20 px-8 pb-6 font-sans">
//       <div className="flex justify-between items-start">
//         <div>
//           <h2 className="text-3xl font-semibold flex items-center gap-2 text-gray-900">
//             {user.userName}
//             <span className="text-sm text-gray-500">
//               ({user.gender === 'Male' ? 'He/Him' : 'She/Her'})
//             </span>
//           </h2>
//           <p className="text-gray-600 mt-1 text-base">
//             {user.profession} <span className="text-sm">({user.experience} yrs)</span>
//           </p>
//           <p className="text-sm text-gray-500 mt-1">
//             {user.nationality} ·{' '}
//             <button
//               onClick={() => setShowMore(!showMore)}
//               className="text-blue-700 hover:underline transition-colors font-medium"
//             >
//               Know More
//             </button>
//           </p>
//         </div>

//         <div className="flex flex-col items-end gap-3">
//           <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-1.5 text-sm shadow-sm transition">
//             <div className="flex items-center gap-2">
//               <Send className="w-4 h-4" /> Message
//             </div>
//           </button>

//           <button
//             onClick={handleFollowRequestClick}
//             className="bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300 rounded-full px-4 py-1.5 text-sm transition shadow-sm"
//           >
//             Follow Requests
//           </button>
//         </div>
//       </div>

//       <div
//         ref={contentRef}
//         className="overflow-hidden transition-all duration-700 ease-in-out mt-6"
//         style={{ maxHeight }}
//       >
//         <div className="p-5 border border-gray-200 rounded-xl bg-white shadow-md space-y-3">
//           <p className="text-gray-700">
//             <span className="font-medium text-gray-900">Age:</span> {age}
//           </p>
//           <p className="text-gray-700">
//             <span className="font-medium text-gray-900">Interests:</span>{' '}
//             {user.interests?.join(', ') || 'None'}
//           </p>
//           <p className="text-gray-700">
//             <span className="font-medium text-gray-900">Bio:</span>{' '}
//             {user.bio || 'No bio available.'}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }



'use client';

import { useRef, useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import { useRouter } from 'next/navigation';

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

export default function ProfileClient({ user }: Props) {
  const [showMore, setShowMore] = useState(false);
  const [maxHeight, setMaxHeight] = useState('0px');
  const contentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const age = user.dob
    ? Math.floor((Date.now() - new Date(user.dob).getTime()) / (1000 * 60 * 60 * 24 * 365.25))
    : 'N/A';

  const handleFollowRequestClick = () => {
    router.push(`/profile/followRequests`);
  };

  const handleFollowListClick = () => {
    router.push('/followList');
  };

  useEffect(() => {
    if (showMore && contentRef.current) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setMaxHeight('0px');
    }
  }, [showMore]);

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
        

          <button
            onClick={handleFollowRequestClick}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300 rounded-full px-4 py-1.5 text-sm transition shadow-sm"
          >
            Follow Requests
          </button>

          {/* New LinkedIn-style Follow List Button */}
          <button
            onClick={handleFollowListClick}
            className="flex items-center gap-2 text-gray-700 hover:text-blue-700 transition-colors text-sm font-medium"
          >
            <span>Follow List</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M5.93945 13.3333L4.60612 12L8.93945 7.66665L4.60612 3.33331L5.93945 1.99998L11.6061 7.66665L5.93945 13.3333Z" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </div>

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