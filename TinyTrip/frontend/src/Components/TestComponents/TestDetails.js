import React, { useState, useEffect } from "react";
import Header from "../Themes/Header/Header";
import Footer from "../Footer/Footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import { TestPackages } from "./TestPackages";
import { TestForm } from "./TestForm";
import { TestFeatureTabs } from "./TestFeatureTabs";
import "./TestDetails.css";
////////////////////////////////////////////////////////////
import { SERVER_URL } from "../../_gobalVars.js";

function TestDetails() {
  const { propId } = useParams();
  const [state, setState] = useState({});
  const [teststate, setTestState] = useState([]);
  const [amenities, setAmenities] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [mydata, setMyData] = useState({});
  const [headerImg, setHeaderImg] = useState("");
  useEffect(() => {
    setIsLoading(true);
    const getDetails = async () => {
      const res = await axios.get(`${SERVER_URL}/getProperty/${propId}`);
      setMyData(res.data);
      if (res.data.Header_Img) setHeaderImg(res.data.Header_Img);
      // console.log(res.data);
      // dummyarr.pop();
      const tabsData = {
        highlights: res.data.highlights,
        thingsToDo: res.data.thingsToDo,
        wayToTransport: res.data.wayToTransport,
      };
      setAmenities(tabsData);
      setTestState(res.data.offerings);
      // console.log(res.data.offerings.length);
      setIsLoading(false);
      // console.log(res.data.locations);
      // setTestState(res.data.locations);
    };
    getDetails();
  }, [propId]);

  return (
    <div>
      <title>Details</title>
      <Header
        headerImg={
          headerImg.length > 0
            ? headerImg
            : `https://via.placeholder.com/1920x1080?text=${mydata.propertyType}%20${mydata.propertyName}`
        }
      />
      <div
        style={{
          height: "15vh",
          display: "flex",
          width: "100%",
          justifyContent: "space-evenly",
          alignItems: "center",
          borderBottom: "1px solid #ccc",
          marginBottom: "20px",
        }}
      >
        <div className="property-details">{mydata.propertyName}</div>
        <div className="property-details">{mydata.property_Address}</div>
        <div className="property-details">
          Distance from {mydata.distance_From}:{mydata.distance}
        </div>
        <div className="property-details">{mydata.thingsToDo}</div>
      </div>
      {/* <div
        style={{
          width: "max-content",
          margin: "0 auto",
          paddingBottom: "21px",
          paddingTop: "21px",
        }}
      >
        <Tabs />
      </div> */}
      <div
        className="container"
        style={{
          paddingTop: "20px",
          paddingBottom: "20px",
          transform: "none",
          margin: 0,
        }}
      >
        <div className="row" style={{ transform: "none" }}>
          <div className="col-lg-12 nopadding" id="list_sidebar">
            <div className="row pac--dl" style={{ width: "fit-content" }}>
              {teststate.length % 2 == 0 &&
                teststate.map((item, index) => {
                  if (index % 2 == 0) {
                    return (
                      <TestPackages
                        key={index}
                        location={mydata.property_Address}
                        packageSelector={setState}
                        odd={teststate[index + 1]}
                        even={teststate[index]}
                        both={true}
                      />
                    );
                  }
                })}
              {teststate.length % 2 != 0 &&
                teststate.map((item, index) => {
                  if (index % 2 == 0 && index < teststate.length - 1) {
                    return (
                      <TestPackages
                        key={index}
                        location={mydata.property_Address}
                        packageSelector={setState}
                        odd={teststate[index + 1]}
                        even={teststate[index]}
                        both={true}
                      />
                    );
                  } else if (index == teststate.length - 1) {
                    return (
                      <TestPackages
                        key={index}
                        location={mydata.property_Address}
                        packageSelector={setState}
                        even={teststate[index]}
                        both={false}
                      />
                    );
                  }
                })}
            </div>
          </div>
        </div>
      </div>
      <TestForm package={state} />
      <div
        style={{
          width: "80%",
          margin: "0 auto",
        }}
      >
        {!isLoading && <TestFeatureTabs data={amenities} />}
      </div>
      <Footer />
    </div>
  );
}

export default TestDetails;
