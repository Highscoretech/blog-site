import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';
import { FaClock, FaEye } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { api } from '../services/apiClient';
import { useApp } from '../context/AppContext';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function AdminBlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setLoading } = useApp();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    checkAuth();
    fetchBlogDetails();
  }, [id]);

  const checkAuth = () => {
    const token = Cookies.get('token');
    const isAdmin = Cookies.get('isAdmin') === 'true';
    
    if (!token || !isAdmin) {
      toast.error('Admin access required');
      navigate('/login');
      return false;
    }
    return true;
  };

  const fetchBlogDetails = async () => {
    if (!checkAuth()) return;
    
    setLoading(true);
    try {
      const response = await api.getBlogById(id);
      setBlog(response.data);
    } catch (error) {
      console.error('Error fetching blog details:', error);
      toast.error('Error loading blog details');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!checkAuth()) return;
    
    setLoading(true);
    try {
      await api.updateBlogStatus(id, { status: 'approved' });
      toast.success('Blog approved successfully');
      navigate('/admin');
    } catch (error) {
      console.error('Error approving blog:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    if (!checkAuth()) return;
    
    setLoading(true);
    try {
      await api.updateBlogStatus(id, { status: 'rejected' });
      toast.success('Blog rejected successfully');
      navigate('/admin');
    } catch (error) {
      console.error('Error rejecting blog:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!blog) {
    return (
      <div className="pt-28 px-4 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-text-primary">Blog not found</h2>
      </div>
    );
  }

  return (
    <div className="pt-28 px-4 max-w-4xl mx-auto pb-12">
      <article className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.08)]">
        <div className="relative bg-gray-100">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            className="aspect-video" // This maintains a 16:9 ratio
          >
            {blog.images.map((img, index) => (
              <SwiperSlide key={index} className="flex items-center justify-center">
                <img
                  src={img}
                  alt={`${blog.title} - Image ${index + 1}`}
                  className="w-full h-full object-contain" // Changed from object-cover
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="p-6">
          <h1 className="text-3xl font-bold text-text-primary mb-4">
            {blog.title}
          </h1>

          <div className="flex items-center gap-6 mb-6 text-text-secondary/70">
            <div className="flex items-center">
              <FaClock className="mr-2 text-sm" />
              <span>{formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}</span>
            </div>
            <div className="flex items-center">
              <FaEye className="mr-2 text-sm" />
              <span>{blog.views} views</span>
            </div>
          </div>

          <div className="prose max-w-none mb-8">
            <p className="text-text-secondary leading-relaxed">
              {blog.content}
            </p>
          </div>

          <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
            <button 
              onClick={handleApprove}
              className="flex-1 bg-green-500 text-white px-6 py-3 rounded-full font-medium
                       transform hover:scale-105 hover:bg-opacity-90 transition-all duration-300
                       shadow-[0_4px_16px_rgba(34,197,94,0.25)] hover:shadow-[0_6px_20px_rgba(34,197,94,0.35)]"
            >
              Approve
            </button>
            <button 
              onClick={handleReject}
              className="flex-1 bg-red-500 text-white px-6 py-3 rounded-full font-medium
                       transform hover:scale-105 hover:bg-opacity-90 transition-all duration-300
                       shadow-[0_4px_16px_rgba(239,68,68,0.25)] hover:shadow-[0_6px_20px_rgba(239,68,68,0.35)]"
            >
              Reject
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}




