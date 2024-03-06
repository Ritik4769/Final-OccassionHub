import './Navbar.css';
import { Link } from 'react-router-dom';
import video from '../images/main_video.mp4'
import logo from '../images/logohub.png'
import bday from '../images/Caterer.jpg';
import { useEffect, useState } from 'react';
import { adduser, setNavbar, RegisterUserData, userLogin, confirmResetPassword, forgetPassUser } from '../store/userSlice';
import jscookie from 'js-cookie';
import Modal from 'react-bootstrap/Modal';
import bannerSearchServices from "../images/bannerSearchServices.jpg";
import upcomingeventbanner from "../images/Rectangle 20.png";
import aboutpagebanner from "../images/image 14.png";
import profilebanner from "../images/artist-3480274_1280.jpg";
import bookticketbanner from "../images/card1.jpg";
import { user_requestedUrl } from '../urls';
import axios from 'axios';
import Swal from 'sweetalert2';

var result = "";
var username_check = false, email_check = false, password_check = false, mobile_check = false, address_check = false;
const modalCss = {
    content: {
        backgroundColor: '',
        border: 'none',
        borderRadius: '8px',
        width: '100%',
        height: '700px'
    }
}

function Navbar() {

    const [isLoginmodal, setLoginmodal] = useState(false);
    const [isLoginStatus, setLoginStatus] = useState(false);
    const [isRegistrationmodal, setRegistrationmodal] = useState(false);
    const [email, setEmail] = useState('');
    const [bannerPath, setBannerPath] = useState(video);
    const [isAdmin, setAdminPath] = useState(true);
    const [role, setRole] = useState('login');
    const [isForgoPassmodal, setForgotPassmodal] = useState(false);
    const [isResetPassmodal, setResetPassmodal] = useState(false);
    const [userData, setUserData] = useState({});
    const [userLoginData, setUserDataLogin] = useState();
    const [otp1, setOtp] = useState('');
    const [resetPass, setResetPass] = useState("");
    const [forgetemail, setforgetEmail] = useState("");
    const [Rotp, setRotp] = useState(null);

    useEffect(() => {
        const email = jscookie.get('user');
        setEmail(email);
        setLoginStatus(false);
        const pathname = window.location.pathname;
        console.log(pathname)
        if (pathname == "/searchServices") {
            setBannerPath(pathname);
            console.log("searchServices", bannerPath)
        } else if (pathname == "/catererprofile") {
            setBannerPath(pathname);
            console.log("catrerDashBoard", pathname)
        } else {
            setBannerPath(video);
        }

        if (pathname == '/admin' || pathname == '/getquatation'|| pathname === '/viewquatation') {
            setAdminPath(true)
        } else if (pathname == '/adminHome') {
            setAdminPath(true);
        }
        else {
            setAdminPath(false);
        }
        if (pathname == '/upcomingevent') {
            setBannerPath(pathname);
        } else if (pathname == "/aboutpage") {
            setBannerPath(pathname);
        } else if (pathname == "/profile") {
            setBannerPath(pathname);
        }
        else if (pathname == "/contactus") {
            setBannerPath(pathname);
        }
        else if (pathname == "/bookticket") {
            setBannerPath(pathname);
        } else if (pathname == "/decorationprofile") {
            setBannerPath(pathname);
        } else if (pathname == "/dj") {
            setBannerPath(pathname);
        }
    });

    useEffect(() => {
        var email = jscookie.get('user');
        var result = axios.post(user_requestedUrl + "/checkRole", { email })
        result.then((response) => {
            var userrole = response.data.role;
            setRole(response.data.role);
        })
            .catch(error => {
                console.error('Error:', error.message);
            });
    }, [isLoginStatus]);

    const checkRoutes = () => {

        setTimeout(() => {
            var pathname1 = window.location.pathname;
            console.log("pathname 1 : ", pathname1)
            if (pathname1 == "/searchServices") {
                setBannerPath(pathname1);
                console.log("searchServices", pathname1)
            } else if (pathname1 == "/catererprofile") {
                setBannerPath(pathname1);
                console.log("catrerDashBoard", pathname1)
            } else {
                setBannerPath(video);
            }
        }, 100);

    }

    function shownav() {
        var offcanvas = document.getElementById('offcanvasExample');
        var navlinks = document.querySelectorAll('.withouttransition');

        offcanvas.addEventListener('shown.bs.offcanvas', function () {
            navlinks.forEach(function (navlink, index) {
                setTimeout(function () {
                    navlink.classList.add('withtransition');
                    navlink.classList.remove('withouttransition');
                }, index * 200);
            });
        });
    }

    function closebutton() {
        var offcanvas = document.getElementById('offcanvasExample');
        var navlinks = document.querySelectorAll('.withtransition');
        document.getElementById('humburger').style.visibility = "visible";
        offcanvas.addEventListener('shown.bs.offcanvas', function () {
            navlinks.forEach(function (navlink, index) {
                navlink.classList.add('withouttransition');
                navlink.classList.remove('withtransition');
            });
        });
    }

    const getData = (event) => {
        const { name, value } = event.target;
        setUserData({
            ...userData,
            [name]: value
        });
        Validations(name, value);
    }

    const handleOtpChange = (event) => {
        setOtp(event.target.value);
    };

    const getOtp = async (event) => {
        event.preventDefault();
        if (username_check && email_check && password_check && mobile_check && address_check) {

            console.log("user data in getotp ", userData);
            result = adduser(userData);
            result.then((result) => {
                if (result.status == 201) {
                    console.log("result in registration controller ", result);
                    document.getElementById("otpfield").style.display = "block";
                    document.getElementById("signupbutton").style.visibility = "visible";
                    document.getElementById("getotpbutton").style.display = "none";
                } else {
                    Swal.fire({
                        background: "black",
                        icon: "error",
                        text: "email is already exists Login......!!",
                        showCloseButton: true,
                        focusConfirm: false,
                    });
                    // alert("email is already exists Login......!!")
                }
            })
        }
        else {
            alert("please fix error");
            Swal.fire({
                background: "black",
                icon: "error",
                text: "please Solve Error First......!",
                showCloseButton: true,
                focusConfirm: false,
            });
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (username_check && email_check && password_check && mobile_check && address_check) {

            result.then((result) => {
                if (result.data.Rotp == otp1) {
                    console.log("otp match");
                    var result = RegisterUserData(userData);
                    result.then((result) => {
                        if (result.status == 201) {
                            Swal.fire({
                                background: "black",
                                icon: "success",
                                text: "Registartion successfully",
                                showCloseButton: true,
                                focusConfirm: false,
                            });

                            setRegistrationmodal(false);
                            setLoginStatus(true)
                            event.target.reset();
                        }
                    });

                } else {
                    Swal.fire({
                        background: "black",
                        icon: "error",
                        text: "Otp Not Match",
                        showCloseButton: true,
                        focusConfirm: false,
                    });
                }
            });
        }
        else {
            alert("please fix error after otp");
            Swal.fire({
                background: "black",
                icon: "error",
                text: "please Solve Error after the OTP ......!",
                showCloseButton: true,
                focusConfirm: false,
            });
        }
    }

    const loginGetData = (event) => {
        const { name, value } = event.target;
        setUserDataLogin({
            ...userLoginData,
            [name]: value
        });
    }

    var message = "";
    const loginHandleSubmit = (event) => {
        event.preventDefault();
        var result = userLogin(userLoginData);
        result.then((userResultData) => {
            if (userResultData.status == 201) {
                message = userResultData.data.message
                Swal.fire({
                    background: "black",
                    icon: "success",
                    text: "login Successfully....!!",
                    showCloseButton: true,
                    focusConfirm: false,
                });
                setLoginStatus(true)
                setLoginmodal(false);
                event.target.reset();
            } else if (userResultData.status == 204) {
                Swal.fire({
                    background: "black",
                    icon: "success",
                    text: "Your accound has been temporary Blocked Please call the admin for Unblock...!",
                    showCloseButton: true,
                    focusConfirm: false,
                });
            } else {
                Swal.fire({
                    background: "black",
                    icon: "success",
                    text: "Invalide email and password plzz",
                    showCloseButton: true,
                    focusConfirm: false,
                });
                // alert("Invalide email and password plzz")
            }
        });
    }

    const forgetPassOtp = async (event) => {
        event.preventDefault();

        try {
            const result = await forgetPassUser(forgetemail);
            console.log("result in forgetpassotp : ", result);
            setRotp(result.data.Rotp);
            if (result.data.status) {
                console.log("result in forgot password controller ", result);
                document.getElementById("otpfield").style.display = "block";
                document.getElementById("signupbutton").style.visibility = "visible";
                document.getElementById("getotpbutton").style.display = "none";
            }
            else {
                alert("email does not exist");
                Swal.fire({
                    background: "black",
                    icon: "error",
                    text: "Email does not exist...!!",
                    showCloseButton: true,
                    focusConfirm: false,
                });
                setForgotPassmodal(false);
            }
        } catch (error) {
            console.error("Error in getForgotOtp function: ", error);
        }
    }

    const forgotPassHandleSubmit = (e) => {
        e.preventDefault()
        console.log("otp1 ", otp1)
        console.log("Rotp ", Rotp)
        if (Rotp === otp1) {
            setForgotPassmodal(false);
            setResetPassmodal(true);
            if (resetPass) {
                const result = confirmResetPassword({ forgetemail, resetPass });
                result.then((res) => {
                    if (res.status == 201) {
                        Swal.fire({
                            background: "black",
                            icon: "success",
                            text: "password update successfully",
                            showCloseButton: true,
                            focusConfirm: false,
                        });
                        setResetPassmodal(false);
                    }
                    else {
                        Swal.fire({
                            background: "black",
                            icon: "error",
                            text: "Error in password updated",
                            showCloseButton: true,
                            focusConfirm: false,
                        });
                    }
                })
            } else {

            }
        }
        else {
            alert("otp not match");
        }
    }


    const Validations = (name, value) => {
        console.log("name in validations : ", name);
        switch (name) {
            case 'name':
                var reg = /^[A-Za-z\s]+$/;
                console.log("username regex");
                if (value.trim() == "") {
                    document.getElementById("usernamelabel").style.color = "red";
                    document.getElementById("usernamelabel").innerHTML = "Name Required";
                    username_check = false;
                    return false
                } else if (reg.test(value)) {
                    document.getElementById('usernamelabel').style.color = "green";
                    document.getElementById("usernamelabel").innerHTML = "Looking Good";
                    username_check = true;
                    return true
                } else {
                    console.log("usernamelabel")
                    document.getElementById('usernamelabel').style.color = "red";
                    document.getElementById("usernamelabel").innerHTML = "Invalid name please enter only character";
                    username_check = false;
                    return false;
                }
                break;
            case 'email':
                if (value.trim() == "") {
                    document.getElementById("emaillabel").style.color = "red";
                    document.getElementById("emaillabel").innerHTML = "Email Required";
                    email_check = false;
                    return false;
                } else {
                    var reg = /^\w+([\.-])?\w*@[a-z]*([\.][a-z]{2,3})+$/;
                    if (reg.test(value)) {
                        document.getElementById("emaillabel").style.color = "green";
                        document.getElementById("emaillabel").innerHTML = "Looking Good";
                        email_check = true;
                        return true;
                    } else {
                        document.getElementById("emaillabel").style.color = "red";
                        document.getElementById("emaillabel").innerHTML = "Invalid email";
                        email_check = false;
                        return false;
                    }
                }
                break;
            case 'password':
                if (value.trim() == "") {
                    document.getElementById("passwordlabel").style.color = "red";
                    document.getElementById("passwordlabel").innerHTML = "Password Required";
                    password_check = false;
                    return false;
                } else {
                    var reg = /^[A-Za-z\d@$!%*?&]{8,}$/;
                    if (reg.test(value)) {
                        document.getElementById("passwordlabel").style.color = "green";
                        document.getElementById("passwordlabel").innerHTML = "Valid Password";
                        password_check = true;
                        return true;
                    } else {
                        document.getElementById("passwordlabel").style.color = "red";
                        document.getElementById("passwordlabel").innerHTML = "Invalid Password";
                        password_check = false;
                        return false;
                    }
                }
                break;

            case 'contect':
                var reg = /^[6789][0-9]{9}$/;
                if (value.trim() == '') {
                    document.getElementById("contactlabel").style.color = "red";
                    document.getElementById("contactlabel").innerHTML = "Mobile Number Required";
                    mobile_check = false;
                    return false;
                } else if ((/^[A-Za-z]+$/).test(value)) {
                    document.getElementById("contactlabel").style.color = "red";
                    document.getElementById("contactlabel").innerHTML = "Mobile Number must be a digit only";
                    mobile_check = false;
                    return false;
                } else if (!reg.test(value)) {
                    document.getElementById("contactlabel").style.color = "red";
                    document.getElementById("contactlabel").innerHTML = "Enter 10 digits Mobile number";
                    mobile_check = false;
                    return false;
                } else {
                    document.getElementById("contactlabel").style.color = "green";
                    document.getElementById("contactlabel").innerHTML = "Looking Good";
                    mobile_check = true;
                    return true;
                }
                break;
            case 'address':
                if (value == "") {
                    document.getElementById("addresslabel").style.color = "red";
                    document.getElementById("addresslabel").innerHTML = "Address Required";
                    address_check = false;
                    return false;
                } else {
                    document.getElementById("addresslabel").style.color = "green";
                    document.getElementById("addresslabel").innerHTML = "";
                    address_check = true;
                    return true;
                }
                break;
        }
    }

    if (isAdmin) {
        return (<></>);
    } else {
        window.addEventListener('scroll', function () {
            if (window.scrollY) {
                document.getElementById("navbar").style.height = '90px';
                document.getElementById("logo").style.height = '120px';
                document.getElementById("logo").style.width = '120px';
                document.getElementById("navbar").style.backgroundColor = "rgba(0, 0, 0, 0.5)"
                document.getElementById("hr").style.display = "none"
                document.getElementById("navbar").style.position = 'fixed';
                document.getElementById('content').style.marginTop = '20%'
            }
            else {
                document.getElementById("navbar").style.position = 'absolute';
                document.getElementById("navbar").style.height = '109px';
                document.getElementById("logo").style.height = '120px';
                document.getElementById("navbar").style.backgroundColor = "";
                document.getElementById('content').style.marginTop = '20%'
            }
        });

        return (
            <>
                <div className="maindiv">
                    {
                        (bannerPath == "/searchServices") ?
                            (<img src={bannerSearchServices} alt="loaded..." className="searchServicesBanner" />)
                            : (bannerPath == "/catererprofile") ?
                                (<></>)
                                : (bannerPath == "/decorationprofile") ?
                                    (<></>)
                                    : (bannerPath == "/dj") ?
                                        (<></>)
                                        : (bannerPath == "/upcomingevent")
                                            ? (<img src={upcomingeventbanner} alt="loaded..." className="searchServicesBanner" />)
                                            : (bannerPath == "/aboutpage") ?
                                                (<img src={aboutpagebanner} alt="loaded..." className="searchServicesBanner" />)
                                                : (bannerPath == "/profile") ?
                                                    (<img src={profilebanner} alt="loaded..." className="searchServicesBanner" />)
                                                    : (bannerPath == "/contactus") ?
                                                        (<></>)
                                                        : (bannerPath == "/bookticket") ?
                                                            (<img src={bookticketbanner} alt="loaded..." className="searchServicesBanner" />)
                                                            :
                                                            (
                                                                <video autoPlay loop muted plays-inline="true" className="video" width="100%">
                                                                    <source src={video} />
                                                                </video>
                                                            )
                    }
                    <div id="overlay">
                        <nav className="navbar navbar-expand-lg w-100" id="navbar">
                            <div className="container-fluid row">
                                <div className="col-lg-4 col-md-4 col-sm-4 col-4 d-flex justify-content-start">
                                    <i className="fa fa-bars ms-4" id="humburger" data-bs-toggle="offcanvas"
                                        data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"
                                        style={{ fontSize: "1.5rem", color: "white" }} onClick={() => { shownav() }}></i>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4 col-4 d-flex justify-content-center h-100">
                                    {/* <div> */}

                                    <img src={logo} id="logo" height="120vw" alt="" />
                                    {/* </div> */}
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4 col-4 d-flex justify-content-end">
                                    {
                                        (email) ? (role == "user") ? (
                                            <>
                                                <span role='button' >
                                                    <Link to='/profile' className='text-decoration-none text-white'>
                                                        <i className="bi bi-person" style={{ color: 'white', fontSize: '1.4rem' }} > </i><span className="fs-5" onClick={checkRoutes} >Profile</span>
                                                    </Link>
                                                </span>
                                            </>
                                        ) : (role == "catrer") ? (
                                            <>
                                                <span role='button'>
                                                    <Link to='/catererprofile' className='text-decoration-none text-white'>
                                                        <i className="bi bi-person" style={{ color: 'white', fontSize: '1.4rem' }} > </i><span className="fs-5" onClick={checkRoutes}>Profile</span>
                                                    </Link>
                                                </span>
                                            </>
                                        ) : (role == "dj") ? (
                                            <>
                                                <span role='button'>
                                                    <Link to='/dj' className='text-decoration-none text-white'>
                                                        <i className="bi bi-person" style={{ color: 'white', fontSize: '1.4rem' }} > </i><span className="fs-5" onClick={checkRoutes}>Profile</span>
                                                    </Link>
                                                </span>
                                            </>
                                        ) : (role == "decoration") ? (
                                            <>
                                                <span role='button'>
                                                    <Link to='/decorationDashboard' className='text-decoration-none text-white'>
                                                        <i className="bi bi-person" style={{ color: 'white', fontSize: '1.4rem' }} > </i><span className="fs-5" onClick={checkRoutes}>Profile</span>
                                                    </Link>
                                                </span>
                                            </>
                                        ) : (role == "venue") ? (
                                            <>
                                                <span role='button'>
                                                    <Link to='/venueDashboard' className='text-decoration-none text-white'>
                                                        <i className="bi bi-person" style={{ color: 'white', fontSize: '1.4rem' }} > </i><span className="fs-5" onClick={checkRoutes}>Profile</span>
                                                    </Link>
                                                </span>
                                            </>
                                        )
                                            :
                                            (<>
                                                <span role='button' onClick={() => { setLoginmodal(true) }} >
                                                    <i className="bi bi-box-arrow-in-right" style={{ color: 'white', fontSize: '1.4rem' }} > </i><span className="fs-5" >Login</span>
                                                </span>
                                            </>) : (<>
                                                <span role='button' onClick={() => { setLoginmodal(true) }} >
                                                    <i className="bi bi-box-arrow-in-right" style={{ color: 'white', fontSize: '1.4rem' }} > </i><span className="fs-5" >Login</span>
                                                </span>
                                            </>)
                                    }
                                </div>
                            </div>
                        </nav>
                        <div className="col-lg-12 ms-3" id="hr"></div>
                        <div className='text-center text-white p-4' id='content' style={{ marginTop: "11%" }}>

                            {bannerPath == "/searchServices" ? (
                                <>
                                    <div className="container d-flex flex-column justift-content-center position-relative fs-1">
                                        <h3 className='fs-1  navbarpara1'>Relax</h3>
                                        <h2 className='fs-1  navbarpara1'> With Us</h2>
                                        <h1 className='mt-3 fs-1 navbarpara2' style={{ color: "green" }}>NewsLetters</h1>
                                    </div>
                                </>) :
                                (bannerPath == "/catererprofile" || bannerPath == "/decorationprofile" || bannerPath == "/dj" || bannerPath == "/venue") ?
                                    "" :
                                    (bannerPath == "/contactus") ? "" :
                                        (bannerPath == "/aboutpage") ?
                                            <>
                                                <p className='navbarpara1'>Enjoy Our Event with us</p>
                                                <p className='mt-3 navbarpara2'>Evalute <span className='webcolor'> your Experience </span> with our Spectacular<br /> Events...!</p>
                                            </> : (bannerPath == "/servicepage") ?
                                                <>
                                                    <div className="container d-flex flex-column justift-content-center position-relative fs-1">
                                                        <h3 className='fs-1  navbarpara1'>Relax</h3>
                                                        <h2 className='fs-1  navbarpara1'> With Us</h2>
                                                        <h1 className='mt-3 fs-1 navbarpara2' style={{ color: "green" }}>NewsLetters</h1>
                                                    </div>
                                                </> :
                                                <>
                                                    <p className='navbarpara1'>Unleash the Extraordinary</p>
                                                    <p className='mt-3 navbarpara2'>Evalute <span className='webcolor'> your Experience </span> with our Spectacular<br /> Events...!</p>
                                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                    <div className="offcanvas-header">
                        <button type="button" className="btn text-white bg-dark font-weight-bold mt-2 ms-3 align-items-center" style={{ height: 'auto', width: '40px' }} data-bs-dismiss="offcanvas"
                            aria-label="Close" onClick={() => { closebutton() }}>
                            <h5>X</h5>
                        </button>
                    </div>
                    <div className="offcanvas-body">
                        <div className="text-end p-5">
                            <div className="mt-3 fs-4 withouttransition"><Link to='/' className='text-white fw-bold text-decoration-none'><span>Home</span></Link></div>
                            <div className="mt-3 fs-4 withouttransition"><Link to='/aboutpage' className='text-white fw-bold text-decoration-none'><span>About</span></Link></div>
                            <div className="mt-3 fs-4 withouttransition"><Link to='/' className='text-white fw-bold text-decoration-none'><span>Gallery</span></Link></div>
                            <div className="mt-3 fs-4 withouttransition"><Link to='/servicepage' className='text-white fw-bold text-decoration-none'><span>Services</span></Link></div>
                            <div className="mt-3 fs-4 withouttransition"><Link to='/contactus' className='text-white fw-bold text-decoration-none'><span>Contact</span></Link></div>
                            <div className="mt-3 fs-4 withouttransition"><Link to='/eventRequest' className='text-white fw-bold text-decoration-none'><span>Organise Event</span></Link></div>
                            {/* <div className="mt-3 fs-4 text-white fw-bold withouttransition"><span>Dj Manager</span></div>
                        <div className="mt-3 fs-4 text-white fw-bold withouttransition"><span>Oranise a Event</span></div>
                        <div className="mt-3 fs-4 text-white fw-bold withouttransition"><span>Catering Manager</span></div>
                        <div className="mt-3 fs-4 text-white fw-bold withouttransition"><span>Decoration Manager</span></div> */}
                        </div>
                    </div>
                </div>

                <Modal size="lg" show={isLoginmodal} onHide={() => { setLoginmodal(false) }} centered   >
                    <Modal.Body className='p-0'>
                        <div className="login bg-black">
                            <div className="container p-0">
                                <div className="row g-0 p-2">
                                    <div className="col-lg-5 bg-success p-0">
                                        <img src={bday} className="w-100" height='100%' alt="" />
                                    </div>
                                    <div className="myform col-lg-7 p-3 " >
                                        <div className='d-flex justify-content-end'>
                                            <button className='btn-close' aria-label="Close" onClick={() => { setLoginmodal(false) }}></button>
                                        </div>
                                        <div id='loginForm'>
                                            <h2 className="modal-title text-white" id="staticBackdropLabel" > <span className='webcolor'> LOGIN </span> FORM</h2>
                                            <form onSubmit={loginHandleSubmit}>
                                                <div className="mb-3 mt-4 d-flex flex-row align-items-center">
                                                    <input type="email" name="email" className="form-control input-field" id="exampleInputEmail1" aria-describedby="emailHelp"
                                                        placeholder="Enter Email" onChange={loginGetData} />
                                                    <i className="fa fa-envelope icon" aria-hidden="true"></i>
                                                </div>
                                                <div className="mb-3 mt-4 d-flex flex-row align-items-center">
                                                    <input type="password" name="password" className="form-control input-field" id="exampleInputPassword1" placeholder="Password" onChange={loginGetData} />
                                                    <i className="fa fa-unlock-alt icon" aria-hidden="true"></i>
                                                </div>
                                                <button type="submit" className="btn btn-light mt-3 fs-6">Sign In</button>
                                                <p className='fs-5 mt-2'>Don't have an account? <a className='webcolor' onClick={() => { setLoginmodal(false); setRegistrationmodal(true) }}>SignUp</a></p>
                                                <a className='webcolor cursorpointer' onClick={() => { setLoginmodal(false); setForgotPassmodal(true) }}>Forgot Password</a>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>

                <Modal size="xl" show={isRegistrationmodal} onHide={() => { setRegistrationmodal(false); }} centered  >
                    <Modal.Body className='p-0'>
                        <div className="login bg-black">
                            <div className="container">
                                <div className="row g-0">
                                    <div className="col-lg-6 p-4">
                                        <img src={bday} className="w-100 registrationimage" height='80%' alt="" />
                                    </div>
                                    <div className="myform col-lg-6" >
                                        <div className='mt-4' id='registrationForm'>
                                            <div className='d-flex justify-content-end'>
                                                <button className='btn-close' aria-label="Close" onClick={() => { setRegistrationmodal(false) }}></button>
                                            </div>
                                            <h2 className="modal-title text-white" id="staticBackdropLabel" > <span className='webcolor'> REGISTRATION </span> FORM</h2>
                                            <form onSubmit={handleSubmit}>
                                                <div className="mb-3 mt-4">
                                                    <i className="fa fa-user icon" aria-hidden="true"></i>
                                                    <input type="name" required className="form-control input-field" id="exampleInputName" aria-describedby="nameHelp"
                                                        placeholder="Name" name="name" onChange={getData} />
                                                    <span id="usernamelabel"></span>
                                                </div>
                                                <div className="mb-3 mt-4">
                                                    <i className="fa fa-envelope icon" aria-hidden="true"></i>
                                                    <input type="email" required name="email" className="form-control  input-field" id="exampleInputEmail1" aria-describedby="emailHelp"
                                                        placeholder="Enter Email" onChange={getData} />
                                                    <label id="emaillabel"></label>
                                                </div>
                                                <div className="mb-3">
                                                    <i className="fa fa-unlock-alt icon" aria-hidden="true"></i>
                                                    <input type="password" required name="password" className="form-control  input-field" id="exampleInputPassword1" placeholder="Password" onChange={getData} />
                                                    <label id="passwordlabel"></label>
                                                </div>
                                                <div className="mb-3 mt-4">
                                                    <i className="fa fa-phone icon" aria-hidden="true"></i>
                                                    <input type="text" required name="contect" className="form-control input-field" id="exampleInputContact" aria-describedby="contactHelp"
                                                        placeholder="Contact Us" onChange={getData} />
                                                    <label id="contactlabel"></label>
                                                </div>
                                                <div className="mb-3 mt-4">
                                                    <i className="fa fa-map-marker icon" aria-hidden="true"></i>
                                                    <input type="text" required name="address" className="form-control input-field" id="exampleInputAddress" aria-describedby="addressHelp"
                                                        placeholder="Address" onChange={getData} />
                                                    <label id="addresslabel"></label>
                                                </div>
                                                <div className="mb-3 mt-4" id='otpfield'>
                                                    <i className="fa fa-unlock-alt icon" aria-hidden="true"></i>
                                                    <input type="address" required name="address" onChange={handleOtpChange} className="form-control input-field" id="exampleInputAddress" aria-describedby="addressHelp"
                                                        placeholder="Enter Otp" />
                                                    <label id="text-white err4"></label>

                                                </div>
                                                <button className="btn btn-light mt-3" id='getotpbutton' name="otp" onClick={(event) => { getOtp(event) }}>get OTP</button>
                                                <button type="submit" className="btn btn-light mt-3" id='signupbutton'>Sign up</button>
                                                <p className='fs-5 mt-2' >Already have an account ? <a className='webcolor' onClick={() => { setRegistrationmodal(false); setLoginmodal(true) }}>SignIn</a></p>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>

                <Modal size="lg" show={isForgoPassmodal} onHide={() => { setForgotPassmodal(false) }} centered   >
                    <Modal.Body className='p-0'>
                        <div className="login bg-black">
                            <div className="container p-0">
                                <div className="row g-0 p-2">
                                    <div className="col-lg-5 bg-success p-0">
                                        <img src={bday} className="w-100" height='100%' alt="" />
                                    </div>
                                    <div className="myform col-lg-7 p-3 " >
                                        <div className='d-flex justify-content-end'>
                                            <button className='btn-close' aria-label="Close" onClick={() => { setForgotPassmodal(false) }}></button>
                                        </div>
                                        <div id='loginForm'>
                                            <h2 className="modal-title text-white" id="staticBackdropLabel" > <span className='webcolor'> Forgot Password </span> FORM</h2>
                                            <form onSubmit={forgotPassHandleSubmit}>
                                                <div className="mb-3 mt-4 d-flex flex-row align-items-center">
                                                    <input type="email" name="email" className="form-control input-field" id="exampleInputEmail1" aria-describedby="emailHelp"
                                                        placeholder="Enter Email" onChange={(event) => { setforgetEmail(event.target.value) }} />
                                                    <i className="fa fa-envelope icon" aria-hidden="true"></i>
                                                </div>
                                                <div className="mb-3 mt-4" id='otpfield'>
                                                    <i className="fa fa-unlock-alt icon" aria-hidden="true"></i>
                                                    <input type="address" required name="address" onChange={handleOtpChange} className="form-control input-field" id="exampleInputAddress" aria-describedby="addressHelp"
                                                        placeholder="Enter Otp" />
                                                </div>
                                                <button className="btn btn-light mt-3" id='getotpbutton' name="otp" onClick={(event) => { forgetPassOtp(event) }}>get OTP</button>
                                                <button type="submit" className="btn btn-light mt-3" id='signupbutton' onclick={() => { setResetPassmodal(true); setForgotPassmodal(false) }}>Submit</button>
                                                {/* <p className='fs-5 mt-2'>Don't have an account? <a className='webcolor' onClick={() => { setLoginmodal(false); setRegistrationmodal(true) }}>SignUp</a></p>
                                                <a className='webcolor' onClick={() => { setForgotPassmodal(false); setForgotPassmodal(true) }}>Forgot Password</a> */}
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>

                <Modal size="lg" show={isResetPassmodal} onHide={() => { setResetPassmodal(false) }} centered   >
                    <Modal.Body className='p-0'>
                        <div className="login bg-black">
                            <div className="container p-0">
                                <div className="row g-0 p-2">
                                    <div className="col-lg-5 bg-success p-0">
                                        <img src={bday} className="w-100" height='100%' alt="" />
                                    </div>
                                    <div className="myform col-lg-7 p-3 " >
                                        <div className='d-flex justify-content-end'>
                                            <button className='btn-close' aria-label="Close" onClick={() => { setResetPassmodal(false) }}></button>
                                        </div>
                                        <div id='loginForm'>
                                            <h2 className="modal-title text-white" id="staticBackdropLabel" > <span className='webcolor'> Reset Password</span> FORM</h2>
                                            <form onSubmit={forgotPassHandleSubmit}>
                                                <div className="mb-3 mt-4 d-flex flex-row align-items-center">
                                                    <input type="password" name="password" className="form-control input-field" id="exampleInputPassword1" placeholder="New Password" onChange={(event) => { setResetPass(event.target.value) }} />
                                                    <i className="fa fa-unlock-alt icon" aria-hidden="true"></i>
                                                </div>
                                                <div className="mb-3 mt-4 d-flex flex-row align-items-center">
                                                    <input type="password" name="password" className="form-control input-field" id="exampleInputPassword2" placeholder="Confirm Password" />
                                                    <i className="fa fa-unlock-alt icon" aria-hidden="true"></i>
                                                </div>
                                                <button type="submit" className="btn btn-light mt-3 fs-6">Submit</button>
                                                {/* <p className='fs-5 mt-2'>Don't have an account? <a className='webcolor' onClick={() => { setLoginmodal(false); setRegistrationmodal(true) }}>SignUp</a></p>
                                                <a className='webcolor' onClick={() => { setForgotPassmodal(false); setForgotPassmodal(true) }}>Forgot Password</a> */}
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </>);
    }
}

export default Navbar;
