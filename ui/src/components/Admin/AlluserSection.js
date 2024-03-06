import { adminShowUserData } from "../../store/adminSlice.js";
import { useEffect, useState } from 'react'
import { admin_requestedUrl } from "../../urls.js";
import axios from "axios";
import Swal from "sweetalert2";

function AlluserSection() {
    const [userdata, setUserData] = useState([]);

    useEffect(() => {
        var data = adminShowUserData();
        console.log("data in deshboard: ", data);
        data.then((userData) => {
            console.log("datadatada =================", userData)
            if (userData) {
                setUserData(userData);
                alert("data find sucefully...!");
            } else {
                alert("no user data find");
            }
        });
    }, [])

    const blockUser = async (email) => {
        console.log("email : ", email);
        var response = await axios.post(admin_requestedUrl + "/adminBlockUser", { email: email });;
        console.log("response : ", response);
        setUserData(response.data.userdata);
        if (response.status == 201) {
            Swal.fire({
                icon: 'success',
                text: "user " + response.data.massage + " sucefully",
                background: 'black'
            })
        }
    }

    return (<>
        <div className="w-100 table-responsive p-2">
            <table className="table table-hover table-dark ">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Address</th>
                        <th>Role</th>
                        <th>Manage</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        userdata.map((data, index) => {
                            return (<tr>
                                <td>{index + 1 + " ."}</td>
                                <td>{data.name}</td>
                                <td>{data.email}</td>
                                <td>{data.contect}</td>
                                <td>{data.address}</td>
                                <td>{data.role}</td>
                                <td><button className="btn btn-outline-danger" onClick={() => { blockUser(data.email) }}>{data.userstatus}</button></td>
                            </tr>);
                        })
                    }
                </tbody>
            </table>
        </div>
    </>)
}
export default AlluserSection;