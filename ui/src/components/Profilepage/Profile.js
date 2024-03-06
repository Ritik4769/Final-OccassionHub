
import { Link } from 'react-router-dom';
import '../../App.css';
import userProfile from "../../images/userProfile.png";
import './profile.css';
import jscookie from 'js-cookie';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { user_requestedUrl } from '../../urls.js';
import DjForm from '../DjRegistration/DjForm.js';
import Caterersreg from '../CatererRegistration/Caterersreg.js'
import Decorationform from '../DecorationRegistration/Decorationform.js';
import Venue from '../VenueRegistration/Venueform.js';
import EditProfile from './EditProfileModal.js';
import UpdatePasswordModal from './UpdatePasswordModal.js';
import ShowsResponseModal from './ShowsResponseModal.js'
import CatrerResponse from './CatrerResponse.js';
import DjResponse from './DjResponse.js';
import VenueResponse from './venueResponse.js';
import DecorationResponse from './DecorationResponse.js';
import UpdateProfileProfile from './updatProfileDataModal.js';
import ViewquatatioPage from './ViewquatatioPage.js';

var userData = {};
function Profile() {
    const history = useNavigate();
    const [link, setLink] = useState("profile");
    const [djData, setDjData] = useState([]);
    const [userDetails, setuserDetails] = useState({});
    const [activeRequestLink, setActiveRequestLink] = useState('caterer');
    const [quatation, setQuatation] = useState([]);
    var userEmail = jscookie.get("user");

    console.log("userEmail on profile page ---------", userEmail);
    useEffect(() => {
        profileData();
    }, [userEmail]);
    console.log("djData --------------->", djData);

    const profileData = () => {
        setLink("profile")
        if (userEmail) {
            try {
                axios.post(user_requestedUrl + "/profile", { userEmail: userEmail })
                    .then(response => {
                        setuserDetails(response.data.userDetails);
                    })
                    .catch(err => {
                        console.log("Error in user profile data ", err);
                    });
            } catch (err) {
                console.log("Error in user profile data ", err);
            }
        }
    }

    const quatationData = async () => {
        setLink('quatationdata');
        const userId = jscookie.get('userID');
        console.log("userId in quatattion data : ", userId);
        var response = await axios.post(user_requestedUrl + `/viewQuatation/${userId}`);
        if (response.status === 201) {
            console.log("response.data in quatation data : ", response.data.quatationData);
            setQuatation(response.data.quatationData);
        }
        else {
            alert("data not found...!");
        }
    }

    const requstedData = async () => {
        setLink("requestedData");
        var response = await axios.post(user_requestedUrl + "/seeRequetedData", { userEmail });
        console.log("response in requetData -=- = . l ,dd: ", response);
        console.log("response djData", response.data.djUserData)
        setDjData(response.data.djUserData);
    }

    const viewquatation = (data) => {
        // { state : { data } }
        console.log("data in view Quatation page : ", data);
        history('/viewquatation', { state: { data } });

    }

    const userLogout = () => {
        jscookie.remove("user");
        history('/');
    }

    return (<>
        <div className='container p-2 w-75 text-white mb-3 profilemaincontainer'>
            <div className='bg-dark p-2'>
                <div className='row'>
                    <div className='col-lg-12 d-flex justify-content-end'>
                        <button className='btn btn-danger mx-1'><Link to="/searchServices" className='text-decoration-none text-white'>Search Services</Link></button>
                        <button className='btn btn-danger mx-2' onClick={() => { requstedData() }}>
                            <i className="fa fa-bell" aria-hidden="true"></i>
                        </button>
                        {/* <ShowsResponseModal /> */}
                        <button className='btn btn-danger mx-2' onClick={() => { profileData() }}>
                            <i className="fa fa-user" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
                <div className='row p-0'>
                    <div className='col-lg-4 d-flex flex-column justify-content-center'>
                        {/* <div className="d-flex justify-content-center flex-column align-items-center  mt-1">
                            <img src={userProfile} className="img-fluid" width='60%' alt="Profile Image" />
                        </div> */}
                        <div className="d-flex justify-content-center flex-column align-items-center  mt-1">
                            <img src={`http://localhost:4001/${userDetails.img}`} className="img-fluid" style={{ height: '200px', width: '200px', borderRadius: '50%' }} alt="Profile Image" />
                            <UpdateProfileProfile />
                        </div>
                        <div className='profilebuttons d-flex flex-column justify-content-center mt-3'>
                            <button className="btn btn-danger w-75 mt-1 " ><Link to="/passes" style={{ color: "white", textDecoration: "none" }}>Buy Passes</Link></button>

                            <div className="dropdown m-0">
                                <a className="btn btn-danger w-75 mt-1 dropdown-toggle" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                    Become a Staff
                                </a>
                                <ul className="dropdown-menu bg-danger" aria-labelledby="dropdownMenuLink">
                                    <li className="dropdown-item cursorpointer">
                                        <DjForm />
                                    </li>
                                    <li className="dropdown-item cursorpointer">
                                        <Caterersreg />
                                    </li>
                                    <li className="dropdown-item cursorpointer">
                                        <Decorationform />
                                    </li>
                                    <li className="dropdown-item cursorpointer">
                                        <Venue />
                                    </li>
                                </ul>
                            </div>

                            {/* <QutationModal userDetails={userDetails} /> */}
                            <button className="btn btn-danger w-75 mt-1 " style={{ width: "250px" }} onClick={() => {
                                quatationData();
                            }}>View Quatation</button>
                            <button className="btn btn-danger w-75 mt-1 " style={{ width: "250px" }}>View Bill</button>
                            <button className="btn btn-danger w-75 mt-1 " style={{ width: "250px" }} onClick={userLogout}>Log Out</button>
                        </div>
                    </div>

                    <div className='col-lg-8 py-2 commonsection'>
                        {
                            link === 'profile' ? (
                                <>
                                    <div className='mt-4'>
                                        <h2 className="usernameProfile">I am <span className='nameP'>{userDetails.name}</span></h2>
                                        {/* <button className="btn btn-danger">Edit Profile</button> */}
                                        <EditProfile userData={userDetails} />
                                        <UpdatePasswordModal userData={userDetails} />
                                        <hr style={{ height: '3px', backgroundColor: "#ff0057" }} />
                                    </div>
                                    <div className='py-4'>
                                        <div className='row mt-2'>
                                            <div className='col-lg-4 text-start'>
                                                <h5>Email</h5>
                                            </div>
                                            <div className='col-lg-8 text-start'>
                                                <h5>{userDetails.email}</h5>
                                            </div>
                                        </div>
                                        <div className='row mt-2'>
                                            <div className='col-lg-4 text-start'>
                                                <h5>Address</h5>
                                            </div>
                                            <div className='col-lg-8 text-start'>
                                                <h5>{userDetails.address}</h5>
                                            </div>
                                        </div>
                                        <div className='row mt-2'>
                                            <div className='col-lg-4 text-start'>
                                                <h5>Phone Number</h5>
                                            </div>
                                            <div className='col-lg-8 text-start'>
                                                <h5>{userDetails.contect}</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='py-2 text-grey' style={{ background: "" }}>
                                        <h4 className=''>Informantion</h4>
                                        <h6 className=''>1) If you want to plan your own event, you can click on the "Organize Event".</h6>
                                        <h6 className=''>2) If you want to become a service provider, you can click on "Become a Service Provider"  button.</h6>
                                        <h6 className=''>3) If you wish to choose services such as caterers, venues, decorations, DJs than go to search.</h6>
                                    </div>
                                </>
                            ) : (link === 'quatationdata') ? (<>
                                <div className='container requestservicesection'>
                                    <h5 className='text-white text-center'>View Quatation</h5>
                                    <div className='table-responsive py-2' style={{ height: '375px' }}>
                                        <table className='table table-stripped table-dark'>
                                            <thead>
                                                <tr>
                                                    <th>S.No.</th>
                                                    <th>Event Name</th>
                                                    <th>Total Price</th>
                                                    <th>Status</th>
                                                    <th>View</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    quatation.map((data, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{index + 1}.</td>
                                                                <td>{data.eventName}</td>
                                                                <td>{data.totalPrice}</td>
                                                                <td>{data.status}</td>
                                                                <td>
                                                                    <button className='btn btn-outline-danger' onClick={() => {
                                                                        viewquatation(data)
                                                                    }}>
                                                                        view
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>

                                        </table>
                                    </div>
                                </div>
                            </>) : (
                                <>
                                    <div className='requestservicesection'>
                                        <div className='profilepagerequestheading'>
                                            <div className="container d-flex justify-content-center">
                                                <ul className="nav fs-4 w-100 d-flex justify-content-around py-1">
                                                    <li className={`nav-item w-25 d-flex justify-content-center`} onClick={() => { setActiveRequestLink('caterer') }}>
                                                        <button className="nav-link pb-0 pt-0">Caterer</button>
                                                    </li>
                                                    <li className="nav-item webcolor w-25 d-flex justify-content-center" onClick={() => { setActiveRequestLink('decoration') }}>
                                                        <button className="nav-link pb-0 pt-0">Decoration</button>
                                                    </li>
                                                    <li className="nav-item webcolor w-25 d-flex justify-content-center" onClick={() => { setActiveRequestLink('djs') }}>
                                                        <button className="nav-link pb-0 pt-0">DJ</button>
                                                    </li>
                                                    <li className="nav-item webcolor w-25 d-flex justify-content-center" onClick={() => { setActiveRequestLink('venue') }}>
                                                        <button className="nav-link pb-0 pt-0">Venue</button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className='requestsections' style={{ height: '375px' }}>
                                            {
                                                {
                                                    'caterer': <CatrerResponse />,
                                                    'decoration': <DecorationResponse />,
                                                    'djs': <DjResponse />,
                                                    'venue': <VenueResponse />
                                                }[activeRequestLink]
                                            }
                                        </div>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>

    </>)

}
export default Profile;