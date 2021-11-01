import React, { useState, useEffect } from "react";
import "./TestHeader.css";
import Wp from "../Themes/Header/Wp.js";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function TestHeader(props) {
  const { destinationName } = useParams();

  var data = destinationName;
  const [call, setCall] = useState({});
  const [sliders, setSliders] = useState({});

  useEffect(() => {
    const getData = async () => {
      const resDes = await axios.get("/contactInfo");
      const myRes = await axios.get("/sliderImgs");
      setSliders(myRes.data);
      setCall(resDes.data);
    };
    getData();
  }, []);

  return (
    <div>
      <nav className="navbar navbar-default navbar-expand-lg navbar-dark bg-none fixed-top scrolled">
        <div className="nav-nav">
          <div
            className="navbar-brand"
            style={{
              color: "#fff",
              fontSize: "2rem",
              fontWeight: "bolder",
              marginRight: "100px",
            }}
          >
            <Link to="/" className="text-danger nodec">
              <img
                style={{ height: "90vh" }}
                src={require("../../assets/img/logo.png")}
                className="logo"
                alt="logo"
                loading="lazy"
                style={{ height: "60px" }}
              />
              {/* Logo */}
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
              {/* <Link className="nav-link" to="/options/Themes">
                Themes
              </Link> */}
            </li>
            <li className="nav-item">
              {/* <Link className="nav-link" to="/options/Destination Types">
                Destinations
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
      <div className="wp-wrapper">
        <Wp />
      </div>
    </div>
  );
}

export default TestHeader;
