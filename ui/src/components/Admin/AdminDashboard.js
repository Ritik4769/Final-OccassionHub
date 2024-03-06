import "./AdminDashboard.css";
import AdminTopNavbar from "./AdminTopNavbar";
import AlluserSection from './AlluserSection.js';
import CatererSection from "./CatererSection.js";
import DecorationSection from "./DecorationSection.js";
import VenueSection from "./VenueSection.js";
import DjSection from "./DjSection.js";
import PassDetailSection from "./PassDetailSection.js";
import Dashboard from "./Dashboard.js";
import EventRequirementDetailSection from "./EventRequirementDetailSection.js";
import CatererUserData from "./CatererUserData.js";
import DjRequestData from "./DjUserRequestData.js";
import VenueRequestData from "./VenueRequestData.js";
import { useEffect, useState } from 'react'
import DecorationRequestData from "./DecorationRequestData.js";

import logo from '../../images/logohub.png';

<link href="lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css" rel="stylesheet" />
var show = false;
function AdmindashBoard() {
    const [section, setSection] = useState('dashboard');
    console.log("section ... : ", section);

    function silderBarToggle() {
        var sliderBar = document.getElementById("siderBar");
        var content = document.getElementById("content")
        if (show) {
            sliderBar.classList.remove("open")
            content.classList.remove("open")
            show = false;
        }
        else {
            sliderBar.classList.add("open")
            content.classList.add("open")
            show = true;
        }
    }
    return (
        <>
            <div className="container-fluid position-relative d-flex p-0 ">
                <div className="sidebar" id="siderBar">
                    <nav className="navbar navbar-light bg-dark p-0">
                        <div className="d-flex justify-content-start align-items-center w-100 navbar-div bg-dark p-0">
                            <img src={logo} height='70' />
                            <h3 href="" className="navbar-brand text-end text-white fw-bolder">
                                OCCASSION HUB
                            </h3>
                            <h2 className="text-white sidebar-toggler m-2 text-decoration-none flex-shrink-0" id="sidebar-toggler" onClick={silderBarToggle}>
                                <i className="bi bi-x-circle-fill"></i>
                            </h2>
                        </div>
                        {/* <div className="d-flex align-items-center ms-4 mb-1">
                            <div className="">
                                <h5 className="mb-0 text-white text-start">Dheeraj singh chouhan</h5>
                            </div>
                        </div> */}
                        <div className="navbar-nav w-100 ">
                            <p role="button" className="nav-item nav-link" onClick={() => { setSection('dashboard') }}>
                                <i className="bi bi-person-circle text-center"></i>
                                &nbsp;Dashboard
                            </p>
                            <p className="nav-item nav-link" onClick={() => { setSection('alluser') }}>
                                <i className="bi bi-person-circle text-center"></i>
                                &nbsp;All Users
                            </p>
                            <div className="nav-item dropdown">
                                <p className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                                    <i className="fa bi-person-circle text-center"></i>
                                    &nbsp;View All Staff
                                </p>
                                <div className="dropdown-menu bg-dark border-0 p-1">
                                    <p className="dropdown-item text-white" onClick={() => { setSection('caterer') }}>
                                        <i className="fa bi-person-circle text-center" ></i>
                                        &nbsp;Caterers Manager
                                    </p>
                                    <p className="dropdown-item text-white" onClick={() => { setSection('decoration') }}>
                                        <i className="fa bi-person-circle text-center" ></i>
                                        &nbsp;Decoration Manager
                                    </p>
                                    <p className="dropdown-item text-white" onClick={() => { setSection('venue') }}>
                                        <i className="fa bi-person-circle text-center" ></i>
                                        &nbsp;Venue Manager
                                    </p>
                                    <p className="dropdown-item text-white" onClick={() => { setSection('dj') }}>
                                        <i className="fa bi-person-circle text-center" ></i>
                                        &nbsp;Dj Manager
                                    </p>
                                </div>
                            </div>
                            <div className="nav-item dropdown">
                                <p className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                                    <i className="fa bi-person-circle text-center"></i>
                                    &nbsp;View Requested User Data
                                </p>
                                <div className="dropdown-menu bg-dark border-0 p-1">
                                    <p className="dropdown-item text-white" onClick={() => { setSection('catererUser') }}>
                                        <i className="fa bi-person-circle text-center" ></i>
                                        &nbsp;Caterers Manager
                                    </p>
                                    <p className="dropdown-item text-white" onClick={() => { setSection('decorationUser') }}>
                                        <i className="fa bi-person-circle text-center" ></i>
                                        &nbsp;Decoration Manager
                                    </p>
                                    <p className="dropdown-item text-white" onClick={() => { setSection('venueUser') }}>
                                        <i className="fa bi-person-circle text-center" ></i>
                                        &nbsp;Venue Manager
                                    </p>
                                    <p className="dropdown-item text-white" onClick={() => { setSection('djUser') }}>
                                        <i className="fa bi-person-circle text-center" ></i>
                                        &nbsp;Dj Manager
                                    </p>
                                </div>
                            </div>
                            <p className="nav-item nav-link" onClick={() => { setSection('alleventreq') }}>
                                <i className="fa bi-person-circle text-center"></i>
                                &nbsp;View All event Request
                            </p>
                            <p className="nav-item nav-link">
                                <i className="fa bi-person-circle text-center"></i>
                                &nbsp;Send Request all Staff
                            </p>
                            <p className="nav-item nav-link ">
                                <i className="fa bi-person-circle text-center"></i>
                                &nbsp;Send Quotation
                            </p>
                            <p className="nav-item nav-link">
                                <i className="fa bi-person-circle text-center"></i>
                                &nbsp;View Particular user Staff
                            </p>
                            <p className="nav-item nav-link" onClick={() => { setSection('passdetail') }}>
                                <i className="fa bi-person-circle text-center"></i>
                                &nbsp;View pass Detail
                            </p>
                            <p className="nav-item nav-link">
                                <i className="fa bi-person-circle text-center"></i>
                                &nbsp;Payment System
                            </p>
                        </div>
                    </nav>
                </div>

                <div className="content" id="content" style={{ display: "flex", flexDirection: "column" }}>
                    <AdminTopNavbar />
                    <div className="container-fluid p-0 bg-black" style={{ flexGrow: 1, }}>
                        {
                            {
                                'dashboard' : <Dashboard />,
                                'alluser': <AlluserSection />,
                                'caterer': <CatererSection />,
                                'decoration': <DecorationSection />,
                                'venue': <VenueSection />,
                                'dj': <DjSection />,
                                'passdetail': <PassDetailSection />,
                                'alleventreq': <EventRequirementDetailSection />,
                                'catererUser' :<CatererUserData/>,
                                'djUser':<DjRequestData/>,
                                'venueUser' : <VenueRequestData/>,
                                'decorationUser':<DecorationRequestData/>
                            }[section]
                        }
                        {/* <div className="w-100 table-responsive p-2 pt-4 ">
                            <table className="table table-bordered table-hover table-dark">
                                <thead>
                                    <tr>
                                        <th className="nowrap">Name</th>
                                        <th className="nowrap">Email</th>
                                        <th className="nowrap">Contact</th>
                                        <th className="nowrap">Address</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="text-nowrap">Dheeraj singh chouhan</td>
                                        <td>dheerajsinghchouhan94@gmail.com</td>
                                        <td>6264037225</td>
                                        <td>Indore</td>
                                    </tr>
                                    <tr>
                                        <td>Dheeraj singh chouhan</td>
                                        <td>dheerajsinghchouhan94@gmail.com</td>
                                        <td>6264037225</td>
                                        <td>Indore</td>
                                    </tr>
                                    <tr>
                                        <td>Dheeraj singh chouhan</td>
                                        <td>dheerajsinghchouhan94@gmail.com</td>
                                        <td>6264037225</td>
                                        <td>Indore</td>
                                    </tr>
                                    <tr>
                                        <td>Dheeraj singh chouhan</td>
                                        <td>dheerajsinghchouhan94@gmail.com</td>
                                        <td>6264037225</td>
                                        <td>Indore</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdmindashBoard;