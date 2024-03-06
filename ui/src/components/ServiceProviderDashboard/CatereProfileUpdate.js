import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { caterre_requestUrl } from "../../urls";

function EditCatereProfileModal(props) {
    const { CatereRegistrationInfo, UserInfo } = props;
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
            updatedProfileData.Id = CatereRegistrationInfo._id;
            updatedProfileData.email = CatereRegistrationInfo.catererEmail;
            var result = axios.post(caterre_requestUrl + "/updateCatereProfile", updatedProfileData);
            result.then((data) => {
                if (data.status == 201) {
                    alert("catere profile updated successfully");
                    setEditprofilemodal(false);
                }
            }, (err) => {
                console.log("error occur while catere profile ",err);
            });

        } catch (err) {
            console.log("Error while updaing catere profile");
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
                    <h2 className="modal-title text-white text-center" >Edit Profile FORM</h2>
                    <form onSubmit={handleSubmitProfileUpdateData} method="post">
                        <div className="mb-3 mt-4">
                            <input type="name" className="form-control input-field" defaultValue={UserInfo.name} id="exampleInputName" aria-describedby="nameHelp"
                                placeholder="Name" name="name" onChange={getData} />
                        </div>
                        <div className="mb-3 mt-4">
                            <input type="text" name="contect" className="form-control input-field" id="exampleInputContact" defaultValue={UserInfo.contect} aria-describedby="contactHelp"
                                placeholder="Contact Us" onChange={getData} />
                        </div>
                        <div className="mb-3 mt-4">
                            <input type="text" name="address" className="form-control input-field" id="exampleInputAddress" aria-describedby="addressHelp" defaultValue={UserInfo.address}
                                placeholder="Address" onChange={getData} />
                        </div>
                        <div className="mb-3 mt-4">
                            <input type="text" name="Businessname" className="form-control input-field" id="exampleInputBusinessname" aria-describedby="addressHelp" defaultValue={CatereRegistrationInfo.Businessname}
                                placeholder="Business Name" onChange={getData} />
                        </div>
                        <div className="mb-3 mt-4">
                            <input type="text" name="Specialization" className="form-control input-field" id="exampleInputBusinessname" aria-describedby="addressHelp" defaultValue={CatereRegistrationInfo.Specialization}
                                placeholder="Specialization" onChange={getData} />
                        </div>
                        <div className="mb-3 mt-4">
                            <input type="text" name="ServiceCharges" className="form-control input-field" id="exampleInputBusinessname" aria-describedby="addressHelp" defaultValue={CatereRegistrationInfo.ServiceCharges}
                                placeholder="ServiceCharges" onChange={getData} />
                        </div>
                        <div className="col-md-12">
                            <select className="w-100 mt-4" id="select1" name="FoodType" onChange={getData} defaultValue={CatereRegistrationInfo.FoodType} aria-label="Default select example">
                                <option selected>Select Food Type</option>
                                <option value="Vegetarian">Vegetarian</option>
                                <option value="Non-Vegetarian">Non-Vegetarian</option>
                            </select>
                        </div>
                        <div className="mb-3 mt-4">
                            <input type="text" name="ServiceType" className="form-control input-field" id="exampleInputBusinessname" aria-describedby="addressHelp" defaultValue={CatereRegistrationInfo.ServiceType}
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

export default EditCatereProfileModal;