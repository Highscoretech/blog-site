import React from 'react'
import "../styles/footer.css"

export default function Footer() {
  return (
    <footer id="site-footer">
        <div className="fotter-container">
            <div>
            <div className="logo-section">
                <img src="/assets/LM_Monogram_Registered_Select_20230221.svg" alt="" />
                <div className="details">
                Discover the world of cutting-edge gadgets. Navigate the latest tech innovations, delve into detailed reviews
                </div>
            </div>
            <div className="rpute-sectisjkS">
                <div className="rokJHSei">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Contact</a></li>
                        <li><a href="#">Blog</a></li>
                    </ul>
                </div>
                <div className="rokJHSei">
                    <h3>Categories</h3>
                    <ul>
                        <li><a href="#">Smartphones</a></li>
                        <li><a href="#">Laptops</a></li>
                        <li><a href="#">Accessories</a></li>
                        <li><a href="#">Wearables</a></li>
                    </ul>
                </div>
                <div className="rokJHSei">
                    <h3>Follow Us</h3>
                    <ul>
                        <li><a href="#">Facebook</a></li>
                        <li><a href="#">Twitter</a></li>
                        <li><a href="#">Instagram</a></li>
                        <li><a href="#">LinkedIn</a></li>
                    </ul>
                </div>
            </div>
            
            </div>
            <div className='line'></div>

            <div className="stay-connected">
                <div className="right">
                    <div>Stay Connected :</div>
                    <div className="social-icons">
                        <a href="#" className="social-icon">
                            <span className="icon">
                                <svg className="e-font-icon-svg e-fab-youtube" viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path>
                                </svg>
                            </span>
                        </a>
                        {/* Add other social icons here */}
                    </div>
                </div>
                <div className="left">
                    <div>Designed by valiantcodez. All Rights Reserved.</div>
                </div>
            </div>
        </div>
    </footer>
  )
}
