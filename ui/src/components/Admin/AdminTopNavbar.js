import './AdminTopNavbar.css';
import userImage from '../../images/user.jpg';
import jscookie from 'js-cookie'
var show = false
function AdminTopNavbar() {
const admin_email  = jscookie.get("admin_email");
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

    return (<>
        <nav className="navbar navbar-expand-lg bg-dark  px-4 py-0">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" onClick={silderBarToggle}>
                    <i className="fa fa-solid fa-bars fs-3 text-white"></i>
                </button>
                <a className="navbar-brand mx-2 mx-lg-5 text-light" href="#">ADMIN DASHBOARD</a>
                <div className="contentlinks">
                    <ul className="navbar-nav align-items-center ms-auto">
                        <li className="nav-item">
                            <a href="#" className="nav-link" >
                                <i className="fa fa-envelope me-lg-2 text-warning"></i>
                                <span className="text-light">Message</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="fa fa-bell me-lg-2 text-danger"></i>
                                <span className="text-light">Notification</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link" >
                                <img className="rounded-circle me-lg-2" src={userImage} alt=""
                                    style={{ width: " 40px", height: "40px" }} />
                                <span className="text-light">{admin_email}</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </>);
}

export default AdminTopNavbar;