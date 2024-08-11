import React from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import insightLogo from '../../assets/insightLogo.png'

const Navbar = () => {
  return (
    <nav className='navbar'>
      <div className="navbar-left">
        <img
              src={insightLogo}
              className='img-fluid me-2'
              alt="Insight Logo"
              width={75}
            />
            Insights
      </div>
      <div className="navbar-center">
        <input type="text" placeholder="Search..." className="navbar-search" />
      </div>
      <div className="navbar-right">
        {/* <a href="home" className="navbar-link">Home</a>
        <a href="popular" className="navbar-link">Popular</a>
        <a href="my-profile" className="navbar-link">Profile</a>
        <a href="notifications" className="navbar-link">
          <img src={assets.notifications_icon} alt="Notifications" className="navbar-icon" />
        </a>
        <a href="#user-menu" className="navbar-link">
          <img src={assets.user_icon} alt="User Menu" className="navbar-icon" />
        </a> */}
      </div>
    </nav>
  );
};

export default Navbar;
