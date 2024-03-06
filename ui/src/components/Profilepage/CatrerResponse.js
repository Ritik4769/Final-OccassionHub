import { useEffect, useState } from "react";
import jscookie from 'js-cookie';
import axios from "axios";
import { user_requestedUrl } from "../../urls";
import UserPaymentModal from "./UserPaymentModal";
import { useNavigate } from "react-router-dom";

function CatrerResponse() {
    const [isModalOpen, setModalOpen] = useState(false);

    const [djData, setDjData] = useState([]);
    const [catereData, setcatereData] = useState([]);
    var userEmail = jscookie.get('user');
    const navigate = useNavigate();

    const fetchRequstedData = async () => {
        var response = await axios.post(user_requestedUrl + "/seeRequetedData", { userEmail });
        // setDjData(response.data.djUserData);
        setcatereData(response.data.catereData);
        console.log("caterer data -00000-000- 0-0-0-0- ", response.data.djUserData)
    }

    useEffect(() => {
        fetchRequstedData();
    }, []);
    const acceptService = (data) => {
        console.log("data in acceptService function : ", data);
        navigate('/UserPaymentToCaterer', {
            state: { data }
        });
    }

    return (<>
        <div className="container-fluid  subScroller">
            <h5 className="text-white text-center my-3" >Catere Response</h5>
            <table class="table table-dark w-100">
                <thead style={{ position: 'sticky', top: '0' }}>
                    <tr>
                        <th scope="col">Sno</th>
                        <th scope="col">Date</th>
                        <th scope="col">Catere Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        catereData.map((data, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{data.date}</td>
                                <td>{data.catereBusiness}</td>
                                <td>{data.Price}</td>
                                <td>
                                    {
                                        data.status == 'Send' ? <button className="btn btn-outline-danger" onClick={() => { acceptService(data) }}>Accept</button> : <button disabled className="btn btn-danger" onClick={() => setModalOpen(true)}>Booked</button>
                                    }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </>);
}

export default CatrerResponse;