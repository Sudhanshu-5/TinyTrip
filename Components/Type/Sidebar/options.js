import React, { Component } from 'react'
import './sidebar.css'

export class options extends Component {

    render() {
        return (
            <div className="collapse filter-box box-filter-package show" id="collapseFilters">
                <div className="filterbox-night filter_type">
                    <h6>
                    <a data-toggle="collapse" style={{color:"#000"}} href={"#"+this.props.title+"card"} id={this.props.title} aria-hidden="true" aria-expanded="false">{this.props.title}</a>
                    </h6>
                    <div id={this.props.title+"card"} className="collapse" role="tabpanel" data-parent={"#"+this.props.title}>
                    <ul>
                        {
                            this.props.options.map
                            (
                                (value)=><li><input id="checkbox" className="checkbox1-custom filtercheckbox filter-nn" type="checkbox" un-checked="" /><label for="checkbox" className="checkbox1-custom-label"><span>{value}</span></label></li>
                            )
                        }
                    </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default options;