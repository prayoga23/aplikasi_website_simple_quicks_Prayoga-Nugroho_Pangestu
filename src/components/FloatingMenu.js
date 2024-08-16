import React, { useState } from 'react';
import ButtonComponent from './ButtonComponent';
import ChatBox from './ChatBox';
import BoltIcon from '@mui/icons-material/Bolt';
import ForumIcon from '@mui/icons-material/Forum';
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode';
import TaskBox from './TaskBox';

const TaskIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F19E39">
    <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h280v-480H160v480Zm360 0h280v-480H520v480Zm40-120h200v-60H560v60Zm0-100h200v-60H560v60Zm0-100h200v-60H560v60ZM160-240v-480 480Z"/>
  </svg>
);

const FloatingMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isTaskOpen, setIsTaskOpen] = useState(false);
  const [showLabels, setShowLabels] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setShowLabels(!isOpen);
  };

  const toggleChatbox = () => {
    setIsChatOpen(true);
    setIsTaskOpen(false);
    setIsOpen(true);
    setShowLabels(false);
  };

  const toggleTaskbox = () => {
    setIsTaskOpen(true);
    setIsChatOpen(false);
    setIsOpen(true);
    setShowLabels(false);
  };

  const closeChatbox = () => {
    setIsChatOpen(false);
    setShowLabels(true);
  };

  const closeTaskbox = () => {
    setIsTaskOpen(false);
    setShowLabels(true);
  };

  const InboxIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#8C1AF6">
      <path d="M280-240q-17 0-28.5-11.5T240-280v-80h520v-360h80q17 0 28.5 11.5T880-680v600L720-240H280ZM80-280v-560q0-17 11.5-28.5T120-880h520q17 0 28.5 11.5T680-840v360q0 17-11.5 28.5T640-440H240L80-280Zm520-240v-280H160v280h440Zm-440 0v-280 280Z"/>
    </svg>
  );

  return (
    <div className="group fixed bottom-5 right-5 p-2 flex items-end justify-end space-x-2">
      {isChatOpen && <ChatBox onClose={closeChatbox} />}
      {isTaskOpen && <TaskBox onClose={closeTaskbox} />}
      
      {isOpen && (
        <>
          <div className={`flex flex-col items-center transition-all duration-300 ${isTaskOpen ? 'order-3' : 'order-1'}`}>
            {showLabels && <span className="mb-1 text-sm">Task</span>}
            <ButtonComponent
              Icon={isTaskOpen ? ChromeReaderModeIcon : TaskIcon}
              label="Task"
              onClick={toggleTaskbox}
              styleClasses={`${isTaskOpen ? 'bg-yellow-500 text-white' : 'bg-white'} w-12 h-12`}
            />
          </div>
          <div className={`flex flex-col items-center transition-all duration-300 ${isChatOpen ? 'order-3' : 'order-2'}`}>
            {showLabels && <span className="mb-1 text-sm">Inbox</span>}
            <ButtonComponent
              Icon={isChatOpen ? ForumIcon : InboxIcon}
              label="Inbox"
              onClick={toggleChatbox}
              styleClasses={`${isChatOpen ? 'bg-purple-500 text-white' : 'bg-white'} w-12 h-12`}
            />
          </div>
        </>
      )}
      
      {!isChatOpen && !isTaskOpen && (
        <ButtonComponent
          Icon={BoltIcon}
          onClick={toggleMenu}
          styleClasses="bg-blue-500 hover:bg-blue-600 order-3 w-12 h-12"
        />
      )}
    </div>
  );
};

export default FloatingMenu;