import React from 'react'
import './card.css'

import anynomus from '../../../assets/img/anonymous.png'

function card(props) {

	var propsimg = typeof(props.img)==="undefined"?"":props.img;

    return (
        <div className="container">
            <div className={props.index%4===0?"test--item test--item--1":props.index%4===1?"test--item test--item--2":props.index%4===2?"test--item test--item--3":"test--item test--item--4"}>
			    <div className="fig bx-shadow">
		  		    <img src={propsimg==="(-)"?anynomus:"http://www.pearltravels.in/"+propsimg} alt="testimonial" />
			    </div>
			    <div className="data p-4 bx-shadow ">
		  		    <p className="pt-4">{props.data}</p>
		  		    <h5 className="mb-1 text-primary">{props.name}</h5>
		  		    <p className="mb-0">{props.position}</p>
			    </div>
	  	    </div>
        </div>
    )
}

export default card;