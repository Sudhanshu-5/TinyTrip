import React from "react";
import "./TestFeatureTabs.css";
export const TestFeatureTabs = (props) => {
  function openCity(evt, cityName) {
    console.log("called!");
    var i, tabcontent, tablinks;
    tabcontent = [...document.getElementsByClassName("tabcontentFeature")];
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = [...document.getElementsByClassName("tablinks")];
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "5px",
      }}
    >
      <div className="tabFeature">
        <button
          className="tablinks active"
          onClick={(e) => {
            openCity(e, "Highlights");
          }}
        >
          Highlights
        </button>
        <button
          className="tablinks"
          onClick={(e) => {
            openCity(e, "Things_to_do");
          }}
        >
          Things to do
        </button>
        <button
          className="tablinks"
          onClick={(e) => {
            openCity(e, "How_to_get_there");
          }}
        >
          How to get there
        </button>
      </div>
      <div id="Highlights" className="tabcontentFeature active">
        {props.data.highlights}
      </div>

      <div id="Things_to_do" className="tabcontentFeature">
        {props.data.thingsToDo}
      </div>
      <div id="How_to_get_there" className="tabcontentFeature">
        <ul>
          {props.data.wayToTransport.map((e, i) => {
            return <li key={i}>{e}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};
