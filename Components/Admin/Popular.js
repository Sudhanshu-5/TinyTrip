import React, { useState, useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';
import axios from 'axios';

function Popular(props) {
  const { section, sS, sM } = props;

  const [themes, setThemes] = useState([]);
  const [types, setTypes] = useState([]);
  const [destinations, setDestinations] = useState([]);

  const [pThemes, setPThemes] = useState([]);
  const [pTypes, setPTypes] = useState([]);
  const [pDestinations, setPDestinations] = useState([]);

  const { addToast } = useToasts();

  useEffect(() => {
    sM('');
    const getThemesAndTypes = async () => {
      const resThemes = await axios.get('/allThemes');
      const resTypes = await axios.get('/allPackages');
      const res = await axios.get('/allDestinations');
      const resP = await axios.get('/popular');
      let allThemes = [];
      let allTypes = [];
      let pThemesRes = [];
      let pTypesRes = [];
      let pDestinationsRes = [];
      for(let i=0;i<resThemes.data.length;i++) {
        if(resThemes.data[i].data.trim() !== '') {
          allThemes.push(resThemes.data[i].data);
        }
      }
      for(let i=0;i<resTypes.data.length;i++) {
        if(resTypes.data[i].name.trim() !== '') {
          allTypes.push(resTypes.data[i]);
        }
      }
      for(let i=0;i<resP.data.popularThemes.length;i++) {
        pThemesRes.push(resP.data.popularThemes[i].data);
      }
      for(let i=0;i<resP.data.popularTypes.length;i++) {
        pTypesRes.push(resP.data.popularTypes[i].name);
      }
      for(let i=0;i<resP.data.popularDestinations.length;i++) {
        pDestinationsRes.push(resP.data.popularDestinations[i].name);
      }
      const uniThemesSet = new Set(allThemes);
      setThemes(Array.from(uniThemesSet));
      setTypes(allTypes);
      setDestinations(res.data);
      setPThemes(pThemesRes);
      setPTypes(pTypesRes);
      setPDestinations(pDestinationsRes);
    }
    getThemesAndTypes();
  }, [section])

  const handleSubmit = async () => {
    await axios.post('/popular',{
      popularThemes: pThemes,
      popularTypes: pTypes,
      popularDestinationNames: pDestinations
    })
    .then(async (res) => {
      await addToast("Details Updated Successfully", { appearance:'success', autoDismiss: true });
    })
    .catch((err) => console.log(err));
    sS('');
  };

  return(
    <div className="container-fluid">
      <div className="row align-items-center justify-content-start my-4">
        <div className="h3 text-gray-800 mr-auto">
            Select the Themes/Types/Places needed as "Popular"
        </div>
        <button type="button" className="btn btn-outline-success" style={{backgroundColor: '#4e73df', color: '#fff', display: "flex"}} onClick={handleSubmit}>
          Confirm Edit
        </button>
      </div>
      <div className="row">
        <div className="col-12 col-md-6 col-lg-2 px-4 border-around">
          <h6 className="b-heading">All Themes</h6>
          {themes.map((theme,index) =>
            <div className="form-check mt-3" key={index}>
              <input className="form-check-input" type="checkbox" value="" id={`themes.${index}`} onChange={(e) => {
                if(e.target.checked) {
                  let newPThemes = [];
                  for(let i=0;i<pThemes.length;i++) {
                    if(pThemes[i] !== theme) newPThemes.push(pThemes[i]);
                  }
                  newPThemes.push(theme)
                  setPThemes(newPThemes);
                }
                else {
                  let newPThemes = [];
                  for(let i=0;i<pThemes.length;i++) {
                    if(pThemes[i] !== theme) newPThemes.push(pThemes[i]);
                  }
                  setPThemes(newPThemes);
                }
              }}
              />
              <label className="form-check-label" htmlFor={`themes.${index}`}>
                {theme}
              </label>
            </div>
          )}
        </div>
        <div className="col-12 col-md-6 col-lg-2 px-4 border-around">
          <h6 className="b-heading">Selected</h6>
          {pThemes.map((pTheme,index) => 
            <div key={index} style={{marginTop: '1.3rem',cursor: 'pointer'}}>
              <h6 onClick={() => {
                let newPThemes = [];
                for(let i=0;i<pThemes.length;i++) {
                  if(pThemes[i] !== pTheme) newPThemes.push(pThemes[i]);
                }
                setPThemes(newPThemes);
              }}>{pTheme}</h6>
            </div>
          )}
        </div>
        
        <div className="col-12 col-md-6 col-lg-2 px-4 border-around">
          <h6 className="b-heading">All Places</h6>
          {types.map((type,index) =>
            <div className="form-check mt-3" key={index}>
              <input className="form-check-input" type="checkbox" value="" id={`types.${index}`} onChange={(e) => {
                if(e.target.checked) {
                  let newPTypes = [];
                  for(let i=0;i<pTypes.length;i++) {
                    if(pTypes[i] !== type.name) newPTypes.push(pTypes[i]);
                  }
                  newPTypes.push(type.name)
                  setPTypes(newPTypes);
                }
                else {
                  let newPTypes = [];
                  for(let i=0;i<pTypes.length;i++) {
                    if(pTypes[i] !== type.name) newPTypes.push(pTypes[i]);
                  }
                  setPTypes(newPTypes);
                }
              }} />
              <label className="form-check-label" htmlFor={`types.${index}`}>
                {type.name}
              </label>
            </div>
          )}
        </div>
        <div className="col-12 col-md-6 col-lg-2 px-4 border-around">
          <h6 className="b-heading">Selected</h6>
          {pTypes.map((pType,index) => 
            <div key={index} style={{marginTop: '1.3rem',cursor: 'pointer'}}>
              <h6 onClick={() => {
                let newPTypes = [];
                for(let i=0;i<pTypes.length;i++) {
                  if(pTypes[i] !== pType) newPTypes.push(pTypes[i]);
                }
                setPTypes(newPTypes);
              }}>{pType}</h6>
            </div>
          )}
        </div>

        <div className="col-12 col-md-6 col-lg-2 px-4 border-around">
          <h6 className="b-heading">All Destinations</h6>
          {destinations.map((destination,index) =>
            <div className="form-check mt-3" key={index}>
              <input className="form-check-input" type="checkbox" value="" id={`destinations.${index}`} onChange={(e) => {
                if(e.target.checked) {
                  let newPDestinations = [];
                  for(let i=0;i<pDestinations.length;i++) {
                    if(pDestinations[i] !== destination.name) newPDestinations.push(pDestinations[i]);
                  }
                  newPDestinations.push(destination.name)
                  setPDestinations(newPDestinations);
                }
                else {
                  let newPDestinations = [];
                  for(let i=0;i<pDestinations.length;i++) {
                    if(pDestinations[i] !== destination.name) newPDestinations.push(pDestinations[i]);
                  }
                  setPDestinations(newPDestinations);
                }
              }} />
              <label className="form-check-label" htmlFor={`destinations.${index}`}>
                {destination.name}
              </label>
            </div>
          )}
        </div>
        <div className="col-12 col-md-6 col-lg-2 px-4 border-around">
          <h6 className="b-heading">Selected</h6>
          {pDestinations.map((pDestination,index) => 
            <div key={index} style={{marginTop: '1.3rem',cursor: 'pointer'}}>
              <h6 onClick={() => {
                let newPDestinations = [];
                for(let i=0;i<pDestinations.length;i++) {
                  if(pDestinations[i] !== pDestination) newPDestinations.push(pDestinations[i]);
                }
                setPDestinations(newPDestinations);
              }}>{pDestination}</h6>
            </div>
          )}
        </div>
      </div>
    </div>
  )
};

export default Popular;