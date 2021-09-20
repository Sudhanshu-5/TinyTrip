import React, { useState, useEffect } from 'react'
import './Subheader.css'
import html2pdf from 'html2pdf.js'
import axios from 'axios';

function Subheader(props) {

  const [state,setState] = useState({});

  useEffect(() => {
    const getData = async () => {
        const resDes = await axios.get('/contactInfo');
        setState(resDes.data);
      }
      getData();
  }, [])

  const Download = () =>
  {

    for(var i=0;i<4;i++)
    {
      if(document.getElementById("queue"+i)!==null)
      {
        document.getElementById("queue"+i).classList.remove("collapse");
        document.getElementById("queue"+i).previousSibling.childNodes[1].childNodes[0].classList.remove("fa-plus");
        document.getElementById("queue"+i).previousSibling.childNodes[1].childNodes[0].classList.add("fa-minus");
      }
    }

    if(document.getElementById("EXCLUSIONlist")!==null)
    {
      document.getElementById("EXCLUSIONlist").classList.remove("collapse");
      document.getElementById("EXCLUSIONlist").previousSibling.childNodes[1].childNodes[1].classList.remove("fa-plus");
      document.getElementById("EXCLUSIONlist").previousSibling.childNodes[1].childNodes[1].classList.add("fa-minus");
    }
    if(document.getElementById("INCLUSIONlist")!==null)
    {
      document.getElementById("INCLUSIONlist").classList.remove("collapse");
      document.getElementById("INCLUSIONlist").previousSibling.childNodes[1].childNodes[1].classList.remove("fa-plus");
      document.getElementById("INCLUSIONlist").previousSibling.childNodes[1].childNodes[1].classList.add("fa-minus");
    }
    if(document.getElementById("TERMSlist")!==null)
    {
      document.getElementById("TERMSlist").classList.remove("collapse");
      document.getElementById("TERMSlist").previousSibling.childNodes[1].childNodes[1].classList.remove("fa-plus");
      document.getElementById("TERMSlist").previousSibling.childNodes[1].childNodes[1].classList.add("fa-minus");
    }
    let options;

    if(window.screen.width>=992)
    {
      options = {
        filename: `Itenary( ${props.heading} ).pdf`,
        margin:1,
        image: {type:"jpeg",quality:"0.98"},
        html2canvas: {},
        jsPDF: {orientation:"landscape"}
      }
    }
    else
    {
      options = {
        filename: `Itenary( ${props.heading} ).pdf`,
        margin:1,
        image: {type:"jpeg",quality:"0.98"},
        html2canvas: {},
        jsPDF: {orientation:"portrait"}
      }
    }

    const element = document.getElementById("data");
    html2pdf()
    .from(element)
    .set(options)
    .save()
  }

  let propsinfo = typeof(props.duration)==="undefined"?"":props.duration;

        return (
          <section className="tour-single clearfix Package-wrapper">
                <div className="container">
                    <div className="row">
                <div className="col-lg-4 col-sm-12 border-line padd_box_mob"> <h2><i className="fal fa-map-pin"></i>  {props.heading}</h2><p><i className="fal fa-sun"></i> {propsinfo.split('-')[1]} / <i className="fal fa-moon"></i> {propsinfo.split('-')[0]}</p></div>
                <div className="col-lg-4 col-sm-12 border-line padd_box_mob">
                	<h3><span style={{fontSize:"18px"}}><i className="fal fa-coins"></i>  {props.pricing===""?"Call Us For Pricing Details":props.pricing}</span><br /><span className="person"><i className="fal fa-male"></i> Per Person</span></h3>
                </div>
                <div className="col-lg-4 col-sm-12 padd_box_mob">
                    <div className="space1"></div>
                    <a href={`tel:+${state.callNo}`} className="btn btn-primary btn-sm sendEnuiryPackage" data-rv="710"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-forward" viewBox="0 0 16 16" style={{display:"unset",verticalAlign:"none"}}>
                      <path fillRule="evenodd" d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511zm10.762.135a.5.5 0 0 1 .708 0l2.5 2.5a.5.5 0 0 1 0 .708l-2.5 2.5a.5.5 0 0 1-.708-.708L14.293 4H9.5a.5.5 0 0 1 0-1h4.793l-1.647-1.646a.5.5 0 0 1 0-.708z"/>
                      </svg> &nbsp; Call Us </a>
                    <a onClick={Download} className="btn btn-outline-primary" id="downloadBroucherData"><svg style={{display:"unset",verticalAlign:"none"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                      <path fillRule="evenodd" d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                      </svg> Download Itinerary</a>
                </div>
              </div>
            </div>
          </section>
        )
}

export default Subheader;