import Modal from 'react-bootstrap/Modal';
import { venue_requestUrl } from '../../urls';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import jscookie from 'js-cookie';
import { admin_requestedUrl } from '../../urls';

function SendRequestToDecoration(props) {

    const { eventdata } = props;
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

    const sendRequesttoDecoration = async (data) => {
        // alert('jhjgh');
        try {
            data.eventId = eventdata._id
            const response = await axios.post(admin_requestedUrl + `/sendRequesttoDecoration`, data)
            if (response.status == 201) {
                response.data.data.adminRequest.map((data, index) => {
                    if (data.eventId === eventdata._id) {
                        setData(response.data.data)
                        return;
                    }
                });
            }

        } catch (error) {
            console.error("Error : ", error);
        }
    }

    return (
        <>
            {data.adminRequest.length === 0 ? (
                <button className="btn btn-outline-danger" onClick={() => {
                    sendRequesttoDecoration(data);
                }}>
                    Send Request
                </button>
            ) : (requestData.status === undefined) ? (
                <button className="btn btn-outline-danger" onClick={() => {
                    sendRequesttoDecoration(data);
                }}>
                    Send Request
                </button>
            ) : (requestData.status === "pending"
            ) ? (
                <button className="btn btn-outline-danger" disabled>
                    Request pending
                </button>) : (
                <button className="btn btn-outline-danger" disabled>
                    Request Accepted
                </button>)

            }
        </>)
}
export default SendRequestToDecoration;