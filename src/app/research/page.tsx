// 'use client';

// import React, { useState } from 'react';
// import  chart from "../../assets/chart.png"
// import create_research_paper from "../../assets/create-research-paper.png"
// import profile from "../../assets/profile.png"
// import participants from "../../assets/participants.png"
// import submissions from "../../assets/submissions.png"
// import Image from 'next/image';
// import Link from 'next/link';

// import { 
//   PencilIcon, 
//   XMarkIcon, 
//   ChevronUpIcon, 
//   ChevronDownIcon, 
//   PlusIcon, 
//   InboxIcon, 
//   QuestionMarkCircleIcon 
// } from '@heroicons/react/24/outline';

// const Research = () => {
//   return (
//     <div className="flex h-screen bg-white ">
//       {/* Left Sidebar */}
//       <div className="w-64 border-r border-gray-200 flex flex-col ">
//         <div className="p-4 border-b border-gray-200 flex items-center">
//           <div className="w-8 h-4 bg-gray-200 flex items-center justify-center rounded">
//             <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
//               <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
//               <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
//               <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
//             </svg>
//           </div>
//           <span className="ml-3 text-sm font-bold text-gray-700">Project Name</span>
//           <PencilIcon className="w-4 h-4 ml-auto text-gray-500" />
//         </div>
        
//         <div className="p-4">
         

//           <Link href='/proposal' className='cursor:pointer'>
//              <div className="flex items-center mb-6">
//             <div className="w-6 h-6 bg-emerald-100 rounded-sm flex items-center justify-center">
//             <Image src={chart} alt="" />
            
//             </div>
//             <span className="ml-3 text-xs font-medium text-gray-700">Create Proposal</span>
//           </div>
//           </Link>

//           <Link href='/survey' className='cursor:pointer'>
//              <div className="flex items-center mb-6">
//             <div className="w-6 h-6 bg-[#4fd1c5] rounded-full flex items-center justify-center">
//               <PlusIcon className="w-4 h-4 text-white" />
//             </div>
//             <span className="ml-3 text-xs font-medium text-gray-500">Create Survey</span>
//           </div>
//           </Link>
          
//           <Link href='/survey' className='cursor:pointer'>
//              <div className="flex items-center mb-6">
//             <div className="w-6 h-6 bg-gray-100 rounded-sm flex items-center justify-center">
//              <Image src={create_research_paper} alt="" />
//             </div>
//             <span className="ml-3 text-xs font-medium text-gray-500">Create Research Paper</span>
//           </div>
//           </Link>
          
          

//           <Link href="/chat/46" className="flex items-center mb-6 cursor-pointer">
//   <div className="w-6 h-6 bg-gray-100 rounded-sm flex items-center justify-center">
//     <Image src={create_research_paper} alt="" />
//   </div>
//   <span className="ml-3 text-xs font-medium text-gray-500">AI to create research paper</span>
// </Link>

          
//         </div>

        
        
//         <div className="mt-2 px-4">
//           <h3 className="text-xs font-semibold text-gray-500 tracking-wider uppercase mb-4">ACCOUNT PAGES</h3>
//           <div className="flex items-center mb-6">
//             <div className="w-6 h-6 flex items-center justify-center">
//               <Image src={profile} alt="" />
//             </div>
//             <span className="ml-3 text-sm font-medium text-gray-500">Profile</span>
//           </div>
//         </div>
        
//         <div className="mt-4 px-4">
//           <h3 className="text-xs font-semibold text-gray-500 tracking-wider uppercase mb-4">INSIGHTS</h3>
//           <div className="flex items-center mb-6">
//             <div className="w-6 h-6 flex items-center justify-center">
//               <svg className="w-5 h-5 text-[#5ad4c8]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M3 12H7L10 19L14 5L17 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg>
//             </div>
//             <span className="ml-3 text-sm font-medium text-gray-500">Performance</span>
//           </div>

//           <h3 className='text-xs text-[#67717e] mb-4'>Quick Look</h3>

//           <div className="flex items-center mb-4">
//             <div className="w-6 h-6 flex items-center justify-center">
//              <Image src={participants} alt="" />
//             </div>
//             <span className="ml-3 text-sm font-medium text-gray-500">500 impressions</span>
//           </div>

//           <div className="flex items-center mb-6">
//             <div className="w-6 h-6 flex items-center justify-center">
//              <Image src={submissions} alt="" />
//             </div>
//             <span className="ml-3 text-sm font-medium text-gray-500">390 submissions</span>
//           </div>
//         </div>


