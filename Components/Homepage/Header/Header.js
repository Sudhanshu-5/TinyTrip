import React,{useState, useEffect} from 'react';
import './Header.css';
import Wp from './Wp';
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'

function Header() {
  const history = useHistory();

  const [destinations, setDestinations] = useState([]);
  const [text, setText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [call,setCall] = useState({});
  const [sliders, setSliders] = useState({});

  useEffect(() => {
    const getThemesAndTypes = async () => {
      const resDes = await axios.get('/allDestinations');
      const resDes1 = await axios.get('/contactInfo');
      const myRes = await axios.get('/sliderImgs');
      setSliders(myRes.data);
      let allDes = []
      for(let i=0;i<resDes.data.length;i++) {
        allDes.push(resDes.data[i].name);
      }
      setDestinations(allDes);
      setCall(resDes1.data);
    }
    getThemesAndTypes();
  }, [])

  const onTextChanged = (e) => {
    let value = e.target.value;
    value = value.substring(0,1).toUpperCase() + value.substring(1,value.length);
    let suggestions = [];
    if(value.length > 0) {
      try{
      const regex = new RegExp(`^${value}`, 'i');
      suggestions = destinations.sort().filter(v => regex.test(v));
      }
      catch(err)
      {
        setSuggestions(suggestions);
      }
    }
    setSuggestions(suggestions);
    setText(value);
  };

  const suggestionSelected = (value) => {
    setText(value);
    setSuggestions([]);
  };

  const renderSuggestions = () => {
    if(suggestions.length === 0) {
      return (
        <div className="srchList">
          <ul className="list-group" style={{borderRadius:"5px"}}>
             <li className="list-group-item">No Results</li>
          </ul>
        </div>
      );

    }
    return (
      <div className="srchList">
        <ul className="list-group" id="li-sug">
          {suggestions.map((item,index) => <li key={index} className="list-group-item" onClick={() => suggestionSelected(item)}>{item}</li>)}
        </ul>
      </div>
    );
  };

  const handleRedirect = (e) => {
    e.preventDefault();
    for(let i=0;i<destinations.length;i++) {
      if(document.querySelector(".inp").value === destinations[i])
        history.push(`/destination/${document.querySelector(".inp").value}`);
    }
  };

    if(document.querySelector(".inp")===null?"":document.querySelector('.inp').value==="")
    {
      let nooftime=0;

      if(document.querySelector(".sug")!==null)
        document.querySelector(".sug").style.display="none";

        document.querySelector(".inp").onkeydown = function(e){
          if(e.keyCode===40)
          {
            if(document.querySelector("#li-sug")!==null)
            {
              if(document.querySelector("#li-sug").childNodes.length>nooftime)
              {
                document.querySelector(".inp").value=document.querySelector("#li-sug").childNodes[nooftime].textContent;
                document.querySelector(".inp").setAttribute("value",document.querySelector("#li-sug").childNodes[nooftime].textContent);
                if(document.querySelector("#li-sug").childNodes.length!==nooftime+1)
                  nooftime++;
              }
            }
          }
          else if(e.keyCode===38)
          {
            if(document.querySelector("#li-sug")!==null)
            {
              if(nooftime>0)
              {
                nooftime--;
                document.querySelector(".inp").value=document.querySelector("#li-sug").childNodes[nooftime].textContent;
                document.querySelector(".inp").setAttribute("value",document.querySelector("#li-sug").childNodes[nooftime].textContent);
              }
            }
          }
        }
    }
    else
    {
      if(document.querySelector(".sug")!==null)
        document.querySelector(".sug").style.display="inherit";
    }

    if(document.querySelector(".srchList")!==null)
      document.querySelector(".srchList").style.width="100%";

    document.addEventListener("click", function (e) {
      var x = document.getElementsByClassName("frm-hd");
        if (e.target !== x) {
          if(document.querySelector(".sug")!==null)
            document.querySelector(".sug").style.display="none";
        }
    });

    if(document.querySelector(".main-carousel-caption")!==null && document.querySelector(".carousel-inner")!=null)
    {
      document.querySelector(".main-carousel-caption").style.position="absolute";
      document.querySelector(".main-carousel-caption").style.zIndex=9;
      document.querySelector(".main-carousel-caption").style.left=0;
      document.querySelector(".main-carousel-caption").style.right=0;
      document.querySelector(".main-carousel-caption").style.top=document.querySelector(".carousel-inner").offsetHeight/3.5+"px"
    }

  return(
    <div>
      <nav className="navbar navbar-default navbar-expand-lg navbar-dark bg-none fixed-top">
      <div className="nav-nav">
      <div className="navbar-brand" style={{color: '#fff',fontSize: '2rem',fontWeight: 'bolder', marginRight: '50px'}}>
        <Link to="/" className="text-danger nodec">
          <img src={require('../../../assets/img/logo.png')} className="logo" alt="logo" loading="lazy" style={{height: '60px'}} />
        </Link>
        </div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        </div>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav mr-lg-auto">
          <li className="nav-item">
            <Link className="nav-link bt-w" to="/options/Themes">Themes</Link>
          </li>
            <li className="nav-item">
              <Link className="nav-link" to="/options/Destination Types">Destinations</Link>
            </li>
          </ul>
          <ul className="navbar-nav hd-nav">
            <li className="nav-item">
            <a href={`tel:+${call.callNo}`} className="hd-btn hd-btn-1" title="Call us">
            <span className="hd-btn-content">Call Us</span>
            <span className="icon"><i className="fal fa-phone-plus" aria-hidden="true"></i></span>
        </a>
        <a href="http://www.pearltravels.in:14763/payment" target="_blank" rel="noopener noreferrer" title="Pay us" className="hd-btn hd-btn-2 hd-btn-remove hd-btn-alt-color">
            <span className="hd-btn-content">Pay</span>
            <span className="icon"><i className="fal fa-credit-card"></i></span>
        </a>
            </li>
          </ul>
        </div>
      </nav>
      <div id="myCarousel" className="carousel slide carousel-fade" data-interval="3000" data-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="cr-img-gradient">
            <img src={sliders.s1 ? 'http://pearltravels.in/'+sliders.s1 : ''} className="d-block w-100" alt="slider1" />
          </div>
        </div>
        <div className="carousel-item">
          <div className="cr-img-gradient">
            <img src={sliders.s2 ? 'http://pearltravels.in/'+sliders.s2 : ''} className="d-block w-100" alt="slider2" />
          </div>
        </div>
        <div className="carousel-item">
          <div className="cr-img-gradient">
            <img src={sliders.s3 ? 'http://pearltravels.in/'+sliders.s3 : ''} className="d-block w-100" alt="slider3" />
          </div>
        </div>
        <div className="carousel-item">
          <div className="cr-img-gradient">
            <img src={sliders.s4 ? 'http://pearltravels.in/'+sliders.s4 : ''} className="d-block w-100" alt="slider4" />
          </div>
        </div>
        <div className="carousel-item">
          <div className="cr-img-gradient">
            <img src={sliders.s5 ? 'http://pearltravels.in/'+sliders.s5 : ''} className="d-block w-100" alt="slider5" />
          </div>
        </div>
      </div>
    </div>
    <div className="container main-carousel-caption">
    <br />
      <div className="row justify-content-center align-items-center">
        <div className='caption-wrapper'>
          <div className="col-12">
            <h3>Go in style with every mile</h3>
          </div>
        </div>
      </div>
      <div className="frm-hd row justify-content-center align-items-center no-gutters">
      <div className="s01">
      <form autoComplete="off" onSubmit={handleRedirect}>
        <div className="inner-form">
          <div className="input-field first-wrap">
            <input id="search myInput" type="text" style={{color:"#000"}} className="inp" placeholder="Search by Destination" aria-label="Search"  value={text} onChange={onTextChanged}  />
            <div className="col-12 justify-content-center sug" style={{display:"none"}}>
              {
                renderSuggestions()
              }
        </div>
          </div>
          <div className="input-field third-wrap">
            <button className="btn-search" type="button" onClick={handleRedirect}>Search</button>
          </div>
        </div>
      </form>
    </div>
      </div>
    </div>
    <div className="wp-wrapper">
      <Wp />
    </div>
  </div>
  )
};

export default Header;