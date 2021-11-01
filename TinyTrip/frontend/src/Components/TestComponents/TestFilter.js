import React, { useState, useEffect, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./TestFilter.css";
/////////////////////////////////////////////////
import { SERVER_URL, HEADER_TEXT } from "../../_gobalVars.js";

export const TestFilter = (props) => {
  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState([]);
  const [sortBy, setSortBy] = useState("asc");
  const [type, setType] = useState("both");
  const locationString = useRef("");
  const history = useHistory();
  const currentURL = useLocation();
  useEffect(() => {
    fetch(`${SERVER_URL}/locations`)
      .then((res) => res.json())
      .then((result) => {
        const total = result.data;
        const reqData = total.map((e) => {
          return e.locationName;
        });
        reqData.pop();
        // console.log(reqData);
        setLocations(reqData);
      })
      .catch((err) => {
        // console.log("From location list!");
        console.log(err.message);
      });
  }, []);

  const handleLocations = (e) => {
    // console.log(e.target.closest(".drop-btn"));
    const btn = e.target.closest(".drop-btn");
    const selectedLocation = btn.dataset.id;
    // console.log(btn.dataset.id);
    const icon = btn.children[0];
    if (btn.classList.contains("active")) {
      btn.classList.remove("active");
      icon.classList.value = "far fa-circle";
      setLocation((prev) => {
        const newPrev = prev.filter((e) => e !== selectedLocation);
        return newPrev;
      });
    } else {
      btn.classList.add("active");
      icon.classList.value = "far fa-check-circle";
      setLocation((prev) => {
        const newPrev = [...prev, selectedLocation];
        // console.log(newPrev);
        return newPrev;
      });
    }
    // console.log(location);
  };

  const handleSorting = (e) => {
    const selectedBtnId = e.target.id;
    const sortBtns = [...document.querySelectorAll(".sort-btn")];
    sortBtns.forEach((e) => {
      e.classList.remove("active");
    });
    document.getElementById(`${selectedBtnId}`).classList.add("active");
    setSortBy(`${selectedBtnId}`);
  };
  const handleType = (e) => {
    const selectedBtnId = e.target.id;
    const typeBtns = [...document.querySelectorAll(".type-btn")];
    typeBtns.forEach((e) => {
      e.classList.remove("active");
    });
    document.getElementById(`${selectedBtnId}`).classList.add("active");
    setType(`${selectedBtnId}`);
  };

  const handleSearch = () => {
    if (location.length === 0) {
      return;
    }
    const placesString = location.map((e) => e).join(",");
    // console.log(
    //   `http://localhost:3001/search?locations=${placesString}&&sort=${
    //     sortBy ? sortBy : "asc"
    //   }&&type=${type ? type : "both"}`
    // );
    const newURL = `http://localhost:3001/search?locations=${placesString}&&sort=${
      sortBy ? sortBy : "asc"
    }&&type=${type ? type : "both"}`;
    locationString.current = `results?locations=${placesString}&&sort=${
      sortBy ? sortBy : "asc"
    }&&type=${type ? type : "both"}`;
    // history.push(
    //   `results?locations=${locationString}&&sort=${\
    //     sortBy ? sortBy : "ASC"
    //   }&&type=${type ? type : "Both"}`
    // );
    if (currentURL.path == "/details") {
      locationString.current =
        "http://localhost:3001/" + locationString.current;
    }
    history.push(locationString.current);
    if (props.changeURL) props.changeURL(newURL);
  };

  return (
    <div className="filterNav">
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light"
        style={{ padding: 0 }}
      >
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto" id="navbar">
            <li className="nav-item" id="border-fix">
              <div className="borderFix">&nbsp;</div>
            </li>
            <li className="nav-item dropdown active">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Locations
              </a>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdown"
                id="dropdown-menu"
              >
                {locations.map((e, i) => {
                  return (
                    <button
                      className="dropdown-item drop-btn location-btn"
                      onClick={handleLocations}
                      data-id={e._id}
                      key={e._id}
                    >
                      <i className="far fa-circle"></i>
                      <i
                        className="far fa-check-circle"
                        style={{ display: "none" }}
                      ></i>
                      {`  ${e.locatioName}`}
                    </button>
                  );
                })}
              </div>
            </li>
            <li className="nav-item dropdown active">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown2"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Sort by
              </a>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdown2"
                style={{ width: "fit-content" }}
              >
                <button
                  className="dropdown-item drop-btn sort-btn active"
                  onClick={handleSorting}
                  id="asc"
                >
                  Price : Low to High
                </button>
                <button
                  className="dropdown-item drop-btn sort-btn"
                  onClick={handleSorting}
                  id="desc"
                >
                  Price : High to Low
                </button>
              </div>
            </li>
            <li className="nav-item dropdown active">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown2"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Property type
              </a>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdown2"
                style={{ width: "max-content" }}
              >
                <button
                  className="dropdown-item drop-btn type-btn"
                  id="Hotel"
                  onClick={handleType}
                >
                  Hotel & Resorts
                </button>
                <button
                  className="dropdown-item drop-btn type-btn"
                  id="Villa"
                  onClick={handleType}
                >
                  Villas
                </button>
                <button
                  className="dropdown-item drop-btn type-btn active"
                  id="both"
                  onClick={handleType}
                >
                  Both
                </button>
              </div>
            </li>
            <li className="nav-item">
              <button
                className="dropdown-item cta-btn"
                style={{ boxSizing: "border-box", height: "100%" }}
                onClick={handleSearch}
                id="ctaFind"
              >
                Find
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
