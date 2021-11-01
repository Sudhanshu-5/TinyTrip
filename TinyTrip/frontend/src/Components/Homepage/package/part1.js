import React, { Component } from 'react'
import './package.css'

export class part1 extends Component {
    render() {
        return (
            <div className="container">
                <h2 className="main">{this.props.heading}</h2>
                <div className="main--title">
                    <span>
                        <em></em>
                    </span>
                </div>
            </div>
        )
    }
}

export default part1;