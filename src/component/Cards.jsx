import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { api } from '../services/apiClient';
import { FaClock, FaClipboardList } from "react-icons/fa";
import { formatDistanceToNow } from 'date-fns';
import { Pagination } from '@mui/material';
import DOMPurify from 'dompurify';

export default function Cards() {
  const navigate = useNavigate();
  const { setLoading } = useApp();
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const blogsPerPage = 20;

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html)
    };
  };

  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  useEffect(() => {
    fetchBlogs();
  }, [page]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await api.getBlogs({
        status: 'approved',
        page,
        limit: blogsPerPage
      });
      setBlogs(response.data.blogs);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBlogClick = (blogId) => {
    navigate(`/blog-details/${blogId}`);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePostBlog = () => {
    navigate('/blog');
  };

  if (blogs.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8">
        <div className="bg-white rounded-2xl p-8 shadow-[0_2px_10px_rgba(0,0,0,0.08)] text-center max-w-md w-full">
          <FaClipboardList className="mx-auto text-6xl text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-text-primary mb-3">
            No Blogs Yet
          </h2>
          <p className="text-text-secondary mb-6">
            Be the first one to share your thoughts and ideas with our community.
          </p>
          <button
            onClick={handlePostBlog}
            className="bg-primary text-white px-6 py-3 rounded-full font-medium
                     hover:bg-primary/90 transition-colors duration-300
                     flex items-center justify-center gap-2 mx-auto"
          >
            <span>Post Your Blog</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cards-section">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
        {blogs.map((blog) => (
          <article 
            key={blog._id}
            className="group bg-white rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.08)] 
                       hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300
                       hover:-translate-y-1 border border-gray-100 cursor-pointer"
            onClick={() => handleBlogClick(blog._id)}
          >
            <div className="p-5">
              <div className="flex gap-4 mb-4">
                <div className="relative w-32 h-32 flex-shrink-0">
                  <img 
                    src={blog.images[0]} 
                    alt="" 
                    className="w-full h-full rounded-lg object-cover transform group-hover:scale-105 
                             transition-transform duration-300"
                  />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-text-primary mb-2 line-clamp-2">
                    {blog.title}
                  </h2>
                  <p className="text-text-secondary text-sm line-clamp-2 mb-2">
                    {stripHtml(blog.content)}
                  </p>
                  <div className="flex items-center text-text-secondary/70 text-sm">
                    <FaClock className="mr-2" />
                    <span>{formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}</span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </div>
      )}
    </div>
  );
}
