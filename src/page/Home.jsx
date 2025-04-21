import React from 'react';
import Cards from '../component/Cards';
import Slider from '../component/Slider';

export default function Home() {
  return (
    <div className='home'> 
        <Slider />
        <div className="MKsjSJhw">
          <h1 className="title">Discover Categories</h1>
          <p className="description">Start reading articles on a topic you like.</p>
          <div className="line"></div>
        </div>
        <div className="dJKjses">
          <Cards />
        </div>
    </div>
  );
}