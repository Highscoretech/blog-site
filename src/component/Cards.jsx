import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaEye, FaBookmark, FaShare, FaClock } from "react-icons/fa";
import { blogs } from '../constants';
import { formatDistanceToNow } from 'date-fns';
import Pagination from '@mui/material/Pagination';

export default function Cards() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const blogsPerPage = 20;
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const indexOfLastBlog = page * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: document.querySelector('.cards-section').offsetTop - 100, behavior: 'smooth' });
  };

  const handleBlogClick = (blogId) => {
    navigate(`/blog-details/${blogId}`);
  };

  return (
    <div className="cards-section">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
        {currentBlogs.map((blog, index) => (
          <article 
            key={index} 
            className="group bg-white rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.08)] 
                       hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300
                       hover:-translate-y-1 border border-gray-100 cursor-pointer"
            onClick={() => handleBlogClick(blog.id)}
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent 
                               opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                               rounded-lg"/>
                </div>

                {/* Content Container */}
                <div className="flex-1">
                  {/* Title */}
                  <h3 className="text-lg font-semibold text-text-primary group-hover:text-primary 
                               transition-colors duration-300 line-clamp-2 cursor-pointer mb-2">
                    {blog.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-text-secondary/80 line-clamp-3">
                    {blog.desc}
                  </p>
                </div>
              </div>

              {/* Metadata & Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                {/* Left side - Date & Views */}
                <div className="flex items-center gap-4 text-text-secondary/70">
                  <div className="flex items-center text-xs">
                    <FaClock className="mr-1.5 text-[10px]" />
                    <span>{formatDistanceToNow(new Date(blog.date), { 
                      addSuffix: true,
                    }).replace('about ', '')}</span>
                  </div>
                  <div className="flex items-center text-xs">
                    <FaEye className="mr-1.5 text-[10px]" />
                    <span>{Math.floor(Math.random() * 1000)}</span>
                  </div>
                </div>

                {/* Right side - Action Buttons */}
                <div className="flex items-center gap-2">
                  <button 
                    className="p-1.5 rounded-full hover:bg-gray-100 transition-colors 
                             text-text-secondary/60 hover:text-primary"
                    aria-label="Bookmark"
                  >
                    <FaBookmark className="text-xs" />
                  </button>
                  <button 
                    className="p-1.5 rounded-full hover:bg-gray-100 transition-colors 
                             text-text-secondary/60 hover:text-primary"
                    aria-label="Share"
                  >
                    <FaShare className="text-xs" />
                  </button>
                  <button 
                    className="p-1.5 rounded-full hover:bg-gray-100 transition-colors 
                             text-primary hover:text-primary/80 group/btn"
                    aria-label="Read more"
                  >
                    <FaArrowRight className="text-xs transition-transform duration-300 
                                         group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
      
      {/* Pagination */}
      <div className="flex justify-center mt-12 mb-8">
        <Pagination 
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          size="large"
          sx={{
            '& .MuiPaginationItem-root': {
              color: '#2C2E3A',
              '&:hover': {
                backgroundColor: 'rgba(10, 33, 192, 0.04)',
              },
              '&.Mui-selected': {
                backgroundColor: '#0A21C0',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#0A21C0',
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
}
