import React from 'react';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ role, content }) => {
  const isUser = role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[80%] rounded-lg p-4 ${
        isUser 
          ? 'bg-[#04AA6D] text-white' 
          : 'bg-gray-100 text-gray-900'
      }`}>
        <p className="whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
};