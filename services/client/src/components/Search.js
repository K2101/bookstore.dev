import React from 'react';

const Search = () => {
  const [keyword, setKeyword] = React.useState('');

  const submitHandler = (event) => {
    event.preventDefault();

    console.log(keyword);
  };

  return (
    <div>
      <div className="w-80 lg:w-96 pl-6">
        <div className="">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>

            <form onSubmit={submitHandler}>
              <input
                id="search"
                name="search"
                className="block w-full pl-3 pr-3 py-2 border border-indigo-100 rounded-md leading-5 bg-indigo-100 placeholder-gray-500 focus:outline-none 
              focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm shadow"
                placeholder="Search"
                type="search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
