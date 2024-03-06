import React, { useEffect, useState } from "react";
import { adminShowUserrequestedVenueData } from "../../store/adminSlice";
import ShowVenueGallery from "../Allservices/ShowVenueGallery.js";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function VenueRequestData() {
    const [venueData, setVenueData] = useState([]);
    var navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await adminShowUserrequestedVenueData();
                console.log("venue Data -----> ", result);
                if (result) {
                    setVenueData(result);
                } else {
                    alert("No venue Data found");
                }
            } catch (error) {
                console.error("Error fetching venue data: ", error);
                alert("Error fetching venue data");
            }
        };

        fetchData();
    }, []);

    function venueProfile(venue) {
        navigate(`/ShowVenueGallery?venueData=${(venue)}`);
    }
    console.log("venueData ---- > ", venueData);
    return (
        <>
            <div className="container-fluid p-0 bg-dark" style={{ flexGrow: 1 }}>
                <h1 className="text-white">REQUEST USER FOR CATERER DATA</h1>
                <div className="w-100 table-responsive p-2 pt-4">
                    <table className="table table-bordered table-hover table-dark">
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>venue Manager Email</th>
                                <th>functionType</th>
                                <th>Venue Name</th>
                                <th>Date</th>
                                <th>Room Charge</th>
                                <th>otherCharge</th>
                                <th>totalAmount</th>
                                <th>Status</th>
                                <th>User Name</th>
                                <th>User Email</th>
                                <th>User Contact</th>
                                <th>User Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {venueData.map((data, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{data.venueEmail}</td>
                                    <td>{data.functionType}</td>
                                    <td onClick={() => venueProfile(data)}>{data.venue.VenueName}</td>
                                    <td>{data.date}</td>
                                    <td>{data.calculateAmount[0].roomCharge}</td>
                                    <td>{data.calculateAmount[0].otherCharge}</td>
                                    <td>{data.calculateAmount[0].totalAmount}</td>
                                    <td>{data.status}</td>
                                    <td>{data.user.name}</td>
                                    <td>{data.user.email}</td>
                                    <td>{data.user.contact}</td>
                                    <td>{data.user.address}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default VenueRequestData;
