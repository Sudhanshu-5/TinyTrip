import React, { useState, useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';
import axios from 'axios';

function Testimonials(props) {
  const { section, sS, sM } = props;
  
  const [testimonials, setTestimonials] = useState([]);
  const [testimonialImg, setTestimonialImg] = useState([]);

  const { addToast } = useToasts();

  useEffect(() => {
    sM('');
    const getTestimonials = async () => {
      const res = await axios.get('/editTestimonials');
      if(res.data.length > 0) {
        setTestimonials(res.data);
        let testimonialImg = [];
        for(let i=0;i<res.data.length;i++) {
          testimonialImg.push(res.data[i].img);
        }
        setTestimonialImg(testimonialImg);
      }
      else {
        setTestimonials([{
          name: '',
          info: '',
          msg: '',
          img: '',
        }])
      }
    }
    getTestimonials();
  }, [section])

  const handleAddTestimonial = () => {
    setTestimonials([...testimonials, {
      name: '',
      info: '',
      msg: '',
      img: '',
    }]);
    setTestimonialImg([...testimonialImg, '']);
  };

  const handleDeleteTestimonial = (index) => {
    setTestimonials((prev) => {
      let newTestimonials = [];
      for(let i=0;i<prev.length;i++) {
        if(i !== index) {
          newTestimonials.push(prev[i]);
        }
      }
      prev = newTestimonials;

      return([
        ...prev
      ])
    });
    setTestimonialImg((prev) => {
      let newImg = [];
      for(let i=0;i<prev.length;i++) {
        if(i !== index) {
          newImg.push(prev[i]);
        }
      }
      prev = newImg;
      return({
        ...prev
      })
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const myTestimonialNo = name.split('.')[0];
    const myName = name.split('.')[1];

    setTestimonials((prev) => {

      switch(myName) {
        case 'name': prev[myTestimonialNo].name = value;break;
        case 'info': prev[myTestimonialNo].info = value;break;
        case 'msg': prev[myTestimonialNo].msg = value;break;
        case 'img':
        setTestimonialImg((prev) => {
          prev[myTestimonialNo] = e.target.files[0];
          return({
            ...prev
          })
        })
        prev[myTestimonialNo].img = e.target.files[0];
        break;
        default:break; //modified
      }

      return([
        ...prev
      ])
    })

  };

  const handleSubmit = async () => {
    await axios.post('/editTestimonials',{
        details: testimonials
      })
      .then(async (res) => {
        for(let i=0;i<testimonials.length;i++) {
          if(testimonialImg[i] !== '') {
            const data = new FormData();
            data.append('index',i);
            if(testimonialImg[i].name) data.append('file',testimonialImg[i]);
            else data.append('prevImg',testimonialImg[i]);
            await axios.post('/testimonialsImgUpload',data);
          }
        }
        await addToast('Successfully edited the Testimonials', { appearance: 'success', autoDismiss: true });
      })
      .catch((err) => console.log(err));
      sS('');
  };

  return(
    <div className="container-fluid">
      {/* <!-- Page Heading --> */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <div className="h3 mb-0 text-gray-800">
          Edit Testimonials
        </div>
        <button type="button" className="btn btn-info" style={{color: '#fff', display: "flex"}} onClick={() => {
          handleAddTestimonial();
          addToast('Successfully added a testimonial. Confirm Edit to save the changes!', { appearance: 'success', autoDismiss: true });
        }}>
            Add a testimonial
        </button>
        <button type="button" className="btn btn-outline-success" style={{backgroundColor: '#4e73df', color: '#fff', display: "flex"}} 
        onClick={handleSubmit}
        >
            Confirm Edit
        </button>
      </div>
      <div className="row mb-4">
      {testimonials.map((testimonial,index) => 
      <div className="col-12 col-xl-6" key={index}>
      <div className="card shadow mb-4">
          <div className="card-header py-3">
            <div className="row">
              <div className="col-12 col-md-6">
              <h6 className="m-0 font-weight-bold text-primary form-inline">
                <label htmlFor="name">Name</label> 
                <input type="text" className="form-control" id="name"
                 name={`${index}.name`} 
                 onChange={handleChange} value={testimonial.name} 
                 />
              </h6>
              </div>
              <div className="col-12 col-md-6">
                <button type="button" className="btn btn-info ml-auto" style={{color: '#fff', display: "flex"}} 
                onClick={() => {
                  handleDeleteTestimonial(index)
                  addToast('Successfully deleted the testimonial. Confirm Edit to save the changes!', { appearance: 'success', autoDismiss: true });
                  }}
                  >
                  Delete
                </button>
              </div>
            </div>
          </div>

          <div className="card-body">
            <div className="row align-items-center justify-content-center">

            <div className="col-12">
              <div className="card m-2 border-info">
                <div className="row no-gutters">
                <div className="col-md-4">
                  <img 
                  src={testimonial.img !== '' ? testimonial.img.name ? URL.createObjectURL(testimonial.img):'http://pearltravels.in/'+testimonial.img:testimonial.img}
                  className="card-img" alt="img" style={{maxWidth: '200px',maxHeight: '200px', display: testimonial.img === ''?'none':'flex'}} 
                  />
                  <div style={{margin: '25px 0 0 1vw',width: '100%'}}>
                    <input type="file" 
                    onChange={handleChange} name={`${index}.img`} 
                    />
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h3 className="card-title text-info">Overview</h3>
                    <div className="card-text">
                    <div className="form-group">
                      <label htmlFor="places">Info</label>
                      <textarea type="text" className="form-control" id="places" 
                      value={testimonial.info} onChange={handleChange} name={`${index}.info`}
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label htmlFor="duration">Message</label>
                      <textarea type="text" className="form-control" id="duration" 
                      value={testimonial.msg} onChange={handleChange} name={`${index}.msg`}
                      ></textarea>
                    </div>
                   </div>
                  </div>
                </div>
              </div>
              </div>
            </div>

            </div>
          </div>
          </div>
        </div>
        )}
      </div>
    </div>
  )
};

export default Testimonials;