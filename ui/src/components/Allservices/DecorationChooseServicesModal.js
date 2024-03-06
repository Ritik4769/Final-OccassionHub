import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { decoration_requestUrl } from "../../urls.js";

function DecorationChooseServicesModal(props) {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState({
        location: "",
        date: "",
        starttime: "",
        endtime: "",
        additionalInfo: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSelectedRequest({
            ...selectedRequest,
            [name]: value,
        });
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Selected Services:", selectedRequest);
        setModalOpen(false);
        try {
            var result = axios.post(decoration_requestUrl + "/seeNormalUserTodecorationRequest", {
                selectedRequest,
                decorationEmail: props.decorationEmail,
                userEmail : props.userEmail , 
                Price : props.Price
            });
            result.then(response => {
                // console.log("data on cateres request modal",response.data.detailsOfNormalUserRequestForCateres);
                // Sweet alert lagega yaha....
            })
                .catch(err => {
                    console.log("Error in cateres request modal ", err);
                })

        } catch (err) {
            console.log("Error on cateres request modal data is not coming", err);
        }
    }

    return (
        <>
            <button className="btn btn-danger" onClick={() => setModalOpen(true)}>Choose Services</button>

            <Modal size="md-down" show={isModalOpen} centered>
                {console.log("props.decorationEmail---", props.decorationEmail)}
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
                                <input type="date" className="form-control input-field" placeholder="Event Date" name="date" onChange={handleInputChange} />
                            </div>
                            <div className="mb-3 mt-4">
                                <label htmlFor="time" className="text-white">Enter Start time</label>
                                <input type="time" className="form-control input-field" placeholder="Event Time" name="starttime" onChange={handleInputChange} />
                            </div>
                            <div className="mb-3 mt-4">
                                <label htmlFor="time" className="text-white">Enter End time</label>
                                <input type="time" className="form-control input-field" placeholder="Event Time" name="endtime" onChange={handleInputChange} />
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

export default DecorationChooseServicesModal;
