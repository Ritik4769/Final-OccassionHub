import './CatererDashboard.css';
import userImage from "../../images/user.jpg";
import { useState, useEffect } from 'react';
import { decoration_requestUrl } from '../../urls';
import axios from 'axios';
import jscookie from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import registrationImg from '../../images/Caterer.jpg'
import Swal from 'sweetalert2';
import EditDecorationProfileModal from './EditDecorationProfileModal';
import DecorationUpdatePasswordModal from './DecorationUpdatePasswordModal.js';
import DecorationBankDetails from './DecorationBankDetails.js';

function DecorationDashboard() {
    const [activeLink, setActiveLink] = useState('seeRequest');
    const [allRequestedUserData, setAllRequestedUserData] = useState([]);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [normalUserRegistrationData, setnormalUserData] = useState({});
    const [decorationData, setDecorationData] = useState({});
    const [adminRequestData, setadminRequestData] = useState([]);
    var decorationEmail = jscookie.get('user');
    var navigate = useNavigate();

    var openSideBar = () => {
        document.getElementById("sideNavBar").style.display = "block";
    }
    const fetchData = async () => {
        try {
            console.log("in fetchData ");
            const response = await axios.post(decoration_requestUrl + '/decorationSeeRequestedData', { decorationEmail });

            console.log("Response in data : ", response.data.decorationRequestData);
            setAllRequestedUserData(response.data.decorationRequestData);
            setnormalUserData(response.data.normalUserData);
            setDecorationData(response.data.decorationData);
        } catch (err) {
            console.log("Error in catrers dashboard while showing data ", err);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const fetchAdminREquestData = async () => {
        try {
            console.log("in fetchData ");
            const response = await axios.post(decoration_requestUrl + '/decorationSeeAdminRequestedData', { decorationEmail })
            if (response.status == 201) {
                // adminDecorationRequestData
                console.log("response.data.adminDecorationRequestData : ", response.data.adminDecorationRequestData);
                setadminRequestData(response.data.adminDecorationRequestData)
            }
        } catch (err) {
            console.log("Error in catrers dashboard while showing data ", err);
        }
    };

    useEffect(() => {
        fetchAdminREquestData();
    }, []);

    const acceptRequestofUser = (userEmail) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'do you want to Accept these..!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Accept',
            cancelButtonText: 'Reject',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post(decoration_requestUrl + `/acceptRequestOfUser/${userEmail}`).then((response) => {
                    console.log("response in acceptRequestofUser : ", response.status);
                    if (response.status == 201) {
                        Swal.fire({
                            position: "middle",
                            icon: "success",
                            title: response.data.message,
                            showConfirmButton: false,
                            timer: 2000
                        });
                    }
                    else {
                        Swal.fire({
                            icon: "error",
                            title: "ERROR",
                            text: "Please try Again...",
                        });
                    }

                }).catch((error) => {
                    console.log("error : ", error);
                });
            }
        });
    }
    const acceptRequestOfAdmin = (eventId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'do you want to Accept these..!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Accept',
            cancelButtonText: 'Reject',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                var obj = {
                    eventId ,
                    decorationEmail
                }
                console.log("obj : " , obj);
                axios.post(decoration_requestUrl + `/acceptRequestOfAdmin`, obj ).then((response) => {
                    console.log("response in acceptRequestofUser : ", response.status);
                    if (response.status == 201) {
                        Swal.fire({
                            position: "middle",
                            icon: "success",
                            title: response.data.message,
                            showConfirmButton: false,
                            timer: 2000
                        });
                    }
                    else {
                        Swal.fire({
                            icon: "error",
                            title: "ERROR",
                            text: "Please try Again...",
                        });
                    }

                }).catch((error) => {
                    console.log("error : ", error);
                });
            }
        });
    }


    const handleLinkClick = async (link) => {
        if (link !== activeLink) {
            setActiveLink(link);
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
                    <p className='bg-dark text-danger'>See requests</p>
                    {
                        allRequestedUserData.map((data, index) => (
                            (data.status == 'pending' || data.status == 'accepted') ?
                                <div className="col-lg-9 mb-1 mySideBar w-100 bg-dark" key={index}>
                                    <div className="row p-2 w-100 mb-3">
                                        <div className="col col-lg-3 col-md-4 col-12 my-2 my-lg-4 text-center cloudy-text">
                                            <span className="imagesSideSecion">{new Date(data.date).getDate()}</span><br />
                                            <span className="imagesSideSecion">{new Date(data.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                                        </div>
                                        <div className="col col-lg-5 col-md-4 col-12  my-2">
                                            <h5 className="text-light">{data.userEmail}</h5>
                                            <span className="card-text">Start Time <i className="bi bi-clock text-danger me-3"></i><small
                                                className="text-light">{data.starttime} </small></span><br />
                                            <span className="card-text">End Time &nbsp;<i className="bi bi-clock text-danger me-3"></i><small
                                                className="text-light">{data.endtime} </small></span><br />
                                            <span className="card-text">Location &nbsp;&nbsp;&nbsp;<i className="bi bi-geo-alt text-danger me-3"></i><small
                                                className="text-light">{data.location} </small></span>
                                        </div>
                                        <div className="col col-lg-4 col-md-4 col-12">
                                            <button className="btn btn-danger my-5" onClick={() => { acceptRequestofUser(data.userEmail) }}>{data.status}</button>
                                        </div>
                                    </div>
                                </div>
                                : <h1>No data for See</h1>
                        ))
                    }
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
                                    <th className='text-nowrap'>Decoration Email</th>
                                    <th className='text-nowrap'>Admin Email</th>
                                    <th className='text-nowrap'>Event Start Date</th>
                                    <th className='text-nowrap'>Event End Date</th>
                                    <th className='text-nowrap'>Event Location</th>
                                    <th className='text-nowrap'>Send Req</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    adminRequestData.adminRequest.map((data, index) => {
                                        return (
                                            <tr>
                                                <td className='text-nowrap'>{index + 1}</td>
                                                <td className='text-nowrap'>{data.eventId}</td>
                                                <td className='text-nowrap'>{data.adminEmail}</td>
                                                <td className='text-nowrap'>{data.eventstartdate}</td>
                                                <td className='text-nowrap'>{data.eventenddate}</td>
                                                <td className='text-nowrap'>{data.eventlocation}</td>
                                                <td className='text-nowrap'>
                                                    {
                                                        data.status == 'pending' ?
                                                            <button className='btn btn-outline-danger' onClick={() => { acceptRequestOfAdmin(data.eventId) }}>
                                                                accept
                                                            </button>
                                                            :
                                                            <button className='btn btn-outline-danger disabled'>
                                                                accepted
                                                            </button>
                                                    }
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
            return (
                <>
                    <p className='bg-dark text-danger'>customer Order here</p>
                    {
                        allRequestedUserData.map((data, index) => (
                            (data.status == 'booked') ?
                                <div className="col-lg-9 mb-1 mySideBar w-100 bg-dark" key={index}>
                                    <div className="row p-2 w-100 mb-3">
                                        <div className="col col-lg-3 col-md-4 col-12 my-2 my-lg-4 text-center cloudy-text">
                                            <span className="imagesSideSecion">{new Date(data.date).getDate()}</span><br />
                                            <span className="imagesSideSecion">{new Date(data.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                                        </div>
                                        <div className="col col-lg-5 col-md-4 col-12  my-2">
                                            <h5 className="text-light">{data.userEmail}</h5>
                                            <span className="card-text">Start Time <i className="bi bi-clock text-danger me-3"></i><small
                                                className="text-light">{data.starttime} </small></span><br />
                                            <span className="card-text">End Time &nbsp;<i className="bi bi-clock text-danger me-3"></i><small
                                                className="text-light">{data.endtime} </small></span><br />
                                            <span className="card-text">Location &nbsp;&nbsp;&nbsp;<i className="bi bi-geo-alt text-danger me-3"></i><small
                                                className="text-light">{data.location} </small></span>
                                        </div>
                                        <div className="col col-lg-4 col-md-4 col-12">
                                            <button className="btn btn-danger my-5" onClick={() => { acceptRequestofUser(data.userEmail) }}>{data.status}</button>
                                        </div>
                                    </div>
                                </div>
                                : ""
                        ))
                    }
                </>
            );
        } else if (activeLink === 'bankDetails') {
            return (
                <>
                    <p className='bg-dark text-danger'>bank Details here</p>
                    <DecorationBankDetails data={decorationData}/>
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
                    <DecorationUpdatePasswordModal decorationData={normalUserRegistrationData} />
                </>
            );
        } else if (activeLink === 'profile') {
            return (
                <>
                    {/* <p className='bg-dark text-danger'>update profile here</p> */}
                    {console.log("normalUserRegistrationData.name : ", normalUserRegistrationData)}
                    {console.log("decorationData : ", decorationData)}
                    {console.log("normalUserRegistrationData in the ")}
                    <div className="container">
                        <div className="container-fluid outerProfileContainer">
                            <img src={registrationImg} alt="Registration image..." />
                        </div>
                        <div className="container bg-dark belowProfileContainer">
                            <div className="row">
                                <div className="col col-lg-9 col-md-9 col-12">
                                    <h4 className='text-danger'>{normalUserRegistrationData.name}</h4>
                                    <span className="my-2">Address :{normalUserRegistrationData.address}</span><br />
                                    <span className="my-2">Business Name : {decorationData.Businessname} </span><br />
                                    <span className="my-2">Specialization : {decorationData.ServiceType} </span><br />
                                    <span className="my-2">Food Type      : {decorationData.Decorationtype} </span><br />
                                    <span className="my-2">Service Charge : &#x20B9; {decorationData.Decorationprice} </span><br />
                                    <div className="row my-5">
                                        <div className="col col-lg-3 col-md-3 col-12" style={{ backgroundColor: "rgb(36, 33, 33)" }}>
                                            <button className="btn btn-transparent text-white">View Gallery</button>|
                                        </div>
                                        <div className="col col-lg-3 col-md-3 col-12" style={{ backgroundColor: "rgb(36, 33, 33)" }}>
                                            <button className="btn btn-transparent text-white">View Orders</button>|
                                        </div>
                                        <div className="col col-lg-3 col-md-3 col-12" style={{ backgroundColor: "rgb(36, 33, 33)" }}>
                                            <button className="btn btn-transparent text-white">View Gallery</button>|
                                        </div>
                                        <div className="col col-lg-3 col-md-3 col-12" style={{ backgroundColor: "rgb(36, 33, 33)" }}>
                                            <button className="btn btn-transparent text-white">View Gallery</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col col-lg-3 col-md-3 col-12">
                                    <div className="container mt-2 ratingBox mx-2">
                                        <i class="fa fa-star-o" style={{ fontSize: "25px", display: "inline" }}></i>Rating</div>
                                </div>
                            </div>
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
                    <div className="container-fluid" >
                        <span className="navbar-toggler-icon" onClick={openSideBar}></span>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarResponsive">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <a className="navbar-brand mx-2 mx-lg-5 text-light" href="#">DECORATOR-PROFILE</a>

                        <form className="d-flex mx-2 mx-lg-5 my-2">
                            <input className="form-control border-0 text-light nameSection" type="search" placeholder="Search" />
                        </form>

                        <div className="navbar-nav mx-2 mx-lg-5 my-2 text-nowrap ">
                            <button className="btn btn-danger">
                                <i className="bi bi-plus"></i> Add Gallery
                            </button>
                        </div>

                        <div className="collapse navbar-collapse my-2" id="navbarResponsive">
                            <ul className="navbar-nav align-items-center ms-auto">
                                <li className="nav-item text-nowrap">
                                    <i className="fa fa-envelope me-lg-2 text-danger"></i>
                                    <span className="d-none d-lg-inline-flex text-light">Message</span>
                                </li>
                                <li className="nav-item text-nowrap ms-3">
                                    <i className="fa fa-bell me-lg-2 text-danger"></i>
                                    <span className="d-none d-lg-inline-flex text-light">Notification</span>
                                </li>
                                <li className={`nav-item dropdown ${isDropdownOpen ? 'show' : ''}`}>
                                    <p className="nav-link dropdown-toggle my-2" id="userDropdown" role="button" onClick={handleDropdownToggle} >
                                        <img className="rounded-circle me-lg-2" src={userImage} alt="" style={{ width: "35px", height: "35px" }} />
                                        <span className="d-none d-lg-inline-flex text-light">{normalUserRegistrationData.name}</span>
                                    </p>
                                    {isDropdownOpen && (
                                        <ul className="dropdown-menu show" aria-labelledby="userDropdown">
                                            <EditDecorationProfileModal DecorationRegistrationInfo={decorationData} UserInfo={normalUserRegistrationData} />
                                            <li className="dropdown-item" onClick={catereLogOut}>Logout</li>
                                        </ul>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>

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
                                <h6 className="mb-0">{normalUserRegistrationData.name}</h6>
                                <span>{normalUserRegistrationData.role}</span>
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

                <div className="col-lg-8 col-md-8 col-8 py-1 ms-auto">
                    <div className="row">
                        <div className="col-lg-12 mx-auto  text-light scrollers w-100 p-0 m-0" >
                            {renderContent()}
                        </div>

                    </div>
                </div>
            </div>
        </div><br />

    </>);
}

export default DecorationDashboard;