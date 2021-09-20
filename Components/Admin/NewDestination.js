import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

function NewDestination(props) {
  const { hC, sSD, nOP, sNOP, nDD, sNDD, sPI, sPP } = props;
  const [themes, setThemes] = useState([]);
  const [types, setTypes] = useState([]);
  // const [countries, setCountries] = useState([]);
  const [continents, setContinents] = useState([]);

  useEffect(() => {
    const getThemesAndTypes = async () => {
      const resThemes = await axios.get('/allThemes');
      const resTypes = await axios.get('/allTypes');
      // const resCountries = await axios.get('/allCountries');
      const resContinents = await axios.get('/allContinents');
      let allThemes = [];
      let allTypes = [];
      // let allCountries = [];
      let allContinents = []; 
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
      // for(let i=0;i<resCountries.data.length;i++) {
      //   if(resCountries.data[i].data.trim() !== '') {
      //     allCountries.push(resCountries.data[i].data);
      //   }
      // }
      for(let i=0;i<resContinents.data.length;i++) {
        if(resContinents.data[i].data.trim() !== '') {
          allContinents.push(resContinents.data[i].data);
        }
      }
      const uniThemesSet = new Set(allThemes);
      const uniTypesSet = new Set(allTypes);
      // const uniCountriesSet = new Set(allCountries);
      const uniContinentsSet = new Set(allContinents);
      setThemes(Array.from(uniThemesSet));
      setTypes(Array.from(uniTypesSet));
      // setCountries(Array.from(uniCountriesSet));
      setContinents(Array.from(uniContinentsSet));
    }
    getThemesAndTypes();
  }, [nDD])

  useEffect(() => {
    Swal.mixin({
      input: 'text',
      confirmButtonText: 'Next &rarr;',
      allowOutsideClick: false,
      allowEscapeKey: false,
      progressSteps: ['1', '2']
    }).queue([
      {
        title: 'Question 1',
        text: 'Enter the name of your new destination'
      },
      {
        title: 'Question 2',
        text: 'Enter the number of packages'
      }
    ]).then((result) => {
      if (result.value) {
        const answers = result.value;
        sSD(answers[0]);
        if(answers[1] > 0) {
          let pacPics = [];
          let pacImg = [];
          for(let i=0;i<answers[1];i++) {
            pacImg.push("");
            pacPics.push([]);
            sNDD((prev) => {
              prev.packages[i] = {
                name: '',
                places: '',
                img: '',
                duration: '',
                pricing: '',
                inclusion: '',
                exclusion: '',
                incluexcluTerms: '',
                standardHotels: [],
                deluxeHotels: [],
                superDeluxeHotels: [],
                luxuryHotels: [],
                terms: '',
                pictures: [],
                itenerary: [],
                theme: ''
              }
            
              return({
                ...prev
              })
            });
            sPI(pacImg);
            sPP(pacPics);
          }
        }
        sNOP(answers[1]);
        Swal.fire({
          allowOutsideClick: false,
          allowEscapeKey: false,
          title: 'You are all set to create new destinations!',
          confirmButtonText: 'Lets Start',
          icon: 'success'
        })
      }
    })    
  }, [])

  const hNC = (e) => {
    const { name, value } = e.target;
    const myPackageNo = name.split('.')[0];
    if(myPackageNo > -1 && parseInt(value,10) > 0) {
      sNDD((prev) => {
        prev.packages[myPackageNo].itenerary = [];
      
        return({
          ...prev
        })
      })
      for(let i=0;i<parseInt(value,10);i++) {
        sNDD((prev) => {
          prev.packages[myPackageNo].itenerary[i] = '';
      
          return({
            ...prev
          })
        })
      };
    }
  };

  return (
    <React.Fragment>
      {nOP > 0 ?
      <div className="row">
        <div className="col-12 col-lg-6">
        <div className="input-group mb-3">
          <div className="input-group-prepend table-info">
            <select name='0.type' onChange={hC}>
              <option value="">Type</option>
              {types.map((t,index) => 
                <option value={t} key={index}>{t}</option>
              )}
            </select>
          </div>
          <input type="text" className="form-control" placeholder="Select or enter the package type" name='0.type' onChange={hC} value={nDD.type} />
        </div>
        </div>
        <div className="col-12 col-lg-6">
        <div className="input-group mb-3">
          <div className="input-group-prepend table-info">
            <select name='0.theme' onChange={hC} disabled>
              <option value="">Theme</option>
              {themes.map((t,index) => 
                <option value={t} key={index}>{t}</option>
              )}
            </select>
          </div>
          <input type="text" className="form-control" placeholder="Select or enter the theme" name='0.theme' onChange={hC} value={nDD.theme} disabled />
        </div>
        </div>
        <div className="col-12 col-lg-6">
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Enter the countries separated by comma(,)" name='0.countries' value={nDD.countries} onChange={hC} />
        </div>
        </div>
        <div className="col-12 col-lg-6">
        <div className="input-group mb-3">
          <div className="input-group-prepend table-info">
            <select name='0.continent' onChange={hC}>
              <option value="">Continent</option>
              {continents.map((t,index) => 
                <option value={t} key={index}>{t}</option>
              )}
            </select>
          </div>
          <input type="text" className="form-control" placeholder="Select or enter the continent" name='0.continent' onChange={hC} value={nDD.continent} />
        </div>
        </div>
      </div>
      : <div></div>
      }
      {nOP > 0 ? nDD.packages.map((pac) =>
        <div className="card shadow mb-4" key={nDD.packages.indexOf(pac)}>
          <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary form-inline">
                <label htmlFor="name">Package Name</label> 
                <input type="text" className="form-control" id="name" name={`${nDD.packages.indexOf(pac)}.name`} onChange={hC} />
              </h6>
          </div>
          <div className="card-body">
            <div className="row align-items-center justify-content-center">

            {/* Overview */}
            <div className="col-12 col-md-8 col-lg-6">
              <div className="card m-2 border-info">
                <div className="row no-gutters">
                <div className="col-md-4">
                  <img src={pac.img !== '' ? URL.createObjectURL(pac.img):pac.img} className="card-img" alt="img" style={{maxWidth: '200px',maxHeight: '200px', display: pac.img === ''?'none':'flex',margin: '50px 0 0 0'}} />
                  <div style={{margin: '25px 0 0 1vw',width: '100%'}}>
                    <input type="file" onChange={hC} name={`${nDD.packages.indexOf(pac)}.img`} />
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h3 className="card-title text-info">Overview</h3>
                    <div className="card-text">
                    <div className="form-group">
                      <label htmlFor="places">Places to visit</label>
                      <textarea type="text" className="form-control" id="places" value={pac.places} onChange={hC} name={`${nDD.packages.indexOf(pac)}.places`} placeholder="Place1-Place2-..."></textarea>
                    </div>
                    <div className="form-group">
                      <label htmlFor="duration">Duration</label>
                      <textarea type="text" className="form-control" id="duration" value={pac.duration} onChange={hC} name={`${nDD.packages.indexOf(pac)}.duration`} placeholder="X Nights-Y Days"></textarea>
                    </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row p-4">
              <div className="input-group mb-3">
                <div className="input-group-prepend table-info">
                  <select name={`${nDD.packages.indexOf(pac)}.pTheme`} onChange={hC}>
                    <option value="">Theme</option>
                    {themes.map((t,index) => 
                      <option value={t} key={index}>{t}</option>
                    )}
                  </select>
                </div>
                <input type="text" className="form-control" placeholder="Select or enter the theme" name={`${nDD.packages.indexOf(pac)}.pTheme`} onChange={hC} value={pac.theme} />
              </div>
              </div>

              </div>
            </div>

            {/* Pricing */}
            <div className="col-12 col-md-8 col-lg-6">
              <div className="card m-2 border-info">
                <div className="card-body">
                  <h3 className="card-title text-info">Package Pricing</h3>
                  <div className="card-text">
                    <div className="form-group">
                      <label htmlFor="pricing">Info</label>
                      <textarea type="text" className="form-control" id="pricing" value={pac.pricing} onChange={hC} rows="6" name={`${nDD.packages.indexOf(pac)}.pricing`} placeholder="Starting from X"></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            </div>

            <div className="row align-items-center justify-content-center">

            {/* IncluExclu */}
            <div className="col-12 col-md-8 col-lg-6">
              <div className="card m-2 border-info">
                <div className="card-body">
                  <h3 className="card-title text-info">Inclusions and Exclusions</h3>
                  <div className="card-text">
                    <div className="form-group">
                      <label htmlFor="inclusion">Inclusions</label>
                      <textarea type="text" className="form-control" id="inclusion" value={pac.inclusion} onChange={hC} rows="5" name={`${nDD.packages.indexOf(pac)}.inclusion`}></textarea>
                    </div>
                    <div className="form-group">
                      <label htmlFor="exclusion">Exclusions</label>
                      <textarea type="text" className="form-control" id="exclusion" value={pac.exclusion} onChange={hC} rows="5" name={`${nDD.packages.indexOf(pac)}.exclusion`}></textarea>
                    </div>
                    <div className="form-group">
                      <label htmlFor="incluexcluTerms">Terms</label>
                      <textarea type="text" className="form-control" id="incluexcluTerms" value={pac.incluexcluTerms} onChange={hC} rows="5" name={`${nDD.packages.indexOf(pac)}.incluexcluTerms`}></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hotels */}
            <div className="col-12 col-md-8 col-lg-6">
              <div className="card m-2 border-info">
                <div className="card-body">
                  <h3 className="card-title text-info">Hotels</h3>
                  <div className="card-text">
                    <div className="form-group">
                      <label htmlFor="convention">Convention</label>
                      <textarea type="text" className="form-control" id="standardHotels" disabled value="<City_1> <Hotel_1> <No. of Nights_1> <Website_1>,
                      <City_2> <Hotel_2> <No. of Nights_2> <Website_2>,
                      ..."> 
                      </textarea>
                    </div>
                    <div className="form-group">
                      <label htmlFor="standardHotels">Standard Hotels</label>
                      <textarea type="text" className="form-control" id="standardHotels" value={pac.standardHotels} onChange={hC} name={`${nDD.packages.indexOf(pac)}.standardHotels`}></textarea>
                    </div>
                    <div className="form-group">
                      <label htmlFor="deluxeHotels">Deluxe Hotels</label>
                      <textarea type="text" className="form-control" id="deluxeHotels" value={pac.deluxeHotels} onChange={hC} name={`${nDD.packages.indexOf(pac)}.deluxeHotels`}></textarea>
                    </div>
                    <div className="form-group">
                      <label htmlFor="superDeluxeHotels">Super Deluxe Hotels</label>
                      <textarea type="text" className="form-control" id="superDeluxeHotels" value={pac.superDeluxeHotels} onChange={hC} name={`${nDD.packages.indexOf(pac)}.superDeluxeHotels`}></textarea>
                    </div>
                    <div className="form-group">
                      <label htmlFor="luxuryHotels">Luxury Hotels</label>
                      <textarea type="text" className="form-control" id="luxuryHotels" value={pac.luxuryHotels} onChange={hC} name={`${nDD.packages.indexOf(pac)}.luxuryHotels`}></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            </div>

            <div className="row align-items-center justify-content-center">

              {/* Itenerary */}
              <div className="col-12 col-md-8 col-lg-6">
                <div className="card m-2 border-info">
                  <div className="card-body">
                    <h3 className="card-title text-info">
                      <label htmlFor="NoOfDays">Itinerary</label> 
                      <input type="text" className="form-control" id="NoOfDays" name={`${nDD.packages.indexOf(pac)}.NoOfDays`} placeholder="Enter number of Days" onChange={hNC} />
                    </h3>
                    <div className="card-text">
                      {pac.itenerary.map((day,index) =>
                        <div className="form-group" key={index}>
                          <label htmlFor={`day${index + 1}`}>Day {index + 1}</label>
                          <textarea type="text" className="form-control" id={`day${index + 1}`} value={day} onChange={hC} name={`${nDD.packages.indexOf(pac)}.itenerary@${index}`} placeholder={`Day ${index + 1}: Heading\nInfo about day ${index + 1}`}></textarea>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="col-12 col-md-8 col-lg-6">
                <div className="card m-2 border-info">
                  <div className="card-body">
                    <h3 className="card-title text-info">Terms and Conditions</h3>
                    <div className="card-text">
                      <div className="form-group">
                        <label htmlFor="terms">Terms</label>
                        <textarea type="text" className="form-control" id="terms" value={pac.terms} onChange={hC} rows="15" name={`${nDD.packages.indexOf(pac)}.terms`}></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
                
            <div className="row align-items-center justify-content-center">

              {/* Pictures */}
              <div className="col-12">
                <div className="card m-2 border-info">
                  <div className="card-body">
                    <h3 className="card-title text-info">Pictures</h3>
                    <div className="card-text">
                      <div className="form-group">
                        Pictures
                        <div className="row">
                          {pac.pictures.map((pic,index) =>
                          <img key={index} 
                          src={pic ? pic.name ? URL.createObjectURL(pic):'/'+pic:''}
                          className="card-img" alt="img" style={{maxWidth: '200px',maxHeight: '200px',margin: '2px'}} />
                          )}
                        </div>
                        <input type="file" onChange={hC} name={`${nDD.packages.indexOf(pac)}.pictures`} multiple />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      ): <div>Create a new Destination</div>}
    </React.Fragment>
  )
};

export default NewDestination;