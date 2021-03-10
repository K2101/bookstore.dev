import React from 'react';

const FormatButton = ({ format, price, selectFormat }) => {
  return (
    <button
      className="w-48 px-5 py-5 mt-2 bg-indigo-300 border-2 border-indigo-400 
      rounded-lg shadow focus:outline-none font-bold text-md text-gray-700
      focus:bg-indigo-400 focus:border-indigo-600 focus:shadow-lg"
      onClick={() => selectFormat(format)}
    >
      <h1>{format}</h1>
      <h1>${price}</h1>
    </button>
  );
};

export default FormatButton;
