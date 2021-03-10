import React from 'react';
import Card from '../components/Card';

const img1 = '/images/randomcover.jpg';
const img2 = '/images/blackcover.jpg';
const img3 = '/images/black2.jpg';
const img4 = '/images/cover24.jpg';
const img5 = '/images/cover7.jpg';
const img6 = '/images/cover9.jpg';
const img7 = '/images/cover13.jpg';
const img8 = '/images/yellow.jpg';
const img9 = '/images/cover23.jpg';
const img10 = '/images/cover16.jpg';
const img11 = '/images/cover18.jpg';

const FeaturedBooks = () => {
  return (
    <>
      <div className="shadow-inner bg-gradient-to-r  via-indigo-200 from-indigo-300 to-purple-300 py-24 min-h-screen">
        <div className="flex items-center space-x-32 justify-center mb-40">
          <h1
            className="text-center lg:text-6xl text-4xl font-extrabold bg-clip-text text-transparent 
          bg-gradient-to-r from-indigo-600 to-purple-600"
          >
            Featured Books
          </h1>
        </div>

        <div className="pl-32">
          <div class="lg:grid grid-cols-2 gap-10 gap-y-40 mr-24 lg:mr-0">
            <Card img={img1} />
            <Card img={img2} />
            <Card img={img3} />
            <Card img={img4} />
            <Card img={img5} />
            <Card img={img6} />
          </div>
        </div>

        <div className=" relative lg:mt-32 z-20 p-32 pt-10 bg-gradient-to-r via-indigo-200 from-indigo-300 to-purple-300"></div>
        <div className="relative">
          <div className="bg-gradient-to-r  via-indigo-600 from-indigo-500 to-purple-500 h-96 relative z-0"></div>

          <img
            src="icons/stripe5.svg"
            alt="openbook"
            className="absolute w-2/12 -top-28 left-60 opacity-20 z-30 transform rotate-180"
          />

          <img
            src="icons/stripe3.svg"
            alt="openbook"
            className="absolute w-2/12 top-80 right-14 opacity-20 z-30 transform rotate-180 "
          />

          <h1
            className="absolute top-32 left-52 lg:text-4xl font-extrabold bg-clip-text text-transparent 
          bg-gradient-to-r from-pink-300 to-yellow-200 pb-10 z-40"
          >
            “Somewhere, something incredible is waiting <br />
            &nbsp;&nbsp;to be known.”
          </h1>
          <p
            className="absolute top-60 left-52 lg:text-2xl font-extrabold bg-clip-text text-transparent 
          bg-gradient-to-r from-pink-300 to-yellow-200 pb-10 text-center z-40"
          >
            &nbsp;&nbsp; - Carl Sagan
          </p>

          <div className="absolute -top-32 right-64 z-10">
            <div className="inline-block items-center justify-center transform rotate-12">
              <div className="grid grid-cols-4 gap-1 opacity-80 z-10">
                <img width="100" src={img9} className="rounded-lg shadow-lg" />
                <img width="100" src={img2} className="rounded-lg shadow-lg" />
                <img width="100" src={img8} className="rounded-lg shadow-lg" />
                <img width="100" src={img4} className="rounded-lg shadow-lg" />
                <img
                  width="200"
                  src={img5}
                  className="col-span-2 rounded-lg shadow-sm"
                />
                <img width="100" src={img6} className="rounded-lg shadow-lg" />
                <img width="100" src={img7} className="rounded-lg shadow-lg" />
                <img width="100" src={img3} className="rounded-lg shadow-lg" />
                <img width="100" src={img1} className="rounded-lg shadow-lg" />
                <img
                  width="200"
                  src={img10}
                  className="col-span-2 -mt-36 rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
        <div className=" relative shadow-inner z-20 pb-40 bg-gradient-to-r via-indigo-200 from-indigo-300 to-purple-300 "></div>

        <div className="lg:flex p-10 items-center lg:space-x-16 justify-center lg:mt-14 ">
          <div className="inline-block bg-indigo-500 p-12 rounded-2xl shadow-2xl mb-10 lg:mb-0">
            <h1 className="text-center font-bold text-4xl mb-10 text-indigo-100 uppercase">
              🏷️ New
            </h1>
            <div className="grid grid-cols-4 gap-1 opacity-90 ">
              <button className="transform hover:shadow-2xl hover:scale-150 transition duration-400 focus:outline-none">
                <img width="100" src={img9} className="rounded-lg shadow-lg " />
              </button>
              <img width="100" src={img2} className="rounded-lg shadow-lg" />

              <img width="100" src={img8} className="rounded-lg shadow-lg" />
              <img width="100" src={img4} className="rounded-lg shadow-lg" />

              <img
                width="200"
                src={img11}
                className="col-span-2  rounded-lg shadow-lg"
              />

              <img width="100" src={img6} className="rounded-lg shadow-lg" />
              <img width="100" src={img7} className="rounded-lg shadow-lg" />
              <img width="100" src={img3} className="rounded-lg shadow-lg" />
              <img width="100" src={img1} className="rounded-lg shadow-lg" />
              <img
                width="200"
                src={img10}
                className="col-span-2 -mt-36 rounded-lg shadow-lg"
              />
            </div>
          </div>

          <div className="inline-block bg-indigo-500 p-12 rounded-2xl shadow-2xl mb-10 lg:mb-0">
            <h1 className="text-center font-bold text-4xl mb-10 text-indigo-100 uppercase">
              💰 Bestselling
            </h1>
            <div className="grid grid-cols-4 gap-1 opacity-90 ">
              <button className="transform hover:shadow-2xl hover:scale-150 transition duration-400 focus:outline-none">
                <img width="100" src={img9} className="rounded-lg shadow-lg " />
              </button>
              <img width="100" src={img2} className="rounded-lg shadow-lg" />

              <img width="100" src={img8} className="rounded-lg shadow-lg" />
              <img width="100" src={img4} className="rounded-lg shadow-lg" />

              <img
                width="200"
                src={img11}
                className="col-span-2  rounded-lg shadow-lg"
              />

              <img width="100" src={img6} className="rounded-lg shadow-lg" />
              <img width="100" src={img7} className="rounded-lg shadow-lg" />
              <img width="100" src={img3} className="rounded-lg shadow-lg" />
              <img width="100" src={img1} className="rounded-lg shadow-lg" />
              <img
                width="200"
                src={img10}
                className="col-span-2 -mt-36 rounded-lg shadow-lg"
              />
            </div>
          </div>

          <div className="inline-block bg-indigo-500 p-12 rounded-2xl shadow-2xl mb-10 lg:mb-0">
            <h1 className="text-center font-bold text-4xl mb-10 text-indigo-100 uppercase">
              🔥 Promotions
            </h1>
            <div className="grid grid-cols-4 gap-1 opacity-90 ">
              <button className="transform hover:shadow-2xl hover:scale-150 transition duration-400 focus:outline-none">
                <img width="100" src={img9} className="rounded-lg shadow-lg " />
              </button>
              <img width="100" src={img2} className="rounded-lg shadow-lg" />

              <img width="100" src={img8} className="rounded-lg shadow-lg" />
              <img width="100" src={img4} className="rounded-lg shadow-lg" />

              <img
                width="200"
                src={img11}
                className="col-span-2  rounded-lg shadow-lg"
              />

              <img width="100" src={img6} className="rounded-lg shadow-lg" />
              <img width="100" src={img7} className="rounded-lg shadow-lg" />
              <img width="100" src={img3} className="rounded-lg shadow-lg" />
              <img width="100" src={img1} className="rounded-lg shadow-lg" />
              <img
                width="200"
                src={img10}
                className="col-span-2 -mt-36 rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturedBooks;
