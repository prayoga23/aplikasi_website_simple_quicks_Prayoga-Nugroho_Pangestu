import React, { useState } from 'react';
import ButtonComponent from './ButtonComponent';
import ChatBox from './ChatBox';
import lightningIcon from '../assets/img/lightning-icon.png';
import inboxIcon from '../assets/img/inbox-icon.png';
import taskIcon from '../assets/img/task-icon.png'; // Tambahkan ikon chat di sini

const FloatingMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleChatbox = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="group fixed bottom-5 right-5 p-2 flex items-end justify-end">
      {/* ChatBox yang akan muncul saat tombol di klik */}
      {isChatOpen && <ChatBox onClose={toggleChatbox} />}
      
       {/* Tombol Task */}
      <ButtonComponent
        imageSrc={taskIcon}
        altText="Task"
        label="Task"
        styleClasses={`${isOpen ? 'transform translate-x-[-50px]' : 'hidden'}`}
      />

      {/* Tombol Inbox */}
      <ButtonComponent
        imageSrc={inboxIcon}
        altText="Inbox"
        label="Inbox"
        onClick={toggleChatbox}
        styleClasses={`${isOpen ? 'transform translate-x-[-25px]' : 'hidden'}`}
      />
      
      {/* Tombol utama untuk membuka/menutup menu */}
      <ButtonComponent
        imageSrc={lightningIcon} // Ubah sesuai ikon yang Anda inginkan
        altText="Menu"
        onClick={toggleMenu}
      /> 
    </div>
  );
};

export default FloatingMenu;
