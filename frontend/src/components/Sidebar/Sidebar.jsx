import React, { useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Sidebar = () => {
  const [extended, setExtended] = useState(false);

  return (
    <div className='sidebar'>
      <div className="top "> 
        <div className="d-flex justify-content-center">
        <img onClick={() => setExtended(prev => !prev)} className="menu" src={assets.menu_icon} alt="menu icon" />
        </div>
        <div className="new-chat">
          <div className="black d-flex align-items-center justify-content-between gap-3">
          <img src={assets.plus_icon} alt="plus icon" />
          {extended ? <p className='mb-0'>Search</p> : null}
          </div>
        </div>
        {/* {extended && (
          <div className="recent">
            <p className="recent-title"></p>
            <Dropdown className="recent-entry">
              <Dropdown.Toggle variant="secondary" id="dropdown-categories">
                Category
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/politics">Politics</Dropdown.Item>
                <Dropdown.Item href="#/education">Education</Dropdown.Item>
                <Dropdown.Item href="#/sports">Sports</Dropdown.Item>
                <Dropdown.Item href="#/entertainment">Entertainment</Dropdown.Item>
                <Dropdown.Item href="#/business">Business</Dropdown.Item>
                <Dropdown.Item href="#/technology">Technology</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )} */}
      </div>
      <div className="bottom mb-3">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="question icon" />
          {extended ? <p className='mb-0'>About Us</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="history icon" />
          {extended ? <p className='mb-0'>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="settings icon" />
          {extended ? <p className='mb-0'>Settings</p> : null}
        </div> 
      </div>
    </div>
  );
}

export default Sidebar;
