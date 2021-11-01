import React from "react";
import TestSidebar from "./TestSidebar.js";

export const TestForm = (props) => {
  return (
    <div
      className="modal fade"
      id="exampleModal2"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content" style={{ width: "100%" }}>
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Enquiry Form
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div
            className="modal-body"
            style={{ padding: "0", height: "max-content" }}
          >
            <TestSidebar location={props.package.plan} />
          </div>
        </div>
      </div>
    </div>
  );
};
