import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';
import { FaClock } from "react-icons/fa";
import { api } from '../services/apiClient';
import { useApp } from '../context/AppContext';
import DOMPurify from 'dompurify';

export default function Admin() {
  const navigate = useNavigate();
  const { setLoading } = useApp();
  const [pendingBlogs, setPendingBlogs] = useState([]);

  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  useEffect(() => {
    checkAuth();
    fetchPendingBlogs();
  }, [navigate]);

  const checkAuth = () => {
    const token = Cookies.get('token');
    if (!token) {
      toast.error('Authentication required');
      navigate('/login');
      return false;
    }
    return true;
  };

  const fetchPendingBlogs = async () => {
    if (!checkAuth()) return;
    setLoading(true);
    try {
      const response = await api.getBlogs({ status: 'pending' });
      setPendingBlogs(response.data.blogs);
    } catch (error) {
      console.error('Error fetching pending blogs:', error);
      toast.error('Error loading blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleBlogClick = (blogId) => {
    navigate(`/admin/blog-details/${blogId}`);
  };

  return (
    <div className="pt-28 px-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-text-primary mb-8">Pending Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pendingBlogs.map((blog) => (
          <article
            key={blog._id}
            onClick={() => handleBlogClick(blog._id)}
            className="group bg-white rounded-2xl overflow-hidden cursor-pointer
                     shadow-[0_2px_10px_rgba(0,0,0,0.08)]
                     hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]
                     transition-all duration-300
                     hover:-translate-y-1 border border-gray-100"
          >
            <div className="p-5">
              <div className="flex gap-4">
                <div className="relative w-32 h-32 flex-shrink-0">
                  <img
                    src={blog.images[0]}
                    alt=""
                    className="w-full h-full rounded-lg object-cover"
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
    </div>
  );
}

