import React from 'react'
import './card.css'
import {useParams,Link} from 'react-router-dom';

import no from '../../../assets/img/no.png'

function card(props) {
  const { option } = useParams();

  var propsimg = typeof(props.img)===undefined?"":props.img;


    return (
        <div className="booking-card" style={{backgroundImage:propsimg==="(-)"?`url(${no})`:"url(http://pearltravels.in/"+propsimg+")",backgroundSize:"cover",backgroundPosition:"center"}}>
            <div className="book-container">
          <div className="content">
            <Link to={`/options/${option}/${props.title}`} style={{textDecoration:"none"}} className="pac--btnn button">
              View
              <div className="button__horizontal"></div>
              <div className="button__vertical"></div>
            </Link>
          </div>
        </div>
        <div className="informations-container">
          <h2 className="pac--title">{props.title}</h2>
          <p className="pac--sub-title">Explore our {props.sub_title} collection</p>
        </div>
        </div>
    )
}

export default card;