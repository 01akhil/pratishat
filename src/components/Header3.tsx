"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { Plus, User } from "lucide-react";
import CreateProjectModal from './create-project-modal';
import UserSearch from './UserSearch';
import { useUser } from "@clerk/nextjs";

const Header = () => {
    const [showModal, setShowModal] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const router = useRouter();
    const { user } = useUser();
    const [id, setId] = useState<string | null>(null);

    useEffect(() => {
        setId(localStorage.getItem("userId"));
    }, []);

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Initial check
        checkIfMobile();

        // Add event listener
        window.addEventListener('resize', checkIfMobile);

        // Cleanup
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    const handleNext = (projectName: string, startFrom: string) => {
        console.log("Project created:", { projectName, startFrom });
        router.push(`/studio?title=${encodeURIComponent(projectName)}`);
        setShowModal(false);
    };

    return (
        <>
            <header className="h-16 border-b border-gray-100 flex items-center justify-between px-4 md:px-6">
                {/* Left side - Logo and search */}
                <div className="flex items-center gap-4 w-full">
                    {/* Logo - Only shown on desktop */}
                    <div className="hidden md:block">
                        <h1 
                            className="text-2xl font-bold text-[#2d3e50] cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => router.push('/dashboard')}
                        >
                            Prati<span className="text-[#a8d5ba]">Shat</span>
                        </h1>
                    </div>
                    
                    {/* UserSearch - Mobile version */}
                    {isMobile && (
                        <div className="md:hidden">
                            <UserSearch />
                        </div>
                    )}
                </div>

                {/* Right side controls */}
                <div className="flex items-center gap-4 ml-auto">
                    <div className="flex items-center gap-4">
                        {/* UserSearch - Desktop version */}
                        {!isMobile && (
                            <div className="hidden md:block">
                                <UserSearch />
                            </div>
                        )}
                        
                        {/* Plus button */}
                        <button
                            onClick={() => setShowModal(true)}
                            className="text-[#000000] hover:text-gray-600 font-extrabold cursor-pointer"
                            aria-label="Create new project"
                        >
                            <Plus size={23} />
                        </button>
                        
                        {/* User profile button */}
                        <button
                            onClick={() => router.push(`/user/${id || 'default'}`)}
                            className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                            aria-label="User profile"
                        >
                            <User size={18} className="text-gray-600" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Create Project Modal */}
            {showModal && (
                <CreateProjectModal
                    onCloseAction={() => setShowModal(false)}
                    onNextAction={handleNext}
                />
            )}
        </>
    );
};

export default Header;