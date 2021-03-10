const Hero = () => {
  return (
    <div className="relative">
      <div className="relative bg-gradient-to-r  via-indigo-400 from-indigo-500 to-purple-500 p-32 min-h-screen lg:flex lg:items-center lg:justify-center lg:space-x-52">
        <div className="relative bg-indigo-700 p-10 rounded-lg shadow-2xl">
          <div className="absolute top-0 left-0 bg-red-500 text-red-100 rounded-lg text-md py-1 px-4 transform -translate-x-4 -translate-y-4 shadow-lg italic uppercase">
            New Stuff!
          </div>

          <h1 className="relative font-bold italic uppercase lg:text-5xl text-indigo-100 pt-3">
            <span className="absolute top-0 left-0 transform -translate-x-8 -translate-y-2 scale-150 text-indigo-300 text-6xl opacity-50">
              "&nbsp;
            </span>
            Cosmos : Possible Worlds
          </h1>
          <p className="pt-4 text-indigo-100 text-2xl italic underline">
            Ann Druyan
          </p>

          <p className="pt-10 text-indigo-100 text-xl italic text-center ">
            "The Sequel to Carl Sagan's Beloved Classic."
          </p>

          <p className="pt-8 text-indigo-100 text-xl italic text-center ">
            "Ann Druyan is reimagining the future." -Scientific American
          </p>

          <button className="block w-full mt-12 p-x2 py-4 text-center bg-black text-white text-3xl font-bold rounded-lg shadow hover:bg-indigo-500 hover:shadow-2xl hover:text-black  focus:outline-none focus:ring-2 focus:ring-indigo-500 traisition duration-200">
            Order Now
          </button>
        </div>

        <img
          src="images/cosmos.jpg"
          alt="yellowbook"
          className="lg:w-1/4  w-4/4 mt-32 lg:mt-0  rounded-lg shadow-2xl"
        />

        {/* left */}
        <img
          src="icons/open-book.svg"
          alt="openbook"
          className="invisible lg:visible absolute w-14 top-32 -left-20 opacity-30 shadow-2xl"
        />

        <img
          src="icons/open-book2.svg"
          alt="openbook"
          className="invisible lg:visible absolute w-14 top-44 left-64 opacity-30 shadow-2xl"
        />

        <img
          src="icons/open-book.svg"
          alt="openbook"
          className="invisible lg:visible absolute w-14 top-64 left-90 opacity-30 shadow-2xl"
        />

        <img
          src="icons/open-book2.svg"
          alt="openbook"
          className="invisible lg:visible absolute w-14 top-70 -left-48 opacity-30 shadow-2xl"
        />

        <img
          src="icons/open-book.svg"
          alt="openbook"
          className="invisible lg:visible absolute w-14 top-12 left-96 opacity-30 shadow-2xl"
        />

        <img
          src="icons/open-book.svg"
          alt="openbook"
          className="invisible lg:visible absolute w-14 bottom-20 left-40 opacity-30 shadow-2xl"
        />

        {/* right */}

        <img
          src="icons/open-book2.svg"
          alt="openbook"
          className="invisible lg:visible absolute w-14 top-16 right-32 opacity-30 shadow-2xl"
        />

        <img
          src="icons/open-book.svg"
          alt="openbook"
          className="invisible lg:visible absolute w-14 top-96 right-48 opacity-30 shadow-2xl"
        />

        <img
          src="icons/open-book2.svg"
          alt="openbook"
          className="invisible lg:visible absolute w-14 bottom-32 right-14 opacity-30 shadow-2xl"
        />

        <img
          src="icons/open-book2.svg"
          alt="openbook"
          className="invisible lg:visible absolute w-14 bottom-52 left-90 opacity-30 shadow-2xl"
        />
      </div>
    </div>
  );
};

export default Hero;
