import React from "react";
import { Link, useParams } from "react-router-dom";
import "./card.css";

import nopicture from "../../../assets/img/no.png";

function card(props) {
  let { locations } = useParams();

  var propsimg =
    typeof props.img === "undefined"
      ? ""
      : props.img.substring(1, props.img.length);

  return (
    <div className="new--column">
      <div
        className="new--card"
        style={{
          backgroundImage:
            propsimg === "-)"
              ? `url(${nopicture})`
              : `url('http://www.pearltravels.in/uploads/${propsimg}')`,
        }}
      >
        <ul className="tour-type-icon-list list-inline mb-0">
          {props.icon.map((item, index) => (
            <li key={index}>
              <i
                className={"fal " + item.icon + " white"}
                title={item.title}
              ></i>
            </li>
          ))}
        </ul>
        <div className="new--content">
          <h2 className="new--title">{props.title}</h2>
          <h5 style={{ opacity: "1", transform: "translateY(-18px)" }}>
            <div
              className="Marquee"
              scrollamount="2"
              style={{ width: "200px" }}
            >
              {/* 
              <span className="flow">
                {props.flag.map((item, index) => (
                  <span key={index}>{item + "  "}</span>
                ))}
              </span>
               */}
              RANDOM TEXT
            </div>
          </h5>
          <div className="new--copy">
            <div className="row">
              {/* 
                <div className="col-md-12">
                  <div className="new--button raise">
                  {props.duration}
                  </div>
                </div>
                  */}
              <div className="col-md-12">
                <div className="new--button pulse">
                  {props.propertiesNum} Arrangements
                </div>
              </div>

              <div className="col-md-12">
                <div className="new--button up">
                  {props.price === ""
                    ? "Call Us For Pricing Details"
                    : props.price}
                </div>
              </div>
            </div>
          </div>
          <Link
            // /state/locations/locationName
            to={`/state/${locations}/${props.id}`}
            style={{ textDecoration: "none" }}
          >
            <button
              className="btnn button"
              style={{ transform: "translateY(-35px)" }}
            >
              View
              <div className="button__horizontal"></div>
              <div className="button__vertical"></div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default card;
