import React, { useState, useEffect, useRef } from 'react';
import DashboardContent from './DashboardContent';
import { useHistory } from 'react-router-dom';
import './sb-admin-2.min.css';
import useAuth from './useAuth';
import { useToasts } from 'react-toast-notifications';
import axios from 'axios';
import Popular from './Popular';
import Testimonials from './Testimonials';
import Contact from './Contact';
import Images from './Images';
import Slider from './Slider';

function Dashboard() {
  const history = useHistory(); 

  const [mode, setMode] = useState('');
  const [section, setSection] = useState('');
  const [destinations, setDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState('');
  const [destinationDetails, setDestinationDetails] = useState({});

  const [numOfPackages, setNOP] = useState(0);
  const [newDesDetails, setNewDesDetails] = useState({
      name: '',
      type: '',
      theme: '',
      continent: '',
      countries: [],
      packages: []
  });

  const [pacImg, setPacImg] = useState([]);
  const [pacPics, setPacPics] = useState([]);
  
  const [authorise, unauthorise, ProtectedRoutes] = useAuth();

  if(authorise===ProtectedRoutes)
    console.log("")

  const { addToast } = useToasts();

  const handleLogout = () => {
    unauthorise();
    history.push('/');
  };

  const topRef = useRef();

  const scrollToTop = () => {
    topRef.current.scrollIntoView({
        behaviour: 'smooth',
        block: 'start',
    });
  };

  const handleView = (desName) => {
    setSelectedDestination(desName);
    setMode('View');
  };
  const handleEdit = (desName) => {
    setSelectedDestination(desName);
    setMode('Edit');
  };
  const handleDelete = (desName) => {
    setSelectedDestination(desName);
    setMode('Delete');
  };
  const handleNew = () => {
    setSelectedDestination('');
    setMode('New');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const myPackageNo = name.split('.')[0];
    const myName = name.split('.')[1];

    if(mode === 'New') {
      setNewDesDetails((prev) => {

        switch(myName) {
            case 'type': prev.type = value;break;
            case 'theme': prev.theme = value;break;
            case 'continent': prev.continent = value;break;
            case 'countries': 
              let temp = [];
              let result = [];
              temp = value.split(',');
              for(let i=0;i<temp.length;i++) {
                result.push(temp[i].trim());
              }
              prev.countries = result;
              break;
            case 'pTheme': prev.packages[myPackageNo].theme = value;break;
            case 'name': prev.packages[myPackageNo].name = value;break;
            case 'places': prev.packages[myPackageNo].places = value;break;
            case 'img':
            setPacImg((prev) => {
              prev[myPackageNo] = e.target.files[0];
              return({
                ...prev
              })
            }) 
            prev.packages[myPackageNo].img = e.target.files[0];
            break;
            case 'duration': prev.packages[myPackageNo].duration = value;break;
            case 'pricing': prev.packages[myPackageNo].pricing = value;break;
            case 'inclusion': prev.packages[myPackageNo].inclusion = value;break;
            case 'exclusion': prev.packages[myPackageNo].exclusion = value;break;
            case 'incluexcluTerms': prev.packages[myPackageNo].incluexcluTerms = value;break;
            case 'standardHotels': prev.packages[myPackageNo].standardHotels = value;break;
            case 'deluxeHotels': prev.packages[myPackageNo].deluxeHotels = value;break;
            case 'superDeluxeHotels': prev.packages[myPackageNo].superDeluxeHotels = value;break;
            case 'luxuryHotels': prev.packages[myPackageNo].luxuryHotels = value;break;
            case 'terms': prev.packages[myPackageNo].terms = value;break;
            case 'pictures':
            setPacPics((prev) => {
              prev[myPackageNo] = [];
              let newPics = [];
              for(let i=0;i<e.target.files.length;i++) {
                newPics.push([e.target.files[i]]); 
              }
              prev[myPackageNo] = newPics;
              return({
                ...prev
              })
            }) 
            prev.packages[myPackageNo].pictures = [];
            for(let i=0;i<e.target.files.length;i++) {
              prev.packages[myPackageNo].pictures[i] = e.target.files[i];
            }
            break;
            default: const index = myName.split('@')[1];
                        prev.packages[myPackageNo].itenerary[index] = value;
                        break;
        }
    
        return({
            ...prev
        })
      });
    }
    else {
      setDestinationDetails((prev) => {

        switch(myName) {
            case 'type': prev.type = value;break;
            case 'theme': prev.theme = value;break;
            case 'continent': prev.continent = value;break;
            case 'countries': 
              let temp = [];
              let result = [];
              temp = value.split(',');
              for(let i=0;i<temp.length;i++) {
                result.push(temp[i].trim());
              }
              prev.countries = result;
              break;
            case 'pTheme': prev.packages[myPackageNo].theme = value;break;
            case 'name': prev.packages[myPackageNo].name = value;break;
            case 'places': prev.packages[myPackageNo].places = value;break;
            case 'img':
            setPacImg((prev) => {
              prev[myPackageNo] = e.target.files[0];
              return({
                ...prev
              })
            }) 
            prev.packages[myPackageNo].img = e.target.files[0];
            break;
            case 'duration': prev.packages[myPackageNo].duration = value;break;
            case 'pricing': prev.packages[myPackageNo].pricing = value;break;
            case 'inclusion': prev.packages[myPackageNo].inclusion = value;break;
            case 'exclusion': prev.packages[myPackageNo].exclusion = value;break;
            case 'incluexcluTerms': prev.packages[myPackageNo].incluexcluTerms = value;break;
            case 'standardHotels': prev.packages[myPackageNo].standardHotels = value;break;
            case 'deluxeHotels': prev.packages[myPackageNo].deluxeHotels = value;break;
            case 'superDeluxeHotels': prev.packages[myPackageNo].superDeluxeHotels = value;break;
            case 'luxuryHotels': prev.packages[myPackageNo].luxuryHotels = value;break;
            case 'terms': prev.packages[myPackageNo].terms = value;break;
            case 'pictures':
            setPacPics((prev) => {
              prev[myPackageNo] = [];
              let newPics = [];
              for(let i=0;i<e.target.files.length;i++) {
               newPics.push([e.target.files[i]]); 
              }
              prev[myPackageNo] = newPics;
              return({
                ...prev
              })
            }) 
            prev.packages[myPackageNo].pictures = [];
            for(let i=0;i<e.target.files.length;i++) {
              prev.packages[myPackageNo].pictures[i] = e.target.files[i];
            }
            break;
            default: const index = myName.split('@')[1];
                        prev.packages[myPackageNo].itenerary[index] = value;
                        break;
        }
    
        return({
            ...prev
        })
      });
    }
  };

  const handleAddPackage = () => {
    setDestinationDetails((prev) => {

      prev.packages.push({
        deluxeHotels: [],
        duration: '',
        exclusion: '',
        img: '',
        incluexcluTerms: '',
        inclusion: '',
        itenerary: [],
        luxuryHotels: [],
        name: '',
        pictures: [],
        places: '',
        pricing: '',
        standardHotels: [],
        superDeluxeHotels: [],
        terms: '',
        theme: ''
      })

      return({
        ...prev
      })
    });
    setPacImg([...pacImg,'']);
    setPacPics([...pacPics,[]]);
  };

  const handleDeletePackage = (index) => {
    setDestinationDetails((prev) => {
      let newPackages = [];
      for(let i=0;i<prev.packages.length;i++) {
        if(i !== index) {
          newPackages.push(prev.packages[i]);
        }
      }
      prev.packages = newPackages;

      return({
        ...prev
      })
    });
    setPacImg((prev) => {
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
    setPacPics((prev) => {
      let newPacPics = [];
      for(let i=0;i<prev.length;i++) {
        if(i !== index) {
          newPacPics.push(prev[i]);
        }
      }
      prev = newPacPics;
      return({
        ...prev
      })
    });
  };

  const handleSubmit = async () => {
    if(mode === 'Delete') {
      await axios({
        method: 'DELETE',
        url: '/storedData',
        data: {
          destinationName: selectedDestination
        } 
      })
      .then((res) => {
        addToast('Successfully deleted the destination', { appearance: 'success', autoDismiss: true });
      })
      .catch((err) => console.log(err));       
    }
    else if(mode === 'Edit') {
      await axios.put('/storedData',{
        destinationName: selectedDestination,
        type: destinationDetails.type,
        theme: destinationDetails.theme,
        continent: destinationDetails.continent,
        countries: destinationDetails.countries,
        packages: destinationDetails.packages  
      })
      .then(async (res) => {
        for(let i=0;i<destinationDetails.packages.length;i++) {
          if(pacImg[i] !== '') {
            const data = new FormData();
            data.append('destinationName',selectedDestination);
            data.append('index',i);
            if(pacImg[i].name) data.append('file',pacImg[i]);
            else data.append('prevImg',pacImg[i]);
            await axios.post('/imgUpload',data);
          }
        }
        for(let i=0;i<destinationDetails.packages.length;i++) {
          for(let j=0;j<destinationDetails.packages[i].pictures.length;j++) {
            if(pacPics[i] !== []) {
              const data = new FormData();
              data.append('destinationName',selectedDestination);
              data.append('index',i);
              data.append('subIndex',j);
              if(pacPics[i][j][0].name) data.append('file',pacPics[i][j][0]);
              else data.append('prevImg',pacPics[i][j]);
              await axios.post('/picsUpload',data);
            }
          }
        }
        await addToast('Successfully edited the destination details', { appearance: 'success', autoDismiss: true });
      })
      .catch((err) => console.log(err));
    }
    else {
      await axios.post('/storeData',{
        destinationName: selectedDestination,
        type: newDesDetails.type,
        theme: newDesDetails.theme,
        continent: newDesDetails.continent,
        countries: newDesDetails.countries,
        packages: newDesDetails.packages  
      })
      .then(async (res) => {
        if(res.data.info === 'err') {
          addToast(res.data.msg, { appearance:'error', autoDismiss: true });  
        }
        else {
          for(let i=0;i<newDesDetails.packages.length;i++) {
            if(pacImg[i] !== '') {
              const data = new FormData();
              data.append('destinationName',selectedDestination);
              data.append('index',i);
              data.append('file',pacImg[i]);
              await axios.post('/imgUpload',data);
            }
          }
          for(let i=0;i<newDesDetails.packages.length;i++) {
            for(let j=0;j<newDesDetails.packages[i].pictures.length;j++) {
              if(pacPics[i] !== []) {
                const data = new FormData();
                data.append('destinationName',selectedDestination);
                data.append('index',i);
                data.append('subIndex',j);
                if(pacPics[i][j][0].name) data.append('file',pacPics[i][j][0]);
                else data.append('prevImg',pacPics[i][j]);
                await axios.post('/picsUpload',data);
              }
            }
          }
          await addToast(res.data.msg, { appearance:'success', autoDismiss: true });
        }
      })
      .catch((err) => console.log(err));
    }
    setNewDesDetails({
      name: '',
      type: '',
      theme: '',
      continent: '',
      countries: [],
      packages: []
    });
    setDestinationDetails({});
    setSelectedDestination(''); 
    setMode('');
  };

  useEffect(() => {
    if(mode !== 'New' && selectedDestination !== '') {
      const getDestinationDetails = async () => {
        const res = await axios.post('/storedData', {destinationName: selectedDestination});
        setDestinationDetails(res.data);
        let pacPics = [];
        let pacImg = [];
        for(let i=0;i<res.data.packages.length;i++) {
          pacImg.push(res.data.packages[i].img);
          pacPics.push(res.data.packages[i].pictures);
        }
        setPacImg(pacImg);
        setPacPics(pacPics);
      }
      getDestinationDetails();
    }
    else if(selectedDestination === '') {
      setDestinationDetails({});
      setPacImg([]);
      setPacPics([]);
    }
  }, [mode, selectedDestination]);

  useEffect(() => {
    const getDestinations = async () => {
      const res = await axios.get('/allDestinations');
      setDestinations(res.data);
    }
    getDestinations();
  }, [destinationDetails]);

  return (
    <React.Fragment>
    <div id="wrapper">
        <title>Dashboard</title>
        {/* <!-- Sidebar --> */}
        <ul className="navbar-nav bg-primary sidebar sidebar-dark accordion" id="accordionSidebar" style={{marginTop: '0'}}>
        
            <div className="sidebar-brand d-flex align-items-center justify-content-center">
                <div className="sidebar-brand-text mx-3">Admin Panel</div>
            </div>

            {/* <!-- Divider --> */}
            <hr className="sidebar-divider" />

            <div className="sidebar-heading">
                Destinations
            </div>

            {/* <!-- View Destinations --> */}
            <li className="nav-item">
                <a className="nav-link collapsed" href="/" data-toggle="collapse" data-target="#collapse1"
                    aria-expanded="true" aria-controls="collapse1">
                    <i className="fal fa-fw fa-eye"></i>
                    <span>View Details</span>
                </a>
                <div id="collapse1" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Destinations</h6>
                        {destinations.map((des) =>
                            <div className="collapse-item" style={{cursor: 'pointer'}} key={destinations.indexOf(des)} onClick={() => {
                              setSection('')
                              handleView(des.name)
                              }}>
                                {des.name}
                            </div>
                        )}
                    </div>
                </div>
            </li>

            {/* <!-- Edit Destinations --> */}
            <li className="nav-item">
                <a className="nav-link collapsed" href="/" data-toggle="collapse" data-target="#collapse2"
                    aria-expanded="true" aria-controls="collapse2">
                    <i className="fal fa-fw fa-edit"></i>
                    <span>Edit Details</span>
                </a>
                <div id="collapse2" className="collapse" aria-labelledby="headingUtilities"
                    data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Destinations</h6>
                        {destinations.map((des) =>
                            <div className="collapse-item" style={{cursor: 'pointer'}} key={destinations.indexOf(des)} onClick={() => {
                              setSection('')
                              handleEdit(des.name)
                              }}>
                                {des.name}
                            </div>
                        )}
                    </div>
                </div>
            </li>

            {/* <!-- Delete Destination --> */}
            <li className="nav-item">
                <a className="nav-link collapsed" href="/" data-toggle="collapse" data-target="#collapse3"
                    aria-expanded="true" aria-controls="collapse3">
                    <i className="fal fa-fw fa-trash"></i>
                    <span>Delete</span>
                </a>
                <div id="collapse3" className="collapse" aria-labelledby="headingUtilities"
                    data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Destinations</h6>
                        {destinations.map((des) =>
                            <div className="collapse-item" style={{cursor: 'pointer'}} key={destinations.indexOf(des)} onClick={() => {
                              setSection('')
                              handleDelete(des.name)
                              }}>
                                {des.name}
                            </div>
                        )}
                    </div>
                </div>
            </li>

            {/* <!-- New Destinations --> */}
            <li className="nav-item">
                <div className="nav-link" style={{cursor:"pointer"}} onClick={mode !== 'New' ? () => {
                  handleNew()
                  setSection('')
                  } : () => {}}>
                    <i className="fal fa-fw fa-plus-circle"></i>
                    <span>New Destination</span>
                </div>
            </li>

            {/* <!-- Images --> */}
            <li className="nav-item">
                <div className="nav-link" style={{cursor:"pointer"}} onClick={()=> {
                  setSection('images')
                  setMode('')
                  }}>
                    <i className="fal fa-fw fa-edit"></i>
                    <span>Edit Images</span>
                </div>
            </li>

            {/* <!-- Divider --> */}
            <hr className="sidebar-divider" />

            <div className="sidebar-heading">
                Popular
            </div>

            {/* <!-- Popular --> */}
            <li className="nav-item">
                <div className="nav-link" style={{cursor:"pointer"}} onClick={()=> {
                  setSection('popular')
                  setMode('')
                  }}>
                    <i className="fal fa-fw fa-edit"></i>
                    <span>Edit Places</span>
                </div>
            </li>

            {/* <!-- Divider --> */}
            <hr className="sidebar-divider" />

            <div className="sidebar-heading">
                Testimonials
            </div>

            {/* <!-- Testimonials --> */}
            <li className="nav-item">
                <div className="nav-link" style={{cursor:"pointer"}} onClick={() => {
                  setSection('testimonials')
                  setMode('')
                  }}>
                    <i className="fal fa-fw fa-edit"></i>
                    <span>Edit Testimonials</span>
                </div>
            </li>

            {/* <!-- Divider --> */}
            <hr className="sidebar-divider" />

            <div className="sidebar-heading">
                Contact Info
            </div>

            {/* <!-- Testimonials --> */}
            <li className="nav-item">
                <div className="nav-link" style={{cursor:"pointer"}} onClick={() => {
                  setSection('contact')
                  setMode('')
                  }}>
                    <i className="fal fa-fw fa-edit"></i>
                    <span>Edit Info</span>
                </div>
            </li>

            {/* <!-- Divider --> */}
            <hr className="sidebar-divider" />

            <div className="sidebar-heading">
                Slider Images
            </div>

            {/* <!-- Testimonials --> */}
            <li className="nav-item">
                <div className="nav-link" style={{cursor:"pointer"}} onClick={() => {
                  setSection('slider')
                  setMode('')
                  }}>
                    <i className="fal fa-fw fa-edit"></i>
                    <span>Edit Images</span>
                </div>
            </li>

            {/* <!-- Divider --> */}
            <hr className="sidebar-divider mb-auto" />

        </ul>
        <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
                {/* <!-- Topbar --> */}
                <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                    {/* <!-- Topbar Navbar --> */}
                    <ul className="navbar-nav ml-auto" ref={topRef}>
                        <li className="nav-item">
                            <div className="dropdown-item btn" onClick={handleLogout}>
                                <i className="fal fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                Logout
                            </div>
                        </li>
                    </ul>

                </nav>
                {section === '' ?
                <div className="container-fluid">

                    {/* <!-- Page Heading --> */}
                    <div className="d-sm-flex align-items-center justify-content-between mb-4">
                        <div className="h3 mb-0 text-gray-800">
                            {selectedDestination !== '' ? selectedDestination : mode === 'New' ? "New Destination":"Dashboard"}
                        </div>
                        <button type="button" className="btn btn-info" style={{color: '#fff', display: selectedDestination !== '' && mode === 'Edit' ? "flex":"none"}} onClick={() => {
                          handleAddPackage();
                          addToast('Successfully added a package. Confirm Edit to save the changes!', { appearance: 'success', autoDismiss: true });
                        }}>
                            Add a package
                        </button>
                        <button type="button" className="btn btn-outline-success" style={{backgroundColor: '#4e73df', color: '#fff', display: selectedDestination !== '' && mode !== 'View' ? "flex" : mode === "New" ? "flex":"none"}} onClick={handleSubmit}>
                            Confirm {mode === 'New' ? 'Submit':mode}
                        </button>
                    </div>

                    <div className="row">
                        <div className="col-12 mb-4">
                            {/* <!-- Content --> */}
                            <DashboardContent 
                                mode={mode} 
                                desName={selectedDestination} 
                                sSD={setSelectedDestination}
                                details={destinationDetails}
                                sDD={setDestinationDetails}
                                hC={handleChange}
                                nOP={numOfPackages}
                                sNOP={setNOP}
                                nDD={newDesDetails}
                                sNDD={setNewDesDetails}
                                hDP={handleDeletePackage}
                                sPI={setPacImg}
                                sPP={setPacPics}
                            />
                            {/* <!--  --> */}
                        </div>
                    </div>
                </div>
              :
              section === 'popular' ?
              <Popular
                section={section}
                sS={setSection}
                sM={setMode}
              />
              :
              section === 'contact' ?
              <Contact
                section={section}
                sS={setSection}
                sM={setMode}
              />
              :
              section === 'slider' ?
              <Slider
                section={section}
                sS={setSection}
                sM={setMode}
              />
              :
              section === 'images' ?
              <Images
                section={section}
                sS={setSection}
                sM={setMode}
              />
              :
              <Testimonials
                section={section}
                sS={setSection}
                sM={setMode}
              />
              }
            </div>
            

            {/* <!-- Footer --> */}
            <footer className="sticky-footer bg-white">
                <div className="container my-auto">
                    <div className="copyright text-center my-auto">
                        <span>Copyright 2020 &copy; Pearl Travels. All rights reserved</span>
                    </div>
                </div>
            </footer>
        </div>
    </div>
    {/* <!-- Scroll to Top Button--> */}
    <a className="scroll-to-top rounded d-block" onClick={scrollToTop} style={{left: "1rem"}}>
        <i className="fal fa-angle-up"></i>
    </a>
    </React.Fragment>
  )
};

export default Dashboard;