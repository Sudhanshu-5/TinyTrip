import React from 'react';
import './Footer.css';
import {Link} from 'react-router-dom'

function Footer() {

  return(
    <div>
      {/* Rainbow line */}
      <div className="container-fluid mt-4" style={{padding:"0 !important"}}>
        <div className="row rainbow"></div>
      </div>

      {/* Main footer */}
      {/* For xl screens */}
      <div className="container-fluid footer d-none d-xl-block">
        <div className="row justify-content-center align-items-top mx-5">
          <div className="col-2 mt-5 mb-1">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Terms Of Use</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">E-Commerce Solutions</a></li>
              <li><Link to='/adminLogin'><a href="#">Admin login</a></Link></li>
              <li><a href="#">Pay Online</a></li>
            </ul>
          </div>
          <div className="col-3 mt-5 mb-1">
            <h5>Need Help ?</h5>
            <ul className="list-unstyled">
              <li>We are happy to help You</li>
              <li>Email: info@pearltravels.in</li>
              <li>Mobile: +91-99301 05570-71</li>
            </ul>
            <a href="#"><img alt="facebook" src={require('../../assets/svg/facebook.svg')} /></a>
            <a href="#"><img alt="twitter" src={require('../../assets/svg/twitter.svg')} /></a>
            <a href="#"><img alt="linkedIn" src={require('../../assets/svg/linkedIn.svg')} /></a>
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
          <div className="col-4 mt-5 mb-1">
            <h5>Recent Blog Posts</h5>
            <ul className="list-unstyled">
              <li><a href="#">Top 10 Honeymoon Destinations outside India</a></li>
              <li><a href="#">10 Places to visit in Incredible India</a></li>
              <li><a href="#">14 Things To Do In Pondicherry</a></li>
              <li><a href="#">21 Things to do While Travelling India</a></li>
              <li><a href="#">11 Experiences not to be missed in Ladakh !</a></li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="row justify-content-center align-items-center pb-4">
          Copyright 2020 &copy; Pearl Travels. All rights reserved
        </div>
      </div>
      {/* For smaller screen sizes */}
      <div className="container-fluid footer d-xl-none">
        <div className="row justify-content-center align-items-center">
          
          <div className="accordion" id="accordionExample">
            <div className="card">
              <div className="card-header" id="headingOne">
                <h2 className="mb-0">
                  <a className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Quick Links<i className="arrow down" />
                  </a>
                </h2>
              </div>
          
              <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                <div className="card-body">
                  <ul className="list-unstyled">
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Terms Of Use</a></li>
                    <li><a href="#">Contact Us</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">E-Commerce Solutions</a></li>
                    <li><a href="#">Careers @ PearlTravels</a></li>
                    <li><a href="#">Pay Online</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header" id="headingTwo">
                <h2 className="mb-0">
                  <a className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Need Help ?<i className="arrow down" />
                  </a>
                </h2>
              </div>
              <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                <div className="card-body">
                  <ul className="list-unstyled">
                    <li>We are happy to help You</li>
                    <li>Email: info@pearltravels.in</li>
                    <li>Mobile: +91-99301 05570-71</li>
                  </ul>
                  <hr />
                  <a href="#"><img alt="facebook" src={require('../../assets/svg/facebook.svg')} /></a>
                  <a href="#"><img alt="twitter" src={require('../../assets/svg/twitter.svg')} /></a>
                  <a href="#"><img alt="linkedIn" src={require('../../assets/svg/linkedIn.svg')} /></a>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header" id="headingThree">
                <h2 className="mb-0">
                  <a className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Contact Address<i className="arrow down" />
                  </a>
                </h2>
              </div>
              <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
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
                  <a className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                    Recent Blog Posts<i className="arrow down" />
                  </a>
                </h2>
              </div>
              <div id="collapseFour" className="collapse" aria-labelledby="headingFour" data-parent="#accordionExample">
                <div className="card-body">
                <ul className="list-unstyled">
                  <li><a href="#">Top 10 Honeymoon Destinations outside India</a></li>
                  <li><a href="#">10 Places to visit in Incredible India</a></li>
                  <li><a href="#">14 Things To Do In Pondicherry</a></li>
                  <li><a href="#">21 Things to do While Travelling India</a></li>
                  <li><a href="#">11 Experiences not to be missed in Ladakh</a></li>
                </ul>
                </div>
              </div>
            </div>
          </div>

        </div>
        <hr />
        <div className="row justify-content-center align-items-center pb-4 footer-small" style={{textAlign: "center"}}>
          Copyright 2020 &copy; Pearl Travels. All rights reserved
        </div>
      </div>
    </div>
  )
};

export default Footer;