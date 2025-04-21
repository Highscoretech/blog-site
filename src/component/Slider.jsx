import React from 'react'
import { Autoplay } from 'swiper/modules'; // Import Autoplay
import { Swiper, SwiperSlide } from 'swiper/react';
import {sliderImg} from '../constants';
import 'swiper/css';

export default function Slider() {
  return (
    <Swiper
        loop={true}
        modules={[Autoplay]}
        spaceBetween={15} // Add some space to see transitions better
        slidesPerView={5} // Start with one slide visible
        autoplay={{
            delay: 2000, // Adjust the delay as needed (milliseconds)
            disableOnInteraction: false, // Important: Allow swiping without stopping autoplay
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
            // Optional: Responsive breakpoints
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
            <div className="slide-img">
                <img src={item.img} alt="" />
            </div>
        </SwiperSlide>
      ))}      
    

    </Swiper>
  )
}
