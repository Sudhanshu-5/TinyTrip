import React from "react";
import "./Tabs.css";

const Tabs = () => {
  function openCity(evt) {
    // var i, tablinks;
    // tablinks = document.getElementsByClassName("tablinks");
    // for (i = 0; i < tablinks.length; i++) {
    //   tablinks[i].className = tablinks[i].className.replace(" active", "");
    // }
    // evt.currentTarget.className += " active";
    // document
    //   .getElementById(`#${evt.target.innerText}`)
    //   .scrollIntoView({ behavior: "smooth", block: "center" });
    // document.getElementById("tab").style.display = "fixed";
    // document.getElementById("tab").style.top = "1000";
  }
  return (
    <div className="tab" id="tab">
      <button className="tablinks active" onClick={openCity}>
        All
      </button>
      <button className="tablinks" onClick={openCity}>
        2 Nights
      </button>
      <button className="tablinks" onClick={openCity}>
        3 Nights
      </button>
      <button className="tablinks" onClick={openCity}>
        4 Nights
      </button>
    </div>
  );
};
export default Tabs;
