import { adminShowCatererData } from "../../store/adminSlice.js";
import { useEffect, useState } from 'react'


function CatererSection() {
    const [caterer, setCaterersData] = useState([]);

    useEffect(() => {
        var caterersData = adminShowCatererData();
        caterersData.then((caterersData) => {
            console.log("Caterers Data :=================:", caterersData)
            if (caterersData) {
                setCaterersData(caterersData);
                alert("Caterers Data find sucefully...!");
            } else {
                alert("no Caterers Datafind");
            }
        });
    }, []);

    return (<>
        <div className="container-fluid p-0 bg-dark" style={{ flexGrow: 1, }}>
        <h1 className="text-white">Caterer Data</h1>
            <div className="w-100 table-responsive p-2 pt-4 ">
                <table className="table table-bordered table-hover table-dark">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Email</th>
                            <th>Business Name</th>
                            <th>Specialization</th>
                            <th>ServiceCharges</th>
                            <th>Food Type</th>
                            <th>Business Card</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            caterer.map((catererData, index) => {
                                return (<tr>
                                    <td>{index + 1 + " ."}</td>
                                    <td>{catererData.catererEmail}</td>
                                    <td>{catererData.Businessname}</td>
                                    <td>{catererData.Specialization}</td>
                                    <td>{catererData.ServiceCharges}</td>
                                    <td>{catererData.FoodType}</td>
                                    <td><a href={`http://localhost:4001/${catererData.docs}`} target="_blank">
                                        <button className="ourbtn">see docs</button>
                                        {/* <img height="200" src={`http://localhost:4001/${catererData.docs}`} class="card-img-top " alt="..." /> */}
                                    </a>
                                    </td>
                                </tr>);
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </>);
}
export default CatererSection;