//         <div className="mt-4 px-4">
//           <h3 className="text-xs font-semibold text-gray-500 tracking-wider uppercase mb-4">Share</h3>
//           <div className="flex items-center mb-6">
//             <div className="w-6 h-6 flex items-center justify-center">
//               <svg className="w-5 h-5 text-[#5ad4c8]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M3 12H7L10 19L14 5L17 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg>
//             </div>
//             <span className="ml-3 text-sm font-medium text-gray-500">Performance</span>
//           </div>

          
//         </div>
        
      
//       </div>
      
//       {/* Main Content */}
//       <div className="flex-1 flex overflow-y-auto s">
//         <div className="flex-1 overflow-auto">
//           <div className="p-6 border-b border-gray-200">
//             <div className="flex items-center justify-between ">
//               <div className="relative w-full mt-7">
//                 <input 
//                   type="text" 
//                   className="w-full text-xs border border-gray-300 rounded-lg py-3 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="Give a title to research paper"
                 
//                 />
//                 <PencilIcon className="w-3 h-3 text-gray-800 absolute right-3 top-1/2 transform -translate-y-1/2" />
//               </div>
             
//             </div>




//             <div className="mt-4 mx-4">
//           <div className="bg-[#4fd1c5] rounded-lg p-4 text-white">
            
//             <h3 className="font-medium mb-1">Fetch Survey Reports</h3>
//             <p className="text-xs text-white text-opacity-90">Get survey results in this research</p>
//           </div>
//         </div>


            
            
//             <div className="mt-4">      

//               <h2 className="text-sm font-medium text-gray-700 mb-2">Abstract</h2>
//               <div className="border border-gray-300 rounded-lg p-4 mb-2">
//                 <textarea 
//                   className="w-full text-sm h-40 resize-none focus:outline-none text-gray-700" 
//                   placeholder="Description / Purpose of the proposal"
//                 ></textarea>
//                 <div className="flex items-center border-t border-gray-200 pt-3 mt-2">
//                   <button className="p-1 text-gray-500 mr-1">
//                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
//                     </svg>
//                   </button>
//                   <button className="p-1 text-gray-500 mr-1 font-bold">B</button>
//                   <button className="p-1 text-gray-500 mr-1 italic">I</button>
//                   <button className="p-1 text-gray-500 mr-1 underline">U</button>
//                   <button className="p-1 text-gray-500 mr-1">
//                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
//                     </svg>
//                   </button>
//                   <button className="p-1 text-gray-500 mr-1">
//                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
//                     </svg>
//                   </button>
//                   <button className="p-1 text-gray-500 mr-1">
//                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                     </svg>
//                   </button>
//                   <button className="p-1 text-gray-500 mr-1">
//                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8M4 18h8" />
//                     </svg>
//                   </button>
//                   <button className="p-1 text-gray-500 mr-1">
//                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                     </svg>
//                   </button>
//                 </div>
//               </div>
              
//             </div>
            
//             <div className="mt-8">
//               <h2 className="text-sm font-medium text-gray-700 mb-4">Introduction</h2>
//               <input 
//                 type="text" 
//                 className="w-full border border-gray-300 rounded-lg py-2 px-4 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>
            
//             <div className="mt-4">
//               <h2 className="text-sm font-medium text-gray-700 mb-2">Literature Review</h2>
//               <input 
//                 type="text" 
//                 className="w-full border border-gray-300 rounded-lg py-2 px-4 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>
            
//             <div className="mt-4">
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-sm font-medium text-gray-700">Upload Thumbnail</h2>
//                 <ChevronDownIcon className="w-5 h-5 text-gray-500" />
//               </div>
//               <div className="border border-gray-300 border-dashed rounded-lg p-6 mb-6 flex items-center justify-center">
//                 <p className="text-gray-500">Drag & Drop thumbnail for survey</p>
//               </div>
//             </div>
            
//             <div className="mt-4">
//               <h2 className="text-sm font-medium text-gray-700 mb-2">Add collaborators / invitation</h2>
//               <input 
//                 type="text" 
//                 className="w-full text-sm border border-gray-300 rounded-lg py-2 px-4 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Add collaborators"
//               />
//             </div>

//             <div className="mt-4">

