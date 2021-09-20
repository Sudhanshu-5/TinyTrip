import React from 'react'
import {Link} from 'react-router-dom';


import nopicture from '../../../assets/img/no.png'

function card(props) {

    var propsimg = typeof(props.img)==="undefined"?"":props.img;


        return (
            <div className="col-xl-3 col-lg-6 col-md-6">
                <div className="grid_item">
                    <figure className="fig_home" style={{backgroundImage:propsimg==="(-)"?`url(${nopicture})`:"url(http://pearltravels.in/"+propsimg+")",backgroundSize:"cover",backgroundPosition:"center" }}>
                        <div className="grid---content">
                            <h3 style={{fontSize:"1.5rem"}}>{props.placename}</h3>
                            <div className="info--p">Explore our exotic {props.placename} collection
                            <Link style={{textDecoration:"none"}} to={`/options/Themes/${props.placename}`}><div className="read-more">Detail</div></Link></div>
                        </div>
                    </figure>
                </div>
            </div>
        )
}

export default card;