import React, { useState, useEffect, useRef } from 'react';
import { FaTimes, FaSearch, FaSpinner } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { api } from '../services/apiClient';

export default function SearchModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);
  const searchTimeout = useRef(null);

  const handleBlogClick = (blogId) => {
    if (!blogId) return;
    onClose();
    navigate(`/blog-details/${blogId}`);
  };

  const stripHtml = (html) => {
    if (!html) return '';
    try {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      return doc.body.textContent || '';
    } catch (error) {
      console.error('Error stripping HTML:', error);
      return '';
    }
  };

  const searchBlogs = async (term) => {
    if (!term?.trim()) {
      setFilteredBlogs([]);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const response = await api.searchBlogs(term);
      const blogs = response?.data?.blogs || [];
      
      // Transform the blog data if needed
      const transformedBlogs = blogs.map(blog => ({
        ...blog,
        content: blog.content || '',
        images: blog.images || [],
        _id: blog._id || null
      }));
      
      setFilteredBlogs(transformedBlogs);
    } catch (error) {
      console.error('Error searching blogs:', error);
      setError('Failed to search blogs. Please try again.');
      setFilteredBlogs([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    // Reduced the timeout to 500ms for better responsiveness
    searchTimeout.current = setTimeout(() => {
      searchBlogs(value);
    }, 500);
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [isOpen]);

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
          onChange={handleSearchChange}
          placeholder="Search articles..."
          className="w-full px-6 py-4 text-2xl border-none bg-gray-100 rounded-2xl 
                   focus:ring-2 focus:ring-primary/20 focus:outline-none
                   placeholder:text-gray-400"
          autoComplete="off"
        />
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Error state */}
        {error && (
          <div className="text-center py-8">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {/* Search prompt state */}
        {!searchTerm && !error && (
          <div className="text-center py-20">
            <FaSearch size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Start typing to search
            </h3>
            <p className="text-gray-500">
              Search for blogs by title or content
            </p>
          </div>
        )}

        {/* Loading state */}
        {isLoading && (
          <div className="text-center py-20">
            <FaSpinner size={48} className="text-primary mx-auto mb-4 animate-spin" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Searching...
            </h3>
          </div>
        )}

        {/* Results count */}
        {searchTerm && !isLoading && !error && (
          <div className="mb-8 text-sm text-gray-500">
            Found {filteredBlogs.length} {filteredBlogs.length === 1 ? 'result' : 'results'} for "{searchTerm}"
          </div>
        )}
        
        {/* Results grid */}
        {!isLoading && !error && filteredBlogs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog, index) => (
              <article 
                key={blog?._id || index}
                onClick={() => handleBlogClick(blog?._id)}
                className="group bg-white rounded-2xl overflow-hidden cursor-pointer
                          shadow-[0_2px_10px_rgba(0,0,0,0.08)] 
                          hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] 
                          transition-all duration-300
                          hover:-translate-y-1 border border-gray-100"
              >
                <div className="p-5">
                  <div className="flex gap-4 mb-4">
                    <div className="relative w-32 h-32 flex-shrink-0">
                      <img 
                        src={blog?.images?.[0] || '/placeholder-image.jpg'} 
                        alt="" 
                        className="w-full h-full rounded-lg object-cover transform group-hover:scale-105 
                                 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-text-primary group-hover:text-primary 
                                   transition-colors duration-300 line-clamp-2 mb-2">
                        {blog?.title || 'Untitled'}
                      </h3>
                      <p className="text-sm text-text-secondary/80 line-clamp-3">
                        {stripHtml(blog?.content)}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* No results state */}
        {searchTerm && !isLoading && !error && filteredBlogs.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No results found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search terms
            </p>
          </div>
        )}
      </div>
    </div>
  );
}





