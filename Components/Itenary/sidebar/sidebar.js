import React, { useState,useEffect } from 'react';
import './sidebar.css'
import Datepicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { useToasts } from 'react-toast-notifications';
import emailjs from 'emailjs-com';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactTelInput from 'react-telephone-input'
import 'react-telephone-input/css/default.css'

import Flag from '../../../assets/img/flags.723494a4.png'



function handleInputBlur(telNumber, selectedCountry) {
    console.log(
      'Focus off the ReactTelephoneInput component. Tel number entered is: ',
      telNumber,
      ' selected country is: ',
      selectedCountry
    )
  }

function sidebar(props){
    const { destinationName, packageName } = useParams();
    const { addToast } = useToasts();

    const [selectedDate,setSelectedDate] = useState('');

    const [state,setState] = useState({});

    useEffect(() => {
        const getData = async () => {
            const resDes = await axios.get('/contactInfo');
            setState(resDes.data);
        }
        getData();
    }, [])

    let init = {
        Name: '',
        email: '',
        mobile: '',
        when: '',
        nOA: '',
        nOC: '',
        nOI: '',
    };
    const [values, setValues] = useState(init);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({...values, [name]: value});
    }

    function handleInputChange(telNumber, selectedCountry) {
        document.querySelector(".react-tel-input input[type='text'], .react-tel-input input[type='tel']").setAttribute("format",selectedCountry.format);
        setValues({...values,"mobile":`${selectedCountry.name}   ${telNumber}`})
    }

    const templateParams = {
        destinationName: destinationName,
        packageName: packageName,
        name: values.Name,
        email: values.email,
        mobile: values.mobile,
        when: values.when,
        nOA: values.nOA,
        nOC: values.nOC,
        nOI: values.nOI,
    };

    let propsinfo = [""];
    const {duration} = props;

    let propsplace = "";
    const {place} = props;

    let propspricing = "Starting from Upon Request";
    const {pricing} = props;

    propsinfo = typeof(duration)==="undefined"?"":duration;

    propspricing = typeof(pricing)==="undefined" || pricing === 0 ? propspricing.toLowerCase().replace(' ','').split('from') :pricing===""?"Call Us For Pricing Details":pricing;

    propsplace = typeof(place)==="undefined"?"":place;

    const night = typeof(propsinfo.split('-')[1])==="undefined"?"":propsinfo.split('-')[1].replace(' ','');

    if(document.querySelector(".react-tel-input input[type='text'], .react-tel-input input[type='tel']")!==null)
        document.querySelector(".react-tel-input input[type='text'], .react-tel-input input[type='tel']").setAttribute("name","mobile");

    if(document.querySelector(".form-control-_1")!==null)
        document.querySelector(".form-control-_1").setAttribute("name","date")



    function validate(e){
        e.preventDefault();

        if(/^[A-Za-z\s]+$/.test(document.forms["Enquiry"]["Name"].value.trim())===false)
        {
            return(
                addToast("Please enter a valid name without any special characters", {
                    appearance: 'error',
                    autoDismiss: true,
                })
            )
        }

        if(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.forms["Enquiry"]["email"].value.trim())===false)
        {
            return(
                addToast("Please enter a valid Email", {
                    appearance: 'error',
                    autoDismiss: true,
                })
            )
        }

        if(document.forms["Enquiry"]["mobile"].value.trim().length<4)
        {
            return(
                addToast("Please enter a valid Phone Number", {
                    appearance: 'error',
                    autoDismiss: true,
                })
            )
        }

        if(document.forms["Enquiry"]["mobile"].value.trim().length!==document.querySelector(".react-tel-input input[type='text'], .react-tel-input input[type='tel']").getAttribute("format").length)
        {
            return(
                addToast(`Please enter a valid Phone Number as format ${document.querySelector(".react-tel-input input[type='text'], .react-tel-input input[type='tel']").getAttribute("format")}`, {
                    appearance: 'error',
                    autoDismiss: true,
                })
            )
        }

        if(document.forms["Enquiry"]["date"].value==="")
        {
            return(
                addToast(`Date can't be blank`, {
                    appearance: 'error',
                    autoDismiss: true,
                })
            )
        }

        if(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(document.forms["Enquiry"]["email"].value.trim())===false)
        {
            return(
                addToast("Please enter a Date as dd/mm/yyyy", {
                    appearance: 'error',
                    autoDismiss: true,
                })
            )
        }

        emailjs.send("service_hiwytzg","template_quixenj", templateParams,
        "user_3HLqVGMEY6T48cXMGFqka")
        addToast("Thank you for contacting us – we will get back to you soon!", {
            appearance: 'success',
            autoDismiss: false,
        })
    }

        return (
            <aside className="col-lg-5 sidebar" id="en-form">
            <div className="theiaStickySidebar">
            <div className="box_detail ">
                <div className="box-detail booking">
                    <h5 className="tour-single-title">{props.heading}</h5>
                </div>
                <div className="Package-right-side">
                    <p className="fl row"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sun" viewBox="0 0 16 16">
  <path d="M3.5 8a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0z"/>
  <path d="M8.202.28a.25.25 0 0 0-.404 0l-.91 1.255a.25.25 0 0 1-.334.067L5.232.79a.25.25 0 0 0-.374.154l-.36 1.51a.25.25 0 0 1-.282.188l-1.532-.244a.25.25 0 0 0-.286.286l.244 1.532a.25.25 0 0 1-.189.282l-1.509.36a.25.25 0 0 0-.154.374l.812 1.322a.25.25 0 0 1-.067.333l-1.256.91a.25.25 0 0 0 0 .405l1.256.91a.25.25 0 0 1 .067.334L.79 10.768a.25.25 0 0 0 .154.374l1.51.36a.25.25 0 0 1 .188.282l-.244 1.532a.25.25 0 0 0 .286.286l1.532-.244a.25.25 0 0 1 .282.189l.36 1.508a.25.25 0 0 0 .374.155l1.322-.812a.25.25 0 0 1 .333.067l.91 1.256a.25.25 0 0 0 .405 0l.91-1.256a.25.25 0 0 1 .334-.067l1.322.812a.25.25 0 0 0 .374-.155l.36-1.508a.25.25 0 0 1 .282-.19l1.532.245a.25.25 0 0 0 .286-.286l-.244-1.532a.25.25 0 0 1 .189-.282l1.508-.36a.25.25 0 0 0 .155-.374l-.812-1.322a.25.25 0 0 1 .067-.333l1.256-.91a.25.25 0 0 0 0-.405l-1.256-.91a.25.25 0 0 1-.067-.334l.812-1.322a.25.25 0 0 0-.155-.374l-1.508-.36a.25.25 0 0 1-.19-.282l.245-1.532a.25.25 0 0 0-.286-.286l-1.532.244a.25.25 0 0 1-.282-.189l-.36-1.509a.25.25 0 0 0-.374-.154l-1.322.812a.25.25 0 0 1-.333-.067L8.203.28zM8 2.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11z"/>
</svg>  {propsinfo.replace(' ','').match(/\d+/)} Days <span className="line-1"> / </span> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-moon" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M14.53 10.53a7 7 0 0 1-9.058-9.058A7.003 7.003 0 0 0 8 15a7.002 7.002 0 0 0 6.53-4.47z"/>
</svg>  {night.match(/\d+/)} Nights <span className="line-1"> / </span>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
</svg>  {typeof(propsplace)===typeof([])?propsplace.map((item)=>item+" "):""}</p>
                    <div className="clearfix"></div>
                </div>
                <div className="price">
                    <div className="row">
                        <div style={{borderBottom:"none", margin: "0px",textAlign: "right"}} className="col-md-12 price">
                            <div className="cl"></div>
                            <span style={{}}>{propspricing}</span><br />
                            <div className="cl"></div>
                            <span style={{lineHeight:"1px !important", margin:"0",padding:"0"}}>Per Person</span>
                            <br />
                        </div>
                        <form name="Enquiry" className="package_rate_enquiry container"  autoComplete="off" >
                            <div className="container pl-con">
                            <div className="form-group">
                                <input type="text" name="Name" className="form-control" placeholder="Enter Name" onChange={handleChange} />
                            </div>
                                <div className="form-group">
                                    <input  type="email" name="email" className="form-control" placeholder="Enter Email" onChange={handleChange} />
                                </div>
                                <div className="form-group" id="cal">
                                    <ReactTelInput
                                        defaultCountry="in"
                                        flagsImagePath={Flag}
                                        onChange={handleInputChange}
                                        onBlur={handleInputBlur}
                                    />
                                </div>
                                <div className="form-group" id="cal">
                                   <Datepicker selected={selectedDate} onChange={date=>{setSelectedDate(date)
                                   setValues({...values, when: date+' '})}}
                                        dateFormat='dd/MM/yyyy' minDate={new Date()}
                                        isClearable
                                        placeholderText="When"
                                        disabledKeyboardNavigation
                                        className="form-control-_1"
                                        name="when"
                                        style={{width:"100%"}}
                                        peekNextMonth
                                        showMonthDropdown
                                        showYearDropdown
                                    /></div>
                                <div className="form-group">
                                    {/* <input  type="text" id="room-main" name="mobile" className="form-control" placeholder="Enter Number of Rooms" /> */}
                                    <div style={{backgroundColor:"#fff",marginTop:"1rem"}} id="room">
                                        <div id="roomBoxMain">
                                            <div className="roomBoxMainIn" style={{padding: "0px 10px 10px 10px"}}>
                                                <div className="roomLoop" style={{width: "100%",position: "relative"}}>
                                                    <h1 className="queryGroupData">Details</h1>
                                                    <div className="form-group"><input type="number" name="nOA"
                                                    onChange={handleChange}
                                                    className="form-control" placeholder="Number Of Adults (15+ Years)" style={{marginTop:"1rem"}} /></div>
                                                    <div className="form-group"><input type="number" name="nOC"
                                                    onChange={handleChange}
                                                    className="form-control" placeholder="Number Of Children (2-14 Years)" style={{marginTop:"1rem"}} /></div>
                                                    <div className="form-group"><input type="number" name="nOI"
                                                    onChange={handleChange}
                                                    className="form-control" placeholder="Number Of Infant (0-2 Years)" style={{marginTop:"1rem"}} /></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            <button onClick={validate} className="btn_1 full-width wishlist sending1 " style={{background: "#bd2130"}}><i className="fal fa-book" aria-hidden="true"></i> Send Enquiry </button>
                            </div>
                        </form>
                    </div>
                    <ul className="share-buttons">
                        <div className="sharethis-inline-share-buttons st-center st-has-labels  st-inline-share-buttons st-animated" style={{opacity: "1 !important"}} id="st-1"><div className="st-total st-hidden">
  			<span className="st-label"></span>
</div>

<a className="st-btn-whatsaap" style={{display: "inline-block", cursor: 'pointer'}} href={`https://wa.me/+${state.wpNo}/`} target="_blank">
  <img alt="whatsaap sharing button" src={require('../../../assets/img/whatsapp.svg')} />
  <span className="st-label">  Whatsapp</span>
  </a>

<div className="st-btn-email" style={{display: "inline-block", cursor: 'pointer'}}
onClick={() => window.open('mailto:pearltravels@gmail.com')}>
  <img alt="email sharing button" src={require('../../../assets/img/email.svg')} />
  <span className="st-label">  Email</span>
  </div>
  <CopyToClipboard text={window.location.href}
          onCopy={() => addToast("Link copied to clipboard", {
            appearance: 'info',
            autoDismiss: true,
          })}>
<div className="st-btn-share" data-network="sharethis" style={{display: "inline-block", cursor: 'pointer'}}>
  <img alt="sharethis sharing button" src={require('../../../assets/img/share.svg')} style={{cursor: 'pointer'}} />
  <span className="st-label" style={{cursor: 'pointer'}}>   Share</span>
</div>
</CopyToClipboard>
</div>
                    </ul>
                </div>
            </div>
            </div>
            </aside>
        )
}

export default sidebar;