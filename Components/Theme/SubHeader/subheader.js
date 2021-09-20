import React, { Component } from 'react'
import './subheader.css'

export class subheader extends Component {
    render() {
        return (
            <div>
                <div className="filters_listing sticky_horizontal">
                    <div className="container">
                        <div className="row showDisplayingOutOff">
                            <div className="col-lg-3 filter_type "><h6 className="nomargin_top ng-binding" style={{paddingTop:"0px",border:"none",margin:"10px 0"}}>Displaying {this.props.pd} out of {this.props.pn} package(s)</h6></div>
                        </div>
                        <div className="row hideDisplayingOutOff" style={{display: "none"}}>
                            <div className="col-lg-3 filter_type "><h6 className="nomargin_top" style={{paddingTop:"0px",border:"none",margin:"10px 0"}}>&nbsp;</h6></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default subheader;