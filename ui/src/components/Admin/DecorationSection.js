import { adminShowDecorationData } from "../../store/adminSlice.js";
import { useEffect, useState } from 'react'


function DecorationSection() {
    const [decorationUserData, setDecorationData] = useState([]);

    useEffect(() => {
        var decorationdata = adminShowDecorationData();
        decorationdata.then((decorationData) => {
            console.log("decoration Data----> : ", decorationData);
            if (decorationData) {
                setDecorationData(decorationData);
                alert("decoration data find sucefully.....!!");
            } else {
                alert("no decoration Data find");
            }
        });
    }, []);

    return (<>
        <div className="container-fluid p-0 bg-dark text-white" style={{ flexGrow: 1, }}>
            <h1>Decoration Data</h1>
            <div className="w-100 table-responsive p-2 pt-4 ">
                <table className="table table-bordered table-hover table-dark">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Email</th>
                            <th>Businessname</th>
                            <th>Decoration Price</th>
                            <th>decoration Type</th>
                            <th>Business Card</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            decorationUserData.map((decorationData, index) => {
                                return (<tr>
                                    <td>{index + 1 + " ."}</td>
                                    <td>{decorationData.DecorationEmail}</td>
                                    <td>{decorationData.Businessname}</td>
                                    <td>{decorationData.Decorationprice}</td>
                                    <td>{decorationData.Decorationtype}</td>
                                    <td><a href={`http://localhost:4001/${decorationData.docs}`} target="_blank">
                                        <button className="ourbtn">see docs</button>
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
export default DecorationSection;