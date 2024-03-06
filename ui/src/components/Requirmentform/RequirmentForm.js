import './requirmentform.css';
import { useState } from 'react';
import axios from 'axios';
import { user_requestedUrl } from '../../urls.js';
import jscookie from 'js-cookie';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';


function RequirmentForm() {

    var cateringCheckbox, venuCheckbox, decorationCheckboxnuCheckbox, djCheckbox;
    const [requestFormData, setRequestFormData] = useState({
        serviceschoose: {
            caterer: false,
            decoration: false,
            venu: false,
            dj: false,
        },
    });
    const [Thali, setThali] = useState({
        Roti: [],
        Sabji: [],
        Starter: [],
        Dessert: []
    });
    const [decorationtype, setDecorationType] = useState('');

    const [venuetype, setVenueType] = useState('');




    function customise() {
        const mealsection = document.getElementById('mealsection');
        cateringCheckbox = document.getElementById('cateringCheckbox');

        const venusection = document.getElementById('venusection');
        venuCheckbox = document.getElementById('venuCheckbox');

        const decorationsection = document.getElementById('decorationsection');
        decorationCheckboxnuCheckbox = document.getElementById('decorationCheckbox');

        const djsection = document.getElementById('djsection');
        djCheckbox = document.getElementById('djCheckbox');

        setRequestFormData((requestFormData) => ({
            ...requestFormData,
            serviceschoose: {
                caterer: cateringCheckbox.checked,
                venu: venuCheckbox.checked,
                decoration: decorationCheckboxnuCheckbox.checked,
                dj: djCheckbox.checked,
            },
        }));

        if (cateringCheckbox.checked) {
            mealsection.style.display = 'block';
        } else {
            mealsection.style.display = 'none';
        }


        if (venuCheckbox.checked) {
            venusection.style.display = 'block';
        } else {
            venusection.style.display = 'none';
        }

        if (decorationCheckboxnuCheckbox.checked) {
            decorationsection.style.display = 'block';
        } else {
            decorationsection.style.display = 'none';
        }
    }


    const getFormData = (event) => {
        const { name, value, type, checked } = event.target;

        if (type === 'checkbox') {
            setRequestFormData((requestFormData) => ({
                ...requestFormData,
                serviceschoose: {
                    ...requestFormData.serviceschoose,
                    [name]: checked,
                },
            }));
        } else {
            setRequestFormData({ ...requestFormData, [name]: value })
        }
    }

    const eventRequestFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const userEmail = jscookie.get('user');
            requestFormData.userEmail = userEmail;

            console.log("Thali : ", Thali);
            console.log("Decoration Type : ", decorationtype);
            console.log("venue Type : ", venuetype);

            console.log("requestFormData ", requestFormData)

            requestFormData.customiseThali = Thali;
            requestFormData.decorationtype = decorationtype;
            requestFormData.venuetype = venuetype;

            console.log("Type Of Thali : ", typeof Thali);

            console.log("requestFormData after add customize thali and decoration type and venue type : ", requestFormData)


            const result = await axios.post(`${user_requestedUrl}/eventRequest`, requestFormData);
            if (result.status == 201) {
                console.log(result);
                Swal.fire({
                    background: "black",
                    icon: "success",
                    text: "Event Organise successfully..!",
                    showCloseButton: true,
                    focusConfirm: false,
                });
                event.target.reset();
            }
            else if (result.status == 500) {
                console.log("error while reponse request form data");
            }

        } catch (error) {
            console.log('Error submitting requestFormData:', error);
        }
    };
    const customiseThali = (event) => {
        console.log("event in customiseThali : ", event.target.name);
        console.log("event in customiseThali : ", event.target.value);
        const name = event.target.name;
        const value = event.target.value;

        if (name == 'Roti') {
            setThali({
                ...Thali,
                Roti: Thali.Roti.includes(value)
                    ? Thali.Roti.filter((item) => item !== value)
                    : [...Thali.Roti, value]
            })
        }
        else if (name == 'Sabji') {
            setThali({
                ...Thali,
                Sabji: Thali.Sabji.includes(value)
                    ? Thali.Sabji.filter((item) => item !== value)
                    : [...Thali.Sabji, value]
            })
        }
        else if (name == 'Dessert') {
            setThali({
                ...Thali,
                Dessert: Thali.Dessert.includes(value)
                    ? Thali.Dessert.filter((item) => item !== value)
                    : [...Thali.Dessert, value]
            })
        }
        else if (name == 'Starter') {
            setThali({
                ...Thali,
                Starter: Thali.Starter.includes(value)
                    ? Thali.Starter.filter((item) => item !== value)
                    : [...Thali.Starter, value]
            })
        }
    }
    const Setdecoration = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        console.log("NAME : ", name);
        console.log("VALUE : ", value);

        if (name == 'decoration') {
            setDecorationType(value)
        }
        else if (name == 'venue') {
            setVenueType(value)
        }
    }

    return (<>
        <div className="container">
            <form onSubmit={eventRequestFormSubmit} method="post" id='requirmentForm' className='bg-dark'>
                <div className="container bg-dark" id="requirmentMainContainer">
                    <i className="fa fa-envelope d-flex justify-content-center" style={{ fontSize: "55px", color: "red" }}></i>
                    <h1 className="d-flex justify-content-center py-3 text-responsive" id="topheading">LET’S GET THIS PARTY STARTED.</h1>
                    <div className='d-flex flex-row justify-content-center'>
                        <span className='span1 mx-1'></span>
                        <span className='span1 mx-1'></span>
                        <span className='span1 mx-1'></span>
                        <span className='span1 mx-1'></span>
                    </div>

                    <p className='d-flex justify-content-center grayHeading my-3'>For general business, press, and career </p>
                    <p className='d-flex justify-content-center toppara'>inquirieshello@chappelowevents.comPH:</p>
                    <p className='d-flex justify-content-center toppara'>816-728-3066</p>

                    <p className='d-flex justify-content-center whiteText'>For event inquiries, please fill out the form below and one of our team members will get back to you within 48 hours.</p>
                </div>
                <div className="container bg-dark py-2 mb-2" id='formcontainer'>
                    <div className="row m-0">
                        <div className="col col-lg-6 col-md-6 col-12  d-flex justify-content-center">
                            <div className="w-75">
                                <label htmlFor="exampleInputEmail1" className="form-label whiteText">Event Name</label>
                                <input type="text" className="form-control w-100  borderPinkInput px-2" name="eventname" onChange={getFormData} placeholder='Enter the name of event...!' aria-describedby="emailHelp" />
                            </div>
                        </div>
                        <div className="col col-lg-6 col-md-6 col-12 mt-2 d-flex justify-content-center">

                            <div className="w-75 whiteText ">
                                <label htmlFor="exampleInputEmail1" className="form-label">Total Guest</label>
                                <input type="number" className="form-control w-100 borderPinkInput px-2" name="totalguest" onChange={getFormData} min="1" placeholder='Enter the total number of guest..!' />
                            </div>

                        </div>
                    </div>

                    <div className="row m-0 my-2 text-white">
                        <h4 className="text-white text-center py-3">Event Type</h4>
                        <div className="col col-lg-3  d-flex justify-content-center">
                            <div className="mb-3 form-check">
                                <input type="radio" name="eventtype" id='celebrationeventcheckbox' value="Celebration" onChange={getFormData} />
                                <label className="form-check-label" htmlFor="celebrationeventcheckbox">&nbsp;&nbsp;Celebration Event</label>
                            </div>
                        </div>
                        <div className="col col-lg-3  d-flex justify-content-center">
                            <div className="mb-3 form-check">
                                <input type="radio" name="eventtype" id='celebritieseventcheckbox' value="Celebrities" onChange={getFormData} />
                                <label className="form-check-label" htmlFor="celebritieseventcheckbox">&nbsp;&nbsp;Celebrities Events</label>
                            </div>
                        </div>
                        <div className="col col-lg-3  d-flex justify-content-center">
                            <div className="mb-3 form-check">
                                <input type="radio" name="eventtype" id='corporateeventcheckbox' value="Corporate-event" onChange={getFormData} />
                                <label className="form-check-label" htmlFor="corporateeventcheckbox">&nbsp;&nbsp;Corporate Events</label>
                            </div>
                        </div>
                        <div className="col col-lg-3 d-flex justify-content-center">
                            <div className="mb-3 form-check">
                                <input type="radio" name="eventtype" id='djeventcheckbox' value="dj-event" onChange={getFormData} />
                                <label className="form-check-label" htmlFor="djeventcheckbox"> &nbsp;&nbsp;DJ Events</label>
                            </div>
                        </div>
                    </div>

                    <div className="row m-0 py-2">
                        <div className="col col-lg-6 col-md-6 col-12  d-flex justify-content-center">
                            <div className="w-75 whiteText">
                                <label htmlFor="exampleInputEmail1" className="form-label">Budget</label>
                                <input type="number" className="form-control w-100 borderPinkInput px-2" min="1000" name="budget" onChange={getFormData} placeholder='Enter your budget....!' />
                            </div>
                        </div>
                        <div className="col col-lg-6 col-md-6 col-12 d-flex justify-content-center">
                            <div className="w-75 whiteText">
                                <label htmlFor="exampleInputEmail1" className="form-label">Location</label>
                                <input type="text" className="form-control w-100 borderPinkInput px-2" name="location" onChange={getFormData} placeholder='Enter your Location...!' />
                            </div>

                        </div>
                    </div>

                    <div className='row m-0 py-2'>
                        <div className="col col-lg-6 col-md-6 col-12 d-flex justify-content-center">
                            <div className="w-75 whiteText">
                                <label htmlFor="exampleInputEmail1" className="form-label">Event Start Date</label>
                                <input type="date" className="form-control w-100 borderPinkInput ps-5" name="startedate" onChange={getFormData} />
                            </div>
                        </div>
                        <div className="col col-lg-6 col-md-6 col-12 d-flex justify-content-center">
                            <div className="w-75 whiteText">
                                <label htmlFor="exampleInputEmail1" className="form-label">Event End Date</label>
                                <input type="date" className="form-control w-100 borderPinkInput ps-5" name="enddate" onChange={getFormData} />
                            </div>
                        </div>
                    </div>

                    <div className='row m-0 py-2'>
                        <div className="col col-lg-6 col-md-6 col-12 d-flex justify-content-center">
                            <div className="w-75 whiteText">
                                <label htmlFor="exampleInputEmail1" className="form-label">Event Start Time</label>
                                <input type="time" className="form-control w-100 borderPinkInput ps-5" name="starttime" onChange={getFormData} />
                            </div>
                        </div>
                        <div className="col col-lg-6 col-md-6 col-12 d-flex justify-content-center">
                            <div className="w-75 whiteText">
                                <label htmlFor="exampleInputEmail1" className="form-label">Event End Time</label>
                                <input type="time" className="form-control w-100 borderPinkInput ps-5" name="endtime" onChange={getFormData} />
                            </div>
                        </div>
                    </div>

                    <div className='row m-0 py-2'>
                        <h4 className="text-white text-center py-3">Food Type</h4>
                        <div className="col col-lg-4 col-md-6 col-12  d-flex justify-content-center">
                            <div className="whiteText">
                                <input type="radio" id="exampleInputEmail1" name="meal" value="vegitarian" onChange={getFormData} />
                                <label htmlFor="exampleInputEmail1" className="form-label">&nbsp;Vegitarian</label>
                            </div>
                        </div>

                        <div className="col col-lg-4 col-md-6 col-12  d-flex justify-content-center">
                            <div className="whiteText">
                                <input type="radio" id="exampleInputEmail1" name="meal" value="non-vegitarian" onChange={getFormData} />
                                <label htmlFor="exampleInputEmail1" className="form-label">Non-Vegitarian</label>&nbsp;
                            </div>
                        </div>

                        <div className="col col-lg-4 col-md-6 col-12  d-flex justify-content-center">
                            <div className="whiteText">
                                <input type="radio" id="exampleInputEmail1" name="meal" value="both" onChange={getFormData} />
                                <label htmlFor="exampleInputEmail1" className="form-label">both </label>&nbsp;
                            </div>
                        </div>
                    </div>

                    <div className="row my-2 text-white ">
                        <h4 className="text-white text-center py-2">Services</h4>
                        <h5 className="text-white text-center py-2">Which services do you want to Select......!</h5>
                        <div className="col col-lg-4 col-md-6 col-6  d-flex justify-content-center">
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input mt-2" name="decoration" value="decoration" onChange={getFormData} id="decorationCheckbox" onClick={customise} />
                                <label className="form-check-label" htmlFor="decorationCheckbox">Decoration</label>
                            </div>
                        </div>
                        <div className="col col-lg-4 col-md-6 col-6  d-flex justify-content-center">
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input mt-2" name="venu" id="venuCheckbox" value="venu" onChange={getFormData} onClick={customise} />
                                <label className="form-check-label" htmlFor="venuCheckbox">Venu</label>
                            </div>
                        </div>
                        <div className="col col-lg-4 col-md-6 col-6  d-flex justify-content-center">
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input mt-2" name="catring" id="cateringCheckbox" value="catring" onChange={getFormData} onClick={customise} />
                                <label className="form-check-label" htmlFor="cateringCheckbox">Catring</label>
                            </div>
                        </div>
                    </div>


                    <div className="container" id="mealsection">

                        <h4 className="d-flex justify-content-center mt-3" >
                            <span style={{ color: "red" }}>Customise&nbsp;</span><span style={{ color: "white" }}> your Meal</span>
                        </h4>


                        <div className="row">
                            <div className="accordion text-light w-75 m-auto" id="accordionExample" style={{ backgroundColor: "black" }}>
                                <div className="accordion-item  bg-dark">
                                    <h2 className="accordion-header" id="rotiSection">
                                        <button className="accordion-button bg-dark text-light" type="button" data-bs-toggle="collapse" data-bs-target="#collapseRoti" aria-expanded="true" aria-controls="collapseRoti">
                                            Select Roti Type
                                        </button>
                                    </h2>
                                    <div id="collapseRoti" className="accordion-collapse collapse " aria-labelledby="rotiSection" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <Form>
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Tandoori Roti"
                                                    name="Roti"
                                                    value="Tandoori Roti"
                                                    // defaultChecked={selectedDish.Roti.includes('Tandoori Roti')}
                                                    onChange={(event) => customiseThali(event)}
                                                />
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Non-Roti"
                                                    name="Roti"
                                                    value="Non Roti"
                                                    // defaultChecked={selectedDish.Roti.includes('Non Roti')}
                                                    onChange={(event) => customiseThali(event)} />
                                            </Form>
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item  bg-dark">
                                    <h2 className="accordion-header" id="sabjiSection">
                                        <button className="accordion-button bg-dark text-light mt-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSabji" aria-expanded="true" aria-controls="collapseSabji">
                                            Select Sabji Type
                                        </button>
                                    </h2>
                                    <div id="collapseSabji" className="accordion-collapse collapse" aria-labelledby="sabjiSection" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <Form>
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Mutter Panner"
                                                    name="Sabji"
                                                    value="Mutter Panner"
                                                    // defaultChecked={selectedDish.Sabji.includes('Mutter Panner')}
                                                    onChange={(event) => customiseThali(event)}
                                                />
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Kaaju Kari"
                                                    name="Sabji"
                                                    value="Kaaju Kari"
                                                    // defaultChecked={selectedDish.Sabji.includes('Kaaju Kari')}
                                                    onChange={(event) => customiseThali(event)}
                                                />
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Bheendi"
                                                    name="Sabji"
                                                    value="Bheendi"
                                                    // defaultChecked={selectedDish.Sabji.includes('Bheendi')}
                                                    onChange={(event) => customiseThali(event)}
                                                />
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Gravy"
                                                    name="Sabji"
                                                    value="Gravy"
                                                    // defaultChecked={selectedDish.Sabji.includes('Gravy')}
                                                    onChange={(event) => customiseThali(event)}
                                                />
                                            </Form>
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item  bg-dark">
                                    <h2 className="accordion-header" id="dessertSection">
                                        <button className="accordion-button bg-dark text-light mt-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseDessert" aria-expanded="true" aria-controls="collapseDessert">
                                            Select Dessert Type
                                        </button>
                                    </h2>
                                    <div id="collapseDessert" className="accordion-collapse collapse" aria-labelledby="dessertSection" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <Form>
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Milk Cake"
                                                    name="Dessert"
                                                    value="Milk Cake"
                                                    // defaultChecked={selectedDish.Dessert.includes('Milk Cake')}
                                                    onChange={(event) => customiseThali(event)}
                                                />
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Kaaju Katli"
                                                    name="Dessert"
                                                    value="Kaaju Katli"
                                                    // defaultChecked={selectedDish.Dessert.includes('Kaaju Katli')}
                                                    onChange={(event) => customiseThali(event)}
                                                />
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Gupchup"
                                                    name="Dessert"
                                                    value="Gupchup"
                                                    // defaultChecked={selectedDish.Dessert.includes('Gupchup')}
                                                    onChange={(event) => customiseThali(event)}
                                                />
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Gulab Jamun"
                                                    name="Dessert"
                                                    value="Gulab Jamun"
                                                    // defaultChecked={selectedDish.Dessert.includes('Gulab Jamun')}
                                                    onChange={(event) => customiseThali(event)}
                                                />
                                            </Form>
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item  bg-dark">
                                    <h2 className="accordion-header" id="starterSection">
                                        <button className="accordion-button bg-dark text-light mt-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseStarter" aria-expanded="true" aria-controls="collapseStarter">
                                            Select Starter Type
                                        </button>
                                    </h2>
                                    <div id="collapseStarter" className="accordion-collapse collapse" aria-labelledby="starterSection" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <Form>
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Kimchi Salad"
                                                    name="Starter"
                                                    value="Kimchi Salad"
                                                    // defaultChecked={selectedDish.Starter.includes('Kimchi Salad')}
                                                    onChange={(event) => customiseThali(event)}
                                                />
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Raita Bar"
                                                    name="Starter"
                                                    value="Raita Bar"
                                                    // defaultChecked={selectedDish.Starter.includes('Raita Bar')}
                                                    onChange={(event) => customiseThali(event)}
                                                />
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Onion Pakoda"
                                                    name="Starter"
                                                    value="Onion Pakoda"
                                                    // defaultChecked={selectedDish.Starter.includes('Onion Pakoda')}
                                                    onChange={(event) => customiseThali(event)}
                                                />
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Chana Garlic Fry"
                                                    name="Starter"
                                                    value="Chana Garlic Fry"
                                                    // defaultChecked={selectedDish.Starter.includes('Chana Garlic Fry')}
                                                    onChange={(event) => customiseThali(event)}
                                                />
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Moong Daal Chat"
                                                    name="Starter"
                                                    value="Moong Daal Chat"
                                                    // defaultChecked={selectedDish.Starter.includes('Moong Daal Chat')}
                                                    onChange={(event) => customiseThali(event)}
                                                />

                                            </Form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container" id="venusection">
                        <h4 className="d-flex justify-content-center mt-3" >
                            <span style={{ color: "red" }}>Select&nbsp;</span><span style={{ color: "white" }}> your Venu</span>
                        </h4>
                        <div className="accordion text-light w-75 m-auto" id="accordionExample" style={{ backgroundColor: "black" }}>
                            <div className="accordion-item  bg-dark">
                                <h2 className="accordion-header">
                                    <button className="accordion-button bg-dark text-light" type="button" data-bs-toggle="collapse" data-bs-target="#collapseVenue" aria-expanded="true" aria-controls="collapseVenue">
                                        Select Venue Type
                                    </button>
                                </h2>
                                <div id="collapseVenue" className="accordion-collapse collapse " aria-labelledby="rotiSection" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        {/* <Form>
                                            <Form.Check
                                                type="checkbox"
                                                label="Only Room"
                                                name="venue"
                                                value="Room"
                                                onChange={(event) => Setdecoration(event)}
                                            />
                                            <Form.Check
                                                type="checkbox"
                                                label="Only garden"
                                                name="venue"
                                                value="Garden"
                                                onChange={(event) => Setdecoration(event)}
                                            />
                                            <Form.Check
                                                type="checkbox"
                                                label="Only Hall"
                                                name="venue"
                                                value="Hall"
                                                onChange={(event) => Setdecoration(event)}
                                            />
                                            <Form.Check
                                                type="checkbox"
                                                label="Hall + Garden"
                                                name="venue"
                                                value="Hall + garden"
                                                onChange={(event) => Setdecoration(event)}
                                            />
                                        </Form> */}
                                        <select className='w-100 m-auto' name='venue' onChange={(event)=>{
                                            Setdecoration(event)
                                        }}>
                                            <option name='venuetype' value=''>Select Venue type</option>
                                            <option name='venuetype' value='Only Room'>Only Room</option>
                                            <option name='venuetype' value='Only Hall'>Only Hall</option>
                                            <option name='venuetype' value='Only Garden'>Only Garden</option>
                                            <option name='venuetype' value='Garden + Hall'>Garden + Hall</option>
                                            <option name='venuetype' value='Hall + Room'>Hall + Room</option>
                                            <option name='venuetype' value='Hall + Room + Garden'>Hall + Room + Garden</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>

                    <div className="container" id="decorationsection">
                        <h4 className="d-flex justify-content-center mt-3" >
                            <span style={{ color: "red" }}>Select&nbsp;</span><span style={{ color: "white" }}>Decoration Type</span>
                        </h4>
                        <div className="accordion text-light w-75 m-auto" id="accordionExample" style={{ backgroundColor: "black" }}>
                            <div className="accordion-item  bg-dark">
                                <h2 className="accordion-header" id="rotiSection">
                                    <button className="accordion-button bg-dark text-light" type="button" data-bs-toggle="collapse" data-bs-target="#collapseDecoration" aria-expanded="true" aria-controls="collapseRoti">
                                        Select Decoration Type
                                    </button>
                                </h2>
                                <div id="collapseDecoration" className="accordion-collapse collapse " aria-labelledby="rotiSection" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        {/* <Form>
                                            <Form.Check
                                                type="checkbox"
                                                label="Flower Decoration"
                                                name="decoration"
                                                value="flower decoration"
                                                onChange={(event) => Setdecoration(event)}
                                            />
                                            <Form.Check
                                                type="checkbox"
                                                label="Ballon Decoration"
                                                name="decoration"
                                                value="ballon decoration"
                                                onChange={(event) => Setdecoration(event)}
                                            />
                                            <Form.Check
                                                type="checkbox"
                                                label="Pyro Decoration"
                                                name="decoration"
                                                value="pyro decoration"
                                                onChange={(event) => Setdecoration(event)}
                                            />
                                            <Form.Check
                                                type="checkbox"
                                                label="Birthday Decoration"
                                                name="decoration"
                                                value="birthday decoration"
                                                onChange={(event) => Setdecoration(event)}
                                            />
                                        </Form> */}
                                        <select className='w-100 m-auto' name='decoration' onChange={(event)=>{
                                            Setdecoration(event)
                                        }}>
                                            <option>Flower Decoration</option>
                                            <option>Ballon Decoration</option>
                                            <option>Birthday Decoration</option>
                                            <option>Pyro Decoration</option>
                                            <option>Haldi Decoration</option>
                                            <option>Mehandi Decoration</option>
                                            <option>House Decoration</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* </div>

                <div className="container bg-dark formcontainer"> */}
                    <div className="whiteText mt-4 ms-5 ps-3">
                        <label htmlFor="exampleInputEmail1" className="form-label lastLable">Additional Information</label>
                        {/* <p className='grayHeading lastLable'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus est, hic ex quas cupiditate ab! Distinctio beatae deleniti dolorum. Cupiditate!</p> */}
                        <input type="text" className="form-control d-flex w-75 borderPinkInput m-auto" name="addtionalinfo" onChange={getFormData} placeholder='Enter the Additional Information...!' />
                    </div>

                    <div className="w-75 form-check whiteText d-flex justify-content-center my-3 mt-3">
                        <input type="checkbox" className="form-check-input mx-3" name="isdjbooked" id="djCheckbox" onClick={customise} onChange={getFormData} value="isdjbooked" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Do you want to book a Dj also? If yes then there will be pay extra charges for it. </label>
                    </div>


                    <div className="w-75 form-check whiteText d-flex justify-content-center my-3 mt-3 lastCheckBox">
                        <input type="checkbox" className="form-check-input mx-3 " id="djCheckbox" name="extralocationcharge" onClick={customise} onChange={getFormData} value="extralocationcharge" />
                        <label className="form-check-label" htmlFor="exampleCheck1">If the location is out of city then you have to pay  for extra charges will be levied.</label>
                    </div>

                    <div className="d-flex justify-content-center py-3">
                        <button className="btn btn-danger">Get Queto</button>
                    </div>
                </div>
            </form>
        </div>
    </>);
}

export default RequirmentForm;