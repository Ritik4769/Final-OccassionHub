// import './allservices.css';
// import { useState, useEffect } from 'react';
// import img from "../../images/Caterer.jpg"
// import jscookie from 'js-cookie';
// import { caterre_requestUrl, venue_requestUrl, decoration_requestUrl, dj_requestUrl } from '../../urls.js';
// import axios from 'axios';
// import ChooseServicesModal from './ChooseServicesModal';

// function AllServices() {
//     const [activeTab, setActiveTab] = useState('active');
//     const [catrersDetails, setcatrersDetails] = useState([]);
//     const [venuDetails, venuDetailsDetails] = useState([]);
//     const [decorationDetails, setDecorationDetails] = useState([]);
//     const [djDetails, setDjDetails] = useState([]);
//     const [isBookNowModalOpen, setBookNowModalOpen] = useState(false);


//     const handleTabClick = (tab) => {
//         setActiveTab(tab);
//     };

//     const userEmail = jscookie.get("user");
//     useEffect(() => {
//         try {
//             var result = axios.post(caterre_requestUrl + "/searchServices")
//                 .then(response => {
//                     setcatrersDetails(response.data.catererDetails);
//                 })
//                 .catch(err => {
//                     console.log("Error in catrers Details data ", err);
//                 });

//             console.log("result on caters page ", result);
//         } catch (err) {
//             console.log("Error in  catrersDetails data ", err);
//         }

//         try {
//             var result = axios.post(venue_requestUrl + "/searchServices")
//                 .then(response => {
//                     venuDetailsDetails(response.data.venuDetails);
//                 })
//                 .catch(err => {
//                     console.log("Error in venu Details data ", err);
//                 });
//             console.log("result on venu ", result);
//         } catch (err) {
//             console.log("Error in  venu data ", err);
//         }

//         try {
//             var result = axios.get(decoration_requestUrl + "/searchServices")
//                 .then(response => {
//                     setDecorationDetails(response.data.decorationDetails);
//                 })
//                 .catch(err => {
//                     console.log("Error in venu Details data ", err);
//                 });
//             console.log("result on venu ", result);
//         } catch (err) {
//             console.log("Error in  venu data ", err);
//         }

//         try {
//             var result = axios.get(dj_requestUrl + "/searchServices")
//                 .then(response => {
//                     setDjDetails(response.data.djDetails);
//                 })
//                 .catch(err => {
//                     console.log("Error in venu Details data ", err);
//                 });
//             console.log("result on venu ", result);
//         } catch (err) {
//             console.log("Error in  venu data ", err);
//         }
//     }, [])

//     const catererList = () => {
//         return (<>
//             <div className="row">
//                 {
//                     catrersDetails.map((data, index) => {
//                         return (<>
//                             <div className="col col-lg-3 col-md-6 col-12 my-3">
//                                 <div className="card p-2 bg-dark text-white col-lg-3 m-auto" style={{ width: "18rem" }}>
//                                     <div className='carddiv1'>
//                                         <img src={data.docs ? `http://localhost:4001/${data.docs} ` : img}  height='200' width='100%' alt="..." />
//                                     </div>
//                                     <h4 className="card-title fw-bold mt-2"><span className='webcolor'>{data.Businessname}</span></h4>
//                                     <div className="mt-2 mb-3 py-1">
//                                         <span style={{color:'whitesmoke'}}>&nbsp;&nbsp;<b className='text-white'>Service Charge : </b> ${data.ServiceCharges}</span><br />
//                                         <span style={{color:'whitesmoke'}}>&nbsp;&nbsp;<b className='text-white'>Food Type : </b>{data.FoodType}</span><br />
//                                         <span style={{color:'whitesmoke'}}>&nbsp;&nbsp;<b className='text-white'>Specialization : </b>{data.Specialization}</span><br />
//                                     </div>
//                                     {/* <button className='ourbtn mt-1'>Book Now</button> */}
//                                     <ChooseServicesModal isOpen={isBookNowModalOpen} closeModal={() => setBookNowModalOpen(false)} catererEmail={data.catererEmail} />
//                                     <button className='ourbtn1 mt-1'>Show Gallery</button>
//                                 </div>
//                             </div>
//                         </>);
//                     })
//                 }
//             </div>

