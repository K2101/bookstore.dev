/*eslint-disable*/
import React from 'react';
import { Link } from 'react-router-dom';
// components
import IndexDropdown from './IndexDropdown';
import Search from '../components/Search';

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  return (
    <>
      <nav
        className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-gradient-to-r  
      via-indigo-100 from-indigo-300 to-purple-300 shadow-lg "
      >
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              to="/"
              className="text-gray-800 text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase"
            >
              <div className="flex items-center justify-center text-xl">
                <img
                  src="/icons/logo.svg"
                  alt="logo"
                  className="w-8 opacity-80"
                />
                &nbsp;Bookstore
              </div>
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              'lg:flex flex-grow items-center bg-indigo-400 lg:bg-transparent lg:shadow-none' +
              (navbarOpen ? ' block' : ' hidden')
            }
            id="example-navbar-warning"
          >
            <ul className="lg:flex pt-5 pl-5 lg:pl-0 lg:pt-0">
              <li className="flex items-center">
                <button
                  className="focus:outline-none"
                  onClick={() => setSearchOpen(!searchOpen)}
                >
                  <img
                    src="/icons/search.svg"
                    alt="search"
                    className="w-7 lg:w-8 lg:pl-2"
                  />
                </button>
                {searchOpen ? <Search /> : ''}
              </li>
            </ul>

            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center">
                <IndexDropdown />
              </li>

              {/* <li className="flex items-center">
                <a
                  className="hover:text-gray-600 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdemos.creative-tim.com%2Fnotus-react%2F%23%2F"
                  target="_blank"
                >
                  <i className="text-gray-500 fab fa-facebook text-lg leading-lg " />
                  <span className="lg:hidden inline-block ml-2">Share</span>
                </a>
              </li>

              <li className="flex items-center">
                <a
                  className="hover:text-gray-600 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fdemos.creative-tim.com%2Fnotus-react%2F%23%2F&text=Start%20your%20development%20with%20a%20Free%20Tailwind%20CSS%20and%20React%20UI%20Kit%20and%20Admin.%20Let%20Notus%20React%20amaze%20you%20with%20its%20cool%20features%20and%20build%20tools%20and%20get%20your%20project%20to%20a%20whole%20new%20level.%20"
                  target="_blank"
                >
                  <i className="text-gray-500 fab fa-twitter text-lg leading-lg " />
                  <span className="lg:hidden inline-block ml-2">Tweet</span>
                </a>
              </li>

              <li className="flex items-center">
                <a
                  className="hover:text-gray-600 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="https://github.com/creativetimofficial/notus-react?ref=nr-index-navbar"
                  target="_blank"
                >
                  <i className="text-gray-500 fab fa-github text-lg leading-lg " />
                  <span className="lg:hidden inline-block ml-2">Star</span>
                </a>
              </li> */}

              {/* <li className="flex items-center">
                <button
                  className="bg-blue-500 text-white active:bg-blue-600 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                  type="button"
                >
                  <i className="fas fa-arrow-alt-circle-down"></i> Download
                </button>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

// import React from 'react';

// const Component = (props) => {
//   const [open, setOpen] = React.useState(false);

//   return (
//     <>
//       <div className="top-0 fixed flex items-center justify-between px-52 py-6 bg-red-200 mx-auto flex-wrap shadow-lg">
//         <h1>sadasd</h1>
//         <h1>sadasd</h1>
//       </div>
//     </>
//   );
// };

// export default Component;
