import React, { useState } from 'react';
import ButtonComponent from './ButtonComponent';
import ChatBox from './ChatBox';
import BoltIcon from '@mui/icons-material/Bolt';
import InboxIcon from '@mui/icons-material/Inbox';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TaskBox from './TaskBox';

const FloatingMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isInboxActive, setIsInboxActive] = useState(false);
  const [isTaskOpen, setIsTaskOpen] = useState(false);

  const toggleMenu = () => {
    if (isChatOpen || isTaskOpen) {
      setIsChatOpen(false);
      setIsInboxActive(false);
      setIsTaskOpen(false);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const toggleChatbox = () => {
    setIsChatOpen(!isChatOpen);
    setIsInboxActive(!isInboxActive);
    setIsTaskOpen(false);
    setIsOpen(false);
  };

  const toggleTaskbox = () => {
    setIsTaskOpen(!isTaskOpen);
    setIsChatOpen(false);
    setIsInboxActive(false);
    setIsOpen(false);
  };

  return (
    <div className="group fixed bottom-5 right-5 p-2 flex items-end justify-end">
      {isChatOpen && <ChatBox onClose={toggleChatbox} />}
      {isTaskOpen && <TaskBox onClose={toggleTaskbox} />}
      
      <ButtonComponent
        Icon={AssignmentIcon}
        label="Task"
        onClick={toggleTaskbox}
        styleClasses={`${
          isOpen || isChatOpen || isTaskOpen ? 'transform translate-x-[-40px]' : 'hidden'
        } ${isTaskOpen ? 'bg-green-500' : ''}`}
      />

      <ButtonComponent
        Icon={InboxIcon}
        label="Inbox"
        onClick={toggleChatbox}
        styleClasses={`${isInboxActive ? 'bg-purple-500' : ''} ${
          (isOpen || isChatOpen) && !isTaskOpen ? 'transform translate-x-[-25px]' : 'hidden'
        }`}
      />
      
      <ButtonComponent
        Icon={BoltIcon}
        onClick={toggleMenu}
        styleClasses={`${isChatOpen || isTaskOpen ? 'hidden' : ''} bg-blue-500 hover:bg-blue-600`}
      /> 
    </div>
  );
};

export default FloatingMenu;