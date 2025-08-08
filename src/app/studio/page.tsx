
'use client';

import { useSearchParams } from "next/navigation";
import Image from 'next/image';
import { useState, useEffect, Suspense } from 'react';
import {
  Search,
  Calendar,
  Bell,
  Home,
  MessageSquare,
  CheckSquare,
  Users,
  Settings,
  Plus,
  ChevronLeft,
  Edit3,
  Share2,
  Grid,
  ChevronDown,
  MessageCircle,
  FileText,
  Menu,
  X
} from "lucide-react"

import revenue from "../../assets/revenue.png"
import spend from "../../assets/spend.png"
import time from "../../assets/time.png"
import collab from "../../assets/collab.png"
import collab1 from "../../assets/collab1.png"
import collab2 from "../../assets/collab2.png"
import collab3 from "../../assets/collab3.png"
import collab4 from "../../assets/collab4.png"
import research from "../../assets/research.png"
import survey from "../../assets/survey.png"
import proposals from "../../assets/proposals.png"
import kate from "../../assets/Kate.png"

import Link from 'next/link';

function DashboardContent() {
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [analyticsOpen, setAnalyticsOpen] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return (
    <div className="flex bg-gray-100 relative min-h-screen pb-16 md:pb-0">
      {/* Left Sidebar */}
      <div className={`${isMobile ? (mobileMenuOpen ? 'fixed inset-0 z-40 w-64 bg-white' : 'hidden') : 'w-[200px]'} bg-white border-r border-gray-200 flex flex-col h-[100vh] fixed`}>
        {isMobile && (
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-4 right-4 p-1"
          >
            <X size={20} />
          </button>
        )}
        
        <div className="flex-1 overflow-auto">
          <div className="py-4">
            <div className="text-sm px-4 py-2 flex items-center text-gray-500 hover:bg-gray-50 rounded-lg mx-2">
              <Home className="w-4 h-4 mr-3" />
              <span>Home</span>
            </div>
            <div className="px-4 text-sm py-2 flex items-center text-gray-500 hover:bg-gray-50 rounded-lg mx-2">
              <MessageSquare className="w-4 h-4 mr-3" />
              <span>Messages</span>
            </div>
            <div className="px-4 py-2 text-sm flex items-center text-gray-500 hover:bg-gray-50 rounded-lg mx-2">
              <CheckSquare className="w-4 h-4 mr-3" />
              <span>Tasks</span>
            </div>
            <div className="px-4 py-2 text-sm flex items-center text-gray-500 hover:bg-gray-50 rounded-lg mx-2">
              <Users className="w-4 h-4 mr-3" />
              <span>Members</span>
            </div>
            <div className="px-4 py-2 text-sm flex items-center text-gray-500 hover:bg-gray-50 rounded-lg mx-2">
              <Settings className="w-4 h-4 mr-3" />
              <span>Settings</span>
            </div>
          </div>

          <div className="mt-3 px-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-gray-500">KEY PROJECTS</span>
              <Plus className="w-4 h-4 text-gray-400" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center py-1">
                <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                <span className="text-sm text-gray-700">Proposal 1</span>
              </div>

              <div className="flex items-center py-1">
                <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                <span className="text-sm text-gray-700">Proposal 2</span>
              </div>

              <div className="flex items-center py-1">
                <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-sm text-gray-700">Survey 1</span>
              </div>

              <div className="flex items-center py-1">
                <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-sm text-gray-700 flex items-center">
                  Survey 2
                  <span className="flex items-center ml-2 space-x-1">
                    <span className="text-xs text-green-600 font-bold animate-pulse">[A]</span>
                  </span>
                </span>
              </div>

              <div className="flex items-center py-1">
                <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                <span className="text-sm text-gray-700">Study Of Dopamine</span>
                <span className="text-gray-400 ml-1">...</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col ${isMobile ? 'ml-0' : 'ml-[200px]'}`}>
        {/* Top Navigation */}
        <div className="bg-[#ffffff] border-b border-gray-200 py-[10px] px-4 md:px-6 flex items-center">
          {isMobile && (
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mr-4 p-1"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
          
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search for anything..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-md text-sm focus:outline-none"
            />
          </div>

          <div className="flex items-center ml-auto">
            <Bell className="w-5 h-5 text-gray-500 mx-3" />

            <div className="flex items-center ml-4">
              <div className="mr-3 text-right hidden md:block">
                <div className="font-medium text-sm">Kate Russell</div>
                <div className="text-xs text-gray-500">Baku, Azerbaijan</div>
              </div>
              <div className="w-8 h-8 rounded-full bg-red-100 overflow-hidden">
                <Image src={kate} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 ml-1 hidden md:block" />
            </div>
          </div>
        </div>

        {/* Main Dashboard */}
        <div className="flex flex-col md:flex-row bg-[#ffffff] min-h-[90vh]">
          <div className="flex-1 overflow-auto p-4 md:p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <div className="flex items-center mb-4 md:mb-0">
                <h1 className="text-xl font-bold capitalize">{title}</h1>
                <Edit3 className="w-5 h-5 text-gray-400 ml-3" />
              </div>
              
              <button 
                onClick={() => setAnalyticsOpen(!analyticsOpen)}
                className="flex items-center text-sm bg-indigo-50 text-indigo-600 px-3 py-1 rounded-md mb-4 md:mb-0"
              >
               View Analytics {analyticsOpen ? '↑' : '↓'}
              </button>
            </div>

            {/* Analytics Section - Sliding Card */}
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${analyticsOpen ? 'max-h-[500px]' : 'max-h-0'}`}>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                <div className="bg-white rounded-xl p-4">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                    <Image src={revenue} alt="" />
                  </div>
                  <div className="text-sm text-gray-500 mb-1">Total revenue</div>
                  <div className="text-2xl font-bold mb-2">$53,00989</div>
                  <div className="text-xs text-green-500">
                    <span className="inline-block mr-1">↑</span>
                    12% increase from last month
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mb-3">
                    <Image src={spend} alt="" />
                  </div>
                  <div className="text-sm text-gray-500 mb-1">Spend</div>
                  <div className="text-2xl font-bold mb-2">$5,300</div>
                  <div className="text-xs text-red-500">
                    <span className="inline-block mr-1">↓</span>
                    5% decrease from last month
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                    <Image src={time} alt="" />
                  </div>
                  <div className="text-sm text-gray-500 mb-1">Time spent</div>
                  <div className="text-2xl font-bold mb-2">
                    1022 <span className="text-sm font-normal text-gray-400">/1300 Hrs</span>
                  </div>
                  <div className="text-xs text-green-500">
                    <span className="inline-block mr-1">↑</span>
                    8% increase from last month
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4">
                  <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center mb-3">
                    <Image src={collab} alt="" />
                  </div>
                  <div className="text-sm text-gray-500 mb-1">Collaborators</div>
                  <div className="text-2xl font-bold mb-2">10</div>
                  <div className="text-xs text-green-500">
                    <span className="inline-block mr-1">↑</span>
                    2% increase from last month
                  </div>
                </div>
              </div>

              {/* Chart Section */}
              <div className="bg-white rounded-xl p-4 shadow-sm mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-medium">No. of impressions</h3>
                  <button className="flex items-center text-sm bg-indigo-50 text-indigo-600 px-3 py-1 rounded-md">
                    This Month <ChevronDown className="w-4 h-4 ml-1" />
                  </button>
                </div>

                <div className="h-64 relative">
                  {/* Y-axis labels */}
                  <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400">
                    <div>100K</div>
                    <div>80K</div>
                    <div>60K</div>
                    <div>40K</div>
                    <div>20K</div>
                  </div>

                  {/* Chart */}
                  <div className="ml-10 h-full relative">
                    {/* Peak marker */}
                    <div className="absolute top-8 left-[60%] flex flex-col items-center">
                      <div className="bg-indigo-600 text-white text-xs px-2 py-1 rounded">82,924</div>
                      <div className="h-[180px] border-l border-dashed border-red-400"></div>
                    </div>

                    {/* Line chart (simplified) */}
                    <svg className="w-full h-[80%]" viewBox="0 0 600 200" preserveAspectRatio="none">
                      <path
                        d="M0,150 L50,140 L100,80 L150,120 L200,100 L250,110 L300,20 L350,100 L400,80 L450,90 L500,70 L550,90 L600,80"
                        fill="none"
                        stroke="#4f46e5"
                        strokeWidth="2"
                      />
                    </svg>

                    {/* X-axis labels */}
                    <div className="flex justify-between text-xs text-gray-400 mt-2">
                      <div>10</div>
                      <div>11</div>
                      <div>12</div>
                      <div>13</div>
                      <div>14</div>
                      <div>15</div>
                      <div className="text-indigo-600 font-medium">16</div>
                      <div>17</div>
                      <div>18</div>
                      <div>19</div>
                      <div>20</div>
                      <div>21</div>
                      <div>22</div>
                      <div>23</div>
                      <div>24</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submissions Section */}
            <div className="mb-8">
       

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                <Link href='/proposal' className="">
                  <div className="rounded-xl p-6 shadow-sm flex flex-col items-center hover:scale-105 transition-transform duration-300 ease-in-out">
                    <div className="w-24 h-24 mb-4">
                      <Image
                        src={proposals}
                        alt="Proposal"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="font-medium">Create A New Proposal</div>
                  </div>
                </Link>

                <Link href='/survey'>
                  <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col items-center hover:scale-105 transition-transform duration-300 ease-in-out">
                    <div className="w-24 h-24 mb-4">
                      <Image
                        src={survey}
                        alt="Survey"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="font-medium">Make New Survey</div>
                  </div>
                </Link>

                <Link href='/research'>
                  <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col items-center hover:scale-105 transition-transform duration-300 ease-in-out">
                    <div className="w-24 h-24 mb-4">
                      <Image
                        src={research}
                        alt="Research"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="font-medium">Write New Research</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Hidden on mobile */}
          {!isMobile && (
            <div className="w-[250px] bg-[#ffffff] flex flex-col h-full overflow-y-hidden">
              <button className="flex items-center text-indigo-600 rounded-md px-16 py-7 mr-3">
                <span className="text-sm mr-2">Invite</span>
                <div className="flex -space-x-1">
                  <div className="w-6 h-6 rounded-full border-2 border-white bg-purple-200">
                    <Image src={collab1} alt="" />
                  </div>
                  <div className="w-6 h-6 rounded-full border-2 border-white bg-orange-200">
                    <Image src={collab2} alt="" />
                  </div>
                  <div className="w-6 h-6 rounded-full border-2 border-white bg-green-200">
                    <Image src={collab3} alt="" />
                  </div>
                  <div className="w-6 h-6 rounded-full border-2 border-white bg-blue-200">
                    <Image src={collab4} alt="" />
                  </div>
                  <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center">
                    <span className="text-xs text-[#D25B68] bg-[#F4D7DA] rounded-full">+2</span>
                  </div>
                </div>
              </button>

              <div className="p-4 flex flex-col space-y-4 px-14">
                <div className="flex items-center p-2 hover:bg-gray-50 rounded-md">
                  <MessageCircle className="w-4 h-4 text-gray-500 mr-3" />
                  <span className="text-gray-700 text-sm">Comments</span>
                </div>
                <div className="flex items-center p-2 hover:bg-gray-50 rounded-md">
                  <FileText className="w-4 h-4 text-gray-500 mr-3" />
                  <span className="text-gray-700">Notes</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center py-3 z-30">
          <button className="flex flex-col items-center text-indigo-600 p-2">
            <div className="flex -space-x-1 mb-1">
              <div className="w-6 h-6 rounded-full border-2 border-white bg-purple-200">
                <Image src={collab1} alt="" width={24} height={24} />
              </div>
              <div className="w-6 h-6 rounded-full border-2 border-white bg-orange-200">
                <Image src={collab2} alt="" width={24} height={24} />
              </div>
            </div>
            <span className="text-xs">Invite</span>
          </button>

          <button className="flex flex-col items-center text-gray-600 p-2">
            <MessageCircle className="w-5 h-5 mb-1" />
            <span className="text-xs">Comments</span>
          </button>

          <button className="flex flex-col items-center text-gray-600 p-2">
            <FileText className="w-5 h-5 mb-1" />
            <span className="text-xs">Notes</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default function ProjectManagementDashboard() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardContent />
    </Suspense>
  )
}