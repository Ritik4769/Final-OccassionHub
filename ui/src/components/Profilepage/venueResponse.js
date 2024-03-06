import { useEffect, useState } from "react";
import jscookie from 'js-cookie';
import axios from "axios";
import { user_requestedUrl } from "../../urls";

function VenueResponse() {
    var userEmail = jscookie.get('user');
    const [venueData, setVenueData] = useState([]);
    const [UserResponseData, setUserResponseData] = useState([])
    console.log("user email ----=-==========-]========== : ", userEmail)
    console.log("venye sahgdjasdbvasuj : ", venueData)
    const fetchRequstedData = async () => {
        const response = await axios.post(user_requestedUrl + "/seeVenueRequetedData", { userEmail });
        setUserResponseData(response.data.requestuserData)
        setVenueData(response.data.result);
        console.log("venue data -00000-000- 0-0-0-0- ", response)
    }

    useEffect(() => {
        fetchRequstedData();
    }, []);
    return (<>
        <div className="container-fluid  subScroller">
            <h5 className="modal-title text-white text-center my-3" >Venue Response</h5>
            <table class="table table-dark table-striped w-100">
                <thead>
                    <tr>
                        <th scope="col">Sno</th>
                        <th scope="col">Date</th>
                        <th scope="col">Venue Name</th>
                        <th scope="col">Time</th>
                        <th scope="col">Function Type</th>
                        <th scope="col">Room Price</th>
                        <th scope="col">Other Price </th>
                        <th scope="col">Total Price</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        UserResponseData.map((data, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{data.date}</td>
                                <td>{venueData[index].VenueName}</td>
                                <td>{data.functionTime}</td>
                                <td>{data.functionType}</td>
                                <td>{data.calculateAmount[0].roomCharge}</td>
                                <td>
                                    {data.calculateAmount[0].otherCharge}<i class="fa fa-eye" aria-hidden="true"></i>
                                </td>
                                <td>{data.calculateAmount[0].totalAmount}</td>
                                <td>
                                    <button className="btn btn-danger">{data.status}</button>
                                </td>
                                <td>
                                </td>

                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </>);
}

export default VenueResponse;