//               <h2 className="text-sm font-medium text-gray-700 mb-2">Methodology</h2>
//               <div className="border border-gray-300 rounded-lg p-4 mb-2">
//                 <textarea 
//                   className="w-full text-sm h-40 resize-none focus:outline-none text-gray-700" 
//                   placeholder="Description / Purpose of the proposal"
//                 ></textarea>
//                 <div className="flex items-center border-t border-gray-200 pt-3 mt-2">
//                   <button className="p-1 text-gray-500 mr-1">
//                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
//                     </svg>
//                   </button>
//                   <button className="p-1 text-gray-500 mr-1 font-bold">B</button>
//                   <button className="p-1 text-gray-500 mr-1 italic">I</button>
//                   <button className="p-1 text-gray-500 mr-1 underline">U</button>
//                   <button className="p-1 text-gray-500 mr-1">
//                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
//                     </svg>
//                   </button>
//                   <button className="p-1 text-gray-500 mr-1">
//                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
//                     </svg>
//                   </button>
//                   <button className="p-1 text-gray-500 mr-1">
//                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                     </svg>
//                   </button>
//                   <button className="p-1 text-gray-500 mr-1">
//                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8M4 18h8" />
//                     </svg>
//                   </button>
//                   <button className="p-1 text-gray-500 mr-1">
//                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                     </svg>
//                   </button>
//                 </div>
//               </div>
              
//             </div>

//             <div className="mt-4">
//               <h2 className="text-sm font-medium text-gray-700 mb-2">Result</h2>
//               <input 
//                 type="text" 
//                 className="w-full text-sm border border-gray-300 rounded-lg py-2 px-4 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Result"
//               />
//             </div>

//             <div className="mt-4">
//               <h2 className="text-sm font-medium text-gray-700 mb-2">Discussion</h2>
//               <input 
//                 type="text" 
//                 className="w-full text-sm border border-gray-300 rounded-lg py-2 px-4 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Discussion"
//               />
//             </div>

//             <div className="mt-4">
//               <h2 className="text-sm font-medium text-gray-700 mb-2">Conclusion</h2>
//               <input 
//                 type="text" 
//                 className="w-full text-sm border border-gray-300 rounded-lg py-2 px-4 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Conclusion"
//               />
//             </div>

//             <div className="mt-4">
//               <h2 className="text-sm font-medium text-gray-700 mb-2">References</h2>
//               <input 
//                 type="text" 
//                 className="w-full text-sm border border-gray-300 rounded-lg py-2 px-4 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="References"
//               />
//             </div>

//              <div className="mt-4">
//               <h2 className="text-sm font-medium text-gray-700 mb-2">Appendices</h2>
//               <input 
//                 type="text" 
//                 className="w-full text-sm border border-gray-300 rounded-lg py-2 px-4 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Appendices"
//               />
//             </div>
            
//             <div className="mt-8 flex justify-center">
//               <button className="bg-[#4fd1c5] text-white rounded-lg px-16 py-3 font-medium cursor-pointer">
//                 Create Research
//               </button>
//             </div>
//           </div>
//         </div>
        
//         {/* Right Sidebar */}
//         <div className="w-64 border-l border-gray-200 p-4" >

//         <div className="flex items-center mb-6 ">
//                 <button className="text-xs border border-gray-300 rounded-lg px-4 py-1 text-gray-700 mr-2">
//                   Draft
//                 </button>
//                 <button className="text-xs bg-purple-500 text-white rounded-lg px-6 py-1 ml-2">
//                   Publish
//                 </button>
//                 <button className="ml-10 text-gray-400">
//                   <XMarkIcon className="w-6 h-6" />
//                 </button>
//               </div>

//           <div className="flex items-center mb-6">
//             <InboxIcon className="w-5 h-5 text-gray-500 mr-2" />
//             <span className="text-gray-700 text-xs">Inbox</span>
//           </div>
          
//           <div className="mt-8">
//             <p className="text-sm text-gray-500 mb-4">Add members</p>
            
//             <div className="mb-3">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center">
//                   <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-sm mr-2">
//                     W
//                   </div>
//                   <span className="text-sm">William Henry</span>
//                 </div>
//                 <button className="text-gray-400">
//                   <PlusIcon className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
            
//             <div className="mb-3">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center">
//                   <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white text-sm mr-2">
//                     J
//                   </div>
//                   <span className="text-sm">James Douglas</span>
//                 </div>
//                 <button className="text-gray-400">
//                   <PlusIcon className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
            
//             <div className="mb-3">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center">
//                   <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm mr-2">
//                     A
//                   </div>
//                   <span className="text-sm">Alexander Mathew</span>
//                 </div>
//                 <button className="text-gray-400">
//                   <PlusIcon className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
            
