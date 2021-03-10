import React from 'react';

const ByGenreCard = ({ img }) => {
  return (
    <button
      className=" relative mb-10 pb-10 lg:mb-0 bg-indigo-400 rounded-lg shadow-xl w-8/12
      focus:outline-none hover:scale-105 hover:bg-purple-400 transform transition duration-400 hover:shadow-2xl"
    >
      <img src={img} className="rounded-t-lg -mt-3 shadow-lg" />

      <div className="px-4 py-5 text-left">
        <h2 className="font-bold text-sm text-indigo-100 mb-2 text-left">
          Everything Sad Is Untrue
        </h2>
        <h2 className="absolute  bg-indigo-600  transform transition duration-400 bottom-9 right-0 pr-2  pl-3 pb-1 pt-0.5  rounded-l-full font-bold text-md text-blue-300  -mb-2 italic">
          $25.99
        </h2>
        <div
          onClick={() => console.log('add to cart')}
          className="absolute  bg-indigo-100  transform transition duration-400 bottom-9 left-0 pr-5  pl-3 pb-1 pt-0.5  rounded-r-full font-bold text-md text-blue-300  -mb-2 italic"
        >
          <img
            src="/icons/cart.svg"
            alt="cart"
            className="w-6 transition transform duration-300 hover:scale-125 opacity-70 "
          />
        </div>
      </div>
    </button>
  );
};

export default ByGenreCard;
