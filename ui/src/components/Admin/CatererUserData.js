import { adminShowUserrequestedCatererData } from "../../store/adminSlice.js";
import { useEffect, useState } from "react";
function CatererUserData() {
    const [catererData, setCatererData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await adminShowUserrequestedCatererData();
                console.log("caterer Data -----> ", result);
                if (result) {
                    setCatererData(result);
                } else {
                    alert("No caterer Data found");
                }
            } catch (error) {
                console.error("Error fetching caterer data: ", error);
                alert("Error fetching caterer data");
            }
        };

        fetchData();
    }, []);
    console.log("catererData ---- > ", catererData);

    return (<>
        <div className="container-fluid p-0 bg-dark" style={{ flexGrow: 1 }}>
            <h1 className="text-white">REQUEST USER FOR CATERER DATA</h1>
            <div className="w-100 table-responsive p-2 pt-4">
                <table className="table table-bordered table-hover table-dark">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Caterer Manager Email</th>
                            <th>Foodtype</th>
                            <th>Business Name</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>guest</th>
                            <th>Status</th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>User Contact</th>
                            <th>User Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {catererData.map((data, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{data.caterer.catererEmail}</td>
                                <td>{data.caterer.FoodType}</td>
                                <td>{data.caterer.Businessname}</td>
                                <td>{data.date}</td>
                                <td>{data.time}</td>
                                <td>{data.totalguest}</td>
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
export default CatererUserData;
