import './CatererDashboard.css';
import userImage from "../../images/user.jpg";
import { useState, useEffect } from 'react';
import { caterre_requestUrl } from '../../urls.js';
import axios from 'axios';
import jscookie from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import EditCatereProfileModal from './CatereProfileUpdate';
import CatererResponseModal from './catererResponseModal.js';
import CatererSendResponseToAdmin from './CatererSendResponseToAdmin';
import CatererUpdatePasswordModal from './CatererUpdatePasswordModal.js';
import CatererBankDetails from './CatererBankDetails.js';

function CaterersDashboard() {
    const [activeLink, setActiveLink] = useState('seeRequest');
    const [allRequestedUserData, setAllRequestedUserData] = useState([]);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [userInfo, setUserInfo] = useState([]);
    const [catereRegistrationInfo, setcatereRegistrationInfo] = useState([]);
    const [userName, setUserName] = useState({});
    const [adminRequestData, setAdminRequestData] = useState([]);
    var catereEmail = jscookie.get('user');
    var navigate = useNavigate();

    var openSideBar = () => {
        document.getElementById("sideNavBar").style.display = "block";
    }

    useEffect(() => {
        fetchData();
        fetchAdminRequestData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.post(caterre_requestUrl + '/catereSeeRequestedData', { catereEmail });

            setAllRequestedUserData(response.data.allUserRequestedDataForCateres);
            setUserInfo(response.data.userData);
            catereRegistrationInfo.ID = catereRegistrationInfo._id;
            setcatereRegistrationInfo(response.data.catereRegistrationInfo);
            setUserName(response.data.userName);
        } catch (err) {
            console.log("Error in catrers dashboard while showing data ", err);
        }
    };
    const fetchAdminRequestData = async () => {
        try {
            const response = await axios.post(caterre_requestUrl + '/adminRequestData', { catereEmail });
            console.log("response.data.caterDataAdminSendForRequest ", response.data.caterDataAdminSendForRequest);
            setAdminRequestData(response.data.caterDataAdminSendForRequest);
        } catch (err) {
            console.log("Error in catrers dashboard while showing admin request data ", err);
        }
    };

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
                        (data.status == "Send" || data.status == "pending") ? (
                            <div className="col-lg-9 mb-1 mySideBar w-100 bg-dark" key={index}>
                                <div className="row p-2 w-100 mb-3">
                                    <div className="col col-lg-3 col-md-4 col-12 my-2 my-lg-4 text-center cloudy-text">
                                        <span className="imagesSideSecion">{new Date(data.date).getDate()}</span><br />
                                        <span className="imagesSideSecion">{new Date(data.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                                    </div>
                                    <div className="col col-lg-5 col-md-4 col-12  my-2">
                                        <h5 className="text-light">{userName[index]}</h5>
                                        <span>{data.addtionalmenu}</span><br />
                                        <span className="card-text"><i className="bi bi-clock text-danger me-3"></i><small
                                            className="text-light">{data.time} </small></span><br />
                                        <span className="card-text"><i className="bi bi-geo-alt text-danger me-3"></i><small
                                            className="text-light">{data.location} </small></span>
                                    </div>
                                    {
                                        (data.status == "Send") ? (<>

                                            <div className="col col-lg-4 col-md-4 col-12">
                                                <button disabled className="btn btn-danger my-5">Request Send</button>
                                            </div>
                                        </>) : (<>

                                            <div className="col col-lg-4 col-md-4 col-12">
                                                <button className="btn btn-danger my-5" onClick={() => showLists(index)}>View Requirments</button>
                                            </div>
                                        </>)
                                    }

                                </div>
                                {/* See Requirment List start */}
                                <div className="row p-2 w-100 mb-3 d-none" id={`listShows${index}`}>
                                    <div className="col col-lg-3 col-md-4 col-12 text-center">
                                        <h6 className="text-danger">Selected Roti</h6>
                                        <ul id="uls">
                                            {data.requirments[0].Roti.map((item, itemIndex) => (
                                                <li key={itemIndex}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="col col-lg-3 col-md-4 col-12 text-center">
                                        <h6 className="text-danger">Selected Sabji</h6>
                                        <ul id="uls">
                                            {data.requirments[0].Sabji.map((item, itemIndex) => (
                                                <li key={itemIndex}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="col col-lg-3 col-md-4 col-12 text-center">
                                        <h6 className="text-danger">Selected Desserts</h6>
                                        <ul id="uls">
                                            {data.requirments[0].Dessert.map((item, itemIndex) => (
                                                <li key={itemIndex}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="col col-lg-3 col-md-4 col-12 text-center">
                                        <h6 className="text-danger">Selected Starter</h6>
                                        <ul id="uls">
                                            {data.requirments[0].Starter.map((item, itemIndex) => (
                                                <li key={itemIndex}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <CatererResponseModal userData={{ catereid: data.catereid, date: data.date }} />
                                </div>
                            </div>
                        ) : ("")
                    ))}
                </>
            );
        }
        else if (activeLink === 'seeAdminRequest') {
            return (
                <>
                    {adminRequestData.adminRequest.map((data, index) => (
                        (data.status == "sendRequest" || data.status == "accept") ? (
                            <div className="col-lg-9 mb-1 mySideBar w-100 bg-dark" key={index}>
                                <div className="row p-2 w-100 mb-3">
                                    <div className="col col-lg-3 col-md-4 col-12 my-2 my-lg-4 text-center cloudy-text">
                                        <span className="imagesSideSecion">{new Date(data.eventstartdate).getDate()}</span><br />
                                        <span className="imagesSideSecion">{new Date(data.eventstartdate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                                    </div>
                                    <div className="col col-lg-5 col-md-4 col-12  my-2">
                                        <h5 className="text-light">{data.userEmail}</h5>
                                        <span>{data.adminEmail}</span><br />
                                        <span className="card-text">
                                            <small
                                                className="text-light">{new Date(data.eventenddate).getDate()} {new Date(data.eventstartdate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} </small></span><br />
                                    </div>
                                    {
                                        (data.status == "accept") ? (<>
                                            {console.log(data.status, "status isnside sendwali")}
                                            <div className="col col-lg-4 col-md-4 col-12">
                                                <button disabled className="btn btn-danger my-5">Request Send</button>
                                            </div>
                                        </>) : (<>
                                            {console.log(data.status, "status isnside pendingwali")}
                                            {(data.status == "sendRequest") ? <div className="col col-lg-4 col-md-4 col-12">
                                                <button className="btn btn-danger my-5" onClick={() => showLists(index)}>View Requirments</button>
                                            </div> : (data.status == "Accepted") ? <div className="col col-lg-4 col-md-4 col-12">
                                                <button disabled className="btn btn-danger my-5">Accepted</button>
                                            </div> : ""}
                                        </>)
                                    }

                                </div>
                                {/* See Requirment List start */}
                                <div className="row p-2 w-100 mb-3 d-none" id={`listShows${index}`}>
                                    <div className="col col-lg-3 col-md-4 col-12 text-center">
                                        <h6 className="text-danger">Selected Roti</h6>
                                        <ul id="uls">
                                            {data.customiseThali[0].Roti.map((item, itemIndex) => (
                                                <li key={itemIndex}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="col col-lg-3 col-md-4 col-12 text-center">
                                        <h6 className="text-danger">Selected Sabji</h6>
                                        <ul id="uls">
                                            {data.customiseThali[0].Sabji.map((item, itemIndex) => (
                                                <li key={itemIndex}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="col col-lg-3 col-md-4 col-12 text-center">
                                        <h6 className="text-danger">Selected Desserts</h6>
                                        <ul id="uls">
                                            {data.customiseThali[0].Dessert.map((item, itemIndex) => (
                                                <li key={itemIndex}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="col col-lg-3 col-md-4 col-12 text-center">
                                        <h6 className="text-danger">Selected Starter</h6>
                                        <ul id="uls">
                                            {data.customiseThali[0].Starter.map((item, itemIndex) => (
                                                <li key={itemIndex}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <CatererSendResponseToAdmin userData={{ catererEmail: catereEmail, eventdata: data }} />
                                </div>
                            </div>
                        ) : ("")
                    ))}
                </>
            );

        }
        else if (activeLink === 'dashboard') {
            return <p className='bg-dark text-danger'>dashboard here</p>;
        } else if (activeLink === 'customerOrder') {
            return (<>
                {
                    adminRequestData.adminRequest && adminRequestData.adminRequest.map((data, index) => (
                        (data.status == "booked") ? (
                            <div className="col-lg-9 mb-1 mySideBar w-100 bg-dark" key={index}>
                                <div className="row p-2 w-100 mb-3">
                                    <div className="col col-lg-3 col-md-4 col-12 my-2 my-lg-4 text-center cloudy-text">
                                        <span className="imagesSideSecion">{new Date(data.date).getDate()}</span><br />
                                        <span className="imagesSideSecion">{new Date(data.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                                    </div>
                                    <div className="col col-lg-5 col-md-4 col-12  my-2">
                                        <h5 className="text-light">{userName[index]}</h5>
                                        <span>{data.addtionalmenu}</span><br />
                                        <span className="card-text"><i className="bi bi-clock text-danger me-3"></i><small
                                            className="text-light">{data.time} </small></span><br />
                                        <span className="card-text"><i className="bi bi-geo-alt text-danger me-3"></i><small
                                            className="text-light">{data.location} </small></span>
                                    </div>

                                    <div className="col col-lg-4 col-md-4 col-12">
                                        <button disabled className="btn btn-danger my-5">You Booked</button>
                                    </div>
                                </div>

                            </div>
                        ) : ("")

                    ))
                }
            </>);
        } else if (activeLink === 'bankDetails') {
            return (
                <>
                    <p className='bg-dark text-danger'>bank Details here</p>
                    <CatererBankDetails data={catereRegistrationInfo}/>
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
                    <CatererUpdatePasswordModal data={catereRegistrationInfo} />
                </>
            );
        } else if (activeLink === 'profile') {
            return (
                <>
                    <div className="container">
                        <div className="container-fluid outerProfileContainer">
                            {/* <img src={registrationImg} alt="Registration image..." /> */}
                            <img src={`http://localhost:4001/${catereRegistrationInfo.docs} `} />
                        </div>
                        <div className="container bg-dark belowProfileContainer">
                            <div className="row">
                                <div className="col col-lg-9 col-md-9 col-12">
                                    <h4 className='text-danger'>{userInfo.name}</h4>
                                    <span className="my-2">Address :{userInfo.address}</span><br />
                                    <span className="my-2">Business Name : {catereRegistrationInfo.Businessname} </span><br />
                                    <span className="my-2">Specialization : {catereRegistrationInfo.Specialization} </span><br />
                                    <span className="my-2">Food Type      : {catereRegistrationInfo.FoodType} </span><br />
                                    <span className="my-2">Service Charge : &#x20B9; {catereRegistrationInfo.ServiceCharges} </span><br />
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
                    <div className="container-fluid " >
                        <span className="navbar-toggler-icon" onClick={openSideBar}></span>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarResponsive">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <a className="navbar-brand mx-2 mx-lg-5 text-light">CATERER-PROFILE</a>

                        <form className="d-flex mx-2 mx-lg-5 my-2">
                            <input className="form-control border-0 text-light nameSection" type="search" placeholder="Search" />
                        </form>

                        <div className="navbar-nav mx-2 mx-lg-5 my-2 text-nowrap">
                            <button className="btn btn-danger">
                                <i className="bi bi-plus"></i> Add Gallery
                            </button>
                        </div>

                        <div className="collapse navbar-collapse" id="navbarResponsive">
                            <ul className="navbar-nav align-items-center ms-auto">
                                <li className="nav-item text-nowrap">
                                    <i className="fa fa-envelope me-lg-2 text-danger"></i>
                                    <span className="d-none d-lg-inline-flex text-light">Message</span>
                                </li>
                                <li className="nav-item text-nowrap ms-2">
                                    <i className="fa fa-bell me-lg-2 text-danger"></i>
                                    <span className="d-none d-lg-inline-flex text-light">Notification</span>
                                </li>
                                <li className={`nav-item dropdown ${isDropdownOpen ? 'show' : ''}`}>
                                    <p className="nav-link dropdown-toggle" id="userDropdown" role="button" onClick={handleDropdownToggle}>
                                        <img className="rounded-circle me-lg-2" src={userImage} alt="" style={{ width: "40px", height: "40px" }} />
                                        <span className="d-none d-lg-inline-flex text-light">{userInfo.name}</span>
                                    </p>
                                    {isDropdownOpen && (
                                        <ul className="dropdown-menu show" aria-labelledby="userDropdown">
                                            <EditCatereProfileModal CatereRegistrationInfo={catereRegistrationInfo} UserInfo={userInfo} />
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
                                <h6 className="mb-0">{userInfo.name}</h6>
                                <span>{userInfo.role}</span>
                            </div>
                        </div>
                        <div className="navbar-nav w-100 mySideBar">
                            <div className="nav-item nav-link mySideBar text-light " onClick={() => handleLinkClick('seeRequest')}>
                                <i className="fa fa-th me-2 text-dark"></i>See Request
                            </div>
                            <div className="nav-item nav-link mySideBar text-light " onClick={() => handleLinkClick('seeAdminRequest')}>
                                <i className="fa fa-th me-2 text-dark"></i>See Admin Request
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
        </div><br />

    </>);
}

export default CaterersDashboard;