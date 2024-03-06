import { useEffect, useState } from "react";
import jscookie from 'js-cookie';
import axios from "axios";
import { user_requestedUrl } from "../../urls";
import FormCheckLabel from "react-bootstrap/esm/FormCheckLabel";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function DecorationResponse() {
    const [decorationRequestData, setdecorationRequestData] = useState([]);
    const [decorationData, setdecorationData] = useState({});
    const navigate = useNavigate();
    var userEmail = jscookie.get('user');

    const fetchRequstedData = async () => {
        var response = await axios.post(user_requestedUrl + "/seeRequetedData", { userEmail });
        console.log("response.data in decoration data in respose : ", response.data.decorationRequestData); 
        console.log("response.data in decoration data in respose decorationData : ", response.data.decorationData);
        setdecorationRequestData(response.data.decorationRequestData);
        setdecorationData(response.data.decorationData);
    }

    const bookingDecoration = async (data) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'do you want to Booked these..!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Booked',
            cancelButtonText: 'Reject',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/UserPaymentToCaterer', {
                    state: { data }
                });
            }
        });
    }

    useEffect(() => {
        fetchRequstedData();
    }, []);
    return (<>
        <div className="container-fluid">
            <h5 className="modal-title text-white text-center my-3" >Decoration Response</h5>
            <table class="table table-dark table-striped">
                <thead style={{ position: 'sticky', top: '0' }}>
                    <tr>
                        <th scope="col">Sno</th>
                        <th scope="col">Date</th>
                        <th scope="col">Decoration Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        decorationRequestData.map((data, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{data.date}</td>
                                <td>{decorationData.Businessname}</td>
                                <td>{data.Price}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => {
                                        bookingDecoration(data);
                                    }}>{data.status}</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </>);
}

export default DecorationResponse;