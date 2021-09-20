import React from 'react'
import './Itenary.css'
import Timeline from './timeline'

function ItenaryComponent(props){
    let propsinfo = [""];
    const {info} = props;

    propsinfo = typeof(info)==="undefined"?[]:info;

        return (
            <div id="itinerary" style={{color:"#000"}} className="container">
                <h2 style={{fontSize:"2rem",marginBottom:"1rem"}}>{props.title}</h2>
                <ul className="cbp_tmtimeline">
                {
                    propsinfo.map(
                        (item,index)=><li key={index}><Timeline time={item.time} day={index+1} title={item.split('\n')[0].split(':')[1]} desc={item.split('\n')} details={item.details} hotel={item.hotel}/></li>
                    )
                }
                </ul>
            </div>
        )
}

export default ItenaryComponent;