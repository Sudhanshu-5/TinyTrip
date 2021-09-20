import React from 'react'
import HotelCard from './hotelcard'
import './hotelcard'

function Magic1(event){
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

function hotel(props){

    let propshotel = [""];
    const {hotel} = props;

    propshotel = typeof(hotel)==="undefined"?"":hotel;

        return (
                <div className="box-package">
                {
                        propshotel.map(
                            (item,index)=>
                            (
                                <div className="box-border" key={index}>
                                {
                                    item.split("!@")[1]===""?"":(
                                        <div>
                                        <div className="table--heading"><span>{item.split("!@")[0]}</span><span data-toggle="collapse" href={"#queue"+index} aria-expanded="true"><i className="fal fa-plus" id={"hoteltype"+index} aria-hidden="true" onClick={Magic1}></i></span></div>
                                        <div id={"queue"+index} className="collapse" role="tabpanel" data-parent={"#hoteltype"+index}>
                                        <table className="hotel-table table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Name</th>
                                                    <th>Nights</th>
                                                    <th>Cities</th>
                                                    <th>Details</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    item.split("!@")[1].split(",").map(
                                                        (value,index)=><HotelCard info={value.split('>')} index={index+1} key={index}/>
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                        </div>
                                        </div>
                                    )
                                }
                                </div>
                            )
                        )
                }
                </div>
        )
}

export default hotel;