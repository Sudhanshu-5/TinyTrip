import React, { Component } from 'react'
import Options from './options'
import './sidebar.css'

export class sidebar extends Component {

    constructor(props) {
        super(props)

        this.state = {
            data:[
                {
                    title:"Duration",
                    options:["9 Nights"]
                },
                {
                    title:"Destination",
                    options:["Gwalior","Madhya Pradesh","Indian Subcontinent","Central India","India","Orchha","Khajuraho","Bandhavgarh","Jabalpur","Jhansi","Shivpuri"]
                },
                {
                    title:"Price-Range",
                    options:["Rs. 25001-30000"]
                },
                {
                    title:"Popular-Themes",
                    options:["Popular Themes","Honeymoon","Adventure","Family","Sports","Heritage","Culture","Romantic","Leisure"]
                }
            ]
        }
    }


    render() {
        return (
            <div style={{paddingTop: "0px", paddingBottom: "1px", position: "static", transform: "none"}}>
                <div id="filters_col">
                <a data-toggle="collapse" href="#collapseFilters" aria-expanded="false" aria-controls="collapseFilters" id="filters_col_bt" class="collapsed" style={{color:"#000"}}>Filters </a>
                    <div class="pull-right" style={{textAlign: "right",fontSize: "14px"}}>
                        <a className="package--a" onclick="resetfilter(this);"><i class="fa fa-undo"></i> Reset</a>
                    </div>
                    {
                        this.state.data.map
                        (
                            (item)=><Options title={item.title} options={item.options}/>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default sidebar;