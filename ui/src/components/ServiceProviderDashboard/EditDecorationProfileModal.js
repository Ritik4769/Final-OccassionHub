import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { decoration_requestUrl } from "../../urls";

function EditDecorationProfileModal(props) {
    const { DecorationRegistrationInfo, UserInfo } = props;
    const [isEditprofilemodal, setEditprofilemodal] = useState(false);
    console.log("DecorationRegistrationInfo", DecorationRegistrationInfo)
    console.log("UserInfo", UserInfo)
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
            updatedProfileData.Id = DecorationRegistrationInfo._id;
            updatedProfileData.email = DecorationRegistrationInfo.DecorationEmail;
            var result = axios.post(decoration_requestUrl + "/updateDecorationProfile", updatedProfileData);
            result.then((data) => {
                if (data.status == 201) {
                    alert("Decoration profile updated successfully");
                    setEditprofilemodal(false);
                }
            }, (err) => {
                console.log("error occur while Decoration profile ", err);
            });

        } catch (err) {
            console.log("Error while updaing Decoration profile");
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
                    <form method="post" onSubmit={handleSubmitProfileUpdateData} >
                        <div className="mb-3 mt-4">
                            <input type="name" className="form-control input-field" id="exampleInputName" aria-describedby="nameHelp"
                                placeholder="Name" name="name" onChange={getData} defaultValue={UserInfo.name} />
                        </div>
                        <div className="mb-3 mt-4">
                            <input type="text" name="contect" className="form-control input-field" id="exampleInputContact" aria-describedby="contactHelp"
                                placeholder="Contact Us" onChange={getData} defaultValue={UserInfo.contect} />
                        </div>
                        <div className="mb-3 mt-4">
                            <input type="text" name="address" className="form-control input-field" id="exampleInputAddress" aria-describedby="addressHelp"
                                placeholder="Address" onChange={getData} defaultValue={UserInfo.address} />
                        </div>
                        <div className="mb-3 mt-4">
                            <input type="text" name="Businessname" className="form-control input-field" id="exampleInputBusinessname" aria-describedby="addressHelp"
                                placeholder="Businessname" onChange={getData} defaultValue={DecorationRegistrationInfo.Businessname} />
                        </div>
                        <div className="mb-3 mt-4">
                            <input type="text" name="Decorationprice" className="form-control input-field" id="exampleInputBusinessname" aria-describedby="addressHelp"
                                placeholder="Decoration price" onChange={getData} defaultValue={DecorationRegistrationInfo.Decorationprice} />
                        </div>
                        <div className="col-md-12">
                            <select className="w-100 mt-4" id="select1" name="Decorationtype" onChange={getData} defaultValue={DecorationRegistrationInfo.Decorationtype} aria-label="Default select example">
                                {/* <option selected>select food type </option> */}
                                <option value="All">All</option>
                                <option value="Baloon">Baloon</option>
                                <option value="Flower">Flower</option>
                                <option value="Baloon Flower">Baloon+Flower</option>
                                <option value="Pyro">Pyro</option>
                                <option value="Entry">Entry</option>
                            </select>
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

export default EditDecorationProfileModal;
