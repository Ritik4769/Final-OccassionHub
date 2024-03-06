// import { useState } from "react";
// import Modal from 'react-bootstrap/Modal';


// function EditProfileModal(props) {
//     const [isEditprofilemodal, setEditprofilemodal] = useState(false)
//     return (<>

//         <p className="btn btn-danger" onClick={() => { setEditprofilemodal(true) }}>Edit Profile</p>
//         <Modal size="md-down" show={isEditprofilemodal} onHide={() => { setEditprofilemodal(false) }} centered  >
//             <Modal.Body className='bg-black' style={{ padding: '0 10%' }}>
//                 <div className='mt-4' >
//                     <div className='d-flex justify-content-end'>
//                         <button className='btn-close' aria-label="Close" onClick={() => { setEditprofilemodal(false) }}></button>
//                     </div>
//                     <h2 className="modal-title text-white text-center" >Edit Profile FORM</h2>
//                     <form>
//                         <div className="mb-3 mt-4">
//                             <input type="name" className="form-control input-field" defaultValue={props.userData.name} id="exampleInputName" aria-describedby="nameHelp"
//                                 placeholder="Name" name="name" />
//                         </div>
//                         <div className="mb-3 mt-4">
//                             <input type="email" name="email" className="form-control input-field" defaultValue={props.userData.email} id="exampleInputEmail1" aria-describedby="emailHelp"
//                                 placeholder="Enter Email" />
//                         </div>
//                         <div className="mb-3">
//                             <input type="password" name="password" className="form-control  input-field" defaultValue={props.userData.password} id="exampleInputPassword1" placeholder="Password" />
//                         </div>
//                         <div className="mb-3 mt-4">
//                             <input type="text" name="contect" className="form-control input-field" id="exampleInputContact" defaultValue={props.userData.contect} aria-describedby="contactHelp"
//                                 placeholder="Contact Us" />
//                         </div>
//                         <div className="mb-3 mt-4">
//                             <input type="text" name="address" className="form-control input-field" id="exampleInputAddress" aria-describedby="addressHelp" defaultValue={props.userData.address}
//                                 placeholder="Address" />
//                         </div>
//                         <div className="d-flex justify-content-center">
//                             <button type="submit" className="ourbtn w-50 mt-3 mb-3">Update</button>
//                         </div>
//                     </form>
//                 </div>
//             </Modal.Body>
//         </Modal>
//     </>)
// }

// export default EditProfileModal;
import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { user_requestedUrl } from "../../urls";
// import Swal from 'sweetalert2';

function UpdatePasswordModal(props) {
    const [isEditprofilemodal, setEditprofilemodal] = useState(false);
    const [updatedPassData, setUpdatedPassData] = useState({});
    const getData = (event) => {
        const { name, value } = event.target;
        setUpdatedPassData({
            ...updatedPassData,
            [name]: value
        });
    }

    const handleSubmitProfileUpdateData = async (event) => {
        event.preventDefault();
        try {
            updatedPassData.Id = props.userData._id;
            console.log("=======>",props.userData._id);
            console.log("=============>",updatedPassData);
            var result = axios.post(user_requestedUrl + "/updateUserPassword", updatedPassData);
            console.log(result);
            result.then((data) => {
                if (data.status == 201) {
                    alert("Password updated successfully");
                    // Swal.fire({
                    //     background: "black",
                    //     icon: "error",
                    //     text: "Email does not exist...!!",
                    //     showCloseButton: true,
                    //     focusConfirm: false,
                    // });
                    setEditprofilemodal(false);
                }
            }, (err) => {
                console.log("error occur");
            });


        } catch (err) {
            console.log("Error while updaing user profile");
        }
    }

    return (<>
        <p className="btn btn-danger" onClick={() => { setEditprofilemodal(true) }}>Update Password</p>
        <Modal size="md-down" show={isEditprofilemodal} onHide={() => { setEditprofilemodal(false) }} centered  >
            <Modal.Body className='bg-black' style={{ padding: '0 10%' }}>
                <div className='mt-4' >
                    <div className='d-flex justify-content-end'>
                        <button className='btn-close' aria-label="Close" onClick={() => { setEditprofilemodal(false) }}></button>
                    </div>
                    <h2 className="modal-title text-white text-center" >Update Password</h2>
                    {/* <form onSubmit={handleSubmitProfileUpdateData} method="post">
                        <div className="mb-3 mt-4">
                            <input type="name" className="form-control input-field" defaultValue={props.userData.name} id="exampleInputName" aria-describedby="nameHelp"
                                placeholder="Name" name="name" onChange={getData} />
                        </div>
                        <div className="mb-3 mt-4">
                            <input type="text" name="contect" className="form-control input-field" id="exampleInputContact" defaultValue={props.userData.contect} aria-describedby="contactHelp"
                                placeholder="Contact Us" onChange={getData} />
                        </div>
                        <div className="mb-3 mt-4">
                            <input type="text" name="address" className="form-control input-field" id="exampleInputAddress" aria-describedby="addressHelp" defaultValue={props.userData.address}
                                placeholder="Address" onChange={getData} />
                        </div>
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="ourbtn w-50 mt-3 mb-3">Update Profile</button>
                        </div>
                    </form> */}
                    <form onSubmit={handleSubmitProfileUpdateData} method="post">
                        <div className="mb-3 mt-4">
                            <input type="password" className="form-control input-field"  id="exampleInputName" aria-describedby="nameHelp"
                                placeholder="Enter Your Old Password" name="oldPassword" onChange={getData} />
                        </div>
                        <div className="mb-3 mt-4">
                            <input type="password" name="newPasword" className="form-control input-field" id="exampleInputContact"  aria-describedby="contactHelp"
                                placeholder="Enter Your New Password" onChange={getData} />
                        </div>
                        <div className="mb-3 mt-4">
                            <input type="password" name="confirmPassword" className="form-control input-field" id="exampleInputAddress" aria-describedby="addressHelp" 
                                placeholder="Confirm Password" onChange={getData} />
                        </div>
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="ourbtn w-50 mt-3 mb-3">Update Profile</button>
                        </div>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    </>)
}

export default UpdatePasswordModal;
