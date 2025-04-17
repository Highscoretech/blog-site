import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules'; // Import Autoplay
import 'swiper/css';

export default function Home() {
  return (
    <div className='home'> 
      <Swiper
        loop={true}
        modules={[Autoplay]}
        spaceBetween={15} // Add some space to see transitions better
        slidesPerView={3} // Start with one slide visible
        autoplay={{
            delay: 2000, // Adjust the delay as needed (milliseconds)
            disableOnInteraction: false, // Important: Allow swiping without stopping autoplay
        }}
        speed={1200}
        breakpoints={{
            // Optional: Responsive breakpoints
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
          }}
      >                
      <SwiperSlide >
          <div className="slide-img">
            <img src="/assets/slide1.jpeg" alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide >
            <div className="slide-img">
                <img src="/assets/download.jpg" alt="" />
            </div>
        </SwiperSlide>
        <SwiperSlide >
            <div className="slide-img">
                <img src="/assets/images (2).jpg" alt="" />
            </div>
        </SwiperSlide>
        <SwiperSlide >
            <div className="slide-img">
                <img src="/assets/slider-revolution-banner-1024x433.png" alt="" />
            </div>
        </SwiperSlide>
        <SwiperSlide >
            <div className="slide-img">
                <img src="/assets/images.jpg" alt="" />
            </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}