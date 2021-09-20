import React, { Component } from 'react'

export class timeline extends Component {

    render() {
        return (
            <div>
                <time className="cbp_tmtime" dateTime={this.props.time}><span>&nbsp;</span></time>
                <div className="cbp_tmicon">Day {this.props.day}</div>
                <div className="cbp_tmlabel">
                <h5 className="p-title">{this.props.title}</h5>
                <p className="more">{this.props.desc.map((item,index)=><span key={index}>{index===0?"":item}<br /><br /></span>)}</p>
                </div>
            </div>
        )
    }
}

export default timeline;