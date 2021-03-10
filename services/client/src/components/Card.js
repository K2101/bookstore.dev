import React from 'react';

const Card = ({ img }) => {
  return (
    <div>
      <button
        className="relative  bg-indigo-400 rounded-lg shadow-xl w-10/12 h-auto mb-20 lg:mb-0 lg:pb-20
    focus:outline-none hover:scale-105 transform transition duration-400 hover:shadow-2xl"
      >
        <img
          src={img}
          className=" lg:absolute -top-14 left-6 lg:w-60 rounded-t-lg lg:rounded-lg
         shadow-2xl"
        />

        <div className="p-5  lg:p-0 lg:pt-10 lg:pl-80 lg:pr-12 text-center lg:text-left lg:block">
          <h2 className="font-bold text-2xl lg:text-4xl text-gray-800 lg:mb-2">
            Everything Sad Is Untrue
          </h2>
          <p className="text-gray-700  text-xl lg:text-2xl italic ">
            By Daniel Nayeri
          </p>

          <p className="text-gray-800 text-sm lg:text-md mt-4 lg:mt-10">
            At the front of a middle school classroom in Oklahoma, a boy named
            Khosrou (whom everyone calls "Daniel") stands, trying to tell a
            story.
          </p>
        </div>
      </button>
    </div>
  );
};

export default Card;
