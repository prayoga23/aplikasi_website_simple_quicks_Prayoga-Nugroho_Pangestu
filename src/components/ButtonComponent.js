import React from 'react';

const ButtonComponent = ({ Icon, label, onClick, styleClasses }) => {
  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-full bg-black shadow-lg hover:bg-gray-800 transition-all duration-300 ${styleClasses}`}
    >
      <Icon className="h-6 w-6 text-white" />
    </button>
  );
};

export default ButtonComponent;