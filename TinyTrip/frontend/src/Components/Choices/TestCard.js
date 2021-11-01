import React from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "../../Slider/Slider.js";
import nopicture from "../../assets/img/no.png";
import "./TestCard.css";
/////////////////////////////////////////////////////////////////////
import {
  CARD_CAROUSEL_IMAGES,
  DEFAULT_PACKAGE_STRING,
} from "../../_gobalVars.js";

function TestCard(props) {
  //////////////////////////////////////////////////////////////////////////
  const carouselImages =
    props.carouselImages.length > 0
      ? props.carouselImages
      : CARD_CAROUSEL_IMAGES;
  const packageArray =
    props.packages.length > 0
      ? props.packages.map((e, i) => e.Type_of_Package)
      : [];
  const packageString =
    packageArray.length > 0
      ? packageArray.join("/ ") + "Nights"
      : DEFAULT_PACKAGE_STRING;
  //////////////////////////////////////////////////////////////////////////
  const { type, locations, locationName } = useParams();
  return (
    <div>
      <div
        className="grid_item"
        style={{
          boxShadow: "0 0 3px #ccc",
          width: "max-content",
          height: "fit-content",
        }}
      >
        <figure
          className="fig_home"
          style={{
            width: "max-content",
            height: "fit-content",
            padding: "5px",
          }}
        >
          <div className="testcard">
            <div className="imgContainer">
              <div
                id={`carouselExampleControls-${props.id}`}
                className="carousel slide carousel-fade"
                style={{ height: "100%" }}
              >
                <div className="carousel-inner" style={{ height: "100%" }}>
                  <div
                    className="carousel-item active"
                    style={{
                      backgroundImage: `url(${carouselImages[0]})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      filter: "brightness(70%)",
                      height: "100%",
                    }}
                  >
                    &nbsp;
                  </div>
                  {carouselImages.map((e, i) => {
                    if (i > 0) {
                      return (
                        <div
                          key={i}
                          className="carousel-item"
                          style={{
                            backgroundImage: `url(${e})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            filter: "brightness(70%)",
                            height: "100%",
                          }}
                        >
                          &nbsp;
                        </div>
                      );
                    }
                  })}
                </div>
                <a
                  className="carousel-control-prev"
                  href={`#carouselExampleControls-${props.id}`}
                  role="button"
                  data-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Previous</span>
                </a>
                <a
                  className="carousel-control-next"
                  href={`#carouselExampleControls-${props.id}`}
                  role="button"
                  data-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Next</span>
                </a>
              </div>
            </div>
            <div className="infoContainer">
              <h2 className="property-name">{props.title}</h2>
              <p className="address">
                <strong>{props.address}</strong>
              </p>
              <p className="distance">
                <strong>
                  {`Distance from ${props.landmark} : ${
                    props.distance ? props.distance.trim() : "..."
                  }`}
                </strong>
              </p>
              <p className="offerings">
                <strong>{packageString}</strong>
              </p>
              <div className="cta">
                <div>₹ {props.price ? props.price : "10,000"}</div>
                <Link
                  // /details/propId
                  to={`/details/${props.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <button className="cta-btn">
                    Book Now <i className="fas fa-angle-right"></i>
                    <i className="fas fa-angle-right"></i>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </figure>
      </div>
    </div>
  );
}

export default TestCard;
