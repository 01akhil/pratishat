'use client';

import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";

import Image from 'next/image';
import Link from 'next/link';
import CreateProjectModal from '@/components/create-project-modal';

import Finance from "../assets/finance.png";
import Home from "../../../assets/Home.png";
import Inbox from "../../../assets/Inbox.png";
import Notification from "../../../assets/Notification.png";
import Kate from "../../../assets/Kate.png";
import Eco from "../../../assets/Eco.png";
import Miro from "../../../assets/Miro.png";
import Abode from "../../../assets/Abode.png";
import Canvas from "../../../assets/Canvas.png";


import {  Plus, Settings, HelpCircle, Moon,  Notebook } from "lucide-react";

import UserSearch from '@/components/UserSearch';

interface FollowRequest {
  userId: string;
  userName: string;
  profile_image_url?: string;
}

export default function FollowRequests() {
  const [requests, setRequests] = useState<FollowRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOn, setIsOn] = useState(false);
  const [showModal, setShowModal] = useState(false);

   const router = useRouter();

  const id=localStorage.getItem("userId");
    console.log(id)

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
                onClick={() => router.push(`/user/${id}`)}
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

        {/* Follow Requests Content */}
        <div className="">
          {requests.length === 0 ? (
            <div className=" flex flex-col items-center justify-center min-h-[200px] bg-white rounded-xl shadow-sm p-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <p className="text-gray-500 text-lg font-medium">No follow requests yet</p>
              <p className="text-gray-400 text-sm mt-1">When you receive follow requests, they'll appear here</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm  overflow-hidden">
              <div className="border-b border-gray-100 p-5">
                <h2 className="text-xl font-semibold text-gray-800">Follow Requests</h2>
                <p className="text-sm text-gray-500 mt-1">{requests.length} pending request{requests.length !== 1 ? 's' : ''}</p>
              </div>
              
              <div className="divide-y divide-gray-100 ">
                {requests.map(request => (
                  <div
                    key={request.userId}
                    className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors duration-150"
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

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleAccept(request.userId)}
                        disabled={loading}
                        className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200 flex items-center gap-1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(request.userId)}
                        disabled={loading}
                        className="px-4 py-2 bg-white text-gray-700 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors duration-200 flex items-center gap-1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Reject
                      </button>
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