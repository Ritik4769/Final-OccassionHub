import { adminShowDjData } from "../../store/adminSlice.js";
import { useEffect, useState } from 'react'

function DjSection() {
    const [djuserData, setDjData] = useState([]);

    useEffect(() => {
        var djData = adminShowDjData();
        djData.then((djData) => {
            console.log("dj Data ----> : ", djData);
            if (djData) {
                setDjData(djData);
                alert("Dj Data find sucefully...!");
            } else {
                alert("no dj Data find");
            }
        });
    }, []);

    return (<>
        <h5 style={{ color: '#FF0057', textAlign: 'center', fontSize: '2.5rem' }}>Dj List</h5>
        <div className="container-fluid p-0 bg-dark" style={{ flexGrow: 1, }}>
            <div className="w-100 table-responsive p-2 pt-4 ">
                <table className="table table-bordered table-hover table-dark">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Email</th>
                            <th>Business Name</th>
                            <th>EquipmentType</th>
                            <th>Service Charges</th>
                            <th>Business Card</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            djuserData.map((djData, index) => {
                                return (<tr>
                                    <td>{index + 1 + " ."}</td>
                                    <td>{djData.DjEmail}</td>
                                    <td>{djData.Businessname}</td>
                                    <td>{djData.EquipmentType}</td>
                                    <td>{djData.Djprice}</td>
                                    <td><a href={`http://localhost:4001/${djData.docs}`} target="_blank">
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
export default DjSection;