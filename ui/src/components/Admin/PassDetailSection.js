import { adminShowPassDetails } from "../../store/adminSlice.js";
import { useEffect, useState } from 'react'

function PassDetailSection() {
    const [passes,setPassesData] = useState([]);

    useEffect(() => {
        var passesData = adminShowPassDetails();
        passesData.then((passesdata) => {
            console.log("Passes Data ---------> : ", passesdata);
            if (passesdata) {
                alert("passes data find sucefully.....!!");
                setPassesData(passesdata);
            } else {
                alert("no Passes Data find");
            }
        })
    }, []);

    return (<>
        <h5 style={{ color: '#FF0057', textAlign: 'center', fontSize: '2.5rem' }}>Passes List</h5>
        <div className="container-fluid p-0 bg-dark" style={{ flexGrow: 1, }}>
            <div className="w-100 table-responsive p-2 pt-4 ">
                <table className="table table-bordered table-hover table-dark">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Email</th>
                            <th>Pass Name:</th>
                            <th>Pass Price</th>
                            <th>Quantity</th>
                            <th>start Date</th>
                            <th>Last date</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            passes.map((passesData, index) => {
                                return (<tr>
                                    <td>{index + 1 + " ."}</td>
                                    <td>{passesData.userEmail}</td>
                                    <td>{passesData.passname}</td>
                                    <td>{passesData.passesPrice}</td>
                                    <td>{passesData.Quantity}</td>
                                    <td>{passesData.Start_Date}</td>
                                    <td>{passesData.Start_Date}</td>
                                    {/* <td><a href={`http://localhost:4001/${passesData.docs}`} target="_blank">
                                                    <button className="ourbtn">see docs</button>
                                                    {/* <img height="200" src={`http://localhost:4001/${passesData.docs}`} class="card-img-top " alt="..." /> */}
                                    {/* </a>  */}
                                    {/* // </td> */}
                                </tr>);
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </>);

}
export default PassDetailSection;