"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { Bell, Plus, Search, Settings, HelpCircle, Moon, MessageCircle, Share2, ChevronDown, Heart, ChevronRight, Notebook, Menu, X, User } from "lucide-react";
import Link from 'next/link';

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

import illustration from "../../assets/Illustration.png"
import Icon from "../../assets/Icons.png";
import Retweet from "../../assets/retweet.png";
import CreateProjectModal from '@/components/create-project-modal'
import UserSearch from '@/components/UserSearch';

import { UserButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs";

const Dashboard = () => {
    const [isOn, setIsOn] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const { user } = useUser();
    const [id, setId] = useState<string | null>(null);

    useEffect(() => {
        setId(localStorage.getItem("userId"));
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
        if (user) {
            router.push("/dashboard");
        }
    }, [user, router]);

    const handleToggle = () => {
        setShowDropdown((prev) => !prev);
    };

    return (
        <>
            <div className="flex h-screen bg-white overflow-y-hidden">
                {/* Mobile Menu Button - Adjusted positioning */}
                {isMobile && (
                    <button 
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="fixed top-4 left-4 z-50 p-2 rounded-md"
                    >
                        {mobileMenuOpen ? <X size={24}/> : <Menu size={24} />}
                    </button>
                )}

                {/* Sidebar - Hidden on mobile unless menu is open */}
                <div className={`${isMobile ? (mobileMenuOpen ? 'fixed inset-0 z-40 w-64 bg-white' : 'hidden') : 'w-64'} border-r border-gray-100 p-6 flex flex-col overflow-y-auto scrollbar-hide`}>
                   {/* Logo removed from sidebar for mobile */}
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
                            <Image src={Home} alt="" className='h-[20px] w-[15px]'/>
                            <span className="text-sm">Home</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600 hover:text-gray-900 cursor-pointer">
                            <Image src={Inbox} alt="" className='h-[13.5px] w-[14px]'/>
                            <span className="text-sm">Inbox</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600 hover:text-gray-900 cursor-pointer">
                            <Image src={Notification} alt="" className='h-[14px] w-[14px]'/>
                            <span className="text-sm">Notifications</span>
                        </div>

                        <Link href='/studio' className='mt-3'>
                            <div className="flex items-center gap-3 mt-3 text-gray-600 hover:text-gray-900 cursor-pointer">
                                <Notebook className='text-gray-400 w-[16px]'/>
                                <span className="text-sm">Studio</span>
                            </div>
                        </Link>
                    </nav>

                    {/* Topics and Groups sections remain the same */}
                    {/* ... */}
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
                    {/* Header - Responsive adjustments */}
                    <header className="h-16 border-b border-gray-100 flex items-center justify-between px-4 md:px-6">
                        {/* Mobile Logo - Only shows on mobile */}
                        
                            <div className="flex items-center gap-4 w-full">
                                <div className="md:hidden">
                                    <UserSearch />
                                </div>
                            </div>
                        

                        {/* Right side controls - Adjusted for mobile */}
                        <div className="flex items-center gap-4 ml-auto">
                            <div className="flex items-center gap-4">
                                <div className="hidden md:block">
                                    <UserSearch />
                                </div>
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="text-[#000000] hover:text-gray-600 font-extrabold cursor-pointer"
                                >
                                    <Plus size={23} />
                                </button>
                                <button
                                    onClick={() => router.push(`/user/${id || 'default'}`)}
                                    className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                                >
                                    <User size={18} className="text-gray-600" />
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

                    {/* Main content remains the same */}
                    <main className="p-4 md:pr-6 md:shadow-md md:mt-8 md:pb-1 md:ml-1 md:mr-1 md:rounded-md">
                        <div className="flex flex-col items-center mb-4">
                            <h2 className="text-lg font-semibold text-center mb-3">Rise of GDP in Central Africa</h2>

                            <div className="w-full flex flex-col md:flex-row gap-4">
                                {/* Left side - Chart Image */}
                                <div className="w-full md:w-1/4 flex justify-center">
                                    <Image src={illustration} alt="GDP Chart" className="w-full max-w-xs" />
                                </div>

                                {/* Right side - Progress and Info */}
                                <div className="w-full md:w-3/4">
                                    {/* Progress Steps */}
                                    <div className="flex flex-col mb-4">
                                        {/* Proposal Step */}
                                        <div className="flex mb-2">
                                            <div className="flex flex-col items-center mr-2">
                                                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                                                <div className="h-10 w-0.5 bg-blue-600 mt-1"></div>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xs font-medium text-gray-500">Proposal</h3>
                                                <p className="text-gray-500 text-xs mt-1">
                                                    Accepted: Experts in banking, finance, and economics.
                                                </p>
                                                <p className="text-gray-500 text-xs mt-1">
                                                    <strong>Domains:</strong> Statisticians, Data Scientists, Demographers.
                                                </p>
                                                <div className="text-right">
                                                    <button className="text-gray-500 cursor-pointer text-xs">Read More...</button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Survey Step */}
                                        <div className="flex mb-2">
                                            <div className="flex flex-col items-center mr-2">
                                                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                                                <div className="h-10 w-0.5 bg-blue-600 mt-1"></div>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xs font-medium text-gray-500">Survey</h3>
                                                <p className="text-gray-500 text-xs mt-1">
                                                    <strong>GDP Growth:</strong> Central Africa's GDP rose to <span className="text-blue-600">5.0%</span> in 2022
                                                    from <span className="text-blue-600">3.4%</span> in 2021.
                                                </p>
                                                <div className="text-right">
                                                    <button className="text-gray-500 text-xs cursor-pointer">Read More...</button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Research Step */}
                                        <div className="flex">
                                            <div className="flex flex-col items-center mr-2">
                                                <Image src={Icon} alt="" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xs font-medium text-gray-500">Research</h3>
                                                <p className="text-gray-500 text-xs mt-1">Ongoing study.</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className='flex flex-col sm:flex-row justify-center md:justify-end mb-3 gap-2'>
                                        {/* Contribution Button */}
                                          <button className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
                                        Contribute
                                        <ChevronRight size={15} className="ml-1" />
                                    </button>

                                    {/* View Post Button */}
                                    <button className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors">
                                        View Post
                                        <ChevronRight size={15} className="ml-1" />
                                    </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Engagement Stats */}
                        <div className="flex flex-wrap justify-center md:justify-around items-center text-xs mb-2 gap-4 md:gap-0">
                            <div className="flex items-center space-x-1">
                                <Heart className="text-gray-500" size={18} fill='red' color='red'/>
                                <span className="text-gray-700">25k Upvoted</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Image src={Retweet} alt="" className='h-5'/>
                                <span className="text-gray-700">2.4k Supoorted</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <MessageCircle className="text-gray-500" size={18} />
                                <span className="text-gray-700">4.4k</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Share2 className="text-gray-500" size={18} />
                                <span className="text-gray-700">1.5k</span>
                            </div>
                        </div>
                    </main>

                     <main className="p-4 md:pr-6 md:shadow-md md:mt-8 md:pb-1 md:ml-1 md:mr-1 md:rounded-md">
                        <div className="flex flex-col items-center mb-4">
                            <h2 className="text-lg font-semibold text-center mb-3">Rise of GDP in Central Africa</h2>

                            <div className="w-full flex flex-col md:flex-row gap-4">
                                {/* Left side - Chart Image */}
                                <div className="w-full md:w-1/4 flex justify-center">
                                    <Image src={illustration} alt="GDP Chart" className="w-full max-w-xs" />
                                </div>

                                {/* Right side - Progress and Info */}
                                <div className="w-full md:w-3/4">
                                    {/* Progress Steps */}
                                    <div className="flex flex-col mb-4">
                                        {/* Proposal Step */}
                                        <div className="flex mb-2">
                                            <div className="flex flex-col items-center mr-2">
                                                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                                                <div className="h-10 w-0.5 bg-blue-600 mt-1"></div>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xs font-medium text-gray-500">Proposal</h3>
                                                <p className="text-gray-500 text-xs mt-1">
                                                    Accepted: Experts in banking, finance, and economics.
                                                </p>
                                                <p className="text-gray-500 text-xs mt-1">
                                                    <strong>Domains:</strong> Statisticians, Data Scientists, Demographers.
                                                </p>
                                                <div className="text-right">
                                                    <button className="text-gray-500 cursor-pointer text-xs">Read More...</button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Survey Step */}
                                        <div className="flex mb-2">
                                            <div className="flex flex-col items-center mr-2">
                                                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                                                <div className="h-10 w-0.5 bg-blue-600 mt-1"></div>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xs font-medium text-gray-500">Survey</h3>
                                                <p className="text-gray-500 text-xs mt-1">
                                                    <strong>GDP Growth:</strong> Central Africa's GDP rose to <span className="text-blue-600">5.0%</span> in 2022
                                                    from <span className="text-blue-600">3.4%</span> in 2021.
                                                </p>
                                                <div className="text-right">
                                                    <button className="text-gray-500 text-xs cursor-pointer">Read More...</button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Research Step */}
                                        <div className="flex">
                                            <div className="flex flex-col items-center mr-2">
                                                <Image src={Icon} alt="" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xs font-medium text-gray-500">Research</h3>
                                                <p className="text-gray-500 text-xs mt-1">Ongoing study.</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className='flex flex-col sm:flex-row justify-center md:justify-end mb-3 gap-2'>
                                        {/* Contribution Button */}
                                          <button className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
                                        Contribute
                                        <ChevronRight size={15} className="ml-1" />
                                    </button>

                                    {/* View Post Button */}
                                    <button className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors">
                                        View Post
                                        <ChevronRight size={15} className="ml-1" />
                                    </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Engagement Stats */}
                        <div className="flex flex-wrap justify-center md:justify-around items-center text-xs mb-2 gap-4 md:gap-0">
                            <div className="flex items-center space-x-1">
                                <Heart className="text-gray-500" size={18} fill='red' color='red'/>
                                <span className="text-gray-700">25k Upvoted</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Image src={Retweet} alt="" className='h-5'/>
                                <span className="text-gray-700">2.4k Supoorted</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <MessageCircle className="text-gray-500" size={18} />
                                <span className="text-gray-700">4.4k</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Share2 className="text-gray-500" size={18} />
                                <span className="text-gray-700">1.5k</span>
                            </div>
                        </div>
                    </main>

                </div>
            </div>
        </>
    );
};

export default Dashboard;

