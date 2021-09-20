import React from 'react'
import Tab from './tab'
import './inc.css'

function inc(props){

    let propsinfo = [];
    const {info} = props;

    propsinfo = typeof(info)==="undefined"?"":info;

        return (
                <div role="tablist" className="add_bottom_45 accordion_2" id="payment">
                {
                    propsinfo.map(
                            (item,index)=>item.trim().split("!@")[1]===""?"":<Tab key={index} heading={item.split('!@')[0].toUpperCase()} conditions={item.split('!@')[1].split('\n')}/>
                        )
                }
            </div>
        )

}

export default inc;