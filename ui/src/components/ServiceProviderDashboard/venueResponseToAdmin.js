import Modal from 'react-bootstrap/Modal';
import { venue_requestUrl } from '../../urls';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import jscookie from 'js-cookie';
function VenueResponseModalToAdmin(props) {
    const { adminRequestData, venueEmail } = props;
    const [isResponseToUserModal, setResponseToUserModal] = useState(false);
    const [venuePrice, setPrice] = useState('');

    function getData(event) {
        let { name, value } = event.target;
        setPrice({
            ...venuePrice,
            [name]: value
        })
        console.log("venuePrice : ", venuePrice)
    }

    const handleSubmitResponse = async (event) => {
        event.preventDefault();
        try {

            venuePrice.eventId = adminRequestData.eventId;
            venuePrice.venueEmail = venueEmail;
            const response = await axios.post(venue_requestUrl + "/sendResponseToadmin", { venuePrice });
            if (response.status == 201) {
                response.data.requestData.adminRequest.map((data) => {
                    if (data.eventId === adminRequestData.eventId) {
                        adminRequestData.status = data.status;
                    }
                })

            }
            setResponseToUserModal(false);
            Swal.fire({
                background: "black",
                icon: "success",
                text: response.data.message,
                showCloseButton: true,
                focusConfirm: false,
            });
            // setResponseToUserModal(false)

        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (<>
        {adminRequestData.status === "pending" ? (<div className="col col-lg-4 col-md-4 col-12 ">
            <button className="btn btn-danger  offset-lg-4 offset-1" onClick={() => { setResponseToUserModal(true) }}>
                Accept Request
            </button>
        </div>
        ) : (
            <div className="col col-lg-4 col-md-4 col-12 ">
                <button className="btn btn-danger  offset-lg-4 offset-1" disabled>
                    Request Send
                </button></div>
        )}
        {/* <button className="btn btn-danger w-25 offset-lg-4 offset-1" onClick={() => { setResponseToUserModal(true) }}>Accept Request</button> */}
        <Modal size="md-down" show={isResponseToUserModal} onHide={() => { setResponseToUserModal(false) }} centered  >
            <Modal.Body className='bg-black' style={{ padding: '0 10%' }}>
                <div className='mt-4' >
                    <div className='d-flex justify-content-end'>
                        <button className='btn-close' aria-label="Close" onClick={() => { setResponseToUserModal(false) }}></button>
                    </div>
                    <h1 style={{ color: "white" }}>Send Response</h1>
                    {/* <h2 className="modal-title text-white text-center" >Enter Price </h2> */}
                    <form onSubmit={handleSubmitResponse} method="post">
                        <div className="mb-3 mt-4">
                            <lable className="text-white fw-bold">Enter Price </lable>
                            <input type="number" className="form-control input-field" id="exampleInputName" placeholder="Enter the price according to your needs" name="venuePrice" onChange={getData} />
                        </div>
                        <div className="mb-3 mt-4">
                            <lable className="text-white fw-bold">Explaination </lable>
                            <input type="text" className="form-control input-field" id="exampleInputName" placeholder="Enter Price Description" name="explaination" onChange={getData} />
                        </div>
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="ourbtn w-50 mt-3 mb-3" style={{ color: 'black' }}>Send Response</button>
                        </div>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    </>)
}
export default VenueResponseModalToAdmin;
