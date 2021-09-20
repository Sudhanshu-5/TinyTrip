import React from 'react'
import Card from './card'
import './destination.css'

function destination(props) {

    var propsdata=typeof(props.data)==="undefined"?[]:props.data;

        return (
            <div className="container">
                <div className="row" style={{marginTop:"2rem", display:"flex",alignItems:"center",justifyContent:"center"}}>
                {
                        propsdata.map(
                            (item,index)=><Card img={item.img===""?"(-)":item.img} pack={item.packages} placename={item.name} title={item.name} rating={item.rating} key={index}/>
                        )
                }
                </div>
            </div>
        )
}

export default destination;