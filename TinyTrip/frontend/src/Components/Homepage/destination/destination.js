import React from "react";
import TestCard from "../../Choices/TestCard.js";
import "./destination.css";

function destination(props) {
  var propsdata = typeof props.data === "undefined" ? [] : props.data;
  var testData = [
    {
      stateName: "Madurai",
      _id: "6139c6604e6ea28b13bdc93f",
      img: "https://www.holidify.com/images/bgImages/MADURAI.jpg",
    },
    {
      stateName: "Maharashtra",
      _id: "6139ca4b44d41b93dd6376aa",
      img: "https://static.toiimg.com/photo/77718645.cms",
    },
  ];

  return (
    <div
      className="container"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="row"
        style={{
          marginTop: "2rem",
        }}
      >
        {propsdata.map((item, index) => (
          <TestCard
            carouselImages={item.img ? item.img : []}
            packages={item.packages ? item.packages : []}
            placename={item.propertyName}
            title={item.propertyName}
            address={item.property_Address}
            landmark={item.distance_From}
            distance={item.distance}
            key={index}
            id={item._id}
          />
        ))}
      </div>
    </div>
  );
}

export default destination;
