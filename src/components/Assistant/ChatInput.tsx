import React, { useState } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4">
      <div className="flex space-x-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="আপনার প্রশ্ন লিখুন..."
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#04AA6D]"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !message.trim()}
          className="bg-[#04AA6D] text-white px-6 py-2 rounded-lg hover:bg-[#059862] transition-colors duration-200 disabled:opacity-50"
        >
          {isLoading ? 'পাঠানো হচ্ছে...' : 'পাঠান'}
        </button>
      </div>
    </form>
  );
};