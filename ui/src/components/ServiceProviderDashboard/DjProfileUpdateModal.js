import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { dj_requestUrl } from "../../urls";
import Swal from "sweetalert2";

function EditDjProfileModal(props) {
    const { DjInfo, DjUserInfo } = props;
    const [isEditprofilemodal, setEditprofilemodal] = useState(false);
    const [updatedProfileData, setUpdatedProfileData] = useState({});
    const getData = (event) => {
        const { name, value } = event.target;
        setUpdatedProfileData({
            ...updatedProfileData,
            [name]: value
        });
    }

    const handleSubmitProfileUpdateData = async (event) => {
        event.preventDefault();
        try {
            // updatedProfileData.Id = DjInfo._id;
            updatedProfileData.email = DjInfo.DjEmail;
            var result = axios.post(dj_requestUrl + "/updateDjProfile", updatedProfileData);
            result.then((data) => {
                if (data.status == 201) {
                    Swal.fire({
                        title: 'Update Profile Sucefully',

                        icon: 'success',
                        showCancelButton: true,
                        confirmButtonText: 'Yes',
                        background: "black",
                    })
                    setEditprofilemodal(false);
                }
            }, (err) => {
                console.log("error occur while dj profile ", err);
            });

        } catch (err) {
            console.log("Error while updaing dj profile");
        }
    }

    return (<>
        <li className="dropdown-item" onClick={() => { setEditprofilemodal(true) }}>Edit Profile</li>
        <Modal size="md-down" show={isEditprofilemodal} onHide={() => { setEditprofilemodal(false) }} centered  >
            <Modal.Body className='bg-black' style={{ padding: '0 10%' }}>
                <div className='mt-4' >
                    <div className='d-flex justify-content-end'>
                        <button className='btn-close' aria-label="Close" onClick={() => { setEditprofilemodal(false) }}></button>
                    </div>
                    <h2 className="modal-title text-white text-center" >Edit Dj Profile FORM</h2>
                    <form onSubmit={handleSubmitProfileUpdateData} method="post">
                        <div className="mb-3 mt-4">
                            <input type="name" className="form-control input-field" defaultValue={DjUserInfo.name} id="exampleInputName" aria-describedby="nameHelp"
                                placeholder="Name" name="name" onChange={getData} />
                        </div>
                        <div className="mb-3 mt-4">
                            <input type="text" name="contect" className="form-control input-field" id="exampleInputContact" defaultValue={DjUserInfo.contect} aria-describedby="contactHelp"
                                placeholder="Contact Us" onChange={getData} />
                        </div>
                        <div className="mb-3 mt-4">
                            <input type="text" name="address" className="form-control input-field" id="exampleInputAddress" aria-describedby="addressHelp" defaultValue={DjUserInfo.address}
                                placeholder="Address" onChange={getData} />
                        </div>
                        <div className="mb-3 mt-4">
                            <input type="text" name="Businessname" className="form-control input-field" id="exampleInputBusinessname" aria-describedby="addressHelp" defaultValue={DjInfo.Businessname}
                                placeholder="Business Name" onChange={getData} />
                        </div>
                        <div className="mb-3 mt-4">
                            <input type="text" name="EquipmentType" className="form-control input-field" id="exampleInputBusinessname" aria-describedby="addressHelp" defaultValue={DjInfo.EquipmentType}
                                placeholder="EquipmentType" onChange={getData} />
                        </div>
                        <div className="mb-3 mt-4">
                            <input type="text" name="Djprice" className="form-control input-field" id="exampleInputBusinessname" aria-describedby="addressHelp" defaultValue={DjInfo.Djprice}
                                placeholder="Djprice" onChange={getData} />
                        </div>

                        <div className="mb-3 mt-4">
                            <input type="text" name="ServiceType" className="form-control input-field" id="exampleInputBusinessname" aria-describedby="addressHelp" defaultValue={DjInfo.ServiceType}
                                placeholder="ServiceType" onChange={getData} />
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

export default EditDjProfileModal;
