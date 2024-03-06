import { useEffect, useState } from "react";
import jscookie from 'js-cookie';
import axios from "axios";
import { user_requestedUrl } from "../../urls";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function DjResponse() {
    const navigate = useNavigate();

    const [djData, setDjData] = useState([]);
    var userEmail = jscookie.get('user');

    const fetchRequstedData = async () => {
        var response = await axios.post(user_requestedUrl + "/seeRequetedData", { userEmail });
        setDjData(response.data.djUserData);
        console.log("caterer data -00000-000- 0-0-0-0- ", response.data.djUserData)
    }

    useEffect(() => {
        fetchRequstedData();
    }, []);

    const bookingDj = (data)=>{
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

    return (<>
        <div className="container-fluid subScroller">
            <h5 className="modal-title text-white text-center my-3" >DJ Response</h5>
            <table class="table table-dark table-striped">
                <thead>
                    <tr>
                        <th scope="col">Sno</th>
                        <th scope="col">Date</th>
                        <th scope="col">DJ Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        djData.map((data, index) => (
                            <tr key={index}>
                                {console.log("data in map methode : 36" , data)}
                                <th scope="row">{index + 1}</th>
                                <td>{data.date}</td>
                                <td>{data.djDetails.Businessname}</td>
                                <td>{data.djprice}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={()=>{
                                        bookingDj(data)
                                    }}
                                    >{data.status}</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </>);
}

export default DjResponse;