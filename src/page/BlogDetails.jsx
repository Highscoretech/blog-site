import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { FaClock, FaEye, FaBookmark, FaShare } from "react-icons/fa";
import { formatDistanceToNow } from 'date-fns';
import { api } from '../services/apiClient';
import { useApp } from '../context/AppContext';
import { toast } from 'sonner';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setLoading } = useApp();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError('Blog ID not provided');
      return;
    }
    fetchBlogDetails();
  }, [id]);

  const fetchBlogDetails = async () => {
    setLoading(true);
    try {
      const response = await api.getBlogById(id);
      setBlog(response.data);
      
      // Only increment views if blog was found
      await api.incrementBlogViews(id);
    } catch (error) {
      console.error('Error fetching blog details:', error);
      setError(error.message || 'Failed to load blog details');
      toast.error(error.message || 'Failed to load blog details');
      if (error.message === 'Blog not found') {
        navigate('/'); // Optionally redirect to home page
      }
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="pt-28 px-4 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-text-primary">Blog not found</h2>
        <p className="text-text-secondary mt-2">{error}</p>
      </div>
    );
  }

  if (!blog || !blog.images) {
    return null; // Loading state handled by global loader
  }

  return (
    <div className="pt-28 px-4 max-w-4xl mx-auto">
      <article className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.08)]">
        {/* Image Slider */}
        {blog.images.length > 0 && (
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
        )}

        <div className="p-6">
          {/* Title */}
          <h1 className="text-3xl font-bold text-text-primary mb-4">
            {blog.title}
          </h1>

          {/* Metadata */}
          <div className="flex items-center gap-6 mb-6 text-text-secondary/70">
            <div className="flex items-center">
              <FaClock className="mr-2 text-sm" />
              <span>{formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}</span>
            </div>
            <div className="flex items-center">
              <FaEye className="mr-2 text-sm" />
              <span>{blog.views || 0} views</span>
            </div>
          </div>

          {/* Content */}
          <div 
            className="prose max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Action Buttons */}
          <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
            <button 
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-background-dark/5 
                       hover:bg-background-dark/10 transition-colors duration-300"
            >
              <FaBookmark className="text-sm" />
              <span>Save</span>
            </button>
            <button 
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-background-dark/5 
                       hover:bg-background-dark/10 transition-colors duration-300"
            >
              <FaShare className="text-sm" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}




