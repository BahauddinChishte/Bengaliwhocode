import React, { useState } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (content: string) => {
    setIsLoading(true);
    
    // Add user message
    const userMessage: Message = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content })
      });

      const data = await response.json();
      
      // Add assistant response
      const assistantMessage: Message = { 
        role: 'assistant', 
        content: data.response 
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      // Add error message
      const errorMessage: Message = {
        role: 'assistant',
        content: 'দুঃখিত, একটি সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-lg">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold">AI সহায়ক</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <p>স্বাগতম! আপনার প্রোগ্রামিং সংক্রান্ত যেকোনো প্রশ্ন জিজ্ঞাসা করুন।</p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <ChatMessage 
              key={idx} 
              role={msg.role} 
              content={msg.content} 
            />
          ))
        )}
      </div>

      <ChatInput 
        onSendMessage={handleSendMessage} 
        isLoading={isLoading} 
      />
    </div>
  );
};