import React from 'react';
import { useParams } from 'react-router-dom';
import { blogs } from '../constants';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { FaClock, FaEye, FaBookmark, FaShare } from "react-icons/fa";
import { formatDistanceToNow } from 'date-fns';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function BlogDetails() {
  const { id } = useParams();
  const blog = blogs.find(b => b.id === parseInt(id));

  if (!blog) {
    return (
      <div className="pt-28 px-4 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-text-primary">Blog not found</h2>
        <p className="text-text-secondary mt-2">The blog you're looking for doesn't exist.</p>
      </div>
    );
  }

  // For demo purposes, create an array of images
  const images = [blog.img];
  if (blog.additionalImages) {
    images.push(...blog.additionalImages);
  }

  return (
    <div className="pt-28 px-4 max-w-4xl mx-auto">
      <article className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.08)]">
        {/* Image Slider */}
        <div className="relative h-[400px] mb-6">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            className="h-full"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img}
                  alt={`${blog.title} - Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="p-6">
          {/* Title */}
          <h1 className="text-3xl font-bold text-text-primary mb-4">
            {blog.title}
          </h1>

          {/* Metadata */}
          <div className="flex items-center gap-6 mb-6 text-text-secondary/70">
            <div className="flex items-center">
              <FaClock className="mr-2 text-sm" />
              <span>{formatDistanceToNow(new Date(blog.date), { addSuffix: true })}</span>
            </div>
            <div className="flex items-center">
              <FaEye className="mr-2 text-sm" />
              <span>{Math.floor(Math.random() * 1000)} views</span>
            </div>
          </div>

          {/* Content */}
          <div className="prose max-w-none mb-8">
            <p className="text-text-secondary leading-relaxed">
              {blog.desc}
            </p>
            {/* Add more content sections as needed */}
          </div>

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