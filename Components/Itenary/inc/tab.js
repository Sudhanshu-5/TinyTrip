import React from 'react'
import './inc.css'

function Magic(event){
    var element = document.getElementById(event.target.id);
    if(element.parentNode.parentNode.nextSibling.classList.contains("show"))
    {
        element.classList.remove('fa-minus');
        element.classList.add('fa-plus');
    }
    else
    {
        element.classList.remove('fa-plus');
        element.classList.add('fa-minus');
    }
}


function tab(props){

        return (
                <div className="card" style={{marginBottom:"1rem"}}>
                    <div className="card-header" role="tab">
                        <h5 className={props.heading} style={{width:"fit-content",float: "left",marginRight: "0 !important"}}>{props.heading}</h5>
                        <a data-toggle="collapse" href={"#"+props.heading+"list"} aria-expanded="true">&#8203;<i className="fal fa-plus" id={props.heading} aria-hidden="true" onClick={Magic}></i></a>
                    </div>
                    <div id={props.heading+"list"} className="collapse" role="tabpanel" data-parent={"#"+props.heading+"list"}>
                        <div className="card-body">
                            <div className="package_det_d_Exclusions">
                                <ul>
                                {
                        props.conditions.map(
                            (item,index)=><li key={index}>{item}</li>
                        )
                }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
        )
}

export default tab;