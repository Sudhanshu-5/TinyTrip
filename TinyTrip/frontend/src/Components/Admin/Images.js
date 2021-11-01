import React, { useState, useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';
import axios from 'axios';

function Images(props) {
  const { section, sS, sM } = props;

  const [themes, setThemes] = useState([]);
  const [types, setTypes] = useState([]);
  const [dest, setDest] = useState([]);

  const { addToast } = useToasts();

  useEffect(() => {
    sM('');
    const getInfo = async () => {
      const resThemes = await axios.get('/allThemes');
      const resTypes = await axios.get('/allTypes');
      const res = await axios.get('/allDestinations');
      let allThemes = [];
      let allTypes = [];
      let finalThemes = [];
      let finalTypes = [];
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
      const uniThemesSet = new Set(allThemes);
      const uniTypesSet = new Set(allTypes);
      const onceThemes = Array.from(uniThemesSet);
      const onceTypes = Array.from(uniTypesSet);
      for(let i=0;i<onceThemes.length;i++) {
        for(let j=0;j<resThemes.data.length;j++) {
          if(onceThemes[i] === resThemes.data[j].data) {
            finalThemes.push(resThemes.data[j]);
            break;
          }
        }
      }
      for(let i=0;i<onceTypes.length;i++) {
        for(let j=0;j<resTypes.data.length;j++) {
          if(onceTypes[i] === resTypes.data[j].data) {
            finalTypes.push(resTypes.data[j]);
            break;
          }
        }
      }
      setThemes(finalThemes);
      setTypes(finalTypes);
      setDest(res.data);
    }
    getInfo();
  }, [section])

  const handleChange = (e) => {
    const { name } = e.target;
    const myNo = name.split('.')[0];
    const myName = name.split('.')[1];

    switch(myName) {
      case 'theme': 
      setThemes((prev) => {
        prev[myNo].img = e.target.files[0];
        return([
          ...prev
        ])
      })
      break;
      case 'type':
      setTypes((prev) => {
        prev[myNo].img = e.target.files[0];
        return([
          ...prev
        ])
      })
      break;
      case 'dest':
      setDest((prev) => {
        prev[myNo].img = e.target.files[0];
        return([
          ...prev
        ])
      })
      break;
      default:break;
    }
  };

  const handleSubmit = async () => {
    for(let i=0;i<themes.length;i++) {
      if(themes[i].img !== '') {
        const data = new FormData();
        data.append('field','theme');
        data.append('name',themes[i].data);
        if(themes[i].img.name) data.append('file',themes[i].img);
        else data.append('prevImg',themes[i].img);
        await axios.post('/editImages',data);
      }
    }
    for(let i=0;i<types.length;i++) {
      if(types[i].img !== '') {
        const data = new FormData();
        data.append('field','type');
        data.append('name',types[i].data);
        if(types[i].img.name) data.append('file',types[i].img);
        else data.append('prevImg',types[i].img);
        await axios.post('/editImages',data);
      }
    }
    for(let i=0;i<dest.length;i++) {
      if(dest[i].img !== '') {
        const data = new FormData();
        data.append('field','dest');
        data.append('name',dest[i].name);
        if(dest[i].img.name) data.append('file',dest[i].img);
        else data.append('prevImg',dest[i].img);
        await axios.post('/editImages',data);
      }
    }
    await addToast("Details Updated Successfully", { appearance:'success', autoDismiss: true });
    sS('');
  };

  return(
    <div className="container-fluid">
      <div className="row align-items-center justify-content-start ml-2 my-4">
        <div className="h3 text-gray-800 mr-auto">
            Edit the Images for Themes/Types/Destinations
        </div>
        <button type="button" className="btn btn-outline-success" style={{backgroundColor: '#4e73df', color: '#fff', display: "flex"}} onClick={handleSubmit}>
          Confirm Edit
        </button>
      </div>
     
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-4 px-4 border-around">
            <h6 className="b-heading">Themes</h6>
            {themes.map((theme,index) =>
              <div className="mt-3" key={index} style={{textAlign: 'center'}}>
                <h6>{theme.data}</h6>
                <img 
                  src={theme.img !== '' ? theme.img.name ? URL.createObjectURL(theme.img):'http://pearltravels.in/'+theme.img:theme.img}
                  className="card-img" alt="img" style={{maxWidth: '200px',maxHeight: '200px', display: theme.img === ''?'none':'flex',margin: '5px 0 0 0'}} />
                  <div style={{margin: '25px 0 0 1vw',width: '100%'}}>
                    <input type="file" onChange={handleChange} name={`${index}.theme`} />
                  </div>
              </div>
            )}
          </div>

          <div className="col-12 col-md-6 col-lg-4 px-4 border-around">
          <h6 className="b-heading">Types</h6>
          {types.map((type,index) =>
            <div className="mt-3" key={index} style={{textAlign: 'center'}}>
              <h6>{type.data}</h6>
              <img 
                src={type.img !== '' ? type.img.name ? URL.createObjectURL(type.img):'http://pearltravels.in/'+type.img:type.img}
                className="card-img" alt="img" style={{maxWidth: '200px',maxHeight: '200px', display: type.img === ''?'none':'flex',margin: '5px 0 0 0'}} />
                <div style={{margin: '25px 0 0 1vw',width: '100%'}}>
                  <input type="file" onChange={handleChange} name={`${index}.type`} />
                </div>
            </div>
          )}
        </div>

        <div className="col-12 col-md-6 col-lg-4 px-4 border-around">
          <h6 className="b-heading">Destinations</h6>
          {dest.map((dest,index) =>
            <div className="mt-3" key={index} style={{textAlign: 'center'}}>
              <h6>{dest.name}</h6>
              <img 
                src={dest.img !== '' ? dest.img.name ? URL.createObjectURL(dest.img):'http://pearltravels.in/'+dest.img:dest.img}
                className="card-img" alt="img" style={{maxWidth: '200px',maxHeight: '200px', display: dest.img === ''?'none':'flex',margin: '5px 0 0 0'}} />
                <div style={{margin: '25px 0 0 1vw',width: '100%'}}>
                  <input type="file" onChange={handleChange} name={`${index}.dest`} />
                </div>
            </div>
          )}
        </div>

      </div>

    </div>
  )
};

export default Images;