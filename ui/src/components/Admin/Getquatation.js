import Accordion from 'react-bootstrap/Accordion';
import "./Getquatation.css"
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { admin_requestedUrl } from '../../urls';
import jscookies from 'js-cookie'
import Swal from 'sweetalert2';
import { adminShowVenueData } from '../../store/adminSlice';
import SendRequestToVenue from './SendRequestToVenue';
import SendRequestToDecoration from './SendRequestToDecoration';
import SendRequestToDj from './SendRequestToDj';
import SendRequestToCatere from './SendRequestToCatere';
import Prices from './Prices';

function Getquatation() {
    const adminEmail = jscookies.get('admin_email');
    const location = useLocation();
    const eventdata = location.state.eventdata;
    console.log("Data in get quatation : ", eventdata);

    const [alldecorationData, setAllDecorationData] = useState([]);
    const [alldjData, setAllDjData] = useState([]);
    const [allCatereData, setAllCatereData] = useState([]);
    const [userCatereData, setuserCatereData] = useState({});
    const [veneueUserData, setVenueData] = useState([]);
    const [eventQuatationServices, seteventQuatationServices] = useState({});

    useEffect(() => {
        fetchDecorationData();
        fetchDjData();
    }, []);

    useEffect(() => {
        var venuedata = adminShowVenueData();
        venuedata.then((venueData) => {
            if (venueData) {
                setVenueData(venueData.veneueData);
            } else {
                alert("no veneue Data find");
            }
        });
    }, []);

    useEffect(() => {
        fetchCatereData();
    }, []);

    const fetchCatereData = async () => {
        const response = await axios.post(admin_requestedUrl + '/seeCatereDataToAdmin', { userEmail: eventdata.userEmail });
        if (response.status == 201) {
            setAllCatereData(response.data.allCatereData);
            setuserCatereData(response.data.userData);
        }
        else {
            console.log('Error in fetchCatereData ');
        }
    }

    const fetchDecorationData = async () => {
        const response = await axios.post(admin_requestedUrl + `/seedecorationdatatoadmin`);
        if (response.status == 201) {
            setAllDecorationData(response.data.alldecorationData);
        }
        else {
            console.log('Error in fetchDecorationData ');
        }
    }

    const fetchDjData = async () => {
        const response = await axios.post(admin_requestedUrl + '/seedjdatatoadmin');
        if (response.status == 201) {
            setAllDjData(response.data.alldjdata);
        }
        else {
            console.log('Error in fetchDecorationData ');
        }
    }

    const customiseQuatation = (event) => {
        console.log("event.target.name : ", event.target.name);
        console.log("event.target.value : ", event.target.value);

        seteventQuatationServices({
            ...eventQuatationServices, [event.target.name]: event.target.value
        });

    }

    const SendQuatationToUser = async () => {
        eventQuatationServices.eventId = eventdata._id;
        eventQuatationServices.eventName = eventdata.eventname;
        eventQuatationServices.userId = eventdata.userid;

        console.log("eventQuatation Service : ", eventQuatationServices);

        var result = await axios.post(admin_requestedUrl + '/sendquatation', eventQuatationServices);
        if (result.status == 201) {
            alert("Quatation Successfully send..!");
        }
    }


    return (
        <>
            <div className="container bg-dark">
                <div className="container">
                    <div>
                        <h1 className="text-center text-white">Get <span className="webcolor"> Quatation</span></h1>
                        <h4 className="py-1 mx-5 text-white text-center"><b>Event Id : </b>{eventdata._id}</h4>
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
                                <h6 className="py-1 mx-5">Service Choose : {eventdata.serviceschoose[0].caterer ? 'caterer' : ''} , {eventdata.serviceschoose[0].decoration ? 'decoration' : ''} , {eventdata.serviceschoose[0].venu ? 'venue' : ''}</h6>
                                <h6 className="py-1 mx-5">Budget : {eventdata.budget} </h6>
                                <h6 className="py-1 mx-5">End date : {eventdata.enddate}</h6>
                                <h6 className="py-1 mx-5">Meal : {eventdata.meal} </h6>
                            </div>
                            <h5 className="py-1 text-center mt-3">Requirment of User</h5>
                            <div className='row'>
                                <div className={`col col-lg-3 ${(eventdata.customiseThali[0].Roti.length == 0 || eventdata.customiseThali[0].Sabji.length == 0) ? 'd-none' : ''}`}>
                                    {
                                        eventdata.customiseThali[0].Roti.length == 0 ? <p></p> :
                                            <h6 className="py-1 mx-5">
                                                Selected Roti :-
                                                {
                                                    eventdata.customiseThali[0].Roti.map((item, itemIndex) => (
                                                        <li key={itemIndex} className='m-2'>{item}</li>
                                                    ))
                                                }
                                            </h6>
                                    }
                                </div>
                                <div className={`col col-lg-3 ${(eventdata.customiseThali[0].Roti.length == 0 || eventdata.customiseThali[0].Sabji.length == 0) ? 'd-none' : ''}`}>
                                    {
                                        eventdata.customiseThali[0].Sabji.length == 0 ? <p></p> :
                                            <h6 className="py-1 mx-5">
                                                Selected Sabji :-
                                                {
                                                    eventdata.customiseThali[0].Sabji.map((item, itemIndex) => (
                                                        <li key={itemIndex} className='m-2'>{item}</li>
                                                    ))
                                                }
                                            </h6>
                                    }
                                </div>
                                <div className={`col col-lg-3 ${(eventdata.customiseThali[0].Dessert.length == 0 || eventdata.customiseThali[0].Starter.length == 0) ? 'd-none' : ''}`}>
                                    {
                                        eventdata.customiseThali[0].Dessert.length == 0 ? <p></p> :
                                            <h6 className="py-1 mx-5">
                                                Selected Dessert :-
                                                {
                                                    eventdata.customiseThali[0].Dessert.map((item, itemIndex) => (
                                                        <li key={itemIndex} className='m-2'>{item}</li>
                                                    ))
                                                }
                                            </h6>
                                    }
                                </div>
                                <div className={`col col-lg-3 ${(eventdata.customiseThali[0].Roti.length == 0 || eventdata.customiseThali[0].Sabji.length == 0) ? 'd-none' : ''}`}>
                                    {
                                        eventdata.customiseThali[0].Starter.length == 0 ? <p></p> :
                                            <h6 className="py-1 mx-5">
                                                Selected Starter :-
                                                {
                                                    eventdata.customiseThali[0].Starter.map((item, itemIndex) => (
                                                        <li key={itemIndex} className='m-2'>{item}</li>
                                                    ))
                                                }
                                            </h6>
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
                        <h3 className='text-center'>Select Services</h3>
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header><h5>Choose caterering</h5></Accordion.Header>
                                <Accordion.Body>
                                    <div className="w-100 table-responsive p-0 catererTable">
                                        <table className="table table-bordered table-hover table-dark">
                                            <thead>
                                                <tr>
                                                    <th className='text-nowrap'>Select</th>
                                                    <th className='text-nowrap'>No.</th>
                                                    <th className='text-nowrap'>UserName</th>
                                                    <th className='text-nowrap'>User Contect</th>
                                                    <th className='text-nowrap'>Event Location</th>
                                                    <th className='text-nowrap'>Catrer Email</th>
                                                    <th className='text-nowrap'>Business Name</th>
                                                    <th className='text-nowrap'>Specialization</th>
                                                    <th className='text-nowrap'>ServiceCharges</th>
                                                    <th className='text-nowrap'>Food Type</th>
                                                    <th className='text-nowrap'>Business Card</th>
                                                    <th className='text-nowrap'>Price</th>
                                                    <th className='text-nowrap'>Send Request</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    allCatereData.map((data, index) => {
                                                        return (<>
                                                            <tr key={index}>
                                                                <td>
                                                                    <input type='radio' name='catererId' className='catererService' value={`${data._id}`} onChange={(event) => { customiseQuatation(event) }} />
                                                                </td>
                                                                <td className='text-nowrap'>{index + 1}</td>
                                                                <td className='text-nowrap'>{userCatereData.name}</td>
                                                                <td className='text-nowrap'>{userCatereData.contect}</td>
                                                                <td className='text-nowrap'>{userCatereData.address}</td>
                                                                <td className='text-nowrap'>{data.catererEmail}</td>
                                                                <td className='text-nowrap'>{data.Businessname}</td>
                                                                <td className='text-nowrap'>{data.Specialization}</td>
                                                                <td className='text-nowrap'>{data.ServiceCharges}</td>
                                                                <td className='text-nowrap'>{data.FoodType}</td>
                                                                <td className='text-nowrap'><a href={`http://localhost:4001/${data.docs}`} target="_blank">
                                                                    <button className="ourbtn">see docs</button>
                                                                </a>
                                                                </td>

                                                                <td className='text-nowrap'>
                                                                    <Prices eventdata={eventdata} data={data} />
                                                                </td>
                                                                <td className='text-nowrap'>
                                                                    <SendRequestToCatere eventdata={eventdata} data={data} adminEmail={adminEmail} />
                                                                </td>
                                                            </tr>
                                                        </>)
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>

                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header><h5>Choose decorations</h5></Accordion.Header>
                                <Accordion.Body>
                                    <div className="w-100 table-responsive">
                                        <table className="table table-bordered table-hover table-dark">
                                            <thead>
                                                <tr>
                                                    <th className='text-nowrap'>Select</th>
                                                    <th className='text-nowrap'>No.</th>
                                                    <th className='text-nowrap'>Name</th>
                                                    <th className='text-nowrap'>Contact</th>
                                                    <th className='text-nowrap'>Address</th>
                                                    <th className='text-nowrap'>Email</th>
                                                    <th className='text-nowrap'>Businessname</th>
                                                    <th className='text-nowrap'>decoration Type</th>
                                                    <th className='text-nowrap'>Decoration Price</th>
                                                    <th className='text-nowrap'>Business Card</th>
                                                    <th className='text-nowrap'>Send Request</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    alldecorationData.map((data, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td className='text-nowrap'>
                                                                    <input type='radio' name='decorationId' className='decorationService' value={`${data._id}`} onChange={(event) => { customiseQuatation(event) }} /></td>
                                                                <td className='text-nowrap'>{index + 1}</td>
                                                                <td className='text-nowrap'>{data.name}</td>
                                                                <td className='text-nowrap'>{data.contect}</td>
                                                                <td className='text-nowrap'>{data.address}</td>
                                                                <td className='text-nowrap'>{data.DecorationEmail}</td>
                                                                <td className='text-nowrap'>{data.Businessname}</td>
                                                                <td className='text-nowrap'>{data.Decorationtype}</td>
                                                                <td className='text-nowrap'>{data.Decorationprice}</td>
                                                                <td className='text-nowrap'><a href={`http://localhost:4001/${data.docs}`} target="_blank">
                                                                    <button className="ourbtn">see docs</button>
                                                                </a>
                                                                </td>
                                                                <td className='text-nowrap'>
                                                                    <SendRequestToDecoration eventdata={eventdata} data={data} />
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header><h5>Choose djs</h5></Accordion.Header>
                                <Accordion.Body>
                                    <div className="w-100 table-responsive">
                                        <table className="table table-bordered table-hover table-dark">
                                            <thead>
                                                <tr>
                                                    <th className='text-nowrap'>Select</th>
                                                    <th className='text-nowrap'>No.</th>
                                                    <th className='text-nowrap'>Name</th>
                                                    <th className='text-nowrap'>Contact</th>
                                                    <th className='text-nowrap'>Address</th>
                                                    <th className='text-nowrap'>Email</th>
                                                    <th className='text-nowrap'>Businessname</th>
                                                    <th className='text-nowrap'>decoration Type</th>
                                                    <th className='text-nowrap'>Decoration Price</th>
                                                    <th className='text-nowrap'>Business Card</th>
                                                    <th className='text-nowrap'>Send Request</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    alldjData.map((data, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>
                                                                    <input type='radio' name='djId' className='decorationService' value={`${data._id}`} onChange={(event) => { customiseQuatation(event) }} />
                                                                </td>
                                                                <td className='text-nowrap'>{index + 1}</td>
                                                                <td className='text-nowrap'>{data.name}</td>
                                                                <td className='text-nowrap'>{data.contect}</td>
                                                                <td className='text-nowrap'>{data.address}</td>
                                                                <td className='text-nowrap'>{data.DjEmail}</td>
                                                                <td className='text-nowrap'>{data.Businessname}</td>
                                                                <td className='text-nowrap'>{data.EquipmentType}</td>
                                                                <td className='text-nowrap'>{data.Djprice}</td>
                                                                <td className='text-nowrap'><a href={`http://localhost:4001/${data.docs}`} target="_blank">
                                                                    <button className="ourbtn">see docs</button>
                                                                </a>
                                                                </td>
                                                                <td className='text-nowrap'>
                                                                    <SendRequestToDj eventdata={eventdata} data={data} />
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="3">
                                <Accordion.Header><h5>Choose Venue</h5></Accordion.Header>
                                <Accordion.Body>
                                    <div className="w-100 table-responsive">
                                        <table className="table table-bordered table-hover table-dark">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Select</th>
                                                    <th scope="col">Sno</th>
                                                    <th scope="col">Venue Name</th>
                                                    <th scope="col">Venue Location</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Venue Type</th>
                                                    <th scope="col">Venue Price</th>
                                                    <th scope="col">Booking Price </th>
                                                    <th scope="col">Number of Rooms</th>
                                                    <th scope="col">per Room Rate</th>
                                                    <th scope="col">Capacity</th>
                                                    <th scope="col">Policy</th>
                                                    <th scope="col">Gallery</th>
                                                    <th scope="col">Price</th>
                                                    <th scope="col">Send Request</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    veneueUserData.map((data, index) => (
                                                        <tr key={index}>
                                                            <td>
                                                                <input type='radio' name='venueId' className='venueService' value={`${data._id}`} onChange={(event) => { customiseQuatation(event) }} />
                                                            </td>
                                                            <td>{index + 1}</td>
                                                            <td>{data.VenueName}</td>
                                                            <td>{data.venueLocation}</td>
                                                            <td>{data.venueEmail}</td>
                                                            <td>{data.VenueType}</td>
                                                            <td>{data.venuePrice}</td>
                                                            <td>{data.bookingAmount}</td>
                                                            <td>{data.numRooms}</td>
                                                            <td>{data.roomCharge}</td>
                                                            <td>{data.capacity}</td>
                                                            <td>{data.policy}</td>
                                                            <td><img src={"http://localhost:4001/" + data.docs} alt="Registration image..." height={'50px'} width={'100px'} />
                                                            </td>
                                                            <td>
                                                                <Prices eventdata={eventdata} data={data} />
                                                            </td>
                                                            <td className='text-nowrap'>
                                                                <SendRequestToVenue eventdata={eventdata} venueEmail={data.venueEmail} data={data} adminEmail={adminEmail} />
                                                            </td>

                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>

                        </Accordion>
                        <div className='d-flex justify-content-center py-4'>
                            <button className='btn btn-danger w-25' onClick={() => {
                                SendQuatationToUser()
                            }}>
                                Send Quatation
                            </button>
                        </div>
                    </div>
                </div>
            </div >
        </>);
}

export default Getquatation; 