import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { caterre_requestUrl } from '../../urls.js';
import jscookie from 'js-cookie';

function ChooseServicesModal(props) {
    const [isModalOpen, setModalOpen] = useState(false);

    const [selectedDish, setSelectedDish] = useState({
        location: "",
        date: "",
        time: "",
        totalguest: 0,
        Dessert: [],
        Roti: [],
        Sabji: [],
        Starter: [],
        additionalInfo: "",
    });


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSelectedDish({
            ...selectedDish,
            [name]: value,
        });
    }

    const handleRotiChange = (value) => {
        setSelectedDish((selectedDish) => ({
            ...selectedDish,
            Roti: selectedDish.Roti.includes(value)
                ? selectedDish.Roti.filter((item) => item !== value)
                : [...selectedDish.Roti, value],
        }));
        console.log("setselecteddish : ", selectedDish);

    };

    const handleSabjiChange = (value) => {
        setSelectedDish((selectedDish) => ({
            ...selectedDish,
            Sabji: selectedDish.Sabji.includes(value)
                ? selectedDish.Sabji.filter((item) => item !== value)
                : [...selectedDish.Sabji, value],
        }));
        console.log("setselecteddish : ", selectedDish);
    };

    const handleDessertChange = (value) => {
        setSelectedDish((selectedDish) => ({
            ...selectedDish,
            Dessert: selectedDish.Dessert.includes(value)
                ? selectedDish.Dessert.filter((item) => item !== value)
                : [...selectedDish.Dessert, value],
        }));
        console.log("setselecteddish : ", selectedDish);
    };
    const handleStarterChange = (value) => {
        setSelectedDish((selectedDish) => ({
            ...selectedDish,
            Starter: selectedDish.Starter.includes(value)
                ? selectedDish.Starter.filter((item) => item !== value)
                : [...selectedDish.Starter, value],
        }));
        console.log("setselecteddish : ", selectedDish);
    };

    var userEmail = jscookie.get("user");
    const handleSubmit = (event) => {
        event.preventDefault();
        setModalOpen(false);
        try {
            var result = axios.post(caterre_requestUrl + "/seeNormalUserToCatereRequest", {
                selectedDish,
                catererEmail: props.catererEmail,
                userEmail
            });
            result.then(response => {
                if (!isAlreadyBookedOrNot) {
                    alert("This catere is already booked on that day");
                }
                else {
                    alert("Catere Booked sucessfully");
                }
            })
                .catch(err => {
                    console.log("Error in cateres request modal ", err);
                })

        } catch (err) {
            console.log("Error on cateres request modal data is not coming", err);
        }
    }

    const isAlreadyBookedOrNot = async () => {
        var userEventdate = document.getElementById("userEventdate").value;
        console.log(userEventdate, "userEventdate");
        try {
            let response = await axios.post(caterre_requestUrl + '/isAleradyBookedOrNot', { catererEmail: props.catererEmail, userEventdate });
            if (response.status == 201) {
                alert(response.data.msg);
                setModalOpen(false);
                isModalOpen();
                return true
            }
        } catch (err) {
            console.log("Error while user booked catere ", err);
        }
    }

    return (
        <>
            <button className="btn btn-danger" onClick={() => setModalOpen(true)}>Choose Services</button>
            <Modal size="md-down" show={isModalOpen} centered>
                {console.log("props.catererEmail---", props.catererEmail)}
                <Modal.Body className='bg-black' style={{ padding: '0 10%' }}>
                    <div className='mt-4'>
                        <div className='d-flex justify-content-end'>
                            <button className='btn-close' aria-label="Close" onClick={() => setModalOpen(false)}></button>
                        </div>
                        <h2 className="modal-title text-white text-center" >Choose Services</h2>
                        <form onSubmit={handleSubmit} method="post">
                            <div className="mb-3 mt-4">
                                <input type="text" className="form-control input-field" placeholder="Event Location" name="location" onChange={handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <input type="date" className="form-control input-field" placeholder="Event Date" name="date" id="userEventdate" onChange={handleInputChange} onBlur={isAlreadyBookedOrNot} />
                            </div>
                            <div className="mb-3 mt-4">
                                <input type="time" className="form-control input-field" placeholder="Event Time" name="time" onChange={handleInputChange} />
                            </div>
                            <div className="mb-3 mt-4">
                                <input type="number" className="form-control input-field" placeholder="Total Guest" min="1" name="totalguest" onChange={handleInputChange} />
                            </div>
                            <h4 className="text-danger">Customize Your Thali Here</h4>

                            <div className="accordion text-light" id="accordionExample" style={{ backgroundColor: "black" }}>
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
                                                    defaultChecked={selectedDish.Roti.includes('Tandoori Roti')}
                                                    onChange={() => handleRotiChange('Tandoori Roti')}
                                                />
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Non-Roti"
                                                    name="Roti"
                                                    value="Non Roti"
                                                    defaultChecked={selectedDish.Roti.includes('Non Roti')}
                                                    onChange={() => handleRotiChange('Non Roti')}
                                                />
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
                                                    defaultChecked={selectedDish.Sabji.includes('Mutter Panner')}
                                                    onChange={() => handleSabjiChange('Mutter Panner')}
                                                />
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Kaaju Kari"
                                                    name="Sabji"
                                                    value="Kaaju Kari"
                                                    defaultChecked={selectedDish.Sabji.includes('Kaaju Kari')}
                                                    onChange={() => handleSabjiChange('Kaaju Kari')}
                                                />
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Bheendi"
                                                    name="Sabji"
                                                    value="Bheendi"
                                                    defaultChecked={selectedDish.Sabji.includes('Bheendi')}
                                                    onChange={() => handleSabjiChange('Bheendi')}
                                                />
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Gravy"
                                                    name="Sabji"
                                                    value="Gravy"
                                                    defaultChecked={selectedDish.Sabji.includes('Gravy')}
                                                    onChange={() => handleSabjiChange('Gravy')}
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
                                                    defaultChecked={selectedDish.Dessert.includes('Milk Cake')}
                                                    onChange={() => handleDessertChange('Milk Cake')}
                                                />
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Kaaju Katli"
                                                    name="Dessert"
                                                    value="Kaaju Katli"
                                                    defaultChecked={selectedDish.Dessert.includes('Kaaju Katli')}
                                                    onChange={() => handleDessertChange('Kaaju Katli')}
                                                />
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Gupchup"
                                                    name="Dessert"
                                                    value="Gupchup"
                                                    defaultChecked={selectedDish.Dessert.includes('Gupchup')}
                                                    onChange={() => handleDessertChange('Gupchup')}
                                                />
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Gulab Jamun"
                                                    name="Dessert"
                                                    value="Gulab Jamun"
                                                    defaultChecked={selectedDish.Dessert.includes('Gulab Jamun')}
                                                    onChange={() => handleDessertChange('Gulab Jamun')}
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
                                                    defaultChecked={selectedDish.Starter.includes('Kimchi Salad')}
                                                    onChange={() => handleStarterChange('Kimchi Salad')}
                                                />
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Raita Bar"
                                                    name="Starter"
                                                    value="Raita Bar"
                                                    defaultChecked={selectedDish.Starter.includes('Raita Bar')}
                                                    onChange={() => handleStarterChange('Raita Bar')}
                                                />
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Onion Pakoda"
                                                    name="Starter"
                                                    value="Onion Pakoda"
                                                    defaultChecked={selectedDish.Starter.includes('Onion Pakoda')}
                                                    onChange={() => handleStarterChange('Onion Pakoda')}
                                                />
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Chana Garlic Fry"
                                                    name="Starter"
                                                    value="Chana Garlic Fry"
                                                    defaultChecked={selectedDish.Starter.includes('Chana Garlic Fry')}
                                                    onChange={() => handleStarterChange('Chana Garlic Fry')}
                                                />
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Moong Daal Chat"
                                                    name="Starter"
                                                    value="Moong Daal Chat"
                                                    defaultChecked={selectedDish.Starter.includes('Moong Daal Chat')}
                                                    onChange={() => handleStarterChange('Moong Daal Chat')}
                                                />

                                            </Form>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-3 mt-4">
                                <input type="text" className="form-control input-field" placeholder="Additional Information" name="additionalInfo" onChange={handleInputChange} />
                            </div>

                            <div className="d-flex justify-content-center">
                                <button type="submit" className="ourbtn w-50 mt-3 mb-3">Submit</button>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ChooseServicesModal;