import React from 'react'
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { sliderImg } from '../constants';
import 'swiper/css';

export default function Slider() {
  return (
    <div className="pt-5 px-4 mb-12"> {/* Added margin-bottom */}
      <div className="max-w-7xl mx-auto mb-8"> {/* Added container and margin */}
        <h2 className="text-3xl font-secondary font-bold text-text-primary mb-4">
          Featured Stories
        </h2>
        <p className="text-text-secondary font-tertiary mb-6">
          Discover our latest and most engaging articles
        </p>
      </div>

      <Swiper
        loop={true}
        modules={[Autoplay]}
        spaceBetween={15}
        slidesPerView={5}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        speed={1200}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          390: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          450: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          900: {
            slidesPerView: 4,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 15,
          },
        }}
      >          
        {sliderImg.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative group h-[250px] overflow-hidden rounded-lg cursor-pointer">
              <img 
                src={item.img} 
                alt={item.title || ''} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {/* Hover overlay with title */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <h3 className="text-white text-lg font-semibold line-clamp-2">
                  {item.title || 'Breaking News'}
                </h3>
              </div>
            </div>
            {/* Text content below image */}
            <div className="mt-4 px-2">
              <h3 className="text-text-primary font-secondary font-semibold text-lg hover:text-primary transition-colors duration-300 line-clamp-2 mb-2">
                {item.title || 'Breaking News'}
              </h3>
              <p className="text-text-secondary text-sm font-tertiary line-clamp-2">
                Discover the latest updates and insights about {item.title.toLowerCase()}. Click to read more about this exciting story.
              </p>
            </div>
          </SwiperSlide>
        ))}      
      </Swiper>
    </div>
  )
}
