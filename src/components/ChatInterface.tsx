// "use client"

// import React, { useState } from 'react';
// import { FaRobot, FaPaperPlane, FaMinus, FaTimes } from 'react-icons/fa';

// interface ChatInterfaceProps { setShowChat: (value: boolean) => void }

// const ChatInterface: React.FC<ChatInterfaceProps> = ({ setShowChat }) => {
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       text: "Hello, I'm PratishatBot! 👋 I'm your personal AI assistant. How can I help you?",
//       sender: 'bot'
//     },
//     {
//       id: 2,
//       text: "Hello There",
//       sender: 'user'
//     }
//   ]);

//   const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (message.trim()) {
//       setMessages([...messages, { id: messages.length + 1, text: message, sender: 'user' }]);
//       setMessage('');
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50">
//       <div className="w-[48vw] h-[56vh] bg-white rounded-3xl shadow-2xl flex flex-col pb-4">
//         {/* Header */}
//         <div className="flex justify-between items-center px-6 py-3 border-b border-[#908b8b]">
//           <h2 className="text-lg font-medium text-[#000000]">Conversation</h2>
//           <div className="flex space-x-3">
//             <button className="text-gray-500 hover:text-gray-700">
//               <FaMinus />
//             </button>
//             <button 
//               className="text-gray-500 hover:text-gray-700"
//               onClick={() => setShowChat(false)}
//             >
//               <FaTimes />
//             </button>
//           </div>
//         </div>

//         {/* Chat Messages */}
//         <div className="flex-1 p-4 overflow-y-auto">
//           {messages.map((msg) => (
//             <div key={msg.id} className={`flex mb-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
//               {msg.sender === 'bot' && (
//                 <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
//                   <FaRobot className="text-blue-500" />
//                 </div>
//               )}
//               <div 
//                 className={`max-w-[70%] px-3 py-2 rounded-lg text-sm ${
//                   msg.sender === 'user' 
//                     ? 'bg-black text-white' 
//                     : 'bg-[#f2f4f5] text-gray-800'
//                 }`}
//               >
//                 {msg.text}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Quick Actions */}
//         <div className="flex flex-wrap justify-center gap-16 py-1 font-bold">
//           <button className="px-3 py-1 text-xs bg-white rounded-md border border-gray-300 hover:bg-gray-50">
//             Not able to Login?
//           </button>
//           <button className="px-3 py-1 text-xs bg-white rounded-md border border-gray-300 hover:bg-gray-50">
//             How to Create Routes?
//           </button>
//           <button className="px-3 py-1 text-xs bg-white rounded-md border border-gray-300 hover:bg-gray-50">
//             How to Reset Password?
//           </button>
//         </div>

//         {/* Help Text */}
//         <div className="text-center text-xs text-gray-600 mt-2">
//           Still need help? Click <a href="#" className="text-blue-500 hover:underline">here</a> to connect with our team
//         </div>

//         {/* Message Input */}
//         <form onSubmit={handleSendMessage} className="ml-3 bg-white rounded-md p-3 mt-2 w-[95%] flex items-center">
//           <input
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Write a message..."
//             className="flex-1 bg-white outline-none text-gray-700 px-2 text-sm w-[80%]"
//           />
//           <button 
//             type="submit" 
//             className="ml-2 text-gray-500 hover:text-indigo-600"
//           >
//             <FaPaperPlane />
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ChatInterface;









"use client"

import React, { useState } from 'react';
import { FaRobot, FaPaperPlane, FaMinus, FaTimes } from 'react-icons/fa';

// Define prop types
interface ChatInterfaceProps {
  setShowChat: (value: boolean) => void;
}

const ChatInterface = ({ setShowChat }: ChatInterfaceProps) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello, I'm PratishatBot! 👋 I'm your personal AI assistant. How can I help you?",
      sender: 'bot'
    },
    {
      id: 2,
      text: "Hello There",
      sender: 'user'
    }
  ]);

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages([...messages, { id: messages.length + 1, text: message, sender: 'user' }]);
      setMessage('');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="w-[48vw] h-[56vh] bg-white rounded-3xl shadow-2xl flex flex-col pb-4">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-3 border-b border-[#908b8b]">
          <h2 className="text-lg font-medium text-[#000000]">Conversation</h2>
          <div className="flex space-x-3">
            <button className="text-gray-500 hover:text-gray-700">
              <FaMinus />
            </button>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setShowChat(false)}
            >
              <FaTimes />
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex mb-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'bot' && (
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                  <FaRobot className="text-blue-500" />
                </div>
              )}
              <div
                className={`max-w-[70%] px-3 py-2 rounded-lg text-sm ${
                  msg.sender === 'user'
                    ? 'bg-black text-white'
                    : 'bg-[#f2f4f5] text-gray-800'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap justify-center gap-16 py-1 font-bold">
          <button className="px-3 py-1 text-xs bg-white rounded-md border border-gray-300 hover:bg-gray-50">
            Not able to Login?
          </button>
          <button className="px-3 py-1 text-xs bg-white rounded-md border border-gray-300 hover:bg-gray-50">
            How to Create Routes?
          </button>
          <button className="px-3 py-1 text-xs bg-white rounded-md border border-gray-300 hover:bg-gray-50">
            How to Reset Password?
          </button>
        </div>

        {/* Help Text */}
        <div className="text-center text-xs text-gray-600 mt-2">
          Still need help? Click <a href="#" className="text-blue-500 hover:underline">here</a> to connect with our team
        </div>

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="ml-3 bg-white rounded-md p-3 mt-2 w-[95%] flex items-center">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write a message..."
            className="flex-1 bg-white outline-none text-gray-700 px-2 text-sm w-[80%]"
          />
          <button
            type="submit"
            className="ml-2 text-gray-500 hover:text-indigo-600"
          >
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
