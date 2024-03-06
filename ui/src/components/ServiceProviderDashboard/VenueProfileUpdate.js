import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { venue_requestUrl } from "../../urls";

function EditVenueProfileModal(props) {

    const { venueRegistrationInfo, UserInfo } = props;
    console.log("venueRegistrationInfo === == == == = > ", venueRegistrationInfo)
    console.log("UserInfo === == == == = > ", UserInfo)
    const [isEditprofilemodal, setEditprofilemodal] = useState(false);
    const [updatedProfileData, setUpdatedProfileData] = useState({});
    const getData = (event) => {
        const { name, value, type, checked } = event.target;
        console.log("type : ", type);
        console.log("checked : ", checked);
        console.log("name : ----=-=-=-=- > ", name);
        console.log("value : ----=-=-=-=- > ", value);
        if (type === "radio") {

            if (venueRegistrationInfo.policy === "No Refund Offered") {
                venueRegistrationInfo.policy = "No Refund Offered However Date Adjustment Can Be Done"
            } else {
                venueRegistrationInfo.policy = "No Refund Offered"

            }
        }
        setUpdatedProfileData({
            ...updatedProfileData,
            [name]: value
        });
    }

    const handleSubmitProfileUpdateData = async (event) => {
        event.preventDefault();
        try {
            updatedProfileData.Id = venueRegistrationInfo._id;
            updatedProfileData.email = venueRegistrationInfo.venueEmail;
            var result = axios.post(venue_requestUrl + "/updateVenueProfile", updatedProfileData);
            result.then((data) => {
                if (data.status == 201) {
                    alert("venue profile updated successfully");
                    setEditprofilemodal(false);
                }
            }, (err) => {
                console.log("error occur while catere profile ", err);
            });

        } catch (err) {
            console.log("Error while updaing catere profile");
        }
    }

    return (<>
        <li className="dropdown-item" onClick={() => { setEditprofilemodal(true) }}>Edit venue Profile</li>
        <Modal size="md-down" show={isEditprofilemodal} onHide={() => { setEditprofilemodal(false) }} centered  >
            <Modal.Body className='bg-black' style={{ padding: '0 10%' }}>
                <div className='mt-4' >
                    <div className='d-flex justify-content-end'>
                        <button className='btn-close' aria-label="Close" onClick={() => { setEditprofilemodal(false) }}></button>
                    </div>
                    <h2 className="modal-title text-white text-center" >Edit Profile FORM</h2>
                    <form onSubmit={handleSubmitProfileUpdateData} method="post">
                        <div className="mb-3 mt-4">
                            <label for="form-check-label" className="form-label text-white fw-bold">Name</label>

                            <input type="name" className="form-control input-field" defaultValue={UserInfo.name} id="exampleInputName" aria-describedby="nameHelp"
                                placeholder="Name" name="name" onChange={getData} />
                        </div>
                        <div className="mb-3 mt-4">
                            <label for="form-check-label" className="form-label text-white fw-bold">Contact</label>
                            <input type="text" name="contect" className="form-control input-field" id="exampleInputContact" defaultValue={UserInfo.contect} aria-describedby="contactHelp"
                                placeholder="Contact Us" onChange={getData} />
                        </div>
                        <div className="mb-3 mt-4">
                            <label for="form-check-label" className="form-label text-white fw-bold">Address</label>

                            <input type="text" name="address" className="form-control input-field" id="exampleInputAddress" aria-describedby="addressHelp" defaultValue={UserInfo.address}
                                placeholder="Address" onChange={getData} />
                        </div>
                        <div className="mb-3 mt-4">
                            <label for="form-check-label" className="form-label text-white fw-bold">Venue Location</label>
                            <input type="text" name="venueLocation" className="form-control input-field" id="exampleInputAddress" aria-describedby="addressHelp" defaultValue={venueRegistrationInfo.venueLocation}
                                placeholder="Address" onChange={getData} />
                        </div>
                        <div className="mb-3 mt-4">
                            <label for="form-check-label" className="form-label text-white fw-bold">Business Name</label>

                            <input type="text" name="VenueName" className="form-control input-field" id="exampleInputBusinessname" aria-describedby="addressHelp" defaultValue={venueRegistrationInfo.VenueName}
                                placeholder="Business Name" onChange={getData} />
                        </div>
                        <div className="mb-3 mt-4">
                            <label for="form-check-label" className="form-label text-white fw-bold">Venue Price</label>

                            <input type="text" name="venuePrice" className="form-control input-field" id="exampleInputBusinessname" aria-describedby="addressHelp" defaultValue={venueRegistrationInfo.venuePrice}
                                placeholder="Specialization" onChange={getData} />
                        </div>
                        <div className="mb-3 mt-4">
                            <label for="form-check-label" className="form-label text-white fw-bold">Booking Amount</label>
                            <input type="text" name="bookingAmount" className="form-control input-field" id="exampleInputBusinessname" aria-describedby="addressHelp" defaultValue={venueRegistrationInfo.bookingAmount}
                                placeholder="Specialization" onChange={getData} />
                        </div>
                        <div className="mb-3 mt-4">
                            <label for="form-check-label" className="form-label text-white fw-bold">Capacity</label>


                            <input type="text" name="capacity" className="form-control input-field" id="exampleInputBusinessname" aria-describedby="addressHelp" defaultValue={venueRegistrationInfo.capacity}
                                placeholder="ServiceCharges" onChange={getData} />
                        </div>
                        <div className="mb-3 mt-4">
                            <label for="form-check-label" className="form-label text-white fw-bold">Number of Rooms</label>
                            <input type="text" name="numRooms" className="form-control input-field" id="exampleInputBusinessname" aria-describedby="addressHelp" defaultValue={venueRegistrationInfo.numRooms}
                                placeholder="ServiceType" onChange={getData} />
                        </div>
                        <div className="mb-3 mt-4">
                            <label for="form-check-label" className="form-label text-white fw-bold">Per Room Charge</label>

                            <input type="text" name="roomCharge" className="form-control input-field" id="exampleInputBusinessname" aria-describedby="addressHelp" defaultValue={venueRegistrationInfo.roomCharge}
                                placeholder="ServiceType" onChange={getData} />
                        </div>
                        {/* <div className="col-md-12">
                            <div className="mt-4">
                                <label for="form-check-label" className="form-label text-white"><b>Policy</b></label><br />
                                <input onChange={getData} className="" type="radio" id="policy" name='policy' checked={venueRegistrationInfo.policy === "No Refund Offered"} value="No Refund Offered" />
                                <label for="form-check-label" htmlFor='policy' className="form-label text-white">&nbsp;No Refund Offered</label><br />
                                <input onChange={getData} className="" type="radio" id="policy" name='policy' checked={venueRegistrationInfo.policy === "No Refund Offered However Date Adjustment Can Be Done"} value="No Refund Offered However Date Adjustment Can Be Done" />
                                <label for="form-check-label" id="addgallery" htmlFor='policy' className="form-label">No Refund Offered However Date Adjustment Can Be Done</label>
                            </div>
                        </div> */}
                        <div className="col-md-12">
                            <div className="mt-4">
                                <label htmlFor="policy" className="form-label text-white"><b>Policy</b></label><br />
                                <input
                                    onChange={getData}
                                    className=""
                                    type="radio"
                                    id="policy1"
                                    name="policy"
                                    value="No Refund Offered"
                                    checked={venueRegistrationInfo.policy === "No Refund Offered"}
                                />
                                <label htmlFor="policy1" className="form-label text-white">&nbsp;No Refund Offered</label><br />

                                <input
                                    onChange={getData}
                                    className=""
                                    type="radio"
                                    id="policy2"
                                    name="policy"
                                    value="No Refund Offered However Date Adjustment Can Be Done"
                                    checked={venueRegistrationInfo.policy === "No Refund Offered However Date Adjustment Can Be Done"}
                                />
                                <label htmlFor="policy2" className="form-label text-white">No Refund Offered However Date Adjustment Can Be Done</label>
                            </div>
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

export default EditVenueProfileModal;