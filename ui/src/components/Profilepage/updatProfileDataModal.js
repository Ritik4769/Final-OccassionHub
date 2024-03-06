import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { user_requestedUrl } from "../../urls";
import jscookie from 'js-cookie';
import Swal from 'sweetalert2';
function UpdateProfileProfile() {
    const [isEditImageprofilemodal, setUpdateprofileImagemodal] = useState(false);
    const [userImageData, setUserImageData] = useState({})
    const getData = (event) => {
        let { name, value } = event.target;
        if (event.target.type == 'file') {
            value = event.target.files[0];
            setUserImageData({
                ...userImageData,
                [name]: value
            });
        }
    };

    const SubmitUserImageData = async (event) => {
        try {
            event.preventDefault();
            console.log("userImageData :----->  ", userImageData);
            const userCookieEmail = jscookie.get("user");
            userImageData["userEmail"] = userCookieEmail;
            const formData = new FormData();
            for (var index in userImageData) {
                console.log("userImageData[index] : ", userImageData[index])
                if (userImageData[index]) {
                    formData.append(index, userImageData[index])
                }
            }
            console.log("FormData:", formData);
            var response = await axios.post(user_requestedUrl + "/uploadImage", formData);
            console.log(response, "response data ");
            if (response.status == 201) {
                Swal.fire({
                    icon: 'success',
                    text: "Profile Update Sucefully..!!",
                    background: 'black'
                })
                //    ("profile Image updated successfully");
                setUpdateprofileImagemodal(false);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }


    return (<>
        <p className="text-center my-1" style={{ width: "215px" }} onClick={() => { setUpdateprofileImagemodal(true) }}><i class="bi bi-pencil-square"></i> Edit Profile</p>
        <Modal size="md-down" show={isEditImageprofilemodal} onHide={() => { setUpdateprofileImagemodal(false) }} centered  >
            <Modal.Body className='bg-black' style={{ padding: '0 10%' }}>
                <div className='mt-4' >
                    <div className='d-flex justify-content-end'>
                        <button className='btn-close' aria-label="Close" onClick={() => { setUpdateprofileImagemodal(false) }}></button>
                    </div>
                    <h2 className="modal-title text-white text-center" > Profile Image FORM</h2>
                    <form onSubmit={SubmitUserImageData}>
                        <div className="mb-3 mt-4">
                            <input type="file" className="form-control input-field" id="file" aria-describedby="nameHelp"
                                name="img" onChange={getData} />
                        </div>
                        <button type="submit" className="ourbtn w-50 mt-3 mb-3">uplode Image</button>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    </>)
}

export default UpdateProfileProfile;