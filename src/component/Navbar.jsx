import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
import SearchModal from './SearchModal';

const pages = [
  { name: 'HOME', path: '/' },
  { name: 'ABOUT', path: '/about' },
  { name: 'CONTACT US', path: '/contact' }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update the search button click handler
  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  return (
    <>
      <div className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'px-0 top-0' 
          : 'px-4 sm:px-6 lg:px-8 top-4'
      }`}>
        <nav className={`transition-all duration-300 ${
          scrolled 
            ? 'w-full bg-white/95 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.12)]' 
            : 'max-w-6xl mx-auto rounded-2xl bg-white/80 backdrop-blur-sm shadow-[0_4px_16px_rgba(0,0,0,0.08)]'
        }`}>
          <div className={`transition-all duration-300 ${
            scrolled ? 'px-4 sm:px-6 lg:px-8' : 'px-4 sm:px-6'
          }`}>
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <img
                  className="h-8 w-auto"
                  src="/assets/LM_Monogram_Registered_Select_20230221.svg"
                  alt="Logo"
                />
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {pages.map((page) => (
                  <NavLink
                    key={page.name}
                    to={page.path}
                    className={({ isActive }) => `
                      relative text-base font-medium text-text-secondary hover:text-primary transition-colors duration-300
                      after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 
                      after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform 
                      after:duration-300 after:origin-left
                      before:content-[''] before:absolute before:inset-0 before:bg-background-dark/0 
                      hover:before:bg-background-dark/5 before:rounded-lg before:-m-2 before:p-2
                      ${isActive ? 'text-primary after:scale-x-100 before:bg-background-dark/5' : ''}
                    `}
                  >
                    {page.name}
                  </NavLink>
                ))}
                
                {/* Search Button */}
                <button 
                  onClick={handleSearchClick}
                  className="p-2.5 rounded-xl bg-background-dark/5 hover:bg-background-dark/10
                           text-text-secondary hover:text-primary transition-colors duration-300
                           flex items-center justify-center"
                  aria-label="Search"
                >
                  <FaSearch size={16} />
                </button>

                <button 
                  onClick={() => navigate('/blog')}
                  className="mt-2 mx-4 px-5 py-2 bg-primary text-white rounded-full font-medium
                           transform hover:scale-105 hover:bg-opacity-90 transition-all duration-300
                           shadow-[0_4px_16px_rgba(10,33,192,0.25)] hover:shadow-[0_6px_20px_rgba(10,33,192,0.35)]">
                  POST YOUR BLOG
                </button>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center space-x-4">
                {/* Mobile Search Button */}
                <button 
                  onClick={handleSearchClick}
                  className="p-2.5 rounded-xl bg-background-dark/5 hover:bg-background-dark/10
                           text-text-secondary hover:text-primary transition-colors duration-300"
                  aria-label="Search"
                >
                  <FaSearch size={16} />
                </button>

                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2.5 rounded-xl bg-background-dark/5 hover:bg-background-dark/10
                           text-text-secondary hover:text-primary transition-colors duration-300"
                >
                  {isOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div 
            className={`md:hidden absolute left-0 right-0 mx-4 transition-all duration-300 ease-in-out ${
              isOpen 
                ? 'opacity-100 translate-y-2' 
                : 'opacity-0 -translate-y-4 pointer-events-none'
            }`}
          >
            <div className="p-4 bg-white rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] 
                          border border-background-dark/5">
              <div className="flex flex-col space-y-2">
                {pages.map((page) => (
                  <Link
                    key={page.name}
                    to={page.path}
                    className={`px-4 py-2.5 rounded-lg transition-all duration-300
                             font-medium text-sm
                             ${location.pathname === page.path
                               ? 'text-primary bg-background-dark/5'
                               : 'text-text-secondary hover:text-primary hover:bg-background-dark/5'}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {page.name}
                  </Link>
                ))}
                <button 
                  onClick={() => navigate('/blog')}
                  className="mt-2 mx-4 px-5 py-2 bg-primary text-white rounded-full font-medium
                           transform hover:scale-105 hover:bg-opacity-90 transition-all duration-300
                           shadow-[0_4px_16px_rgba(10,33,192,0.25)] hover:shadow-[0_6px_20px_rgba(10,33,192,0.35)]">
                  POST YOUR BLOG
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Add the SearchModal component */}
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  );
}