//         </>);
//     }
//     const decorationList = () => {
//         return (<>
//             <div className="row">
//                 {
//                     decorationDetails.map((decorationdata, index) => {
//                         return (<>
//                             <div className="col col-lg-3 col-md-6 col-12 my-3">
//                                 <div className="card p-2 bg-dark text-white col-lg-3 m-auto" style={{ width: "18rem" }}>
//                                     <div className='carddiv1'>
//                                         <img src={decorationdata.docs ? `http://localhost:4001/${decorationdata.docs} ` : img}  height='200' width='100%' alt="..." />
//                                     </div>
//                                     <h4 className="card-title fw-bold p-1 mt-2"><span className='webcolor'>{decorationdata.Businessname}</span></h4>
//                                     <div className="mt-2 mb-3 py-1">
//                                         <span style={{color:'whitesmoke'}}><b>Service Charge : </b>$ {decorationdata.Decorationprice}</span><br />
//                                         <span style={{color:'whitesmoke'}}><b>decoration Type : </b>{decorationdata.Decorationtype}</span><br />
//                                         <span style={{color:'whitesmoke'}}><b>Specialization : </b>{decorationdata.ServiceType}</span><br />
//                                     </div>
//                                     <button className='ourbtn mt-1'>Book Now</button>
//                                     <button className='ourbtn1 mt-1'>Show Gallery</button>
//                                 </div>
//                             </div>
//                         </>);
//                     })
//                 }
//             </div>

//         </>);
//     }
//     const djList = () => {
//         return (<>
//             <div className="row">
//                 {
//                     djDetails.map((djdata, index) => {
//                         return (<>
//                             <div className="col col-lg-3 col-md-6 col-12 my-3">
//                                 <div className="card p-2 bg-dark text-white col-lg-3 m-auto" style={{ width: "18rem" }}>
//                                     <div className='carddiv1'>
//                                         <img src={djdata.docs ? `http://localhost:4001/${djdata.docs} ` : img}  height='200' width='100%' alt="..." />
//                                     </div>
//                                     <h4 className="card-title fw-bold p-1 mt-2"><span className='webcolor'>{djdata.Businessname}</span></h4>
//                                     <div className="mt-2 mb-3 py-1">
//                                         <span style={{color:'whitesmoke'}}><b>Service Charge : </b>$ {djdata.Djprice}</span><br />
//                                         <span style={{color:'whitesmoke'}}><b>Equipment Type : </b>{djdata.EquipmentType}</span><br />
//                                         <span style={{color:'whitesmoke'}}><b>Specialization : </b>{djdata.ServiceType}</span><br />
//                                     </div>
//                                     <button className='ourbtn mt-1'>Book Now</button>
//                                     <button className='ourbtn1 mt-1'>Show Gallery</button>
//                                 </div>
//                             </div>
//                         </>);
//                     })
//                 }
//             </div>

//         </>);
//     }
//     const venueList = () => {
//         return (<>
//             <div className="row">
//                 {
//                     venuDetails.map((data, index) => {
//                         return (<>
//                             <div className="col col-lg-3 col-md-6 col-12 my-3">
//                                 <div className="card p-2 bg-dark text-white col-lg-3 m-auto" style={{ width: "18rem" }}>
//                                     <div className='carddiv1'>
//                                         <img src={"http://localhost:4001/" + data.docs}  height='200' width='100%' alt="..." />
//                                     </div>
//                                     <h4 className="card-title fw-bold p-1 mt-2"><span className='webcolor'>{data.VenueName}</span></h4>
//                                     <div className="mt-2 mb-3 py-1">
//                                         <span style={{color:'whitesmoke'}}><b>Venu Price : </b>$ {data.venuePrice}</span><br />
//                                         <span style={{color:'whitesmoke'}}><b>Venu Type : </b>{data.VenueType}</span><br />
//                                         <span style={{color:'whitesmoke'}}><b>Service Type : </b>{data.ServiceType}</span><br />
//                                     </div>
//                                     <button className='ourbtn mt-1'>Book Now</button>
//                                     <button className='ourbtn1 mt-1'>Show Gallery</button>
//                                 </div>
//                             </div>
//                         </>);
//                     })
//                 }
//             </div>

