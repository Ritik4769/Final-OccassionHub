import { adminShowVenueData } from "../../store/adminSlice.js";
import { useEffect, useState } from 'react'

function VenueSection() {
    const [veneueUserData, setVenueData] = useState([]);

    useEffect(() => {
        var venuedata = adminShowVenueData();
        console.log("bookdata : ", venuedata)
        venuedata.then((venueData) => {
            console.log("venue Data : ", venueData.bookdata);
            if (venueData) {
                setVenueData(venueData.veneueData);
                alert("veneue data find sucefully.....!!");
            } else {
                alert("no veneue Data find");
            }
        });
    }, []);

    return (<>
        <h5 style={{ color: '#FF0057', textAlign: 'center', fontSize: '2.5rem' }}>Venue List</h5>
        <div className="container-fluid p-0 bg-dark" style={{ flexGrow: 1, }}>
            <div className="w-100 table-responsive p-2 pt-4 ">
                <table className="table table-bordered table-hover table-dark">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Email</th>
                            <th>VenueName</th>
                            <th>Venue Location</th>
                            <th>Venue Price</th>
                            <th>Venue Type</th>
                            <th>Business Card</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            veneueUserData.map((venueData, index) => {
                                return (<tr>
                                    <td>{index + 1 + " ."}</td>
                                    <td>{venueData.venueEmail}</td>
                                    <td>{venueData.VenueName}</td>
                                    <td>{venueData.venueLocation}</td>
                                    <td>{venueData.venuePrice}</td>
                                    <td>{venueData.VenueType}</td>
                                    <td><a href={`http://localhost:4001/${venueData.docs}`} target="_blank">
                                        <button className="ourbtn">see docs</button>
                                        {/* <img height="200" src={`http://localhost:4001/${venueData.docs}`} class="card-img-top " alt="..." /> */}
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
export default VenueSection;