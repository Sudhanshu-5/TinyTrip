import React, { useState, useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';
import axios from 'axios';

function Slider(props) {
  const { section, sS, sM } = props;

  const [sliders, setSliders] = useState({});

  const { addToast } = useToasts();

  useEffect(() => {
    sM('');
    const getInfo = async () => {
      const myRes = await axios.get('/sliderImgs');
      setSliders(myRes.data);
    }
    getInfo();
  }, [section])

  const handleChange = (e) => {
    const { name } = e.target;

    setSliders({...sliders,[name]: e.target.files[0]});
  };

  const handleSubmit = async () => {
    if(sliders.s1 && sliders.s1 !== '') {
      const data = new FormData();
      data.append('index',1);
      if(sliders.s1.name) data.append('file',sliders.s1);
      else data.append('prevImg',sliders.s1);
      await axios.post('/sliderImgs',data);
    }
    if(sliders.s2 && sliders.s2 !== '') {
      const data = new FormData();
      data.append('index',2);
      if(sliders.s2.name) data.append('file',sliders.s2);
      else data.append('prevImg',sliders.s2);
      await axios.post('/sliderImgs',data);
    }
    if(sliders.s3 && sliders.s3 !== '') {
      const data = new FormData();
      data.append('index',3);
      if(sliders.s3.name) data.append('file',sliders.s3);
      else data.append('prevImg',sliders.s3);
      await axios.post('/sliderImgs',data);
    }
    if(sliders.s4 && sliders.s4 !== '') {
      const data = new FormData();
      data.append('index',4);
      if(sliders.s4.name) data.append('file',sliders.s4);
      else data.append('prevImg',sliders.s4);
      await axios.post('/sliderImgs',data);
    }
    if(sliders.s5 && sliders.s5 !== '') {
      const data = new FormData();
      data.append('index',5);
      if(sliders.s5.name) data.append('file',sliders.s5);
      else data.append('prevImg',sliders.s5);
      await axios.post('/sliderImgs',data);
    }
    if(sliders.h1 && sliders.h1 !== '') {
      const data = new FormData();
      data.append('index',0);
      if(sliders.h1.name) data.append('file',sliders.h1);
      else data.append('prevImg',sliders.h1);
      await axios.post('/sliderImgs',data);
    }
    await addToast("Details Updated Successfully", { appearance:'success', autoDismiss: true });
    sS('');
  };

  return(
    <div className="container-fluid">
      <div className="row align-items-center justify-content-start ml-2 my-4">
        <div className="h3 text-gray-800 mr-auto">
            Edit the Images for Sliders
        </div>
        <button type="button" className="btn btn-outline-success" style={{backgroundColor: '#4e73df', color: '#fff', display: "flex"}} onClick={handleSubmit}>
          Confirm Edit
        </button>
      </div>
     
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-4 px-4 border-around">
          <div className="mt-3" style={{textAlign: 'center'}}>
            <h6>Slider Image 1</h6>
            <img 
              src={sliders.s1 ? sliders.s1 !== '' ? sliders.s1.name ? URL.createObjectURL(sliders.s1) : 'http://pearltravels.in/'+sliders.s1 : sliders.s1 : ''}
              className="card-img" alt="img" style={{maxWidth: '200px',maxHeight: '200px', display: sliders.s1 ? sliders.s1 === ''?'none':'flex':'none',margin: '5px 0 0 0'}} />
              <div style={{margin: '25px 0 0 1vw',width: '100%'}}>
                <input type="file" onChange={handleChange} name="s1" />
              </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4 px-4 border-around">
          <div className="mt-3" style={{textAlign: 'center'}}>
            <h6>Slider Image 2</h6>
            <img 
              src={sliders.s2 ? sliders.s2 !== '' ? sliders.s2.name ? URL.createObjectURL(sliders.s2) : 'http://pearltravels.in/'+sliders.s2 : sliders.s2 : ''}
              className="card-img" alt="img" style={{maxWidth: '200px',maxHeight: '200px', display: sliders.s2 ? sliders.s2 === ''?'none':'flex':'none',margin: '5px 0 0 0'}} />
              <div style={{margin: '25px 0 0 1vw',width: '100%'}}>
                <input type="file" onChange={handleChange} name="s2" />
              </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4 px-4 border-around">
          <div className="mt-3" style={{textAlign: 'center'}}>
            <h6>Slider Image 3</h6>
            <img 
              src={sliders.s3 ? sliders.s3 !== '' ? sliders.s3.name ? URL.createObjectURL(sliders.s3) : 'http://pearltravels.in/'+sliders.s3 : sliders.s3 : ''}
              className="card-img" alt="img" style={{maxWidth: '200px',maxHeight: '200px', display: sliders.s3 ? sliders.s3 === ''?'none':'flex':'none',margin: '5px 0 0 0'}} />
              <div style={{margin: '25px 0 0 1vw',width: '100%'}}>
                <input type="file" onChange={handleChange} name="s3" />
              </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4 px-4 border-around">
          <div className="mt-3" style={{textAlign: 'center'}}>
            <h6>Slider Image 4</h6>
            <img 
              src={sliders.s4 ? sliders.s4 !== '' ? sliders.s4.name ? URL.createObjectURL(sliders.s4) : 'http://pearltravels.in/'+sliders.s4 : sliders.s4 : ''}
              className="card-img" alt="img" style={{maxWidth: '200px',maxHeight: '200px', display: sliders.s4 ? sliders.s4 === ''?'none':'flex':'none',margin: '5px 0 0 0'}} />
              <div style={{margin: '25px 0 0 1vw',width: '100%'}}>
                <input type="file" onChange={handleChange} name="s4" />
              </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4 px-4 border-around">
          <div className="mt-3" style={{textAlign: 'center'}}>
            <h6>Slider Image 5</h6>
            <img 
              src={sliders.s5 ? sliders.s5 !== '' ? sliders.s5.name ? URL.createObjectURL(sliders.s5) : 'http://pearltravels.in/'+sliders.s5 : sliders.s5 : ''}
              className="card-img" alt="img" style={{maxWidth: '200px',maxHeight: '200px', display: sliders.s5 ? sliders.s5 === ''?'none':'flex':'none',margin: '5px 0 0 0'}} />
              <div style={{margin: '25px 0 0 1vw',width: '100%'}}>
                <input type="file" onChange={handleChange} name="s5" />
              </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4 px-4 border-around">
          <div className="mt-3" style={{textAlign: 'center'}}>
            <h6>Header Image</h6>
            <img 
              src={sliders.h1 ? sliders.h1 !== '' ? sliders.h1.name ? URL.createObjectURL(sliders.h1) : 'http://pearltravels.in/'+sliders.h1 : sliders.h1 : ''}
              className="card-img" alt="img" style={{maxWidth: '200px',maxHeight: '200px', display: sliders.h1 ? sliders.h1 === ''?'none':'flex':'none',margin: '5px 0 0 0'}} />
              <div style={{margin: '25px 0 0 1vw',width: '100%'}}>
                <input type="file" onChange={handleChange} name="h1" />
              </div>
          </div>
        </div>
      </div>

    </div>
  )
};

export default Slider;