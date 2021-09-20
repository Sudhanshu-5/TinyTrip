import React, {useState,useEffect} from 'react';
import './Footer.css';
import {Link} from 'react-router-dom'
import axios from 'axios';


function Rotate(event){

  var element;

  try{
    element = document.getElementById(event.target.id).childNodes[1];
    if(document.getElementById(event.target.id).parentNode.parentNode.nextSibling.classList.contains("show"))
    {
      element.classList.remove('ups');
      element.classList.add('down');
      element.style.transform="rotate(45deg)";
    }
    else
    {
      element.classList.remove('down');
      element.classList.add('ups');
      element.style.transform="rotate(225deg)";
    }
  }
  catch(e)
  {
    element = document.querySelector("#"+event.target.id);

  if(element.parentNode.parentNode.parentNode.nextSibling.classList.contains("show"))
  {
    element.classList.remove('ups');
    element.classList.add('down');
    element.style.transform="rotate(45deg)";
  }
  else
  {
    element.classList.remove('down');
    element.classList.add('ups');
    element.style.transform="rotate(225deg)";
  }
  }
}

function Footer() {
  const [state,setState] = useState({});

  useEffect(() => {
    const getData = async () => {
        const resDes = await axios.get('/contactInfo');
        setState(resDes.data);
      }
      getData();
  }, [])

  return(
    <div>
      {/* Rainbow line */}
      <div className="my-con mt-4">
        <div className="row rainbow"></div>
      </div>

      {/* Main footer */}
      {/* For xl screens */}
      <div className="container-fluid footer d-none d-xl-block">
        <div className="row justify-content-center align-items-top" style={{margin:"0 1.5rem 0 1.5rem"}}>
          <div className="col-2 mt-5 mb-1">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="http://www.pearltravels.in:14763/payment" target="_blank" rel="noopener noreferrer">Pay Us</a></li>
              <li><a href="http://travel.blog.pearltravels.in/about-us/">About Us</a></li>
              <li><a href="http://travel.blog.pearltravels.in/terms-cond/">Terms & Conditions</a></li>
              {/* <li><a href="#">Contact Us</a></li>
              <li><a href="#">Privacy Policy</a></li> */}
              <li><Link to='/adminLogin'>Admin login</Link></li>
            </ul>
          </div>
          <div className="col-4 mt-5 mb-1" style={{borderRight:"solid 1px #999999"}}>
            <h5>Need Help ?</h5>
            <ul className="list-unstyled" style={{borderBottom:"solid 1px #999999",paddingBottom:"1.7rem"}}>
              <li>We are happy to help You</li>
              <li>Email: {state.email}</li>
              <li>Mobile: +{state.callNo}</li>
            </ul>
            <a href={state.fb} target="_blank"><img alt="facebook" src={require('../../assets/svg/facebook.svg')} /></a>
            <a href={state.twit} target="_blank"><img alt="twitter" src={require('../../assets/svg/twitter.svg')} /></a>
            <a href={state.insta} target="_blank"><img alt="instagram" src={require('../../assets/svg/instagram.svg')} /></a>
            <a href={state.YT} target="_blank"><img alt="youtube" src={require('../../assets/svg/youtube.svg')} /></a>
          </div>
          <div className="col-3 mt-5 mb-1">
            <h5>Contact Address</h5>
            <ul className="list-unstyled">
              <li>
                <p>
                  Address: Shop No. 2, Om Matruchaya, Ashok Nagar, Kandivali-East, Mumbai- 400 101 Maharashtra. India.
                </p>
              </li>
            </ul>
          </div>
          <div className="col-3 mt-5 mb-1" style={{border:"none"}}>
            <h5>Additional Links</h5>
            <ul className="list-unstyled"  style={{borderBottom: "1px solid rgb(153, 153, 153)",paddingBottom:"1.7rem"}}>
              <li><a href='http://travel.blog.pearltravels.in/'>
                Blog
              </a></li>
              <li>
                <Link to='/testimonial'>
                  Testimonials
                </Link>
              </li>
            </ul>
            <h5>Our Affiliations</h5>
            <a href="https://www.bni.com" rel="noopener noreferrer" target="_blank"><img alt="BNI" src={require('../../assets/img/BNI.png')} /></a>
            <a href="http://www.etaaindia.com/" rel="noopener noreferrer" target="_blank"><img alt="ETA" src={require('../../assets/img/eta.png')} /></a>
            <a href="http://tafionline.com/" rel="noopener noreferrer" target="_blank"><img alt="TAFI" src={require('../../assets/img/tafi.png')} /></a>
            <a href="https://iatte.org/" rel="noopener noreferrer" target="_blank"><img alt="IATTE" src={require('../../assets/img/iatte.png')} /></a>
          </div>
        </div>
        <hr />
        <div className="row justify-content-center align-items-center pb-4">
          Copyright {new Date().getFullYear()} &copy; Pearl Travels. All rights reserved
        </div>
      </div>
      {/* For smaller screen sizes */}
      <div className="container-fluid footer d-xl-none">
        <div className="row justify-content-center align-items-center">
          <div className="accordion" id="accordionExample">
            <div className="card">
              <div className="card-header" id="headingOne">
                <h2 className="mb-0">
                  <a className="btn btn-link" onClick={Rotate} id="quick" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Quick Links<i className="arrow down" id="ql"/>
                  </a>
                </h2>
              </div>
              <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#quick">
                <div className="card-body">
                  <ul className="list-unstyled">
                    <li><a href="http://www.pearltravels.in:14763/payment" target="_blank" rel="noopener noreferrer">Pay Us</a></li>
                    <li><a href="http://travel.blog.pearltravels.in/about-us/">About Us</a></li>
                    <li><a href="http://travel.blog.pearltravels.in/terms-cond/">Terms & Conditions</a></li>
                    <li><Link to='/adminLogin'>Admin login</Link></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header" id="headingTwo" >
                <h2 className="mb-0">
                  <a className="btn btn-link collapsed" onClick={Rotate} id="need" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Need Help ?<i className="arrow down" id="nh" />
                  </a>
                </h2>
              </div>
              <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#need">
                <div className="card-body">
                  <ul className="list-unstyled">
                    <li>We are happy to help You</li>
                    <li>Email: {state.email}</li>
                    <li>Mobile: +{state.callNo}</li>
                  </ul>
                  <hr />
                  <a href={state.fb} target="_blank" rel="noopener noreferrer"><img alt="facebook" src={require('../../assets/svg/facebook.svg')} /></a>
                  <a href={state.twit} target="_blank" rel="noopener noreferrer"><img alt="twitter" src={require('../../assets/svg/twitter.svg')} /></a>
                  <a href={state.insta} target="_blank" rel="noopener noreferrer"><img alt="instagram" src={require('../../assets/svg/instagram.svg')} /></a>
                  <a href={state.YT} target="_blank" rel="noopener noreferrer"><img alt="youtube" src={require('../../assets/svg/youtube.svg')} /></a>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header" id="headingThree">
                <h2 className="mb-0">
                  <a className="btn btn-link collapsed" id="contact" onClick={Rotate} type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Contact Address<i className="arrow down" id="ca"/>
                  </a>
                </h2>
              </div>
              <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#contact">
                <div className="card-body">
                  <ul className="list-unstyled">
                    <li>
                      <p>
                        Address: Shop No. 2, Om Matruchaya, Ashok Nagar, Kandivali-East, Mumbai- 400 101 Maharashtra. India.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header" id="headingFour">
                <h2 className="mb-0">
                  <a className="btn btn-link collapsed" id="additional" onClick={Rotate} type="button" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                    Additional Links<i className="arrow down" id="al"/>
                  </a>
                </h2>
              </div>
              <div id="collapseFour" className="collapse" aria-labelledby="headingFour" data-parent="#additional">
                <div className="card-body">
                  <ul className="list-unstyled">
                    <li><a href='http://travel.blog.pearltravels.in/'>
                    Blog
                    </a></li>
                    <li>
                      <Link to='/testimonial'>
                        Testimonials
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header" id="headingFive">
                <h2 className="mb-0">
                  <a className="btn btn-link collapsed" onClick={Rotate} id="partners" type="button" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                    Our Affiliations<i className="arrow down" id="oa"/>
                  </a>
                </h2>
              </div>
              <div id="collapseFive" className="collapse" aria-labelledby="headingFive" data-parent="#partners">
                <div className="card-body">
                  <a href="https://www.bni.com" rel="noopener noreferrer" target="_blank"><img alt="BNI" src={require('../../assets/img/BNI.png')} /></a>
                  <a href="http://www.etaaindia.com/" rel="noopener noreferrer" target="_blank"><img alt="ETA" src={require('../../assets/img/eta.png')} /></a>
                  <a href="http://tafionline.com/" rel="noopener noreferrer" target="_blank"><img alt="TAFI" src={require('../../assets/img/tafi.png')} /></a>
                  <a href="https://iatte.org/" rel="noopener noreferrer" target="_blank"><img alt="IATTE" src={require('../../assets/img/iatte.png')} /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="row justify-content-center align-items-center pb-4 footer-small" style={{textAlign: "center"}}>
          Copyright {new Date().getFullYear()} &copy; Pearl Travels. All rights reserved
        </div>
      </div>
    </div>
  )
};

export default Footer;