import React, { useState, useEffect } from 'react';
import Header from './Itenary/Header/Header';
import Footer from './Footer/Footer';
import Subheader from './Itenary/SubHeader/Subheader';
import Secondarynav from './Itenary/SubHeader/secondarynav';
import ItenaryComponent from './Itenary/Itenary/Itenary';
import Hotel from './Itenary/Hotel/hotel';
import Inc from './Itenary/inc/inc'
import Sidebar from './Itenary/sidebar/sidebar'
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Itenary() {
  let { destinationName, packageName } = useParams();

  const [state, setState] = useState({});


  useEffect(() => {
    const getDestinationDetails = async () => {
      if(destinationName !== "packages") {
        const res = await axios.post('/storedData', {destinationName: destinationName});
        for(let i=0;i<res.data.packages.length;i++) {
          if(res.data.packages[i].name === packageName) {
            setState(res.data.packages[i]);
            break;
          }
        }
      }
      else {
        const resDes = await axios.get('/allPackages');
        for(let i=0;i<resDes.data.length;i++) {
            if(resDes.data[i].name === packageName) {
                setState(resDes.data[i]);
                break;
            }
        }
      }
    }
    getDestinationDetails();
  }, [destinationName, packageName])

  let incinfo,hotels,itenerary,places,pictures,pricing;

  if(destinationName !== "packages") {
    incinfo=["inclusion!@"+state.inclusion,"exclusion!@"+state.exclusion,"terms!@"+state.incluexcluTerms];
    hotels=["Standard Hotels!@"+state.standardHotels,"Luxury Hotels!@"+state.luxuryHotels,"Deluxe Hotels!@"+state.deluxeHotels,"Super Deluxe Hotels!@"+state.superDeluxeHotels]
    itenerary = state.itenerary===undefined?"":state.itenerary;

    places = typeof(state.places)==="undefined"?"":state.places.split('-');
    pictures = state.pictures===undefined?[]:state.pictures;
    pricing = state.pricing;
  }
  else {
    incinfo=state.IncluExclu===undefined?['inclusion!@','exclusion!@','terms!@']:["inclusion!@"+state.IncluExclu.Inclusion,"exclusion!@"+state.IncluExclu.Exclusion,"terms!@"+state.IncluExclu.Terms];

    hotels=state.IncluExclu===undefined?["Standard Hotels!@","Luxury Hotels!@","Deluxe Hotels!@","Super Deluxe Hotels!@"]:["Standard Hotels!@"+state.Hotels.Standard,"Luxury Hotels!@"+state.Hotels.Luxury,"Deluxe Hotels!@"+state.Hotels.Deluxe,"Super Deluxe Hotels!@"+state.Hotels.SuperDeluxe]

    itenerary = state.Itenerary===undefined?[]:state.Itenerary.Days;

    places = typeof(state.places)==="undefined"?"":state.places.split('-');
    pictures = state.Pictures===undefined?[]:state.Pictures;
    pricing = state.Pricing===undefined?'':state.Pricing.data;
  }


  return (
    <div id="data">
      <title>{state.name}</title>
      <Header/>
        <Subheader heading={state.name} pricing={pricing} duration={state.duration} smoney="31,334" itenary="#" />
        <Secondarynav itenerary={itenerary} hotel={hotels} inc={incinfo} img={pictures}/>
        <div className="container" style={{paddingTop:"30px",paddingBottom:"30px",verticalAlign:"middle"}}>
          <div className="row">
            <div className="col-lg-7">
                    {itenerary.length===0?"":<ItenaryComponent info={itenerary} title="Itinerary" def=" Price Include: Breakfast, Cab, Airport Transfers, Train Station Transfers, Intercity Transfers, Hotel Charges and other standard charges"  />}
                  <section style={{width:"100%",color:"#000"}} id="hotels">
                    <Hotel hotel={hotels}/>
                  </section>
                  <section id="inc">
                    <Inc info={incinfo} />
                  </section>
              <br /><br /><br />
              {/* <Cancellation  /> */}
            </div>
            <Sidebar heading={state.name} duration={state.duration} place={places} pricing={pricing}/>
          </div>
          <section className="row" id="img">
            <div className="col-lg-12">
              <h2 style={{fontSize:"2rem",marginBottom:"1rem",color:"#000",textAlign:"center"}}>{pictures.length===0?"":"Image Gallery"}</h2>
              <div className="row">
              {
                pictures.map(
                  (item,index)=>(
                    <div className="col-md-3" style={{marginBottom:"1rem"}} key={index}>
                      <img src={"http://pearltravels.in/uploads/"+item.split("uploads")[1].substring(1,item.split("uploads")[1].length)} alt={state.name} style={{width:"100%",height:"100%",boxShadow:"7px -2px 7px 4px #88888870"}}/>
                    </div>
                  )
                )
              }
              </div>
            </div>
          </section>
        </div>
      <br /><br /><br />
      <Footer />
    </div>
  );
};

export default Itenary;