import React, { useState, useEffect } from "react";
import Header from "./Homepage/Header/Header";
import Footer from "./Footer/Footer";
import Part1 from "./Homepage/package/part1";
import Destination from "./Homepage/destination/destination";
import { TestFilter } from "./TestComponents/TestFilter";
import { MouseScrollAnimation } from "./TestComponents/MouseScrollAnimation";
/////////////////////////////////////////////////////////////////////////////
import { SERVER_URL, HEADER_TEXT } from "../_gobalVars.js";

function Homepage() {
  const [hotelState, setHotelState] = useState([]);
  const [villaState, setVillaState] = useState([]);
  const [carouselImages, setCarouselImages] = useState([]);

  // Getting images for the header carousel
  // useEffect(() => {
  //   fetch(`${SERVER_URL}/images`, {
  //     method: "GET",
  //     mode: "cors",
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       console.log(result.data);
  //       setCarouselImages(result.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  // Getting data for properties feature on the homepage
  useEffect(() => {
    fetch(`${SERVER_URL}/featuredProperties`, {
      method: "GET",
      mode: "cors",
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result.data);
        // setState(result.data);
        /**
         * Dividing dataset into two types of properties :
         *  * Villas
         *  * Hotels and Resorts
         */
        setHotelState(
          result.data.filter((e) => {
            return e.propertyType === "Hotel" && e.isPopular === true;
          })
        );
        setVillaState(
          result.data.filter((e) => {
            return e.propertyType === "Villa" && e.isPopular === true;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <title>Homepage</title>
      <Header imgCollection={carouselImages} />
      <div
        style={{
          background: "transparent",
          display: "flex",
          justifyContent: "center",
          marginTop: "-75px",
          marginBottom: "20px",
          position: "relative",
          zIndex: "2",
        }}
      >
        <MouseScrollAnimation />
      </div>
      <div style={{ textAlign: "center" }}>
        <br />
        <div style={{ textAlign: "center", margin: "20px 100px" }}>
          <h4>{HEADER_TEXT}</h4>
        </div>
        <br />
        <div
          style={{
            width: "max-content",
            position: "sticky",
            zIndex: "4",
            top: "152px",
            margin: "0 auto",
          }}
        >
          <TestFilter />
        </div>
        <br />
        <Part1 heading="Featured Hotels" />
        {hotelState === undefined ? (
          ""
        ) : hotelState.length === 0 ? (
          ""
        ) : (
          <section id="Popular Destination" style={{ marginTop: "1rem" }}>
            <br />
            <Destination data={hotelState} />
            <br />
            <br />
          </section>
        )}
        <br />
        <Part1 heading="Featured Villas" />
        {villaState === undefined ? (
          ""
        ) : villaState.length === 0 ? (
          ""
        ) : (
          <section id="Popular Destination" style={{ marginTop: "1rem" }}>
            <br />
            <Destination data={villaState} />
            <br />
            <br />
          </section>
        )}
      </div>
      <br />
      <Footer />
    </div>
  );
}

export default Homepage;
