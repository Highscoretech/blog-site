import React, { useState, useEffect, useRef } from 'react';
import { FaTimes } from "react-icons/fa";
import { blogs } from '../constants';
import { useNavigate } from 'react-router-dom';

export default function SearchModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const inputRef = useRef(null);

  const handleBlogClick = (blogId) => {
    onClose();
    navigate(`/blog-details/${blogId}`);
  };

  useEffect(() => {
    // Focus input when modal opens
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }

    // Disable body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    // Filter blogs based on search term
    const filtered = blogs.filter(blog =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.desc.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBlogs(filtered);
  }, [searchTerm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-[60] overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-100 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-1"></div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
              aria-label="Close search"
            >
              <FaTimes size={24} className="text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search articles..."
          className="w-full px-6 py-4 text-2xl border-none bg-gray-100 rounded-2xl 
                   focus:ring-2 focus:ring-primary/20 focus:outline-none
                   placeholder:text-gray-400"
          autoComplete="off"
        />
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {searchTerm && (
          <div className="mb-8 text-sm text-gray-500">
            Found {filteredBlogs.length} {filteredBlogs.length === 1 ? 'result' : 'results'} for "{searchTerm}"
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog, index) => (
            <article 
              key={index}
              onClick={() => handleBlogClick(blog.id)}
              className="group bg-white rounded-2xl overflow-hidden cursor-pointer
                         shadow-[0_2px_10px_rgba(0,0,0,0.08)] 
                         hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] 
                         transition-all duration-300
                         hover:-translate-y-1 border border-gray-100"
            >
              <div className="p-5">
                {/* Image and Content Wrapper */}
                <div className="flex gap-4 mb-4">
                  {/* Image Container */}
                  <div className="relative w-32 h-32 flex-shrink-0">
                    <img 
                      src={blog.img} 
                      alt="" 
                      className="w-full h-full rounded-lg object-cover transform group-hover:scale-105 
                               transition-transform duration-300"
                    />
                  </div>

                  {/* Content Container */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-text-primary group-hover:text-primary 
                                 transition-colors duration-300 line-clamp-2 cursor-pointer mb-2">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-text-secondary/80 line-clamp-3">
                      {blog.desc}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* No results state */}
        {searchTerm && filteredBlogs.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-500">Try adjusting your search terms</p>
          </div>
        )}
      </div>
    </div>
  );
}