//             <div className="mb-3">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center">
//                   <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm mr-2">
//                     R
//                   </div>
//                   <span className="text-sm">Robert Phillips</span>
//                 </div>
//                 <button className="text-gray-400">
//                   <PlusIcon className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="mt-6 mb-4 ">
//           <div className="bg-[#4fd1c5] rounded-lg p-4 text-white cursor-pointer">
           
//             <h3 className="font-medium mb-1 ">Create Research Using AI</h3>
//             <p className="text-xs text-white text-opacity-90">Just a click and upload your PDF</p>
//           </div>
//           <span className="text-xs p-6">
//   Use <span className="text-[#3751fe] font-medium cursor-pointer">this</span> format of research PDF
// </span>

//         </div>
          
        
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Research;



'use client';

import React, { useState } from 'react';
import chart from "../../assets/chart.png";
import create_research_paper from "../../assets/create-research-paper.png";
import profile from "../../assets/profile.png";
import participants from "../../assets/participants.png";
import submissions from "../../assets/submissions.png";
import Image from 'next/image';
import Link from 'next/link';
import { 
  PencilIcon, 
  XMarkIcon, 
  ChevronUpIcon, 
  ChevronDownIcon, 
  PlusIcon, 
  InboxIcon, 
  QuestionMarkCircleIcon,
  Bars3Icon
} from '@heroicons/react/24/outline';

