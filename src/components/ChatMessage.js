import React from 'react';

const ChatMessage = ({ message, isUser }) => {
  return (
    <div className={`mb-2 ${isUser ? 'text-right' : ''}`}>
      <p className={`rounded-lg py-2 px-4 inline-block ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
        {message}
      </p>
    </div>
  );
};

export default ChatMessage;
