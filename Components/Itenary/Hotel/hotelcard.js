import React from 'react'
import './hotel.css'

function hotelcard(props){


  let propsinfo = [""];
  const {info} = props;

  propsinfo = typeof(info)==="undefined"?"":info;

        return (
                      <tr>
                          <td>{props.index}</td>
                          <td>{propsinfo[1]===undefined?"":propsinfo[1].replace(/[^a-zA-Z ]/g,"").trim()}</td>
                          <td>{propsinfo[2]===undefined?"":propsinfo[2].match(/\d+/)}</td>
                          <td>{propsinfo[0]===undefined?"":propsinfo[0].replace(/[^a-zA-Z ]/g,"").trim()}</td>
                          <td>
                            <a href={propsinfo[3]===undefined?"":propsinfo[3].includes("https") || propsinfo[3].includes("http")?propsinfo[3].replace('<',''):propsinfo[3].replace('<','https://')} target="_blank" className="hotel--icon" title="Overview"><i className="fal fa-eye"></i></a>
                          </td>
                      </tr>
        )
}

export default hotelcard;