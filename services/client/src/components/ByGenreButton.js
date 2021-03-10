import React from 'react';

const ByGenreButton = ({ genre, handleList }) => {
  return (
    <button
      className="cursor-pointer font-bold text-lgtext-lg 
    hover:text-indigo-900 transform transition duration-400
      focus:outline-none focus:scale-125 focus:text-indigo-900"
      onClick={() => handleList(genre)}
    >
      {genre}
    </button>
  );
};

export default ByGenreButton;
