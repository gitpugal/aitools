import React, { useState } from 'react';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleItemClick = () => {
    // Handle item click logic here
  };

  const handleToggleMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={handleToggleMenu}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open main menu'}
          >
            <span className="sr-only">{isMobileMenuOpen ? 'Close menu' : 'Open main menu'}</span>
            {isMobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
        <div className={`lg:hidden ${isMobileMenuOpen ? 'flex' : 'hidden'}`}>
          <div className="fixed inset-0 z-10"></div>
          <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={handleToggleMenu}
                aria-label="Close menu"
              >
                <span className="sr-only">Close menu</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mt-6">
              <a href="#" className="block rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50" onClick={handleItemClick}>
                Product
              </a>
              <a href="#" className="block rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50" onClick={handleItemClick}>
                Features
              </a>
              <a href="#" className="block rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50" onClick={handleItemClick}>
                Marketplace
              </a>
              <a href="#" className="block rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50" onClick={handleItemClick}>
                Company
              </a>
            </div>
            <div className="py-6">
              <a href="#" className="block rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50" onClick={handleItemClick}>
                Log in
              </a>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-500" onClick={handleItemClick}>
            Product
          </a>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-500" onClick={handleItemClick}>
            Features
          </a>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-500" onClick={handleItemClick}>
            Marketplace
          </a>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-500" onClick={handleItemClick}>
            Company
          </a>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-500">
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
