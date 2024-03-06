import './CatererDashboard.css';
import userImage from "../../images/user.jpg";
import { useState, useEffect } from 'react';
import { venue_requestUrl } from '../../urls.js';
import axios from 'axios';
import jscookie from 'js-cookie';
import Swal from 'sweetalert2';

import { useNavigate } from 'react-router-dom';
import EditVenueProfileModal from './VenueProfileUpdate.js';
import VenueResponseModal from './venueResponseModal.js';
import VenueResponseModalToAdmin from './venueResponseToAdmin.js';
import VenueBankDetails from './VenueBankDetails.js';

function VenueDashboard() {
    const [activeLink, setActiveLink] = useState('seeRequest');
    const [allRequestedUserData, setAllRequestedUserData] = useState([]);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [userInfo, setUserInfo] = useState([]);
    const [userName, setUserName] = useState([]);
    const [venueRegistrationInfo, setVenueRegistrationInfo] = useState([]);
    const [adminRequestData, setadminRequestData] = useState([]);
    console.log("adminRequestData 56235623562356 ",adminRequestData)

    var venueEmail = jscookie.get('user');
    var navigate = useNavigate();

    var openSideBar = () => {
        document.getElementById("sideNavBar").style.display = "block";
    }
    const fetchData = async () => {
        try {
            const response = await axios.post(venue_requestUrl + '/venueSeeRequestedData', { venueEmail });
            setAllRequestedUserData(response.data.allUserRequestedDataForCateres);
            setUserInfo(response.data.userData);
            setUserName(response.data.userName);
            var venueRegistrationData = response.data.venueRegistrationInfo
            setVenueRegistrationInfo(response.data.venueRegistrationInfo);
        } catch (err) {
            console.log("Error in catrers dashboard while showing data ", err);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);


   

    const fetchAdminREquestData = async () => {
        try {
            const response = await axios.post(venue_requestUrl + '/venueSeeAdminRequestedData', { venueEmail })
            
            if (response.status == 201) {
                console.log("response.data.adminDecorationRequestData : ", response.data.adminVenueRequestData);
                setadminRequestData(response.data.adminVenueRequestData)
            }
        } catch (err) {
            console.log("Error in catrers dashboard while showing data ", err);
        }
    };

    useEffect(() => {
        fetchAdminREquestData();
    }, []);

    const handleLinkClick = async (link) => {
        if (link !== activeLink) {
            setActiveLink(link);
            if (link === 'seeRequest') {
                fetchData();
            }
        }
    }
    const showLists = (index) => {
        const listShowsElement = document.getElementById(`listShows${index}`);
        if (listShowsElement) {
            const isVisible = !listShowsElement.classList.contains("d-none");

            if (isVisible) {
                listShowsElement.classList.add("d-none");
            } else {
                listShowsElement.classList.remove("d-none");
            }
        }
    }

    const handleDropdownToggle = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const catereLogOut = () => {
        jscookie.remove("user");
        navigate('/', { replace: true });
    }

    const renderContent = () => {
        if (activeLink === 'seeRequest') {
            return (
                <>
                    {allRequestedUserData.map((data, index) => (
                        <div className="col-lg-9 mb-1 mySideBar w-100 bg-dark" key={index}>
                            <div className="row p-2 w-100 mb-3">
                                <div className="col col-lg-3 col-md-4 col-12 my-2 my-lg-4 text-center cloudy-text">
                                    <span className="imagesSideSecion">{new Date(data.date).getDate()}</span><br />
                                    <span className="imagesSideSecion">{new Date(data.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                                </div>
                                <div className="col col-lg-5 col-md-4 col-12  my-2">
                                    <h5 className="text-light">{userName[index]}</h5>
                                    <span>{data.date}</span><br />
                                    <span className="card-text"><i className="bi bi-clock text-danger me-3"></i><small
                                        className="text-light">{data.functionTime} </small></span>
                                    <span className="card-text"><i className="bi bi-geo-alt text-danger me-3"></i><small
                                        className="text-light">{data.numRooms} </small></span><br />
                                    <span className="card-text"><i className="bi bi-geo-alt text-danger me-3"></i><small
                                        className="text-light">{data.functionType} </small></span>
                                    <span className="card-text"><i className="bi bi-geo-alt text-danger me-3"></i><small
                                        className="text-light">{data.AdditionalInfo} </small></span>
                                </div>
                                <VenueResponseModal data={venueRegistrationInfo} numRoom={data.numRooms} userRequest={data} userRequestData={allRequestedUserData} />
                                {/* <div className="col col-lg-4 col-md-4 col-12">
                                    <button className="btn btn-danger my-5" onClick={() => showLists(index)}>View Requirments</button>
                                </div> */}
                            </div>
                            {/* See Requirment List start */}

                            {/* See Requirment List end */}
                        </div>
                    ))}
                </>
            );
        } else if (activeLink === 'adminRequest') {
            return (
                <>
                    <p className='bg-dark text-danger'>Admin requests</p>
                    <div className="w-100 table-responsive">
                        <table className="table table-bordered table-hover table-dark">
                            <thead>
                                <tr>
                                    <th className='text-nowrap'>No.</th>
                                    <th className='text-nowrap'>Event Start Date</th>
                                    <th className='text-nowrap'>Event End Date</th>
                                    <th className='text-nowrap'>AddINfo</th>
                                    <th className='text-nowrap'>Send Req</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    adminRequestData.adminRequest.map((data, index) => {
                                        return (
                                            <tr>
                                                <td className='text-nowrap'>{index + 1}</td>
                                                <td className='text-nowrap'>{data.eventstartdate}</td>
                                                <td className='text-nowrap'>{data.eventenddate}</td>
                                                <td className='text-nowrap'>{data.addInfo}</td>
                                                <td className='text-nowrap'>
                                                    <VenueResponseModalToAdmin adminRequestData={data} venueEmail={venueEmail}/>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </>
            );
        }


        else if (activeLink === 'dashboard') {
            return <p className='bg-dark text-danger'>dashboard here</p>;
        } else if (activeLink === 'customerOrder') {
            return <p className='bg-dark text-danger'>customer Order here</p>;
        } else if (activeLink === 'bankDetails') {
            return (
                <>
                    <p className='bg-dark text-danger'>bank Details here</p>
                    <VenueBankDetails data={venueRegistrationInfo}/>
                </>
            );
        } else if (activeLink === 'description') {
            return (
                <>
                    <p className='bg-dark text-danger'>description here</p>
                </>
            );
        } else if (activeLink === 'updatePassword') {
            return (
                <>
                    <p className='bg-dark text-danger'>update Password here</p>
                </>
            );
        } else if (activeLink === 'profile') {
            return (
                <>
                    {/* <p className='bg-dark text-danger'>update profile here</p> */}
                    <div className="container">
                        <label className="" htmlFor="Name">Name : </label>
                        <span>{venueRegistrationInfo.VenueName} </span><br />
                        <label className="" htmlFor="location">Location : </label>
                        <span>{venueRegistrationInfo.venueLocation} </span><br />
                        <label className="" htmlFor="email">Email : </label>
                        <span>{venueRegistrationInfo.venueEmail} </span><br />
                        <label className="" htmlFor="price">Price : </label>
                        <span>{venueRegistrationInfo.venuePrice} </span><br />
                        <label className="" htmlFor="price">Type : </label>
                        <span>{venueRegistrationInfo.VenueType} </span><br />
                        <div className="col col-lg-4 col-md-4 col-12">
                            <button className="btn btn-danger my-5" >View Gallery</button>
                        </div>
                    </div>
                </>
            );
        }

        return null;
    }
    return (<>
        <div className="container my-3 bg-dark" id='catrer-main-container'>
            <div className="container text-light">
                <div className="row" style={{ marginTop: "15vh" }}>
                    <div className="col col-lg-6  col-md-12 col-12 p-5">
                        <h3><span className="text-danger" >Crafting Culinary Experiences -Elevating Events</span> <br />
                            <span>  with Exquisite Catering</span>
                        </h3>
                        <div className="row">
                            <div className="col col-lg-3 col-md-3 col-12 firstImageBanner"></div>
                            <div className="col col-lg-9 col-md-9 col-12">
                                <p className="py-3 fs-5">Feel free to customize it based on specific details about your catering business and the services you provide.</p>
                            </div>
                        </div>

                    </div>
                    <div className="col col-lg-6 col-md-12 col-12 SecondImageBanner">
                    </div>
                </div>
            </div>
        </div>

        <div className="container" id="catrerMainDiv">
            <div className='container my-3'>
                <nav className="navbar navbar-expand-lg text-light px-4   mySideBar" style={{ top: "1vh" }}>
                    <div className="container-fluid " >
                        <span className="navbar-toggler-icon" onClick={openSideBar}></span>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarResponsive">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <a className="navbar-brand mx-2 mx-lg-5 text-light" href="#">VENUE-PROFILE</a>

                        <form className="d-flex mx-2 mx-lg-5 my-2">
                            <input className="form-control border-0 text-light nameSection" type="search" placeholder="Search" />
                        </form>

                        <div className="navbar-nav mx-2 mx-lg-5 my-2">

                            {/* <VenueGalleryModal />
                             */}
                        </div>

                        <div className="collapse navbar-collapse" id="navbarResponsive">
                            <ul className="navbar-nav align-items-center ms-auto">
                                <li className="nav-item">
                                    <a href="#" className="nav-link  " >
                                        <i className="fa fa-envelope me-lg-2 text-danger"></i>
                                        <span className="d-none d-lg-inline-flex text-light">Message</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className="nav-link  bg-dark">
                                        <i className="fa fa-bell me-lg-2 text-danger"></i>
                                        <span className="d-none d-lg-inline-flex text-light">Notification</span>
                                    </a>
                                </li>
                                <li className={`nav - item dropdown ${isDropdownOpen ? 'show' : ''}`}>
                                    <p
                                        className="nav-link dropdown-toggle"
                                        id="userDropdown"
                                        role="button"
                                        onClick={handleDropdownToggle}
                                    >
                                        <img className="rounded-circle me-lg-2" src={userImage} alt="" style={{ width: "40px", height: "40px" }} />
                                        <span className="d-none d-lg-inline-flex text-light">{userInfo.name}</span>
                                    </p>
                                    {isDropdownOpen && (
                                        <ul className="dropdown-menu show" aria-labelledby="userDropdown">
                                            <EditVenueProfileModal venueRegistrationInfo={venueRegistrationInfo} UserInfo={userInfo} />
                                            <li className="dropdown-item" onClick={catereLogOut}>Logout</li>
                                        </ul>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div >

            <div className='container-fluid row'>
                <div className="col-md-4 col-4 col-lg-4 siderbar pe-4 pb-3 mySideBar" style={{ width: "25vw", marginLeft: "1vw", height: '75vh' }} id="sideNavBar">
                    <nav className="navbar bg-light navbar-light bg-dark border-radius m-0  ">
                        <div className="d-flex align-items-center ms-4 mb-4" onClick={() => handleLinkClick('profile')}>
                            <div className="position-relative">
                                <img className="rounded-circle" src={userImage} alt="" style={{ width: "40px", height: "40px" }} />
                                <div
                                    className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1">
                                </div>
                            </div>
                            <div className="ms-3 pt-4">
                                <h6 className="mb-0">{userInfo.name}</h6>
                                <span>{userInfo.role}</span>
                            </div>
                        </div>
                        <div className="navbar-nav w-100 mySideBar">
                            <div className="nav-item nav-link mySideBar text-light " onClick={() => handleLinkClick('seeRequest')}>
                                <i className="fa fa-th me-2 text-dark"></i>See Request
                            </div>
                            <div className="nav-item nav-link mySideBar text-light " onClick={() => handleLinkClick('adminRequest')}>
                                <i className="fa fa-th me-2 text-dark"></i>Admin Request
                            </div>
                            <div className="nav-item nav-link mySideBar text-light " onClick={() => handleLinkClick('dashboard')}>
                                <i className="fa fa-th me-2 text-dark"></i>Dashboard
                            </div>
                            <div className="nav-item nav-link mySideBar text-light " onClick={() => handleLinkClick('customerOrder')}>
                                <i className="fa fa-th me-2 text-dark"></i>Customers Orders
                            </div>
                            <div className="nav-item nav-link mySideBar text-light " onClick={() => handleLinkClick('bankDetails')}>
                                <i className="fa fa-th me-2 text-dark"></i>Add Bank Details
                            </div>

                            <div className="nav-item nav-link mySideBar text-light " onClick={() => handleLinkClick('description')}>
                                <i className="fa fa-th me-2 text-dark"></i>Add Description
                            </div>
                            <div className="nav-item nav-link mySideBar text-light " onClick={() => handleLinkClick('updatePassword')}>
                                <i className="fa fa-th me-2 text-dark"></i>Updates Password
                            </div>

                        </div>
                    </nav>
                </div>

                <div className="col-lg-8 col-md-8 col-8">
                    <div className="row">
                        <div className="col-lg-12 mx-auto  text-light scrollers" >
                            {renderContent()}
                        </div>

                    </div>
                </div>
            </div>
        </div > <br />

    </>);
}

export default VenueDashboard;
