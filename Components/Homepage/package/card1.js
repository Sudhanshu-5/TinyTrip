import React from 'react'
import './package.css'
import {Link} from 'react-router-dom';

import nopicture from '../../../assets/img/no.png'

function card1(props){


    var propsimg = typeof(props.img)==="undefined"?"":props.img;

        return (
            <div className="box_grid" style={{margin:"0 20px",cursor:"grab"}}>
            <div className="antialiased">
        <div className="items-center justify-center">
            <div className="max-w-sm py-6">
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    <div className="bg-cover bg-center h-56 p-4" style={{backgroundImage:propsimg==="(-)"?`url(${nopicture})`:"url(http://pearltravels.in/uploads"+propsimg+")",backgroundSize:"cover",backgroundPosition:"center"}}>
                    </div>
                    <div className="p-4">
                        <p className="uppercase text-center tracking-wide text-sm font-bold" style={{color:"#000"}}>{props.title}</p>
                        <p className="text-3xl text-center text-gray-900">{props.currency}</p>
                        <p className="text-gray-700 text-center">{props.place[0]}</p>
                    </div>
                    <div className="flex p-4 border-t border-gray-300 text-gray-700 pad" style={{paddingTop:"0 !important"}}>
                        <div className="flex-1 inline-flex items-center">
                            <svg className="h-6 w-6 text-gray-600  bi bi-sun" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FDB813" viewBox="0 0 16 16">
                                <path d="M3.5 8a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0z"/>
                                <path d="M8.202.28a.25.25 0 0 0-.404 0l-.91 1.255a.25.25 0 0 1-.334.067L5.232.79a.25.25 0 0 0-.374.154l-.36 1.51a.25.25 0 0 1-.282.188l-1.532-.244a.25.25 0 0 0-.286.286l.244 1.532a.25.25 0 0 1-.189.282l-1.509.36a.25.25 0 0 0-.154.374l.812 1.322a.25.25 0 0 1-.067.333l-1.256.91a.25.25 0 0 0 0 .405l1.256.91a.25.25 0 0 1 .067.334L.79 10.768a.25.25 0 0 0 .154.374l1.51.36a.25.25 0 0 1 .188.282l-.244 1.532a.25.25 0 0 0 .286.286l1.532-.244a.25.25 0 0 1 .282.189l.36 1.508a.25.25 0 0 0 .374.155l1.322-.812a.25.25 0 0 1 .333.067l.91 1.256a.25.25 0 0 0 .405 0l.91-1.256a.25.25 0 0 1 .334-.067l1.322.812a.25.25 0 0 0 .374-.155l.36-1.508a.25.25 0 0 1 .282-.19l1.532.245a.25.25 0 0 0 .286-.286l-.244-1.532a.25.25 0 0 1 .189-.282l1.508-.36a.25.25 0 0 0 .155-.374l-.812-1.322a.25.25 0 0 1 .067-.333l1.256-.91a.25.25 0 0 0 0-.405l-1.256-.91a.25.25 0 0 1-.067-.334l.812-1.322a.25.25 0 0 0-.155-.374l-1.508-.36a.25.25 0 0 1-.19-.282l.245-1.532a.25.25 0 0 0-.286-.286l-1.532.244a.25.25 0 0 1-.282-.189l-.36-1.509a.25.25 0 0 0-.374-.154l-1.322.812a.25.25 0 0 1-.333-.067L8.203.28zM8 2.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11z"/>
                              </svg>
                            <p style={{display: 'flex'}}><span className="text-gray-900 font-bold" style={{marginLeft:"5px",marginRight:"5px"}}>{typeof(props.day)==="undefined"?"":props.day.replace(' ','').match(/\d+/)[0]}</span> Days</p>
                        </div>
                        <div className="flex-1 inline-flex items-center">
                            <svg className="h-6 w-6 text-gray-600  bi bi-moon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#c2c5cc" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M14.53 10.53a7 7 0 0 1-9.058-9.058A7.003 7.003 0 0 0 8 15a7.002 7.002 0 0 0 6.53-4.47z"/>
                              </svg>
                            <p style={{display: 'flex'}}><span className="text-gray-900 font-bold" style={{marginLeft:"5px",marginRight:"5px"}}>{typeof(props.night)==="undefined"?"":props.night.replace(' ','').match(/\d+/)[0]}</span> Nights</p>
                        </div>
                    </div>
                    <div className="but px-4 pt-3 pb-4 border-t border-gray-300 bg-gray-100 padd" style={{padding:"0 !important"}}>
                        <Link to={`/destination/${props.dName}/${props.title}`}>
                            <p><span className="bg"></span><span className="base"></span><span className="text">View Destination</span></p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
                </div>
        )
}

export default card1;