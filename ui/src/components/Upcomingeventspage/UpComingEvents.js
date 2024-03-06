import React, { useEffect, useState } from "react";
import { user_requestedUrl } from "../../urls.js";
import axios from "axios";
import './upcomingevents.css';
import { Link } from 'react-router-dom';
import jscookie from 'js-cookie';
function UpComingEvents() {
    const isLoggedIn = jscookie.get("user") != undefined;
    const [eventData, setEventData] = useState([]);
    useEffect(() => {
        upcomingEvent1();
    }, []);

    const upcomingEvent1 = async () => {
        try {
            var upEventData = await axios.post(user_requestedUrl + '/upcomingEvent');
            setEventData(upEventData.data.passes);

        } catch (error) {
            console.log("error in upcomming event Slice : ", error);

        }
    }

    return (
        <>
            <div className='mt-5 position-relative'>
                <h3 className="d-flex justify-content-center mt-3 text-white" >Our Latest Events</h3>
                <h2 className="d-flex justify-content-center my-4">
                    <span id="headingUpcomingEvent">Our Upcoming</span>
                    <span id="headingEvent">Events</span>
                </h2>
                <div className="container">
                    {
                        eventData.map((data, index) => {
                            return (<div className="row p-4 mb-5 bg-dark rounded w-80 m-auto maindiv">
                                <div className="col-lg-5 col-md-12" >
                                    {/* <img src={`http://localhost:4001/${data.docs}`} id="upcomingSection" /> */}
                                    <div className="position-relative  w-50 h-50 " >
                                        <img src={`http://localhost:4001/${data.docs}`} id="upcomingSection" />
                                    </div>
                                </div>
                                <div className="col-lg-7 col-md-12 d-flex flex-column " id="upcomingSection2">
                                    <h2 className="my-1 mx-1">
                                        <span className='text-white'>{data.passname}</span>
                                    </h2>
                                    <h4 className="mx-1 text-white">Ticket Price <span><i className="fa fa-rupee webcolor fs-5"></i></span> Rs. {data.passesPrice}</h4>
                                    {/* <h4 className="mx-1 text-white">Quantity <span></span> : {data.Quantity}</h4> */}

                                    <hr className='text-white' />
                                    <p className="text_justify mx-1">Lorem ipsum dolor sit amet consectetur adipisicing elit.  nobis eos impedit provident sunt alias facilis at.</p>
                                    <h6>
                                        <span><i className="fa fa-calendar-o mx-2 fs-5 webcolor"></i></span><span className='whiteColour mx-2 '>Start Date : {data.Start_Date}</span><br />
                                        <br />
                                        <span><i className="fa fa-clock-o mx-2 fs-5 webcolor"></i></span><span className='whiteColour mx-2 '>Start Time : {data.startTime}</span><br /><br />
                                        <span><i className="fa fa-clock-o mx-2 fs-5 webcolor"></i></span><span className='whiteColour mx-2 '>End Time : {data.EndTime}</span><br />
                                        <span><i className="fa fa-map-marker mx-2 my-3 fs-5 webcolor"></i></span><span className='whiteColour mx-2'>{data.address}</span><br />
                                    </h6>
                                    <div className="container my-1">
                                        <div className="row">
                                            <div className="col col-lg-6 col-md-6 col-12">
                                                <Link to='/bookticket'>
                                                    <button className="btn btn-danger w-75 mt-2">Booking Ticket</button>
                                                </Link>
                                            </div>
                                            <div className="col col-lg-6 col-md-6 col-12 col-offset-3">
                                                <button className="btn btn-outline-danger w-75  mt-2" style={{ backgroundColor: "white", color: "black" }}>Event Details</button></div>
                                        </div>
                                    </div>
                                </div>
                            </div>)
                        })
                    }

                </div>
            </div >
        </>
    );
}

export default UpComingEvents;
