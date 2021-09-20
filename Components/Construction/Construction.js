import React from 'react';
import { Link } from 'react-router-dom';
import './Construction.css';

function Construction() {

  return(
    <div className="body">
      <div className="webpage">
        <div className="right-triangle"></div>
        <img src="https://image.flaticon.com/icons/svg/497/497738.svg" alt="underconstrution" className="warning-icon" />
        
        <h3 className="presents-text">We Are Currently</h3>
        
        <h1 className="title">Under <br/> Construction</h1>
        <Link to="/home">
          <button className="cta-button">Visit</button>
        </Link>
      </div>
    </div>
  )
};

export default Construction;