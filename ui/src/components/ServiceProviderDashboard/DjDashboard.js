import './CatererDashboard.css';
import userImage from "../../images/user.jpg";
import { useState, useEffect } from 'react';
import { caterre_requestUrl, dj_requestUrl } from '../../urls.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jscookie from 'js-cookie';
import { Link } from 'react-router-dom';
import './djdashboard.css'
import EditDjProfileModal from './DjProfileUpdateModal.js';
import DjUpdatePasswordModal from './DjUpdatePasswordModal.js';
import DjBankDetails from './DjBankDetails.js';

import Swal from 'sweetalert2';
function DjDashboard() {
    var navigate = useNavigate();
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [djUserInfo, setDjUserInfo] = useState({})
    const [djInfo, setDjInfo] = useState({});
    const [seeAllRequestedUser, setseeAllRequestedUser] = useState([]);
    const [customerData, setCustomerData] = useState([])

    const [adminRequestData, setadminRequestData] = useState([]);

    var [link, setLink] = useState('');
    const djEmail = jscookie.get("user");

    var fetchDataDj = async () => {
        setLink('profile');
        const response = await axios.post(dj_requestUrl + '/djProfileDataFind', { djEmail });
        setDjUserInfo(response.data.userDjdata);
        setDjInfo(response.data.djData);
    }
    useEffect(() => {
        fetchDataDj();
    }, []);

    const fetchAdminRequestData = async () => {
        try {
            console.log("in fetchData ");
            const response = await axios.post(dj_requestUrl + '/djSeeAdminRequestedData', { djEmail })
            if (response.status == 201) {
                // adminDecorationRequestData
                console.log("response.data.adminDecorationRequestData : ", response.data.adminDecorationRequestData);
                setadminRequestData(response.data.adminDjRequestData)
            }
        } catch (err) {
            console.log("Error in catrers dashboard while showing data ", err);
        }
    };

    useEffect(() => {
        fetchAdminRequestData();
    }, []);

    const seeRequetDjToUser = async () => {
        try {
            setLink('seeRequetDjToUser');
            const response = await axios.post(dj_requestUrl + '/seeRequetDjToUser', { DjEmail: djInfo.DjEmail });
            setseeAllRequestedUser(response.data.AllRequtedData);
        } catch (error) {
            console.log("error find user request");
        }
    }

    const confirmRequest = async (userEmail, date, hours) => {
        var price = djInfo.Djprice;
        var response = await axios.post(dj_requestUrl + "/ConfirmrequestSendUser", { userEmail, date, hours, price });
        if (response) {
            Swal.fire({
                title: 'Confirm Request',
                text: response.data.message,
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                background: "black",
            })
        }
    }
    const handleDropdownToggle = () => {
        setDropdownOpen(!isDropdownOpen);
    };


    const djLogOut = () => {
        jscookie.remove("user");
        navigate('/', { replace: true });
    }

    const seeUserOder = async () => {
        try {
            setLink('CustomersOrder');
            const responseDataToCustomer = await axios.post(dj_requestUrl + '/CusetomerOderConfirm', { DjEmail: djInfo.DjEmail });
            setCustomerData(responseDataToCustomer.data.AllRequtedData);
        } catch (error) {
            console.log("error in find data in deshboard");

        }
    }

    const handleLinkClick = async (clickedLink) => {
        if (clickedLink !== link) {
            setLink(clickedLink);
            if (clickedLink === 'seeRequest') {
                await seeRequetDjToUser();
            } else if (clickedLink === '') {
                fetchDataDj();
            }
            else if (clickedLink === 'CustomersOrder') {
                await seeUserOder();
            }
        }
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
                    eventId,
                    djEmail
                }
                axios.post(dj_requestUrl + `/acceptRequestOfAdmin`, obj).then((response) => {
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
                        <span className="navbar-toggler-icon" ></span>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarResponsive">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <a className="navbar-brand mx-2 mx-lg-5 text-light" href="#">DJ-PROFILE</a>

                        <form className="d-flex mx-2 mx-lg-5 my-2">
                            <input className="form-control border-0 text-light nameSection" type="search" placeholder="Search" />
                        </form>

                        <div className="navbar-nav mx-2 mx-lg-5 my-2">
                            <button className="btn btn-danger">
                                <i className="bi bi-plus"></i> Add Gallery
                            </button>
                        </div>

                        <div className="collapse navbar-collapse" id="navbarResponsive">
                            <ul className="navbar-nav align-items-center ms-auto">
                                <li className="nav-item">
                                    <i className="fa fa-envelope me-lg-2 text-danger"></i>
                                    <span className="d-none d-lg-inline-flex text-light">Message</span>
                                </li>
                                <li className="nav-item">
                                    <i className="fa fa-bell me-lg-2 text-danger"></i>
                                    <span className="d-none d-lg-inline-flex text-light">Notification</span>
                                </li>
                                <li className={`nav-item dropdown ${isDropdownOpen ? 'show' : ''}`}>
                                    <a className="nav-link dropdown-toggle" id="userDropdown" role="button" onClick={handleDropdownToggle}>
                                        <img className="rounded-circle me-lg-2" src={djInfo.img} alt="" style={{ width: "40px", height: "40px" }} />
                                        <span className="d-none d-lg-inline-flex text-light">{djInfo.name}</span>
                                    </a>
                                    {isDropdownOpen && (
                                        <ul className="dropdown-menu show" aria-labelledby="userDropdown">
                                            <EditDjProfileModal DjInfo={djInfo} DjUserInfo={djUserInfo} />
                                            <li className="dropdown-item" onClick={djLogOut}>Logout</li>
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
                        <div className="d-flex align-items-center ms-4 mb-4" >

                            <Link
                                style={{ textDecoration: 'none', color: "white" }}
                                onClick={() => handleLinkClick('profile')}
                            >
                                <div className="d-flex align-items-center ms-4 mb-4" >
                                    <div className="position-relative">
                                        <img className="rounded-circle" src={userImage} alt="" style={{ width: "40px", height: "40px" }} />
                                        <div
                                            className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1">
                                        </div>
                                    </div>
                                    <div className="ms-3 pt-4">
                                        <h6 className="mb-0">{djUserInfo.name}</h6>
                                        <span className='mt-3'>Mobile No : {djUserInfo.contect}</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="navbar-nav w-100 mySideBar">
                            <div className="nav-item nav-link mySideBar text-light" onClick={() => handleLinkClick('seeRequest')}>
                                <i className="fa fa-th me-2 text-dark"></i>
                                See request
                            </div>
                            <div className="nav-item nav-link mySideBar text-light " onClick={() => handleLinkClick('adminRequest')}>
                                <i className="fa fa-th me-2 text-dark"></i>Admin Request
                            </div>
                            <div className="nav-item nav-link mySideBar text-light " >
                                <i className="fa fa-th me-2 text-dark"></i>Dashboard
                            </div>
                            <div className="nav-item nav-link mySideBar text-light " onClick={() => handleLinkClick('CustomersOrder')}>
                                <i className="fa fa-th me-2 text-dark"></i>Customers Orders
                            </div>
                            <div className="nav-item nav-link mySideBar text-light " onClick={() => handleLinkClick('bankDetails')} >
                                <i className="fa fa-th me-2 text-dark"></i>Add Bank Details
                            </div>

                            <div className="nav-item nav-link mySideBar text-light ">
                                <i className="fa fa-th me-2 text-dark"></i>Add Description
                            </div>
                            <div className="nav-item nav-link mySideBar text-light " onClick={() => handleLinkClick('updatePassword')}>
                                <i className="fa fa-th me-2 text-dark"></i>Updates Password
                            </div>

                        </div>
                    </nav>
                </div>
                {
                    link === 'seeRequetDjToUser' && (
                        <div className="col-lg-8 col-md-8 col-8">
                            <div className="row">
                                <div className="col-lg-12 mx-auto  text-light scrollers" >
                                    <table className="table table-dark table-hover" border={{ border: '2px' }}>
                                        <thead>
                                            <tr>
                                                <th scope="col">No.</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Time</th>
                                                <th>Hours</th>
                                                <th scope="col">Location</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {seeAllRequestedUser.map((data, index) => (
                                                <tr key={index}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{data.user.name}</td>
                                                    <td>{data.userEmail}</td>
                                                    <td>{data.date}</td>
                                                    <td>{data.time}</td>
                                                    <td>{data.djhours}</td>
                                                    <td>{data.location}</td>
                                                    <td><button className='btn btn-danger' onClick={() => confirmRequest(data.userEmail, data.date, data.djhours)} >
                                                        {data.status}
                                                    </button></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div></div></div>

                    )
                }

                {
                    link === 'profile' && (
                        <div className="col-lg-8 col-md-8 col-8">
                            <div className="container">
                                <div className="container-fluid outerProfileContainer">
                                    <img src={`http://localhost:4001/${djInfo.docs}`} />
                                </div>
                                <div className="container bg-dark belowProfileContainer">
                                    <div className="row">
                                        <div className="col col-lg-9 col-md-9 col-12">
                                            <h4 className='text-danger'>{djUserInfo.name}</h4>
                                            <span className="my-2 text-light" >Address : {djUserInfo.address}</span><br />
                                            <span className="my-2 text-light" >Email : {djUserInfo.email}</span><br />
                                            <span className="my-2 text-light">Business Name : {djInfo.Businessname} </span><br />
                                            <span className="my-2 text-light">Services Type : {djInfo.ServiceType} </span><br />
                                            <span className="my-2 text-light">Contect: {djUserInfo.contect} </span><br />
                                            <span className="my-2 text-light">Service Charge : &#x20B9; {djInfo.Djprice} </span><br />
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
                        </div>
                    )
                }
                {
                    link === 'CustomersOrder' && (
                        <div className="col-lg-8 col-md-8 col-8">
                            <div className="row">
                                <div className="col-lg-12 mx-auto  text-light scrollers" >
                                    <table className="table table-dark table-hover" border={{ border: '2px' }}>
                                        <thead>
                                            <tr>
                                                <th scope="col">No.</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Time</th>
                                                <th>Hours</th>
                                                <th scope="col">Location</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {customerData.map((data, index) => (
                                                <tr key={index}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{data.user.name}</td>
                                                    <td>{data.userEmail}</td>
                                                    <td>{data.date}</td>
                                                    <td>{data.time}</td>
                                                    <td>{data.djhours}</td>
                                                    <td>{data.location}</td>
                                                    <td><button className='btn btn-danger' onClick={() => confirmRequest(data.userEmail, data.date, data.djhours)} >
                                                        {data.status}
                                                    </button></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div></div></div>
                    )
                }


                {
                    link === 'adminRequest' && (
                        <div className="col-lg-8 col-md-8 col-8">
                            <div className="row">
                                <div className="col-lg-12 mx-auto  text-light scrollers" >
                                    <table className="table table-bordered table-hover table-dark">
                                        <thead>
                                            <tr>
                                                <th className='text-nowrap'>No.</th>
                                                <th className='text-nowrap'>Dj Email</th>
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
                                                            <td className='text-nowrap'>{data.djEmail}</td>
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
                                </div></div></div>
                    )
                }
                {
                    link == 'updatePassword' && (
                        <div className="col-lg-8 col-md-8 col-8">
                            <div className="container">
                                <DjUpdatePasswordModal djData={djInfo} />
                            </div>
                        </div>
                    )
                }
                {
                    link == 'bankDetails' && (
                        <div className="col-lg-8 col-md-8 col-8">
                            <div className="container">
                                <DjBankDetails data={djInfo} />
                            </div>
                        </div>
                    )
                }


            </div>
        </div><br />

    </>);
}

export default DjDashboard;
