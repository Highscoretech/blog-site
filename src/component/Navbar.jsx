import React from 'react'
import "../styles/Navbar.css";

export default function Navbar() {
    const handleRoutes = (()=>{
        // Implement route change logic here
        console.log("Route changed");
    })
  return (
    <header className="navbar">
        <div className="navbar-container">
            <div className="navbar-logo">
                <img width="261" height="108" src="/assets/LM_Monogram_Registered_Select_20230221.svg" alt="Logo" />
            </div>
            <ul className="navbar-menu">
                <li>
                    <a href="#home">HOME</a>
                    <div></div>
                </li>
                <li><a href="#about">ABOUT</a></li>
                <li><a href="#contact">CONTACT US</a></li>
                {/* <li><a  href="#post-blog"></a></li> */}
                <li><button className='btn'>POST YOUR BLOG</button></li>
            </ul>
            <div className="mobile-nav">
                <svg xmlnsXlink="http://www.w3.org/1999/xlink" className="sc-gsDKAQ hxODWG icon"><use xlinkHref="#icon_Tighten"></use></svg>
            </div>
        </div>
    </header>
  )
}
