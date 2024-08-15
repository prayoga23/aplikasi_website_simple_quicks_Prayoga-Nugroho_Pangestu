import React, { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ChatMessage = ({ message, onEdit, onDelete }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(message.text);

  const handleEdit = () => {
    setIsEditing(true);
    setShowOptions(false);
  };

  const handleSaveEdit = () => {
    onEdit(message.id, editedText);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(message.id);
  };

  return (  
    <div
      className={`flex ${
        message.isUser ? 'justify-end' : 'justify-start'
      } mb-4 relative group`}
    >
      <div
        className={`max-w-sm p-4 rounded-lg ${
          message.isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
        } relative`}
      >
        {message.isUser && <p className="text-xs font-bold mb-1">My Response</p>}
        <p className="font-semibold">{message.sender}</p>
        {isEditing ? (
          <div>
            <textarea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="w-full p-2 text-black rounded"
            />
            <button
              onClick={handleSaveEdit}
              className="mt-2 px-2 py-1 bg-green-500 text-white rounded"
            >
              Simpan
            </button>
          </div>
        ) : (
          <p>{message.text}</p>
        )}
        <p className={`text-xs mt-1 ${message.isUser ? 'text-white' : 'text-gray-500'}`}>
          {message.timestamp}
        </p>
        
        {message.isUser && (
          <div 
            className="absolute top-2 right-2 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => setShowOptions(!showOptions)}
          >
            <MoreVertIcon className="text-white" />
          </div>
        )}
      </div>
      
      {showOptions && !isEditing && message.isUser && (
        <div className="absolute top-0 right-0 mt-8 bg-white shadow-md rounded-lg flex flex-col">
          <button
            className="text-sm text-blue-500 p-2 hover:bg-gray-100"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className="text-sm text-red-500 p-2 hover:bg-gray-100"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;