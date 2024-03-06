import { adminShowUserrequestedDecorationData } from "../../store/adminSlice";
import { useEffect, useState } from "react";
function DecorationRequestData() {
    const [decorationData, setVenueData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await adminShowUserrequestedDecorationData();
                console.log("decoration Data -----> ", result);
                if (result) {
                    setVenueData(result);
                } else {
                    alert("No decoration Data found");
                }
            } catch (error) {
                console.error("Error fetching decoration data: ", error);
                alert("Error fetching decoration data");
            }
        };
        fetchData();
    }, []);
    console.log("decorationData ---- > ", decorationData);

    return (<>
        <div className="container-fluid p-0 bg-dark" style={{ flexGrow: 1 }}>
            <h1 className="text-white">REQUEST USER FOR CATERER DATA</h1>
            <div className="w-100 table-responsive p-2 pt-4">
                <table className="table table-bordered table-hover table-dark">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>venue Manager Email</th>
                            <th> Businessname</th>
                            <th>Decoration Type</th>
                            <th>Date</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>booking Amount</th>
                            <th>Status</th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>User Contact</th>
                            <th>User Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {decorationData.map((data, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{data.decorationEmail}</td>
                                <td>{data.decoration.Businessname}</td>
                                <td>{data.decoration.Decorationtype}</td>
                                <td>{data.date}</td>
                                <td>{data.starttime}</td>
                                <td>{data.endtime}</td>
                                <td>{data.price}</td>
                                <td>{data.status}</td>
                                <td>{data.user.name}</td>
                                <td>{data.user.email}</td>
                                <td>{data.user.contect}</td>
                                <td>{data.user.address}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </>)
}
export default DecorationRequestData;
