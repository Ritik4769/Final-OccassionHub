import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import jscookies from 'js-cookie'
import Swal from 'sweetalert2';
import { user_requestedUrl } from '../../urls';

function ViewquatatioPage() {
    const location = useLocation();
    const data = location.state.data;
    console.log("data in viewQuatation page : ", data);

    const [eventdata, setEventdata] = useState({});
    const [catererdata, setCatererdata] = useState({});
    const [decorationdata, setDecorationdata] = useState({});
    const [djdata, setDjdata] = useState({});
    const [venuedata, setVenuedata] = useState({});
    const [totalprice, setTotalprice] = useState(0);

    console.log("caterereerererere : ", catererdata);


    const fetchData = async () => {
        var response = await axios.post(user_requestedUrl + '/viewQuatationData', { data })
        console.log("response in view quatation : ", response.data.allData);
        console.log("response in view quatation : eventv data : ", response.data.allData.eventData);
        setEventdata(response.data.allData.eventData);
        setCatererdata(response.data.allData.catererData);
        setDecorationdata(response.data.allData.decorationData);
        setDjdata(response.data.allData.djData);
        setVenuedata(response.data.allData.venueData);
        var totalPrice = 0
        response.data.allData.catererData.adminRequest.filter((data, index) => {
            totalPrice += (data.eventId === eventdata._id) ? data.Price * eventdata.totalguest + response.data.allData.catererData.ServiceCharges : 0
        })
        response.data.allData.decorationData.adminRequest.filter((data, index) => {
            totalPrice += (data.eventId === eventdata._id) ? data.Price : 0
        })
        response.data.allData.djData.adminRequest.filter((data, index) => {
            totalPrice += (data.eventId === eventdata._id) ? data.Price : 0
        })
        response.data.allData.venueData.adminRequest.filter((data, index) => {
            totalPrice += (data.eventId === eventdata._id) ? data.venueprice + response.data.allData.venueData.venuePrice : 0
        })
        console.log("TOTAL PRICE : ", totalPrice);
        setTotalprice(totalPrice);
    }


    useEffect(() => {
        console.log("in useEffect hook : ");
        fetchData();
    }, [])

    return (
        <>
            <div className="container bg-dark">
                <div className="container">
                    <div>
                        <h1 className="text-center text-white">View <span className="webcolor"> Quatation</span></h1>
                        <h4 className="py-1 mx-5 text-white text-center"><b>Event Name : </b>{eventdata.eventname}</h4>
                        <div className="row w-100 text-white py-3 m-0">
                            <div className="col col-lg-6">
                                <h6 className="py-1 mx-5"><b>Event Name : </b>{eventdata.eventname}</h6>
                                <h6 className="py-1 mx-5">User Email : {eventdata.userEmail}</h6>
                                <h6 className="py-1 mx-5">Total Guest : {eventdata.totalguest}</h6>
                                <h6 className="py-1 mx-5">Start date : {eventdata.startedate}</h6>
                                <h6 className="py-1 mx-5">Location : {eventdata.location}</h6>
                            </div>
                            <div className="col col-lg-6">
                                <h6 className="py-1 mx-5">Event type : {eventdata.eventtype}</h6>
                                <h6 className="py-1 mx-5">Service Choose : {eventdata && eventdata.serviceschoose && (eventdata.serviceschoose[0].caterer ? 'caterer' : '')} , {eventdata && eventdata.serviceschoose && (eventdata.serviceschoose[0].decoration ? 'decoration' : '')} , {eventdata && eventdata.serviceschoose && (eventdata.serviceschoose[0].venu ? 'venue' : '')}</h6>
                                <h6 className="py-1 mx-5">Budget : {eventdata.budget} </h6>
                                <h6 className="py-1 mx-5">End date : {eventdata.enddate}</h6>
                                <h6 className="py-1 mx-5">Meal : {eventdata.meal} </h6>
                            </div>
                            <h5 className="py-1 text-center mt-3">Requirment of User</h5>
                            {console.log("evewnt dataa : kjh : ", eventdata)}
                            <div className='row'>
                                <div className={`col col-lg-3 ${(eventdata && eventdata.customiseThali && (eventdata.customiseThali[0].Roti.length == 0 || eventdata.customiseThali[0].Sabji.length == 0) ? 'd-none' : '')}`}>
                                    {
                                        eventdata && eventdata.customiseThali && (eventdata.customiseThali[0].Roti.length == 0 ? <p></p> :
                                            <h6 className="py-1 mx-5">
                                                Selected Roti :-
                                                {
                                                    eventdata.customiseThali[0].Roti.map((item, itemIndex) => (
                                                        <li key={itemIndex} className='m-2'>{item}</li>
                                                    ))
                                                }
                                            </h6>)
                                    }
                                </div>
                                <div className={`col col-lg-3 ${(eventdata && eventdata.customiseThali && (eventdata.customiseThali[0].Roti.length == 0 || eventdata.customiseThali[0].Sabji.length == 0) ? 'd-none' : '')}`}>
                                    {
                                        eventdata && eventdata.serviceschoose && (
                                            eventdata.customiseThali[0].Sabji.length == 0 ? <p></p> :
                                                <h6 className="py-1 mx-5">
                                                    Selected Sabji :-
                                                    {
                                                        eventdata.customiseThali[0].Sabji.map((item, itemIndex) => (
                                                            <li key={itemIndex} className='m-2'>{item}</li>
                                                        ))
                                                    }
                                                </h6>)
                                    }
                                </div>
                                <div className={`col col-lg-3 ${(eventdata && eventdata.customiseThali && (eventdata.customiseThali[0].Dessert.length == 0 || eventdata.customiseThali[0].Starter.length == 0) ? 'd-none' : '')}`}>
                                    {
                                        eventdata && eventdata.customiseThali && (eventdata.customiseThali[0].Dessert.length == 0 ? <p></p> :
                                            <h6 className="py-1 mx-5">
                                                Selected Dessert :-
                                                {
                                                    eventdata.customiseThali[0].Dessert.map((item, itemIndex) => (
                                                        <li key={itemIndex} className='m-2'>{item}</li>
                                                    ))
                                                }
                                            </h6>)
                                    }
                                </div>
                                <div className={`col col-lg-3 ${(eventdata && eventdata.customiseThali && ( eventdata.customiseThali[0].Roti.length == 0 || eventdata.customiseThali[0].Sabji.length == 0) ? 'd-none' : '')}`}>
                                    {
                                        eventdata&&eventdata.customiseThali&&( eventdata.customiseThali[0].Starter.length == 0 ? <p></p> :
                                            <h6 className="py-1 mx-5">
                                                Selected Starter :-
                                                {
                                                    eventdata.customiseThali[0].Starter.map((item, itemIndex) => (
                                                        <li key={itemIndex} className='m-2'>{item}</li>
                                                    ))
                                                }
                                            </h6>)
                                    }
                                </div>
                            </div>
                            <div className={`col col-lg-6 ${eventdata.decorationtype ? '' : 'd-none'}`}>
                                {
                                    (eventdata.decorationtype) ? <h6 className="py-1 mx-5">
                                        Selected Decoration Type :- &nbsp;
                                        {
                                            eventdata.decorationtype
                                        }
                                    </h6> : <p></p>
                                }
                            </div>
                            <div className={`col col-lg-6 ${eventdata.venuetype ? '' : 'd-none'}`}>
                                {
                                    (eventdata.venuetype) ? <h6 className="py-1 mx-5">
                                        Selected Venue Type :- &nbsp;
                                        {
                                            eventdata.venuetype
                                        }
                                    </h6> : <p></p>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='text-white'>
                        <div className='py-4'>
                            <table className='table table-striped table-dark table-bordered table-hover text-center'>
                                <thead>
                                    <th>S.No.</th>
                                    <th>Name</th>
                                    <th>Service type</th>
                                    <th>Price</th>
                                </thead>
                                <tbody>
                                    {catererdata && catererdata.adminRequest && (
                                        catererdata.adminRequest.map((data, index) => (
                                            <tr key={index}>
                                                <td>1.</td>
                                                <td>{catererdata.Businessname}</td>
                                                <td>Caterer</td>
                                                <td>{data.eventId === eventdata._id ? data.Price * eventdata.totalguest + catererdata.ServiceCharges : ''}</td>
                                            </tr>
                                        ))
                                    )}
                                    {decorationdata && decorationdata.adminRequest && (
                                        decorationdata.adminRequest.map((data, index) => (
                                            <tr key={index}>
                                                <td>2.</td>
                                                <td>{decorationdata.Businessname}</td>
                                                <td>Decoration</td>
                                                <td>{data.eventId === eventdata._id ? data.Price : ''}</td>
                                            </tr>
                                        ))
                                    )}
                                    {djdata && djdata.adminRequest && (
                                        djdata.adminRequest.map((data, index) => (
                                            <tr key={index}>
                                                <td>3.</td>
                                                <td>{djdata.Businessname}</td>
                                                <td>Dj</td>
                                                <td>{data.eventId === eventdata._id ? data.Price : ''}</td>
                                            </tr>
                                        ))
                                    )}
                                    {venuedata && venuedata.adminRequest && (
                                        venuedata.adminRequest.map((data, index) => (
                                            <tr key={index}>
                                                <td>4.</td>
                                                <td>{venuedata.VenueName}</td>
                                                <td>Venue</td>
                                                <td>{data.eventId === eventdata._id ? data.venueprice + venuedata.venuePrice : ''}</td>
                                            </tr>
                                        ))
                                    )}
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td>Total</td>
                                        <td>{totalprice}</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td>GST</td>
                                        <td>{(5 * totalprice) / 100}</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td>GST</td>
                                        <td>{((5 * totalprice) / 100) + totalprice}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='d-flex justify-content-center py-4'>
                            <button className='btn btn-outline-danger w-25'>
                                {data.status}
                            </button>
                        </div>
                    </div>
                </div>
            </div >
        </>);
}

export default ViewquatatioPage;