//         </>);
//     }
//     const renderContent = () => {
//         switch (activeTab) {
//             case 'catering':
//                 return (<>
//                     {catererList()}
//                 </>);
//             case 'decoration':
//                 return (<>
//                     {decorationList()}
//                 </>)
//             case 'dj':
//                 return (<>
//                     {djList()}
//                 </>)
//             case 'venue':
//                 return (<>
//                     {venueList()}
//                 </>)
//             default:
//                 return (
//                     <>
//                         {catererList()}
//                     </>
//                 );
//         }
//     };

//     return (<>
//         <div className="container">
//             <h2 className="text-center my-2 heading1"><span>OUR LATEST </span><span className='secondSpan'> SERVICES</span></h2>
//             <div className="container my-4">
//                 <div className="row">
//                     <div className="col col-lg-6 col-md-12 col-12 leftSection"></div>
//                     <div className="col col-lg-6 col-md-12 col-12 rightSection">
//                         <p className="fs-6">Our catering services are crafted to surpass your expectations and leave a lasting impression on your guests. From intimate gatherings to grand celebrations, our team of skilled chefs and dedicated staff are committed to providing a seamless and delectable dining experience.Our catering services are crafted to surpass your expectations and leave a lasting impression on your guests. From intimate gatherings to grand celebrations, our team of skilled chefs and dedicated staff are committed to providing a seamless and delectable dining experience.Our catering services are crafted to surpass your expectations and leave a lasting impression on your guests. From intimate gatherings to grand celebrations, our team of skilled chefs and dedicated staff are committed to providing a seamless and delectable dining experience. </p>
//                     </div>
//                 </div>
//             </div>
//             <div className='d-flex justify-content-center'>
//                 <hr className="line" style={{ backgroundColor: "gray", height: "10px" }} />
//                 <span className="text-center  fs-2 webcolor bookserviceheading py-2">Book <span className='secondSpan'>Services</span></span>
//             </div>


//             <div className="container d-flex justify-content-center my-3">
//                 <ul className="nav fs-4">
//                     <li className={` nav-item px-5 mx-5  webcolor bookserviceheading  py-2${activeTab === 'catering' ? 'active' : ''}`}>
//                         <button className="nav-link links" onClick={() => handleTabClick('catering')}>Catering</button>
//                     </li>
//                     <li className={`nav-item px-5 mx-5  webcolor bookserviceheading  py-2${activeTab === 'decoration' ? 'active' : ''}`}>
//                         <button className="nav-link links" onClick={() => handleTabClick('decoration')}>Decoration</button>
//                     </li>
//                     <li className={`nav-item px-5 mx-5  webcolor bookserviceheading  py-2${activeTab === 'dj' ? 'active' : ''}`}>
//                         <button className="nav-link links" onClick={() => handleTabClick('dj')}>DJ</button>
//                     </li>
//                     <li className={`nav-item px-5 mx-5  webcolor bookserviceheading  py-2${activeTab === 'venue' ? 'active' : ''}`}>
//                         <button className="nav-link links" onClick={() => handleTabClick('venue')}>Venue</button>
//                     </li>
//                 </ul>
//             </div>

//             <div className="container my-4 linksContainer">
//                 {renderContent()}
//             </div>
//         </div>
//     </>);
// }
// export default AllServices;





