import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import { blogs } from '../constants';

export default function Cards() {
  return (
    <div className="jsjnne">
        {blogs.map((index) => (
            <div className="OmjeskjWWns">
                <div>
                    <div className="blog-img">
                    <img src={index.img} alt="" />
                    </div>
                    <div className="blog-details">
                        <h3> {index.title}</h3>
                        <p>{index.desc}</p>
                    </div>
                </div>
                <div className="isnjeSkE">
                <div></div>
                <div className="JksjeISn">
                    <div>
                    <span>Read </span>More</div>
                    <FaArrowRight />
                    </div>
                </div>
            </div>
        ))}
          
    </div>
 
 
  )
}
