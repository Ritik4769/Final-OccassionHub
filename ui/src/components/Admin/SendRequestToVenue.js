import Modal from 'react-bootstrap/Modal';
import { venue_requestUrl } from '../../urls';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import jscookie from 'js-cookie';
import { admin_requestedUrl } from '../../urls';

function SendRequestToVenue(props) {

    const { eventdata, venueEmail, adminEmail } = props
    const [data, setData] = useState(props.data);
    const [requestData, setRequestData] = useState({})
    useEffect(() => {
        const fetchData = async () => {
            data.adminRequest.map((data, index) => {
                if (data.eventId === eventdata._id) {
                    setRequestData(data);
                    return;
                }
            });
        };
        fetchData();
    }, [data])

    const [isResponseToUserModal, setResponseToUserModal] = useState(false);
    const [addInfo, setAddInfo] = useState('');
    function getData(event) {
        let { name, value } = event.target;
        setAddInfo({
            ...addInfo,
            [name]: value
        })
    }

    const sendRequesttoVenue = async () => {
        eventdata.adminEmail = adminEmail;
        eventdata.venueEmail = venueEmail;
        eventdata.addInfo = addInfo.addInfo;
        const response = await axios.post(admin_requestedUrl + '/sendRequesttoVenue', { eventdata })
        if (response.status == 201) {
            response.data.data.adminRequest.map((data, index) => {
                if (data.eventId === eventdata._id) {
                    setData(response.data.data)
                    return;
                }
            });
            setResponseToUserModal(false)
        }

        if (response.status == 201) {
            Swal.fire({
                position: "middle",
                icon: "success",
                title: response.data.message,
                showConfirmButton: false,
                timer: 2000
            });

        }
        else {
            Swal.fire({
                icon: "error",
                title: "ERROR",
                text: "Please try Again...",
            });
        }
    }
    return (<>
        {data.adminRequest.length === 0 ? (
            <button className="btn btn-outline-danger" onClick={() => { setResponseToUserModal(true) }}>
                Send Request
            </button>
        ) : (requestData.status === undefined) ? (
            <button className="btn btn-outline-danger" onClick={() => { setResponseToUserModal(true) }}>
                Send Request
            </button>
        ) : (requestData.status === "pending"
        ) ? (
            <button className="btn btn-outline-danger" disabled>
                Request pending
            </button>
        ) : (
            <button className="btn btn-outline-danger" disabled>
                Request Accepted
            </button>
        )

        }
        <Modal size="md-down" show={isResponseToUserModal} onHide={() => { setResponseToUserModal(false) }} centered  >
            <Modal.Body className='bg-black' style={{ padding: '0 10%' }}>
                <div className='mt-4' >
                    <div className='d-flex justify-content-end'>
                        <button className='btn-close' aria-label="Close" onClick={() => { setResponseToUserModal(false) }}></button>
                    </div>
                    <h1 style={{ color: "white" }}>Send Request</h1>
                    {/* <h2 className="modal-title text-white text-center" >Enter Price </h2> */}
                    {/* <form onSubmit={sendRequesttoVenue} > */}
                    {/* <lable className="text-white">{eventdata.venuetype}</lable> */}
                    <div className="mb-3 mt-4">
                        <lable className="text-white fw-bold">Additional Information</lable>
                        <input type="text" className="form-control input-field" id="exampleInputName" placeholder="Enter the Additional Information according to your needs" name="addInfo" onChange={getData} />
                    </div>
                    {/* <div className="mb-3 mt-4">
                            <input type="text" className="form-control input-field" id="exampleInputName" placeholder="Details" name="explaination" onChange={getData} />
                        </div> */}
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="ourbtn w-50 mt-3 mb-3" style={{ color: 'black' }} onClick={() => { sendRequesttoVenue() }} >Send Response</button>
                    </div>
                    {/* </form> */}
                </div>
            </Modal.Body>
        </Modal>
    </>)
}
export default SendRequestToVenue;