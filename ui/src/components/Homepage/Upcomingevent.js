import './upcomingevent.css'
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import React, { useEffect, useState } from "react";
import { user_requestedUrl } from "../../urls.js";
import jscookie from 'js-cookie';
function Upcomingevent() {
    const isLoggedIn = jscookie.get("user") != undefined;
    const [eventData, setEventData] = useState([]);
    useEffect(() => {
        upcomingEvent1();
    }, []);

    const upcomingEvent1 = async () => {
        try {
            console.log('hello jayanti');
            var upEventData = await axios.post(user_requestedUrl + '/upcomingEvent');
            console.log("upEventData :------->  ", upEventData.data.passes);
            setEventData(upEventData.data.passes);

        } catch (error) {
            console.log("error in upcomming event Slice : ", error);

        }
    }
    console.log("data111 ", eventData);
    const displayedEvents = eventData.slice(0, 4);
    return (<>
        <div className="bg-black p-2">
            <h5 className="text-center text-light mt-3">Our Latest Event</h5>
            <h1 className="text-center text-white mt-3"><span className="webcolor">Our Upcoming </span>Events...! </h1>
            <div className="container p-5">
                <div className='row'>
                    {

                        displayedEvents.map((data, index) => {
                            return (
                                <div className="card p-2 bg-dark text-white col-lg-3 m-auto" style={{ width: "18rem" }} key={data._id}>
                                    <div className='carddiv1'>
                                        <img src={`http://localhost:4001/${data.docs}`} height="200" className="card-img-top" alt="..." />
                                        {/* <div className='carinnerdiv text-center'>26 <br /> June</div> */}
                                    </div>
                                    <h4 className="card-title fw-bold p-1 mt-2"><span className='webcolor'>{data.passname}</span></h4>
                                    <div className="card-body">
                                        <span className="card-text">Ticket Price $ {data.passesPrice}</span><br />
                                        <span className="card-text">Event Date : {data.Start_Date}</span><br />
                                        <span className="card-text">Start Time : {data.startTime}</span><br />
                                        <span className="card-text">End Time : {data.EndTime}</span><br />
                                        {/* <span className="card-text">
                                        End Date : {data.last_Date}</span><br /> */}
                                        <span className="card-text">Address : {data.address}</span><br />
                                        <span className="card-text">Quantity : {data.Quantity}</span><br />
                                    </div>
                                    <div className='d-flex justify-content-around'>
                                        {/* <button className='ourbtn mt-1' >Book Ticket</button> */}
                                        <button className='ourbtn mt-1' >{isLoggedIn ? (
                                            <Link style={{ color: "white", textDecoration: "none" }} to='/bookticket' className='text-white fw-bold text-decoration-none'>
                                                <span>Book Ticket</span>
                                            </Link>
                                        ) : (
                                            <span onClick={() => Swal.fire({
                                                background: "black",
                                                icon: "error",
                                                text: "please login first",
                                                showCloseButton: true,
                                                focusConfirm: false,
                                            })}>Book Ticket</span>
                                        )}</button>
                                        <button className='ourbtn1 mt-1'>Event Detail</button>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
                <div className='text-center mt-3'>
                    <Link to='/upcomingevent'><button className='ourbtn'>View All Upcoming Events</button></Link>
                </div>
            </div>
        </div>
    </>);
}

export default Upcomingevent;