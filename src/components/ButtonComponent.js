import React from 'react';

const ButtonComponent = ({ imageSrc, altText, onClick, styleClasses, label }) => {
  return (
    <div className={`flex flex-col items-center ${styleClasses}`}>
      {label && <span className="mb-2 ">{label}</span>}
      <button
        className={`rounded-full transition-transform`}
        onClick={onClick}
      >
        <img src={imageSrc} alt={altText} className="w-100 h-100" />
      </button>
    </div>
  );
};

export default ButtonComponent;
