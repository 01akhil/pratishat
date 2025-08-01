"use client";
import React from "react";
import { Input } from "./ui/Input";
import { useChat } from "ai/react";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import MessageList from "./MessageList";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Message } from "ai";

type Props = { chatId: number };

const ChatComponent = ({ chatId }: Props) => {
  const defaultMessages: Message[] = [
    { role: "system", content: "Hey there! Looks like you're checking out this research paper." ,id:"1"},
    { role: "system", content: "What would you like to know about it?",id:"2" },
  ];

  const { data, isLoading } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      const response = await axios.post<Message[]>("/api/get-messages", {
        chatId,
      });
      return response.data;
    },
  });

  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: "/api/chat",
    body: {
      chatId,
    },
    initialMessages: data ? [...defaultMessages, ...data] : defaultMessages,
  });

  // Scroll to the bottom when messages change
  React.useEffect(() => {
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
      messageContainer.scrollTo({
        top: messageContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="relative h-full flex flex-col ">
     
     

      {/* Message list */}
      <div
        id="message-container"
        className="flex-1 overflow-auto flex flex-col-reverse p-2 space-y-2"
      >
        <MessageList messages={messages} isLoading={isLoading} />
      </div>

      {/* Input form */}
      {/* <form
        onSubmit={handleSubmit}
        className="sticky bottom-0 inset-x-0 px-2 py-4 bg-white flex"
      >
        <div className="flex flex-1">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask any question..."
            className="w-full"
          />
          <Button className="bg-blue-600 ml-2">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form> */}


      <form
  onSubmit={handleSubmit}
  className="sticky bottom-0 inset-x-0 px-2 py-4 bg-white border-t border-gray-200"
>
  <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
   
    {/* Text Input */}
    <input
      type="text"
      value={input}
      onChange={handleInputChange}
      placeholder="Ask something about the PDF..."
      className="bg-transparent flex-1 focus:outline-none text-sm"
    />

    {/* Send Button */}
    <button
      type="submit"
      disabled={!input.trim()}
      className={`ml-2 w-8 h-8 rounded-full flex items-center justify-center ${
        input.trim()
          ? 'bg-indigo-500 text-white hover:bg-indigo-600'
          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 rotate-90"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
      </svg>
    </button>
  </div>
</form>

   
    </div>
  );
};

export default ChatComponent;
