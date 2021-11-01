import React, { useState, useEffect } from "react";
import "./Header.css";
import Wp from "./Wp";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
///////////////////////////////////////////////////////
import { HOMEPAGE_BACKGROUND_IMAGES } from "../../../_gobalVars.js";

function Header(props) {
  const history = useHistory();
  const [destinations, setDestinations] = useState([]);
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [call, setCall] = useState({});
  const [sliders, setSliders] = useState({});
  /////////////////////////////////////////////////
  const defaultState =
    props.imgCollection.length > 0
      ? props.imgCollection
      : HOMEPAGE_BACKGROUND_IMAGES;
  const [images, setImages] = useState(defaultState);

  if (
    document.querySelector(".inp") === null
      ? ""
      : document.querySelector(".inp").value === ""
  ) {
    let nooftime = 0;

    if (document.querySelector(".sug") !== null)
      document.querySelector(".sug").style.display = "none";

    document.querySelector(".inp").onkeydown = function (e) {
      if (e.keyCode === 40) {
        if (document.querySelector("#li-sug") !== null) {
          if (document.querySelector("#li-sug").childNodes.length > nooftime) {
            document.querySelector(".inp").value =
              document.querySelector("#li-sug").childNodes[
                nooftime
              ].textContent;
            document
              .querySelector(".inp")
              .setAttribute(
                "value",
                document.querySelector("#li-sug").childNodes[nooftime]
                  .textContent
              );
            if (
              document.querySelector("#li-sug").childNodes.length !==
              nooftime + 1
            )
              nooftime++;
          }
        }
      } else if (e.keyCode === 38) {
        if (document.querySelector("#li-sug") !== null) {
          if (nooftime > 0) {
            nooftime--;
            document.querySelector(".inp").value =
              document.querySelector("#li-sug").childNodes[
                nooftime
              ].textContent;
            document
              .querySelector(".inp")
              .setAttribute(
                "value",
                document.querySelector("#li-sug").childNodes[nooftime]
                  .textContent
              );
          }
        }
      }
    };
  } else {
    if (document.querySelector(".sug") !== null)
      document.querySelector(".sug").style.display = "inherit";
  }

  if (document.querySelector(".srchList") !== null)
    document.querySelector(".srchList").style.width = "100%";

  document.addEventListener("click", function (e) {
    var x = document.getElementsByClassName("frm-hd");
    if (e.target !== x) {
      if (document.querySelector(".sug") !== null)
        document.querySelector(".sug").style.display = "none";
    }
  });

  if (
    document.querySelector(".main-carousel-caption") !== null &&
    document.querySelector(".carousel-inner") != null
  ) {
    document.querySelector(".main-carousel-caption").style.position =
      "absolute";
    document.querySelector(".main-carousel-caption").style.zIndex = 9;
    document.querySelector(".main-carousel-caption").style.left = 0;
    document.querySelector(".main-carousel-caption").style.right = 0;
    document.querySelector(".main-carousel-caption").style.top =
      document.querySelector(".carousel-inner").offsetHeight / 3.5 + "px";
  }

  return (
    <div>
      <nav className="navbar navbar-default navbar-expand-lg navbar-dark bg-none fixed-top">
        <div className="nav-nav">
          <div
            className="navbar-brand"
            style={{
              color: "#fff",
              fontSize: "2rem",
              fontWeight: "bolder",
              marginRight: "50px",
            }}
          >
            <Link to="/" className="text-danger nodec">
              <img
                src={require("../../../assets/img/logo.png")}
                className="logo"
                alt="logo"
                loading="lazy"
                style={{ height: "100px" }}
              />
            </Link>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav mr-lg-auto">
            <li className="nav-item">
              {/* <Link className="nav-link bt-w" to="/options/Themes">
                Hotels & Resorts
              </Link> */}
            </li>
            <li className="nav-item">
              {/* <Link className="nav-link" to="/options/Destination Types">
                Private Villas
              </Link> */}
            </li>
          </ul>
          <ul className="navbar-nav hd-nav">
            <li className="nav-item" style={{ backgroundColor: "inherit" }}>
              <a
                href={`tel:+${call.callNo}`}
                className="hd-btn hd-btn-1"
                title="Call us"
              >
                <span className="hd-btn-content">Call Us</span>
                <span className="icon">
                  <i className="fal fa-phone-plus" aria-hidden="true"></i>
                </span>
              </a>
              <a
                href="http://www.pearltravels.in:14763/payment"
                target="_blank"
                rel="noopener noreferrer"
                title="Pay us"
                className="hd-btn hd-btn-2 hd-btn-remove hd-btn-alt-color"
              >
                <span className="hd-btn-content">Pay</span>
                <span className="icon">
                  <i className="fal fa-credit-card"></i>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <div
        id="myCarousel"
        className="carousel slide carousel-fade"
        data-interval="3000"
        data-ride="carousel"
        style={{ height: "100vh" }}
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="cr-img-gradient">
              <img
                // loading="lazy"
                src={images[0]}
                className="d-block w-100"
                alt="slider-0"
                style={{ height: "100vh" }}
              />
            </div>
          </div>
          {images.map((e, i) => {
            if (i > 0) {
              return (
                <div className="carousel-item" key={i}>
                  <div className="cr-img-gradient">
                    <img
                      // loading="lazy"
                      style={{ height: "100vh" }}
                      src={e}
                      className="d-block w-100"
                      alt={`slider-${i + 1}`}
                    />
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className="container main-carousel-caption">
        <br />
        <div className="row justify-content-center align-items-center">
          <div className="caption-wrapper">
            <div className="col-12">
              <h3
              // style={{
              //   textShadow:
              //     "-1px 1px 0 black, 1px 1px 0 black, 1px -1px 0 black,-1px -1px 0 black",
              // }}
              >
                Stay in style
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="wp-wrapper">
        <Wp />
      </div>
    </div>
  );
}

export default Header;