import './allservices.css';
import { useState, useEffect } from 'react';
import img from "../../images/Caterer.jpg"
import jscookie from 'js-cookie';
import { caterre_requestUrl, venue_requestUrl, decoration_requestUrl, dj_requestUrl } from '../../urls.js';
import axios from 'axios';
import ChooseServicesModal from './ChooseServicesModal';
import DjModal from './djModal.js';
import VenueModal from './VenueModal.js';
import { Link,useNavigate } from 'react-router-dom';
import DecorationChooseServicesModal from './DecorationChooseServicesModal.js';

function AllServices() {
    const [activeTab, setActiveTab] = useState('active');
    const [catrersDetails, setcatrersDetails] = useState([]);
    const [venuDetails, venuDetailsDetails] = useState([]);
    const [decorationDetails, setDecorationDetails] = useState([]);
    const [djDetails, setDjDetails] = useState([]);
    const [isBookNowModalOpen, setBookNowModalOpen] = useState(false);
    // const [isDjBookNowModalOpen, setDjBookNowModalOpen] = useState(false);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const userEmail = jscookie.get("user");

    useEffect(() => {
        try {
            var result = axios.post(caterre_requestUrl + "/searchServices")
                .then(response => {
                    setcatrersDetails(response.data.catererDetails);
                })
                .catch(err => {
                    console.log("Error in catrers Details data ", err);
                });

            console.log("result on caters page ", result);
        } catch (err) {
            console.log("Error in  catrersDetails data ", err);
        }

        try {
            var result = axios.post(venue_requestUrl + "/searchServices")
                .then(response => {
                    venuDetailsDetails(response.data.venuDetails);
                    console.log("venuDetails : --- ", response.data.venuDetails)
                })
                .catch(err => {
                    console.log("Error in venu Details data ", err);
                });
            console.log("result on venu ", result);
        } catch (err) {
            console.log("Error in  venu data ", err);
        }

        try {
            var result = axios.get(decoration_requestUrl + "/searchServices")
                .then(response => {
                    setDecorationDetails(response.data.decorationDetails);
                })
                .catch(err => {
                    console.log("Error in venu Details data ", err);
                });
            console.log("result on venu ", result);
        } catch (err) {
            console.log("Error in  venu data ", err);
        }

        try {
            var result = axios.get(dj_requestUrl + "/searchServices")
                .then(response => {
                    setDjDetails(response.data.djDetails);
                })
                .catch(err => {
                    console.log("Error in venu Details data ", err);
                });
            console.log("result on venu ", result);
        } catch (err) {
            console.log("Error in  venu data ", err);
        }
    }, [])

    const navigate = useNavigate();

    const showVenueGallery = (data) => {
        console.log("id : ==== ", data);
        navigate("/ShowVenueGallery", { state: { data: data } })
    }

    const catererList = () => {
        return (<>
            <div className="row">
                {
                    catrersDetails.map((data, index) => {
                        return (<>
                            <div className="col col-lg-3 col-md-6 col-12 my-3">
                                <div className="card p-2 bg-dark text-white col-lg-3 m-auto" style={{ width: "18rem" }}>
                                    <div className='carddiv1'>
                                        <img src={data.docs ? `http://localhost:4001/${data.docs} ` : img} height='200' width='100%' alt="..." />
                                    </div>
                                    <h4 className="card-title fw-bold mt-2"><span className='webcolor'>{data.Businessname}</span></h4>
                                    <div className="mt-2 mb-3 py-1">
                                        <span style={{ color: 'whitesmoke' }}>&nbsp;&nbsp;<b className='text-white'>Service Charge : </b> ${data.ServiceCharges}</span><br />
                                        <span style={{ color: 'whitesmoke' }}>&nbsp;&nbsp;<b className='text-white'>Food Type : </b>{data.FoodType}</span><br />
                                        <span style={{ color: 'whitesmoke' }}>&nbsp;&nbsp;<b className='text-white'>Specialization : </b>{data.Specialization}</span><br />
                                    </div>
                                    {/* <button className='ourbtn mt-1'>Book Now</button> */}
                                    <ChooseServicesModal isOpen={isBookNowModalOpen} closeModal={() => setBookNowModalOpen(false)} catererEmail={data.catererEmail} />
                                    <button className='ourbtn1 mt-1'>Show Gallery</button>
                                </div>
                            </div>
                        </>);
                    })
                }
            </div>

        </>);
    }
    const decorationList = () => {
        return (<>
            <div className="row">
                {
                    decorationDetails.map((decorationdata, index) => {
                        return (<>
                            <div className="col col-lg-3 col-md-6 col-12 my-3">
                                <div className="card p-2 bg-dark text-white col-lg-3 m-auto" style={{ width: "18rem" }}>
                                    <div className='carddiv1'>
                                        <img src={decorationdata.docs ? `http://localhost:4001/${decorationdata.docs} ` : img} height='200' width='100%' alt="..." />
                                    </div>
                                    <h4 className="card-title fw-bold p-1 mt-2"><span className='webcolor'>{decorationdata.Businessname}</span></h4>
                                    <div className="mt-2 mb-3 py-1">
                                        <span style={{ color: 'whitesmoke' }}><b>Service Charge : </b>$ {decorationdata.Decorationprice}</span><br />
                                        <span style={{ color: 'whitesmoke' }}><b>decoration Type : </b>{decorationdata.Decorationtype}</span><br />
                                        <span style={{ color: 'whitesmoke' }}><b>Specialization : </b>{decorationdata.ServiceType}</span><br />
                                    </div>
                                    {/* <button className='ourbtn mt-1'>Book Now</button> */}
                                    <DecorationChooseServicesModal decorationEmail={decorationdata.DecorationEmail} userEmail={userEmail} Price={decorationdata.Decorationprice} />
                                    {/* <ChooseServicesModal isOpen={isDjBookNowModalOpen} closeModal={() => setDjBookNowModalOpen(false)}  /> */}
                                    <button className='ourbtn1 mt-1'>Show Gallery</button>
                                </div>
                            </div>
                        </>);
                    })
                }
            </div>

        </>);
    }
    const djList = () => {
        return (<>
            <div className="row">
                {
                    djDetails.map((djdata, index) => {
                        return (<>
                            <div className="col col-lg-3 col-md-6 col-12 my-3">
                                <div className="card p-2 bg-dark text-white col-lg-3 m-auto" style={{ width: "18rem" }}>
                                    <div className='carddiv1'>
                                        <img src={djdata.docs ? `http://localhost:4001/${djdata.docs} ` : img} height='200' width='100%' alt="..." />
                                    </div>
                                    <h4 className="card-title fw-bold p-1 mt-2"><span className='webcolor'>{djdata.Businessname}</span></h4>
                                    <div className="mt-2 mb-3 py-1">
                                        <span style={{ color: 'whitesmoke' }}><b>Service Charge : </b>$ {djdata.Djprice}</span><br />
                                        <span style={{ color: 'whitesmoke' }}><b>Equipment Type : </b>{djdata.EquipmentType}</span><br />
                                        <span style={{ color: 'whitesmoke' }}><b>Address : </b>{djdata.address}</span><br />
                                    </div>
                                    <DjModal djEmail={djdata.DjEmail} />
                                    {/* <button className='ourbtn mt-1'>Book Now</button> */}
                                    <button className='ourbtn1 mt-1'>Show Gallery</button>
                                </div>
                            </div>
                        </>);
                    })
                }
            </div>

        </>);
    }
    const venueList = () => {

        return (<>
            <div className="row">
                {
                    venuDetails.map((data, index) => {
                        return (<>
                            <div className="col col-lg-3 col-md-6 col-12 my-3">
                                <div className="card p-2 bg-dark text-white col-lg-3 m-auto" style={{ width: "18rem" }}>
                                    <div className='carddiv1'>
                                        <img src={"http://localhost:4001/" + data.docs} height='200' width='100%' alt="..." />
                                    </div>
                                    <h4 className="card-title fw-bold p-1 mt-2"><span className='webcolor'>{data.VenueName}</span></h4>
                                    <div className="mt-2 mb-3 py-1">
                                        <span style={{ color: 'whitesmoke' }}><b>Venu Price : </b>$ {data.venuePrice}</span><br />
                                        <span style={{ color: 'whitesmoke' }}><b>Venu Type : </b>{data.VenueType}</span><br />
                                        <span style={{ color: 'whitesmoke' }}><b>Service Type : </b>{data.ServiceType}</span><br />
                                    </div>
                                    {/* <button className='ourbtn mt-1'>Book Now</button> */}
                                    <VenueModal venueEmail={data.venueEmail} />
                                    <button className='ourbtn1 mt-1' onClick={() => {
                                        showVenueGallery(data)
                                    }}>Show Gallery</button>

                                        

                                </div>
                            </div>
                        </>);
                    })
                }
            </div>

        </>);
    }
    const renderContent = () => {
        switch (activeTab) {
            case 'catering':
                return (<>
                    {catererList()}
                </>);
            case 'decoration':
                return (<>
                    {decorationList()}
                </>)
            case 'dj':
                return (<>
                    {djList()}
                </>)
            case 'venue':
                return (<>
                    {venueList()}
                </>)
            default:
                return (
                    <>
                        {catererList()}
                    </>
                );
        }
    };

    return (<>
        <div className="container">
            <h2 className="text-center my-2 heading1"><span>OUR LATEST </span><span className='secondSpan'> SERVICES</span></h2>
            <div className="container my-4">
                <div className="row">
                    <div className="col col-lg-6 col-md-12 col-12 leftSection"></div>
                    <div className="col col-lg-6 col-md-12 col-12 rightSection">
                        <p className="fs-6">Our catering services are crafted to surpass your expectations and leave a lasting impression on your guests. From intimate gatherings to grand celebrations, our team of skilled chefs and dedicated staff are committed to providing a seamless and delectable dining experience.Our catering services are crafted to surpass your expectations and leave a lasting impression on your guests. From intimate gatherings to grand celebrations, our team of skilled chefs and dedicated staff are committed to providing a seamless and delectable dining experience.Our catering services are crafted to surpass your expectations and leave a lasting impression on your guests. From intimate gatherings to grand celebrations, our team of skilled chefs and dedicated staff are committed to providing a seamless and delectable dining experience. </p>
                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-center'>
                <hr className="line" style={{ backgroundColor: "gray", height: "10px" }} />
                <span className="text-center  fs-2 webcolor bookserviceheading py-2">Book <span className='secondSpan'>Services</span></span>
            </div>


            <div className="container d-flex justify-content-center my-3">
                <ul className="nav fs-4">
                    <li className={` nav-item px-5 mx-5  webcolor bookserviceheading  py-2${activeTab === 'catering' ? 'active' : ''}`}>
                        <button className="nav-link links" onClick={() => handleTabClick('catering')}>Catering</button>
                    </li>
                    <li className={`nav-item px-5 mx-5  webcolor bookserviceheading  py-2${activeTab === 'decoration' ? 'active' : ''}`}>
                        <button className="nav-link links" onClick={() => handleTabClick('decoration')}>Decoration</button>
                    </li>
                    <li className={`nav-item px-5 mx-5  webcolor bookserviceheading  py-2${activeTab === 'dj' ? 'active' : ''}`}>
                        <button className="nav-link links" onClick={() => handleTabClick('dj')}>DJ</button>
                    </li>
                    <li className={`nav-item px-5 mx-5  webcolor bookserviceheading  py-2${activeTab === 'venue' ? 'active' : ''}`}>
                        <button className="nav-link links" onClick={() => handleTabClick('venue')}>Venue</button>
                    </li>
                </ul>
            </div>

            <div className="container my-4 linksContainer">
                {renderContent()}
            </div>
        </div>
    </>);



}
export default AllServices;