import React from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import insightLogo from '../../assets/insightLogo.png'
import { Col, Container, Row, Card, Button, Form, Modal } from "react-bootstrap";


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
            Insight
      </div>
      {/* <div className="navbar-center">
        <input type="text" placeholder="Search..." className="navbar-search" />
      </div> */}
      <div className="navbar-right">
        <Button><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-phone-call" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
  <path d="M15 7a2 2 0 0 1 2 2" />
  <path d="M15 3a6 6 0 0 1 6 6" />
</svg> Contact Us</Button>

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
