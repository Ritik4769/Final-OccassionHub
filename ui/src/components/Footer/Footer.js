import img from '../../images/logohub.png'

import { useEffect, useState } from 'react';
function Footer() {
    const [isAdmin, setAdminPath] = useState(true);
    useEffect(() => {
        const pathname = window.location.pathname;
        if (pathname == '/admin' || pathname == '/adminHome' || pathname == '/getquatation' || pathname === '/viewquatation') {
            setAdminPath(true)
        }
        else {
            setAdminPath(false);
        }
    })

    if (!isAdmin) {
        return (<>
            <div className="p-1 bg-dark">
                <div className="container-fluid p-2 mt-5">
                    <div className='row text-start'>
                        <div className="col-lg-3 m-auto d-block align-items-center text-white p-4" style={{ width: '18rem' }}>
                            <img src={img} width='100%' alt='...' />
                        </div>
                        <div className="col-lg-3 m-auto d-block align-items-center text-white p-4" style={{ width: '18rem' }}>
                            <h3 className="p-1" style={{ borderBottom: '2px solid #FF0057' }}>Contact Info</h3>
                            <div className='mt-4'>
                                <p>123 Kalani Nagar , Indore</p>
                                <p>Phone Number : 6264037225</p>
                                <p>Email : occassionHub@gmail.com</p>
                            </div>
                        </div>
                        <div className="col-lg-3 m-auto d-block align-items-center text-white p-4" style={{ width: '18rem' }}>
                            <h3 className="p-1" style={{ borderBottom: '2px solid #FF0057' }}>Connect with uss</h3>
                            <div className='mt-4'>
                                <p>occassionhub.com</p>
                                <p>occassionhub.com</p>
                                <p>occassionhub.com</p>
                            </div>
                        </div>
                        <div className="col-lg-3 m-auto d-block align-items-center text-white p-4" style={{ width: '18rem' }}>
                            <h3 className="p-1" style={{ borderBottom: '2px solid #FF0057' }}>Newsletter Sign</h3>
                            <div className='mt-4 p-2'>
                                <p>Subscribe TO Our News Letter</p>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Enter Email" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                    <button className="ourbtn">Subscribe</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" text-center text-white d-block">
                        <div style={{ height: '2px', backgroundColor: '#FF0057', width: '' }}></div>
                        <p className="mt-3 fs-6">&copy; <b className="webcolor fs-5">occassionhub</b> 2023 All Right Reseved</p>
                    </div>
                </div>

            </div>
        </>);
    }
    else {
        return (<>
        </>);
    }
}

export default Footer;