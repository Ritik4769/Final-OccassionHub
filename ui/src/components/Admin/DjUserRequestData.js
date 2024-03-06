import { useEffect, useState } from 'react';
import { adminShowUserrequestedDjData } from '../../store/adminSlice';

function DjRequestData() {
    const [djData, setDjData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await adminShowUserrequestedDjData();
                console.log("dj Data -----> ", result);
                if (result) {
                    setDjData(result);
                } else {
                    alert("No dj Data found");
                }
            } catch (error) {
                console.error("Error fetching dj data: ", error);
                alert("Error fetching dj data");
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container-fluid p-0 bg-dark" style={{ flexGrow: 1 }}>
            <h1 className="text-white">REQUEST USER FOR DJ DATA</h1>
            <div className="w-100 table-responsive p-2 pt-4">
                <table className="table table-bordered table-hover table-dark">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Dj Manager Email</th>
                            <th>Business Name</th>
                            <th>Dj Price</th>
                         
                            <th>Address</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Hours</th>
                            <th>Status</th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>User Contact</th>
                            <th>User Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {djData.map((data, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{data.dj.DjEmail}</td>
                                <td>{data.dj.Businessname}</td>
                                <td>{data.djprice}</td>
                              
                                <td>{data.location}</td>
                                <td>{data.date}</td>
                                <td>{data.time}</td>
                                <td>{data.djhours}</td>
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
    );
}

export default DjRequestData;