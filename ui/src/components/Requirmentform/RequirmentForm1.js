import './requirmentform.css';
import { useState } from 'react';
import axios from 'axios';
import requested_user_url from "../requestedUrl.js";

function RequirmentForm() {
    const [requestFormData, setRequestFormData] = useState({});
    var eventType = "";

    function customise() {
        const mealsection = document.getElementById('mealsection');
        const cateringCheckbox = document.getElementById('cateringCheckbox');

        const venusection = document.getElementById('venusection');
        const venuCheckbox = document.getElementById('venuCheckbox');

        const decorationsection = document.getElementById('decorationsection');
        const decorationCheckboxnuCheckbox = document.getElementById('decorationCheckbox');

        const djsection = document.getElementById('djsection');
        const djCheckbox = document.getElementById('djCheckbox');

        if (cateringCheckbox.checked) {
            mealsection.style.display = 'block';
            eventType +="catring";
        } else {
            mealsection.style.display = 'none';
        }


        if (venuCheckbox.checked) {
            venusection.style.display = 'block';
            eventType +="venu";
        } else {
            venusection.style.display = 'none';
        }


        if (decorationCheckboxnuCheckbox.checked) {
            decorationsection.style.display = 'block';
            eventType +="decoration";
        } else {
            decorationsection.style.display = 'none';
        }

        if (djCheckbox.checked) {
            djsection.style.display = 'block';
            eventType +="dj";
        } else {
            djsection.style.display = 'none';
        }
    }


    const getFormData = (event) => {
        const { name, value, type, checked } = event.target;
        //   console.log(event.target.value);
        // setRequestFormData({
        //   ...requestFormData,
        // //    [name] :value,
        //   [name]: type === 'checkbox' ? event.target.checked ?value:"" :value,
        // });


        if (type === 'checkbox') {
            // const updatedEventTypes = checked ? [...requestFormData.eventtype, value] /* Add to array if checked*/ : requestFormData.eventtype.filter((type) => type !== value); // Remove from array if unchecked

            // return {
            //     ...requestFormData,
            //     eventtype: updatedEventTypes,
            //     [name]: value,
            // };
        } else {
            // return {
               
                setRequestFormData({ ...requestFormData, [name]: value})
            // };
        }


    }

    const eventRequestFormSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log("requestFormData ", requestFormData)
            console.log('Requested User URL:', requested_user_url);
            const result = await axios.post(`${requested_user_url}/eventRequest`, requestFormData);
            if(result.status == 201){
                console.log(result);
            }
            else if(result.status==500){
                console.log("error while reponse request form data");
            }

        } catch (error) {
            console.log('Error submitting requestFormData:', error);
        }
    };

    return (<>
        <div className="container">
            <form onSubmit={eventRequestFormSubmit} method="post">
                <div className="container my-5" id="requirmentMainContainer">
                    <i className="fa fa-envelope d-flex justify-content-center mt-5" style={{ fontSize: "55px", color: "red" }}></i>
                    <h1 className="d-flex justify-content-center my-3 text-responsive" id="topheading">LET’S GET THIS PARTY STARTED.</h1>
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

                <div className="container">
                    <div className="row ">
                        <div className="col col-lg-6 col-md-6 col-12  d-flex justify-content-center">
                            <div className="w-75">
                                <label htmlFor="exampleInputEmail1" className="form-label whiteText">Event Name</label>
                                <input type="text" className="form-control w-100  borderPinkInput" name="eventname" onChange={getFormData} id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>
                        </div>
                        <div className="col col-lg-6 col-md-6 col-12 mt-2 d-flex justify-content-center">

                            <div className="w-75 whiteText ">
                                <label htmlFor="exampleInputEmail1" className="form-label">Total Guest</label>
                                <input type="number" className="form-control w-100 borderPinkInput" name="totalguest" onChange={getFormData} min="1" aria-describedby="emailHelp" />
                            </div>

                        </div>
                    </div>


                    <h4 className="d-flex justify-content-center my-3 grayHeading">Event Type</h4>
                    <div className="row my-1 whiteText ">
                        <div className="col col-lg-6  d-flex justify-content-center">
                            <div className="mb-3 form-check">
                                <label className="form-check-label" htmlFor="exampleCheck1">Celebration Event</label>
                                <input type="radio" className="mx-5" id="exampleInputEmail1" name="eventtype" value="Celebration"  onChange={getFormData} aria-describedby="emailHelp" />
                            </div>
                        </div>
                        <div className="col col-lg-6  d-flex justify-content-center">
                            <div className="mb-3 form-check">
                                <label className="form-check-label" htmlFor="exampleCheck1">Celebrities Events</label>
                                <input type="radio" className="mx-5" id="exampleInputEmail1" name="eventtype" value="Celebrities" onChange={getFormData} aria-describedby="emailHelp" />
                            </div>
                        </div>
                        <div className="col col-lg-6  d-flex justify-content-center">
                            <div className="mb-3 form-check">
                                <label className="form-check-label" htmlFor="exampleCheck1">Corporate Events</label>
                                <input type="radio" className="mx-5" id="exampleInputEmail1" name="eventtype" value="Corporate-event" onChange={getFormData} aria-describedby="emailHelp" />
                            </div>
                        </div>
                        <div className="col col-lg-6 d-flex justify-content-center">
                            <div className="mb-3 form-check">
                                <label className="form-check-label ps-5" htmlFor="exampleCheck1">DJ Events</label>
                                <input type="radio" className="mx-5" id="exampleInputEmail1" name="eventtype" value="dj-event" onChange={getFormData} aria-describedby="emailHelp" />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col col-lg-6 col-md-6 col-12  d-flex justify-content-center">
                            <div className="w-75 whiteText mt-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Budget</label>
                                <input type="number" className="form-control w-100 borderPinkInput" min="1000" name="budget" onChange={getFormData} aria-describedby="emailHelp" />
                            </div>

                        </div>
                        <div className="col col-lg-6 col-md-6 col-12 d-flex justify-content-center">
                            <div className="w-75 whiteText mt-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Location</label>
                                <input type="text" className="form-control w-100 borderPinkInput" name="location" onChange={getFormData} aria-describedby="emailHelp" />
                            </div>

                        </div>
                        <div className="col col-lg-6 col-md-6 col-12 d-flex justify-content-center">
                            <div className="w-75 whiteText mt-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Event Start Date</label>
                                <input type="date" className="form-control w-100 borderPinkInput ps-5" name="startedate" onChange={getFormData} aria-describedby="emailHelp" />
                            </div>
                        </div>
                        <div className="col col-lg-6 col-md-6 col-12 d-flex justify-content-center">
                            <div className="w-75 whiteText mt-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Event End Date</label>
                                <input type="date" className="form-control w-100 borderPinkInput ps-5" name="enddate" onChange={getFormData} aria-describedby="emailHelp" />
                            </div>
                        </div>
                        <div className="col col-lg-6 col-md-6 col-12  d-flex justify-content-center">
                            <div className="w-75 whiteText mt-5">
                                <label htmlFor="exampleInputEmail1" className="form-label">Vegitarian</label>&nbsp;
                                <input type="radio" id="exampleInputEmail1" name="meal" value="vegitarian" onChange={getFormData} aria-describedby="emailHelp" />&nbsp;&nbsp;&nbsp;
                                <label htmlFor="exampleInputEmail1" className="form-label">Non-Vegitarian</label>&nbsp;
                                <input type="radio" id="exampleInputEmail1" name="meal" value="non-vegitarian" onChange={getFormData} aria-describedby="emailHelp" />
                            </div>
                        </div>
                    </div>

                    <h4 className="d-flex justify-content-center my-4 grayHeading">Services</h4>
                    <p className="d-flex justify-content-center my-2 whiteText">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam dolores necessitatibus dignissimos pariatur libero blanditiis.</p>
                    <div className="row my-3 whiteText ms-4  ps-5">
                        <div className="col col-lg-4 col-md-4 col-12">
                            <div className="mb-3 form-check">
                                <label className="form-check-label" htmlFor="exampleCheck1">Decoration</label>
                                <input type="checkbox" className="form-check-input" name="decoration" value="decoration" onChange={getFormData} id="decorationCheckbox" onClick={customise} />
                            </div>
                        </div>
                        <div className="col col-lg-4 col-md-4 col-12">
                            <div className="mb-3 form-check">
                                <label className="form-check-label" htmlFor="exampleCheck1">Venu</label>
                                <input type="checkbox" className="form-check-input" name="venu" id="venuCheckbox" value="venu" onChange={getFormData} onClick={customise} />
                            </div>
                        </div>
                        <div className="col col-lg-4 col-md-4 col-12">
                            <div className="mb-3 form-check">
                                <label className="form-check-label ps-4" htmlFor="exampleCheck1">Catring</label>
                                <input type="checkbox" className="form-check-input" name="catring" id="cateringCheckbox" value="catring" onChange={getFormData} onClick={customise} />
                            </div>
                        </div>
                        {/* <div className="col col-lg-6 col-md-6 col-6  d-flex justify-content-center">
                            <div className="mb-3 form-check">
                                <label className="form-check-label ps-4" htmlFor="exampleCheck1">DJ</label>
                                <input type="checkbox" className="form-check-input" name="dj" id="djCheckbox" value="dj" onChange={getFormData} onClick={customise} />
                            </div>
                        </div> */}
                    </div>


                    <div className="container" id="mealsection">

                        <h4 className="d-flex justify-content-center mt-3" >
                            <span style={{ color: "red" }}>Customise&nbsp;</span><span style={{ color: "white" }}> your Meal</span>
                        </h4>


                        <div className="row">
                            <div className="col col-lg-6 col-md-6 col-12 my-2 ">
                                <div className="input-group-append  d-flex flex-row  d-flex justify-content-center">
                                    <span className="input-group-text searchInput searchInput1">
                                        <i className="fa fa-search" style={{ fontSize: "30px", color: "red" }}></i>
                                    </span>
                                    <select className="form-control searchInput w-50  d-flex justify-content-center searchInput2" name="starter">
                                        <option value="" selected disabled>Select an Starter</option>
                                        <option value="1">Option 1</option>
                                        <option value="2">Option 2</option>
                                    </select>

                                </div>
                            </div>
                            <div className="col col-lg-6 col-md-6 col-12 my-2">
                                <div className="input-group-append  d-flex flex-row  d-flex justify-content-center">
                                    <span className="input-group-text searchInput searchInput1">
                                        <i className="fa fa-search" style={{ fontSize: "30px", color: "red" }}></i>
                                    </span>
                                    <select className="form-control  w-50  d-flex justify-content-center searchInput searchInput2" name="drinks">
                                        <option value="" selected disabled>Select an Drinks</option>
                                        <option value="1">Option 1</option>
                                        <option value="2">Option 2</option>
                                    </select>

                                </div>
                            </div>
                            <div className="col col-lg-6 col-md-6 col-12 my-2">
                                <div className="input-group-append  d-flex flex-row  d-flex justify-content-center">
                                    <span className="input-group-text searchInput searchInput1">
                                        <i className="fa fa-search" style={{ fontSize: "30px", color: "red" }}></i>
                                    </span>
                                    <select className="form-control d-flex justify-content-center w-50 searchInput searchInput2" name="desserts">
                                        <option value="" selected disabled>Select an Desserts</option>
                                        <option value="1">Option 1</option>
                                        <option value="2">Option 2</option>
                                    </select>

                                </div>
                            </div>
                            <div className="col col-lg-6 col-md-6 col-12 my-2">
                                <div className="input-group-append  d-flex flex-row d-flex justify-content-center">
                                    <span className="input-group-text searchInput searchInput1">
                                        <i className="fa fa-search" style={{ fontSize: "30px", color: "red" }}></i>
                                    </span>
                                    <select className="form-control w-50 d-flex justify-content-center searchInput searchInput2" name="khana">
                                        <option value="" selected disabled>Select an Sabji,Roti</option>
                                        <option value="1">Option 1</option>
                                        <option value="2">Option 2</option>
                                    </select>

                                </div>
                            </div>
                        </div>
                        {/* </form> */}
                    </div>

                    <div className="container" id="venusection">
                        <h4 className="d-flex justify-content-center mt-3" >
                            <span style={{ color: "red" }}>Select&nbsp;</span><span style={{ color: "white" }}> your Venu</span>
                        </h4>


                        <div className="input-group-append  d-flex flex-row d-flex justify-content-center">
                            <span className="input-group-text searchInput">
                                <i className="fa fa-search" style={{ fontSize: "30px", color: "red" }}></i>
                            </span>
                            <select className="form-control d-flex justify-content-center w-75 searchInput" name="venutype">
                                <option value="" selected disabled>Select an option</option>
                                <option value="1">Option 1</option>
                                <option value="2">Option 2</option>
                            </select>
                        </div>

                    </div>

                    <div className="container" id="decorationsection">
                        <h4 className="d-flex justify-content-center mt-3" >
                            <span style={{ color: "red" }}>Select&nbsp;</span><span style={{ color: "white" }}>Decoration Type</span>
                        </h4>
                        <div className="input-group-append  d-flex flex-row d-flex justify-content-center">
                            <span className="input-group-text searchInput">
                                <i className="fa fa-search" style={{ fontSize: "30px", color: "red" }}></i>
                            </span>
                            <select className="form-control d-flex justify-content-center w-75 searchInput" name="decorationtype">
                                <option value="" selected disabled>Select an option</option>
                                <option value="1">Option 1</option>
                                <option value="2">Option 2</option>
                            </select>
                        </div>
                    </div>

                    <div className="container" id="djsection">
                        <h4 className="d-flex justify-content-center mt-3" >
                            <span style={{ color: "red" }}>Select&nbsp;</span><span style={{ color: "white" }}>Dj Type</span>
                        </h4>
                        <div className="input-group-append  d-flex flex-row d-flex justify-content-center">
                            <span className="input-group-text searchInput searchInput1">
                                <i className="fa fa-search" style={{ fontSize: "30px", color: "red" }}></i>
                            </span>
                            <select className="form-control d-flex justify-content-center w-75 searchInput searchInput2" name="djtype">
                                <option value="" selected disabled>Select an option</option>
                                <option value="1">Option 1</option>
                                <option value="2">Option 2</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="container ">
                    <div className="whiteText mt-4 ms-5 ps-3">
                        <label htmlFor="exampleInputEmail1" className="form-label lastLable">Additional Information</label>
                        <p className='grayHeading lastLable'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus est, hic ex quas cupiditate ab! Distinctio beatae deleniti dolorum. Cupiditate!</p>
                        <input type="text" className="form-control d-flex w-75 borderPinkInput lastInput" aria-describedby="emailHelp" name="addtionalinfo" onChange={getFormData}/>
                    </div>

                    <div className="w-75 form-check whiteText d-flex justify-content-center my-3 mt-3">
                        <input type="checkbox" className="form-check-input mx-3" name="isdjbooked" id="djCheckbox" onClick={customise} onChange={getFormData} value="isdjbooked"/>
                        <label className="form-check-label" htmlFor="exampleCheck1">Do you want to book a Dj also? If yes then there will be pay extra charges for it. </label>
                    </div>


                    <div className="w-75 form-check whiteText d-flex justify-content-center my-3 mt-3 lastCheckBox">
                        <input type="checkbox" className="form-check-input mx-3 " id="djCheckbox" name="extralocationcharge" onClick={customise} onChange={getFormData} value="extralocationcharge"/>
                        <label className="form-check-label" htmlFor="exampleCheck1">If the location is out of city then you have to pay  for extra charges will be levied.</label>
                    </div>



                    <div className="d-flex justify-content-center my-3">
                        <button className="btn btn-danger">Get Queto</button>
                    </div>
                </div>
            </form>
        </div>
    </>);
}

export default RequirmentForm;