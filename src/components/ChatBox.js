import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import groupIcon from '../assets/img/group.svg';
import Avatar from '@mui/material/Avatar';

const ChatBox = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const chatboxRef = useRef(null);
  const [showNewMessages, setShowNewMessages] = useState(false);
  const [isConnecting, setIsConnecting] = useState(true);
  const [isLoadingInbox, setIsLoadingInbox] = useState(true);
  const [replyTo, setReplyTo] = useState(null);
  
  const [messagesData, setMessagesData] = useState([
    // This Data Dummy Manual
    // {
    //   id: '1',
    //   subject: '109220-Naturalization',
    //   sender: 'Cameron Phillips',
    //   date: 'Senin, 1 Januari 2021 19:10',
    //   message: 'Please check this out!',
    //   isUnread: true,
    // },
    // {
    //   id: '2',
    //   subject: 'Jeannette Moraima Guaman Chamba [Hutto Follow Up - Brief Service]',
    //   sender: 'Ellen',
    //   date: 'Minggu, 6 Februari 2021 10:45',
    //   message: 'Hey, please read.',
    //   isUnread: true,
    //   isNew: true,
    // },
    // {
    //   id: '3',
    //   subject: '8405-Diana SALAZAR MUNGUIA',
    //   sender: 'Cameron Phillips',
    //   date: '01/06/2021 12:19',
    //   message: "I understand your initial concerns and that's very valid, Elizabeth. But you...",
    //   isUnread: false,
    // },
    // {
    //   id: '4',
    //   subject: 'FastVisa Support',
    //   sender: 'FastVisa Support',
    //   date: '01/06/2021 12:19',
    //   message: 'Hey there! Welcome to your inbox.',
    //   isUnread: false,
    // },
  ]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => {
        const formattedData = json.map((item, index) => ({
          id: item.id.toString(),
          subject: item.title,
          sender: item.category,
          date: new Date().toLocaleDateString('id-ID', { month: 'long', day: 'numeric', year: 'numeric' }),
          message: item.description,
          isUnread: index % 2 === 0,
          isNew: index % 3 === 0,
        }));
        setMessagesData(prevData => [...prevData, ...formattedData]);
        setIsLoadingInbox(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setIsLoadingInbox(false);
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
    setChatMessages([
      { id: '1', sender: message.sender, text: message.message, timestamp: message.date, isUser: false },
      { id: '2', sender: 'You', text: 'Baik, saya akan memeriksa hal tersebut.', timestamp: new Date().toLocaleString(), isUser: true },
      { id: '3', sender: message.sender, text: 'Terima kasih atas responnya yang cepat.', timestamp: new Date().toLocaleString(), isUser: false },
    ]);
    setIsConnecting(false);
  };

  const handleBackToInbox = () => {
    setSelectedMessage(null);
    setChatMessages([]);
    setIsConnecting(true);
  };

  const handleSendMessage = () => {
    if (userInput.trim() !== '') {
      const newMessage = {
        id: Date.now().toString(),
        sender: 'You',
        text: userInput,
        isUser: true,
        timestamp: new Date().toLocaleString(),
        replyTo: replyTo,
      };
      setChatMessages([...chatMessages, newMessage]);
      setUserInput('');
      setReplyTo(null);
    }
  };

  const handleEditMessage = (id, newText) => {
    setChatMessages(chatMessages.map(msg => 
      msg.id === id ? { ...msg, text: newText } : msg
    ));
  };

  const handleDeleteMessage = (id) => {
    setChatMessages(chatMessages.filter(msg => msg.id !== id));
  };

  const handleShare = (id) => {
    console.log('Share message:', id);
  };

  const handleReply = (message) => {
    setReplyTo(message);
  };

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
    const timer = setTimeout(() => {
      setShowNewMessages(true);
    }, 2000);

    const inboxTimer = setTimeout(() => {
      setIsLoadingInbox(false);
    }, 1500);

    return () => {
      clearTimeout(timer);
      clearTimeout(inboxTimer);
    };
  }, [chatMessages]);

  return (
    <div className="fixed bottom-20 right-0 w-7/12 h-5/6 ">
      <div className="bg-white shadow-md rounded-lg max-w-4xl w-full h-full flex flex-col">
      <div className="p-4 border-b bg-white text-black rounded-t-lg flex justify-between items-center">
        <div className="flex items-center">
          {selectedMessage && (
            <button
              onClick={handleBackToInbox}
              className="text-black flex items-center space-x-2 mr-2"
            >
              <ArrowBackIcon />
            </button>
          )}
          <p className="text-xl font-semibold">
            {selectedMessage ? (
              <>
                {selectedMessage.subject} <br />
                <span className="text-black text-sm">3 Participants</span>
              </>
            ) : (
              <>
                Inbox
              </>
            )}
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-300 hover:text-gray-400 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>


        {selectedMessage ? (
          <>
            <div id="chatbox" ref={chatboxRef} className="flex-grow p-4 overflow-y-auto relative">
              {isConnecting ? (
                <div className="flex justify-center items-center">
                  <div className="loader"></div>
                  <span className="ml-3 text-blue-500">Please wait while we connect you with one of Our Team...</span>
                </div>
              ) : (
                <>
                  <div className="flex justify-center items-center mb-4">
                    <span className="bg-gray-300 px-2 py-1 rounded text-gray-600">
                      Hari ini {new Date().toLocaleDateString('id-ID', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  {chatMessages.map((msg) => (
                    <ChatMessage 
                      key={msg.id} 
                      message={msg} 
                      onEdit={handleEditMessage}
                      onDelete={handleDeleteMessage}
                      onShare={handleShare}
                      onReply={handleReply}
                      sender={msg.sender}
                    >
                      <span className="text-sm text-white">{msg.timestamp}</span>
                    </ChatMessage>
                  ))}
                  {showNewMessages && (
                    <div className="sticky top-0 w-full flex justify-center py-2">
                      <span className="bg-blue-500 text-white text-sm px-2 py-1 rounded-full">New Messages</span>
                    </div>
                  )}
                  <div className="flex justify-center items-center mt-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                    <span className="ml-3 bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                      Please wait while we connect you with one of Our Team...
                    </span>
                  </div>
                </>
              )}
            </div>
            <div className="p-4 border-t flex flex-col">
              {replyTo && (
                <div className="bg-gray-100 p-2 mb-2 rounded-md text-sm text-black relative">
                  <p className="font-bold">Membalas kepada {replyTo.sender}:</p>
                  <p>{replyTo.text}</p>
                  <button 
                    onClick={() => setReplyTo(null)} 
                    className="absolute top-1 right-1 text-gray-500 hover:text-gray-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}  
              <div className="flex">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ketik pesan..."
                  className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  disabled={isConnecting}
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-blue-500 text-white px-6 py-2 rounded-r-md hover:bg-blue-600 transition duration-300"
                  disabled={isConnecting}
                >
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <form onSubmit={handleSearch} className="w-full mx-auto p-4">
              <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Cari pesan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="text-white absolute end-2.5 bottom-2.5 bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Cari
                </button>
              </div>
            </form>
            <div className="overflow-y-auto h-[calc(100%-8rem)] p-4">
              {isLoadingInbox ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                  <span className="ml-3 text-blue-500">Memuat pesan...</span>
                </div>
              ) : (
                messagesData.map((message) => (
                  <div
                    key={message.id}
                    className={`p-4 border-b border-gray-200 cursor-pointer ${message.isUnread ? 'bg-gray-100 font-bold' : ''}`}
                    onClick={() => handleSelectMessage(message)}
                  >
                    <div className="relative flex items-center">
                      <div className="flex-shrink-0 mr-3">
                        {message.sender === 'FastVisa Support' ? (
                          <Avatar className="bg-blue-500">
                            {message.sender.charAt(0).toUpperCase()}
                          </Avatar>
                        ) : (
                          <img src={groupIcon} alt="User Icon" className="w-10 h-10 rounded-full" />
                        )}
                      </div>
                      <div className="flex-grow">
                        <p className="text-sm text-gray-500">
                          {message.sender} - {message.subject}
                        </p>
                        <p className="text-sm text-gray-500">{message.date}</p>
                        <p className="text-sm text-gray-900">{message.message}</p>
                      </div>
                      {message.isUnread && (
                        <span className="absolute top-1 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          {message.isNew ? '1' : '1'}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatBox;
