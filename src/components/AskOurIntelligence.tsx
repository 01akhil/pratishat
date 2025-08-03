"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaPaperPlane, FaMinus, FaTimes } from 'react-icons/fa';

const AskOurIntelligence = () => {
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showChat ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showChat]);

  return (
    <div className="min-h-screen w-full px-4 py-8 md:px-8 lg:px-24 overflow-hidden pt-16 md:pt-2 flex flex-col items-center justify-center">
      {!showChat ? (
        <motion.div
          className="rounded-3xl h-96 w-full max-w-3xl bg-white p-6 md:p-8 shadow-2xl transition-shadow hover:shadow-xl flex items-center justify-center flex-col"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }}
          viewport={{ once: true }}
        >
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide text-center">Ask Our Intelligence</h1>
          <p className="text-sm text-gray-600 mt-4 font-semibold text-center">
            We're here to help, Chat with our friendly team 24/7
          </p>
          <button
            className="bg-purple-600 text-white w-full max-w-xs h-12 md:h-14 mt-12 md:mt-24 rounded-lg cursor-pointer hover:bg-purple-700 transition-colors"
            onClick={() => setShowChat(true)}
          >
            Start Conversation
          </button>
        </motion.div>
      ) : (
        <ChatInterface setShowChat={setShowChat} />
      )}
    </div>
  );
};

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-4xl h-[80vh] max-h-[700px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center px-4 md:px-6 py-3 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-800">Conversation</h2>
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
            <div key={msg.id} className={`flex mb-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'bot' && (
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2 flex-shrink-0">
                  <FaRobot className="text-blue-500" />
                </div>
              )}
              <div 
                className={`max-w-[80%] md:max-w-[70%] px-3 py-2 rounded-lg text-sm ${
                  msg.sender === 'user' 
                    ? 'bg-black text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 px-2 py-2">
          <button className="px-3 py-1 text-xs bg-white rounded-md border border-gray-300 hover:bg-gray-50 whitespace-nowrap">
            Not able to Login?
          </button>
          <button className="px-3 py-1 text-xs bg-white rounded-md border border-gray-300 hover:bg-gray-50 whitespace-nowrap">
            How to Create Routes?
          </button>
          <button className="px-3 py-1 text-xs bg-white rounded-md border border-gray-300 hover:bg-gray-50 whitespace-nowrap">
            How to Reset Password?
          </button>
        </div>

        {/* Help Text */}
        <div className="text-center text-xs text-gray-600 mt-1 px-2">
          Still need help? Click <a href="#" className="text-blue-500 hover:underline">here</a> to connect with our team
        </div>

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="px-3 py-2 bg-white border-t border-gray-200">
          <div className="flex items-center bg-gray-100 rounded-md p-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a message..."
              className="flex-1 bg-transparent outline-none text-gray-700 px-2 text-sm"
            />
            <button 
              type="submit" 
              className="ml-2 text-gray-500 hover:text-indigo-600 p-1"
              disabled={!message.trim()}
            >
              <FaPaperPlane />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AskOurIntelligence;