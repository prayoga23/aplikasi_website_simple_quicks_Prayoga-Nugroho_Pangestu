import React, { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ChatMessage = ({ message, onEdit, onDelete, onShare, onReply, sender }) => {
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

  const handleShare = () => {
    onShare(message.id);
    setShowOptions(false);
  };

  const handleReply = () => {
    onReply(message);
    setShowOptions(false);
  };

  return (
    <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} mb-4 relative group`}>
      <div className={`max-w-[70%] ${message.isUser ? 'bg-[#EEDCFF] text-black' : 'bg-[#FCEED3] text-black'} rounded-lg p-3 relative`}>
        {message.replyTo && (
          <div className="bg-gray-100 p-2 mb-2 rounded-md text-sm text-gray-700">
            <p className="font-bold">Membalas kepada {message.replyTo.sender}:</p>
            <p>{message.replyTo.text}</p>
          </div>
        )}
        <p className="font-bold">{sender}</p>
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
          <p className="text-sm">{message.text}</p>
        )}
        <span className="text-xs text-black-500 mt-1 block">{message.timestamp}</span>
        <button
          onClick={() => setShowOptions(!showOptions)}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <MoreVertIcon fontSize="small" />
        </button>
      </div>
      {showOptions && (
        <div className="absolute top-0 right-0 mt-8 bg-white shadow-md rounded-lg flex flex-col">
          {message.isUser ? (
            <>
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
                Hapus
              </button>
            </>
          ) : (
            <>
              <button
                className="text-sm text-blue-500 p-2 hover:bg-gray-100"
                onClick={handleShare}
              >
                Bagikan
              </button>
              <button
                className="text-sm text-blue-500 p-2 hover:bg-gray-100"
                onClick={handleReply}
              >
                Balas
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatMessage;