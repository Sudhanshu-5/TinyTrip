import React, {useState,useEffect} from 'react';
import axios from 'axios';

function Wp() {

  const [state,setState] = useState({});

  useEffect(() => {
    const getData = async () => {
        const resDes = await axios.get('/contactInfo');
        setState(resDes.data);
      }
      getData();
  }, [])

  return (
    <div>
      {/* whatsapp msg */}
      <div className="fixed-top">
          <img className="img-fluid img-wp" src={require('../../assets/svg/whatsapp.svg')} data-toggle="modal" data-target="#exampleModal" alt="wp" style={{position: "absolute",width: "57px",height: "57px",borderRadius: "50%",marginLeft: "14px",zIndex: "99"}} />
      </div>
      {/* Modal */}
      <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{maxWidth: "fit-content",margin: "57vh 0 0 14px"}}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header text-white" style={{backgroundColor: "#dc3545"}}>
              <h5 className="modal-title" id="exampleModalLabel">Contact Me</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body" style={{maxHeight: "100px"}}>
              <form action={`https://wa.me/+${state.wpNo}/`} target="_blank">
                <textarea placeholder="Your Message" name="text"></textarea>
                <button type="submit" className="btn mb-5" style={{width: '50px'}}>
                  <img className="img-fluid img-wp" src={require("../../assets/img/send.png")} alt="send" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Wp;