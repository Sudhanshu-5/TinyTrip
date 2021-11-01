import React, { useState, useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';
import axios from 'axios';

function Contact(props) {
  const { section, sS, sM } = props;

  const [info, setInfo] = useState({});

  const { addToast } = useToasts();

  useEffect(() => {
    sM('');
    const getInfo = async () => {
      const res = await axios.get('/contactInfo');
      setInfo(res.data);
    }
    getInfo();
  }, [section])

  const handleChange = (e) => {
    const { id, value } = e.target;
    setInfo({...info, [id]: value});
  };

  const handleSubmit = async () => {
    await axios.post('/contactInfo',{info})
    .then(async (res) => {
      await addToast("Details Updated Successfully", { appearance:'success', autoDismiss: true });
    })
    .catch((err) => console.log(err));
    sS('');
  };

  return(
    <div className="container-fluid">
      <div className="row align-items-center justify-content-start ml-2 my-4">
        <div className="h3 text-gray-800 mr-auto">
            Edit the Contact Details
        </div>
        <button type="button" className="btn btn-outline-success" style={{backgroundColor: '#4e73df', color: '#fff', display: "flex"}} onClick={handleSubmit}>
          Confirm Edit
        </button>
      </div>
      <div className="row justify-content-center align-items-center">
        <div className="card shadow mb-4 px-5 py-4 text-info border-info">
          <div className="form-group">
            <label htmlFor="callNo">Phone Number</label>
            <input type="text" className="form-control" id="callNo" value={info.callNo} onChange={handleChange} placeholder="CountryCodeYourNumber" />
          </div>
          <div className="form-group">
            <label htmlFor="callNo">WhatsApp Number</label>
            <input type="text" className="form-control" id="wpNo" value={info.wpNo} onChange={handleChange} placeholder="CountryCodeYourNumber" />
          </div>
          <div className="form-group">
            <label htmlFor="callNo">Email Adress</label>
            <input type="email" className="form-control" id="email" value={info.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="callNo">Facebook</label>
            <input type="text" className="form-control" id="fb" value={info.fb} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="callNo">Twitter</label>
            <input type="text" className="form-control" id="twit" value={info.twit} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="insta">Instagram</label>
            <input type="text" className="form-control" id="insta" value={info.insta} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="YT">YouTube</label>
            <input type="text" className="form-control" id="YT" value={info.YT} onChange={handleChange} />
          </div>
        </div>
      </div>
    </div>
  )
};

export default Contact;