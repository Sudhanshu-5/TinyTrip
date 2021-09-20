import React,{useState, useEffect} from 'react';
import Wp from './Wp';
import {Link} from 'react-router-dom'
import axios from 'axios'

function Header() {

  const [themes, setThemes] = useState([]);
  const [types, setTypes] = useState([]);
  const [sliders, setSliders] = useState({});

  useEffect(() => {
    const getThemesAndTypes = async () => {
      const resThemes = await axios.get('/allThemes');
      const resTypes = await axios.get('/allTypes');
      const myRes = await axios.get('/sliderImgs');
      setSliders(myRes.data);
      let allThemes = [];
      let allTypes = [];
      for(let i=0;i<resThemes.data.length;i++) {
        if(resThemes.data[i].data.trim() !== '') {
          allThemes.push(resThemes.data[i].data);
        }
      }
      for(let i=0;i<resTypes.data.length;i++) {
        if(resTypes.data[i].data.trim() !== '') {
          allTypes.push(resTypes.data[i].data);
        }
      }
      [... new Set(allThemes)];
      [... new Set(allTypes)];
      setThemes(allThemes);
      setTypes(allTypes);
    }
    getThemesAndTypes();
  }, [])

  

  return(
    <div>
      <nav className="navbar navbar-default navbar-expand-lg navbar-dark bg-none fixed-top">
      <div className="nav-nav">
      <div className="navbar-brand" style={{color: '#fff',fontSize: '2rem',fontWeight: 'bolder', marginRight: '50px'}}>
        <Link to="/" className="text-danger nodec">
          <img src={require('../../../assets/img/logo.png')} className="logo" alt="logo" loading="lazy" style={{height: '60px'}} />
          {/* Logo */}
        </Link>
        </div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        </div>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Themes
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                {themes.map((t,index) =>
                  <Link to={`/themes/${t}`}>
                    <a className="dropdown-item" href="#" value={t} key={index}>{t}</a>
                  </Link>
                )}
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Destinations
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              {types.map((t,index) =>
                <Link to={`/packageTypes/${t}`}>
                  <a className="dropdown-item" href="#" value={t} key={index}>{t}</a>
                </Link>
              )}
              </div>
            </li>
            <li className="nav-item">
              <a href='https://travel.blogs.pearltravels.in/'>
                <a className="nav-link" href="#">Blog</a>
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <div id="myCarousel" class="carousel slide carousel-fade" data-interval="5000" data-ride="carousel">
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
      <div className="row justify-content-center align-items-center">
        <div className='caption-wrapper'>
          <div className="col-12">
            <p>10,000+ Travel Experiences in 25+ Countries</p>
            <h3>Be There, Do That!</h3>
          </div>
        </div>
      </div>
      <div className="row justify-content-center align-items-center no-gutters">
        <form class="form-inline w-100">
          <div className="col-12 col-lg-10 px-0">
            <input class="form-control w-100" type="search" placeholder="Search by Destination" aria-label="Search" />
          </div>
          <div className="col-12 col-lg-2 px-0">
            <button class="btn btn-danger w-100" type="submit">Search</button>
          </div>
        </form>
      </div>
    </div>
    <div className="wp-wrapper">
      <Wp />
    </div>
  </div>
  )
};

export default Header;