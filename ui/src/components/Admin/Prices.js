import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { admin_requestedUrl } from '../../urls';

function Prices(props) {
    const { eventdata, adminEmail } = props
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


    return (
        <>
            {
                (requestData.Price) ? requestData.Price : (requestData.venueprice) ? requestData.venueprice : '0'
            }
        </>)
}
export default Prices;