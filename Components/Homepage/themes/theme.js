import React from 'react'
import Card from './card'
import './destination.css'

function theme(props) {
   
    var propsdata=typeof(props.data)==="undefined"?[]:props.data;

        return (
            <div className="container">
                <div className="row" style={{marginTop:"2rem", display:"flex",alignItems:"center",justifyContent:"center"}}>
                {
                        propsdata.map(
                            (item,index)=><Card redirect="#" img={item.img===""?"(-)":item.img} placename={item.data} title={item.data} rating={item.rating} key={index}/>
                        )
                }
                </div>
            </div>
        )
}

export default theme;