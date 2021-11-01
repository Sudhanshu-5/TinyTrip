import React from "react";
import "./TestPackages.css";

export const TestPackages = (props) => {
  const ctaHandler = (e) => {
    console.log(e.target.dataset);
  };
  return (
    <div>
      <div className="gallery">
        <figure className="gallery__item ">
          <img
            src="https://static.toiimg.com/photo/77718645.cms"
            className="gallery__img"
            alt="Image 1"
          />
          <div className="overlay-info">
            <p className="period">{props.even.typeOfPackage}</p>
            <p className="room-name">{props.even.packageDescription}</p>
          </div>
          <div className="overlay-cta">
            <button
              onClick={ctaHandler}
              data-toggle="modal"
              data-target="#exampleModal2"
            >
              Book now
            </button>
          </div>
        </figure>
        {/* ........................................................................................... */}
        {props.both && (
          <figure className="gallery__item" style={{ marginLeft: "25px" }}>
            <img
              src="https://www.holidify.com/images/bgImages/MADURAI.jpg"
              className="gallery__img"
              alt="Image 2"
            />
            <div className="overlay-info">
              <p className="period">{props.odd.typeOfPackage}</p>
              <p className="room-name">{props.odd.packageDescription}</p>
            </div>
            <div className="overlay-cta">
              <button
                onClick={ctaHandler}
                data-toggle="modal"
                data-target="#exampleModal2"
              >
                Book now
              </button>
            </div>
          </figure>
        )}
      </div>
    </div>
  );
};
