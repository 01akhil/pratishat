'use client';

import { DrizzleChat } from '@/lib/db/schema';
import Link from 'next/link';
import { Button } from './ui/button';
import React from 'react';
import { MessageCircle, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils'; // Ensure this import is correct
import FileUpload from './ui/FileUpload';
import Kate from "../assets/Kate.png";
import Image from 'next/image';

type Props = {
    chats: DrizzleChat[],
    chatId: number,
};

const ChatSideBar = ({ chats, chatId }: Props) => {
    return (
        <div className='w-[18vw] min-h-screen p-4 text-gray-200 bg-[#ffffff]'>

             <div className="font-bold text-lg mb-6 text-black">PRATISHAT AI</div>

             <div className="mb-6">
    <FileUpload />
</div>

            <div className="flex justify-between items-center mb-4 text-xs mt-5">
          <span className="text-gray-500">Your conversations</span>
          <button 
           
            className="text-indigo-500 hover:text-indigo-700"
          >
            Clear All
          </button>
        </div>

            <div className="flex flex-col gap-2 mt-4">
                {chats.map(chat => (
                    <Link key={chat.id} href={`/chat/${chat.id}`}>
                        <div className={cn('rounded-lg text-slate-300 flex items-center', {
                            'bg-blue-600 text-white': chat.id === chatId,
                            'hover:text-white': chat.id !== chatId,
                        })}>
                            <MessageCircle className='mr-2' />
                            <p className='w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis'>
                                {chat.pdfName}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>

               <div className='absolute bottom-4 left-4 '>

                <div className="flex items-center py-2 text-sm hover:bg-gray-100 rounded-md px-2 cursor-pointer">
            <div className="mr-3 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
            </div>
            <span className='text-black'>Settings</span>
          </div>

                    <div className="flex items-center py-2 text-sm mt-4 hover:bg-gray-100 rounded-md px-2 cursor-pointer">
            <Image src={Kate} alt="" className="mr-2 w-6 h-5"/>
            <span className='text-black'>Kate Williamson</span>
          </div>
                </div> 

        </div>
    );
};

export default ChatSideBar;










// "use client";
// import { DrizzleChat } from "@/lib/db/schema";
// import Link from "next/link";
// import React from "react";
// import { Button } from "./ui/button";
// import { MessageCircle, PlusCircle } from "lucide-react";
// import { cn } from "@/lib/utils";
// import axios from "axios";


// type Props = {
//   chats: DrizzleChat[];
//   chatId: number;
// };

// const ChatSideBar = ({ chats, chatId}: Props) => {
//   const [loading, setLoading] = React.useState(false);

//   return (
//     <div className="w-full h-screen overflow-scroll soff p-4 text-gray-200 bg-gray-900">
//       <Link href="/">
//         <Button className="w-full border-dashed border-white border">
//           <PlusCircle className="mr-2 w-4 h-4" />
//           New Chat
//         </Button>
//       </Link>

//       <div className="flex max-h-screen overflow-scroll pb-20 flex-col gap-2 mt-4">
//         {chats.map((chat) => (
//           <Link key={chat.id} href={`/chat/${chat.id}`}>
//             <div
//               className={cn("rounded-lg p-3 text-slate-300 flex items-center", {
//                 "bg-blue-600 text-white": chat.id === chatId,
//                 "hover:text-white": chat.id !== chatId,
//               })}
//             >
//               <MessageCircle className="mr-2" />
//               <p className="w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis">
//                 {chat.pdfName}
//               </p>
//             </div>
//           </Link>
//         ))}
//       </div>

   
//     </div>
//   );
// };

// export default ChatSideBar;