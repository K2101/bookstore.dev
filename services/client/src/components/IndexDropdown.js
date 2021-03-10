import React from 'react';
import { Link } from 'react-router-dom';
import { createPopper } from '@popperjs/core';

const IndexDropdown = () => {
  // dropdown props
  const [cartDropdownPopoverShow, setCartDropdownPopoverShow] = React.useState(
    false
  );
  const cartDropdownRef = React.createRef();

  const popoverCartDropdownRef = React.createRef();

  const openCartDropdownPopover = () => {
    createPopper(cartDropdownRef.current, popoverCartDropdownRef.current, {
      placement: 'bottom-start',
    });
    setCartDropdownPopoverShow(true);
  };
  const closeCartDropdownPopover = () => {
    setCartDropdownPopoverShow(false);
  };

  const [
    profileDropdownPopoverShow,
    setProfileDropdownPopoverShow,
  ] = React.useState(false);

  const profileDropdownRef = React.createRef();

  const popoverProfileDropdownRef = React.createRef();

  const openProfileDropdownPopover = () => {
    createPopper(
      profileDropdownRef.current,
      popoverProfileDropdownRef.current,
      {
        placement: 'bottom-start',
      }
    );
    setProfileDropdownPopoverShow(true);
  };
  const closeProfileDropdownPopover = () => {
    setProfileDropdownPopoverShow(false);
  };
  return (
    <>
      <div className="lg:flex">
        <button
          className="focus:outline-none hover:text-gray-600 text-gray-800 px-5 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
          href="#pablo"
          ref={cartDropdownRef}
          onClick={(e) => {
            e.preventDefault();
            cartDropdownPopoverShow
              ? closeCartDropdownPopover()
              : openCartDropdownPopover();
          }}
        >
          <div className="relative">
            <img src="/icons/cart.svg" alt="cart" className="w-8" />
            <div className="absolute top-3 left-9 bg-indigo-500 text-indigo-100 rounded-full text-md py-0 px-2 transform -translate-x-4 -translate-y-4 shadow">
              3
            </div>
          </div>
        </button>

        <button
          className="focus:outline-none hover:text-gray-600 text-gray-800 px-6 py-1 mb-5 lg:mb-0 lg:py-2 flex items-center text-xs uppercase font-bold"
          href="#pablo"
          ref={profileDropdownRef}
          onClick={(e) => {
            e.preventDefault();
            profileDropdownPopoverShow
              ? closeProfileDropdownPopover()
              : openProfileDropdownPopover();
          }}
        >
          <img src="/icons/user.svg" alt="user" className="w-7" />
        </button>
      </div>

      <div
        ref={popoverCartDropdownRef}
        className={
          (cartDropdownPopoverShow ? 'block ' : 'hidden ') +
          'bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48'
        }
      >
        {/* <span
          className={
            'text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-no-wrap bg-transparent text-gray-500'
          }
        >
          Admin Layout
        </span> */}
        {/* <Link
          to="/admin/dashboard"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
        >
          Dashboard
        </Link> */}
        <Link
          to="/user/settings"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
        >
          cart
        </Link>
      </div>

      <div
        ref={popoverProfileDropdownRef}
        className={
          (profileDropdownPopoverShow ? 'block ' : 'hidden ') +
          'bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48'
        }
      >
        {/* <span
          className={
            'text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-no-wrap bg-transparent text-gray-500'
          }
        >
          Admin Layout
        </span> */}
        {/* <Link
          to="/admin/dashboard"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
        >
          Dashboard
        </Link> */}
        <Link
          to="/user/settings"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
        >
          Profile
        </Link>
        <div className="h-0 mx-4 my-2 border border-solid border-gray-200" />
        <Link
          to="/auth/login"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
        >
          Login
        </Link>
        <Link
          to="/auth/register"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
        >
          Register
        </Link>
        <Link
          to="/auth/logout"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
        >
          Logout
        </Link>
      </div>
    </>
  );
};

export default IndexDropdown;