const Research = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showRightSidebar, setShowRightSidebar] = useState(false);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-white">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200">
        <button onClick={() => setShowSidebar(!showSidebar)}>
          <Bars3Icon className="w-6 h-6 text-gray-600" />
        </button>
        <span className="text-sm font-bold text-gray-700">Project Name</span>
        <button onClick={() => setShowRightSidebar(!showRightSidebar)}>
          <Bars3Icon className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* Left Sidebar */}
      <div className={`${showSidebar ? 'block' : 'hidden'} md:block w-full md:w-64 border-r border-gray-200 flex flex-col`}>
        <div className="p-4 border-b border-gray-200 flex items-center">
          <div className="w-8 h-4 bg-gray-200 flex items-center justify-center rounded">
            <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
              <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
              <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
              <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
          <span className="ml-3 text-sm font-bold text-gray-700">Project Name</span>
          <PencilIcon className="w-4 h-4 ml-auto text-gray-500" />
        </div>
        
        <div className="p-4">
          <Link href='/proposal' className='cursor:pointer'>
            <div className="flex items-center mb-6">
              <div className="w-6 h-6 bg-emerald-100 rounded-sm flex items-center justify-center">
                <Image src={chart} alt="" />
              </div>
              <span className="ml-3 text-xs font-medium text-gray-700">Create Proposal</span>
            </div>
          </Link>

          <Link href='/survey' className='cursor:pointer'>
            <div className="flex items-center mb-6">
              <div className="w-6 h-6 bg-[#4fd1c5] rounded-full flex items-center justify-center">
                <PlusIcon className="w-4 h-4 text-white" />
              </div>
              <span className="ml-3 text-xs font-medium text-gray-500">Create Survey</span>
            </div>
          </Link>
          
          <Link href='/survey' className='cursor:pointer'>
            <div className="flex items-center mb-6">
              <div className="w-6 h-6 bg-gray-100 rounded-sm flex items-center justify-center">
                <Image src={create_research_paper} alt="" />
              </div>
              <span className="ml-3 text-xs font-medium text-gray-500">Create Research Paper</span>
            </div>
          </Link>
          
          <Link href="/chat/46" className="flex items-center mb-6 cursor-pointer">
            <div className="w-6 h-6 bg-gray-100 rounded-sm flex items-center justify-center">
              <Image src={create_research_paper} alt="" />
            </div>
            <span className="ml-3 text-xs font-medium text-gray-500">AI to create research paper</span>
          </Link>
        </div>
        
        <div className="mt-2 px-4">
          <h3 className="text-xs font-semibold text-gray-500 tracking-wider uppercase mb-4">ACCOUNT PAGES</h3>
          <div className="flex items-center mb-6">
            <div className="w-6 h-6 flex items-center justify-center">
              <Image src={profile} alt="" />
            </div>
            <span className="ml-3 text-sm font-medium text-gray-500">Profile</span>
          </div>
        </div>
        
        <div className="mt-4 px-4">
          <h3 className="text-xs font-semibold text-gray-500 tracking-wider uppercase mb-4">INSIGHTS</h3>
          <div className="flex items-center mb-6">
            <div className="w-6 h-6 flex items-center justify-center">
              <svg className="w-5 h-5 text-[#5ad4c8]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12H7L10 19L14 5L17 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="ml-3 text-sm font-medium text-gray-500">Performance</span>
          </div>

          <h3 className='text-xs text-[#67717e] mb-4'>Quick Look</h3>

          <div className="flex items-center mb-4">
            <div className="w-6 h-6 flex items-center justify-center">
              <Image src={participants} alt="" />
            </div>
            <span className="ml-3 text-sm font-medium text-gray-500">500 impressions</span>
          </div>

          <div className="flex items-center mb-6">
            <div className="w-6 h-6 flex items-center justify-center">
              <Image src={submissions} alt="" />
            </div>
            <span className="ml-3 text-sm font-medium text-gray-500">390 submissions</span>
          </div>
        </div>

        <div className="mt-4 px-4">
          <h3 className="text-xs font-semibold text-gray-500 tracking-wider uppercase mb-4">Share</h3>
          <div className="flex items-center mb-6">
            <div className="w-6 h-6 flex items-center justify-center">
              <svg className="w-5 h-5 text-[#5ad4c8]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12H7L10 19L14 5L17 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="ml-3 text-sm font-medium text-gray-500">Performance</span>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex overflow-y-auto">
        <div className="flex-1 overflow-auto">
          <div className="p-4 md:p-6 border-b border-gray-200">
            <div className="relative w-full mt-4 md:mt-7">
              <input 
                type="text" 
                className="w-full text-xs border border-gray-300 rounded-lg py-3 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Give a title to research paper"
              />
              <PencilIcon className="w-3 h-3 text-gray-800 absolute right-3 top-1/2 transform -translate-y-1/2" />
            </div>

            <div className="mt-4 mx-0 md:mx-4">
              <div className="bg-[#4fd1c5] rounded-lg p-4 text-white">
                <h3 className="font-medium mb-1">Fetch Survey Reports</h3>
                <p className="text-xs text-white text-opacity-90">Get survey results in this research</p>
              </div>
            </div>
            
            <div className="mt-4">      
              <h2 className="text-sm font-medium text-gray-700 mb-2">Abstract</h2>
              <div className="border border-gray-300 rounded-lg p-4 mb-2">
                <textarea 
                  className="w-full text-sm h-40 resize-none focus:outline-none text-gray-700" 
                  placeholder="Description / Purpose of the proposal"
                ></textarea>
                <div className="flex items-center border-t border-gray-200 pt-3 mt-2 overflow-x-auto">
                  <button className="p-1 text-gray-500 mr-1">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                  </button>
                  <button className="p-1 text-gray-500 mr-1 font-bold">B</button>
                  <button className="p-1 text-gray-500 mr-1 italic">I</button>
                  <button className="p-1 text-gray-500 mr-1 underline">U</button>
                  <button className="p-1 text-gray-500 mr-1">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                    </svg>
                  </button>
                  <button className="p-1 text-gray-500 mr-1">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                  </button>
                  <button className="p-1 text-gray-500 mr-1">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                  <button className="p-1 text-gray-500 mr-1">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8M4 18h8" />
                    </svg>
                  </button>
                  <button className="p-1 text-gray-500 mr-1">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h2 className="text-sm font-medium text-gray-700 mb-4">Introduction</h2>
              <input 
                type="text" 
                className="w-full border border-gray-300 rounded-lg py-2 px-4 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="mt-4">
              <h2 className="text-sm font-medium text-gray-700 mb-2">Literature Review</h2>
              <input 
                type="text" 
                className="w-full border border-gray-300 rounded-lg py-2 px-4 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="mt-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-medium text-gray-700">Upload Thumbnail</h2>
                <ChevronDownIcon className="w-5 h-5 text-gray-500" />
              </div>
              <div className="border border-gray-300 border-dashed rounded-lg p-6 mb-6 flex items-center justify-center">
                <p className="text-gray-500">Drag & Drop thumbnail for survey</p>
              </div>
            </div>
            
            <div className="mt-4">
              <h2 className="text-sm font-medium text-gray-700 mb-2">Add collaborators / invitation</h2>
              <input 
                type="text" 
                className="w-full text-sm border border-gray-300 rounded-lg py-2 px-4 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Add collaborators"
              />
            </div>

            <div className="mt-4">
              <h2 className="text-sm font-medium text-gray-700 mb-2">Methodology</h2>
              <div className="border border-gray-300 rounded-lg p-4 mb-2">
                <textarea 
                  className="w-full text-sm h-40 resize-none focus:outline-none text-gray-700" 
                  placeholder="Description / Purpose of the proposal"
                ></textarea>
                <div className="flex items-center border-t border-gray-200 pt-3 mt-2 overflow-x-auto">
                  <button className="p-1 text-gray-500 mr-1">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                  </button>
                  <button className="p-1 text-gray-500 mr-1 font-bold">B</button>
                  <button className="p-1 text-gray-500 mr-1 italic">I</button>
                  <button className="p-1 text-gray-500 mr-1 underline">U</button>
                  <button className="p-1 text-gray-500 mr-1">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                    </svg>
                  </button>
                  <button className="p-1 text-gray-500 mr-1">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                  </button>
                  <button className="p-1 text-gray-500 mr-1">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                  <button className="p-1 text-gray-500 mr-1">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8M4 18h8" />
                    </svg>
                  </button>
                  <button className="p-1 text-gray-500 mr-1">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h2 className="text-sm font-medium text-gray-700 mb-2">Result</h2>
              <input 
                type="text" 
                className="w-full text-sm border border-gray-300 rounded-lg py-2 px-4 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Result"
              />
            </div>

            <div className="mt-4">
              <h2 className="text-sm font-medium text-gray-700 mb-2">Discussion</h2>
              <input 
                type="text" 
                className="w-full text-sm border border-gray-300 rounded-lg py-2 px-4 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Discussion"
              />
            </div>

            <div className="mt-4">
              <h2 className="text-sm font-medium text-gray-700 mb-2">Conclusion</h2>
              <input 
                type="text" 
                className="w-full text-sm border border-gray-300 rounded-lg py-2 px-4 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Conclusion"
              />
            </div>

            <div className="mt-4">
              <h2 className="text-sm font-medium text-gray-700 mb-2">References</h2>
              <input 
                type="text" 
                className="w-full text-sm border border-gray-300 rounded-lg py-2 px-4 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="References"
              />
            </div>

            <div className="mt-4">
              <h2 className="text-sm font-medium text-gray-700 mb-2">Appendices</h2>
              <input 
                type="text" 
                className="w-full text-sm border border-gray-300 rounded-lg py-2 px-4 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Appendices"
              />
            </div>
            
            <div className="mt-8 flex justify-center">
              <button className="bg-[#4fd1c5] text-white rounded-lg px-8 md:px-16 py-3 font-medium cursor-pointer">
                Create Research
              </button>
            </div>
          </div>
        </div>
        
        {/* Right Sidebar */}
        <div className={`${showRightSidebar ? 'block' : 'hidden'} md:block w-full md:w-64 border-l border-gray-200 p-4`}>
          <div className="flex items-center mb-6">
            <button className="text-xs border border-gray-300 rounded-lg px-4 py-1 text-gray-700 mr-2">
              Draft
            </button>
            <button className="text-xs bg-purple-500 text-white rounded-lg px-6 py-1 ml-2">
              Publish
            </button>
            <button className="ml-4 md:ml-10 text-gray-400" onClick={() => setShowRightSidebar(false)}>
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="flex items-center mb-6">
            <InboxIcon className="w-5 h-5 text-gray-500 mr-2" />
            <span className="text-gray-700 text-xs">Inbox</span>
          </div>
          
          <div className="mt-8">
            <p className="text-sm text-gray-500 mb-4">Add members</p>
            
            <div className="mb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-sm mr-2">
                    W
                  </div>
                  <span className="text-sm">William Henry</span>
                </div>
                <button className="text-gray-400">
                  <PlusIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="mb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white text-sm mr-2">
                    J
                  </div>
                  <span className="text-sm">James Douglas</span>
                </div>
                <button className="text-gray-400">
                  <PlusIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="mb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm mr-2">
                    A
                  </div>
                  <span className="text-sm">Alexander Mathew</span>
                </div>
                <button className="text-gray-400">
                  <PlusIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="mb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm mr-2">
                    R
                  </div>
                  <span className="text-sm">Robert Phillips</span>
                </div>
                <button className="text-gray-400">
                  <PlusIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 mb-4">
            <div className="bg-[#4fd1c5] rounded-lg p-4 text-white cursor-pointer">
              <h3 className="font-medium mb-1">Create Research Using AI</h3>
              <p className="text-xs text-white text-opacity-90">Just a click and upload your PDF</p>
            </div>
            <span className="text-xs p-6">
              Use <span className="text-[#3751fe] font-medium cursor-pointer">this</span> format of research PDF
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Research;