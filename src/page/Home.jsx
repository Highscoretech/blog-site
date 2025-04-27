import React from 'react';
import Cards from '../component/Cards';
import Slider from '../component/Slider';

export default function Home() {
  return (
    <div className='home'> 
        <div className="pt-24">
            <Slider />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-20">
          <div className="text-center">
            <h1 className="text-4xl font-secondary font-bold text-text-primary mb-4">
              Discover Categories
            </h1>
            <p className="text-lg text-text-secondary font-tertiary mb-6 max-w-2xl mx-auto">
              Start reading articles on a topic you like. Explore our diverse collection of tech insights and stories.
            </p>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Cards />
        </div>
    </div>
  );
}
