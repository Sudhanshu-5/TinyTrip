import React from 'react'
import { Link } from 'react-router-dom';
import './card.css'

import nopicture from '../../../assets/img/no.png';

function card(props) {

  var propsimg = typeof(props.img)===undefined?"":props.img;

        return (
          <div className="theme-container">
            <div className="theme-card">
              <div className="img" style={{overflow:"hidden"}}>
              <img src={propsimg==="(-)"?`${nopicture}`:"http://pearltravels.in/"+propsimg} alt={props.title.toLowerCase()}/>
              </div>
              <div className="top-text">
                <div className="name" style={{textAlign:"center"}}>{props.title}</div>
                {/* <p style={{textAlign:"center"}}>{props.subtitle}</p> */}
              </div>
              <div className="bottom-text">
                <div className="btn">
                  <Link to={`/destination/packages/${props.title}`}>
                    <span style={{textAlign:"center"}}>
                      View Details  <i className="fal fa-arrow-right"></i>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          )

}

export default card;