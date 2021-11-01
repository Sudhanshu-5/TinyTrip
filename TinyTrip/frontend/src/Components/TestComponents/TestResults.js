import React, { useState, useEffect } from "react";
import TestHeader from "./TestHeader.js";
import Footer from "../Footer/Footer";
import axios from "axios";
import TestCard from "../Choices/TestCard.js";
import { TestFilter } from "../TestComponents/TestFilter";
///////////////////////////////////////////////////////
import { SERVER_URL } from "../../_gobalVars.js";
//////////////////////////////////////////////////////

function TestResults() {
  const [teststate, setTestState] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const locationParams = new URLSearchParams(window.location.search);
  const locations = locationParams.get("locations");
  const sort = locationParams.get("sort");
  const type = locationParams.get("type");
  const [string, setString] = useState(
    `${SERVER_URL}/search?locations=${locations}&&sort=${sort}&&type=${type}`
  );

  useEffect(() => {
    setIsLoading(true);
    const getDetails = async () => {
      // console.log("URL: ", string);
      const res = await axios.get(string);
      // console.log("Data:");
      // console.log(res.data.data);
      // dummyarr.pop();
      setTestState(res.data.data);
      // console.log(res.data.locations);
      // setTestState(res.data.locations);
      setIsLoading(false);
    };
    getDetails();
  }, [string]);

  return (
    <div>
      {!isLoading && (
        <div>
          <title>Details</title>
          <TestHeader />
          <div
            style={{
              minHeight: "20vh",
            }}
          >
            &nbsp; &nbsp;
          </div>
          <div
            style={{
              width: "max-content",
              margin: "0 auto",
              position: "sticky",
              zIndex: "4",
              top: "112px",
            }}
          >
            <TestFilter changeURL={setString} />
          </div>
          <br />
          <div
            className="container"
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div className="row" style={{}}>
              {teststate.map((item, index) => (
                <TestCard
                  carouselImages={item.img ? item.img : []}
                  packages={item.packages ? item.packages : []}
                  placename={item.propertyName}
                  title={item.propertyName}
                  address={item.property_Address}
                  landmark={item.distance_From}
                  distance={item.distance}
                  price={item.minimum_Price}
                  key={index}
                  id={item._id}
                />
              ))}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default TestResults;
