// import Modal from 'react-bootstrap/Modal';
// import { caterre_requestUrl } from '../../urls';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { venue_requestUrl } from '../../urls';
// import jscookie from 'js-cookie';
// function VenueModal(props) {

//     const { venueEmail } = props;
//     console.log("venueEmail : ----------- ",venueEmail)
//     const [isResponseToUserModal, setResponseToUserModal] = useState(false);
//     const [VenueData, setVenueData] = useState('');
//     const userEmail = jscookie.get("user");
//     const getData = (event) => {
//         const { name, value } = event.target;
//         setVenueData({
//             ...VenueData,
//             [name]: value,
//         });
//     }

//     const handleSubmitDjData = async (event) => {
//         event.preventDefault();
//         alert("handleSubmitDjData : " + venueEmail);
//         VenueData["userEmail"] = userEmail;
//         VenueData["venueEmail"] = venueEmail;
//         try {

//             var responseData = await axios.post(venue_requestUrl + "/venueBookUser", VenueData);
//             console.log("responseData L ",responseData);
//             console.log("request send sucefully");
            
//             responseData.then((result)=>{
//                 if(result.status==201){
//                     alert("request send sucefully");
//                 }
//             })
//         } catch (error) {

//         }
//     }
//     return (<>
//         <button className='ourbtn mt-1' onClick={() => { setResponseToUserModal(true) }}>Book Now</button>
//         <Modal size="md-down" show={isResponseToUserModal} onHide={() => { setResponseToUserModal(false) }} centered  >
//             <Modal.Body className='bg-black' style={{ padding: '0 10%' }}>
//                 <div className='mt-4' >
//                     <div className='d-flex justify-content-end'>
//                         <button className='btn-close' aria-label="Close" onClick={() => { setResponseToUserModal(false) }}></button>
//                     </div>
//                     <h2 className="modal-title text-white text-center" >Book Venue </h2>
//                     <form onSubmit={handleSubmitDjData} method="post">
//                         <div className="mb-3">
//                             <input type="date" className="form-control input-field" placeholder="Event Date" name="date" onChange={getData} />
//                         </div>
//                         <div className="mb-3 mt-4">
//                             <input type="time" className="form-control input-field" placeholder="Event Start Time" name="time" onChange={getData} />
//                         </div>
//                         {/* <div className="mb-3 mt-4">
//                             <input type="text" className="form-control input-field" placeholder="Event location" name="location" onChange={getData} />
//                         </div> */}
//                         <div className="mb-3 mt-4">
//                             <input type="number" className="form-control input-field" id="exampleInputName" placeholder="Enter hours" onChange={getData} name="venuehours" />
//                         </div>
//                         <div className="d-flex justify-content-center">
//                             <button type="submit" className="ourbtn w-50 mt-3 mb-3" style={{ color: 'black' }}>Sbmit</button>
//                         </div>
//                     </form>
//                 </div>
//             </Modal.Body>
//         </Modal>
//     </>)
// }
// export default VenueModal;
import Modal from 'react-bootstrap/Modal';
import { caterre_requestUrl } from '../../urls';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { venue_requestUrl } from '../../urls';
import jscookie from 'js-cookie';
function VenueModal(props) {

    const { venueEmail } = props;
    console.log("venueEmail : ----------- ", venueEmail)
    const [isResponseToUserModal, setResponseToUserModal] = useState(false);
    const [VenueData, setVenueData] = useState('');
    const userEmail = jscookie.get("user");
    const getData = (event) => {
        const { name, value } = event.target;
        console.log("name : 000 ", name)
        console.log("value : 000 ", value)
        setVenueData({
            ...VenueData,
            [name]: value,
        });
    }

    const handleSubmitDjData = async (event) => {
        event.preventDefault();
        // alert("handleSubmitDjData : " + venueEmail);
        VenueData["userEmail"] = userEmail;
        VenueData["venueEmail"] = venueEmail;
        try {

            var responseData = await axios.post(venue_requestUrl + "/venueBookUser", VenueData);
            console.log("responseData L ", responseData);

            if (responseData.status == 201) {
                Swal.fire({
                    background: "black",
                    icon: "success",
                    text: "Request Sent Successfully...!",
                    showCloseButton: true,
                    focusConfirm: false,
                })
            }
        } catch (error) {
            alert("Error :", error);
        }
    }
    return (<>
        <button className='ourbtn mt-1' onClick={() => { setResponseToUserModal(true) }}>Book Now</button>
        <Modal size="md-down" show={isResponseToUserModal} onHide={() => { setResponseToUserModal(false) }} centered  >
            <Modal.Body className='bg-black' style={{ padding: '0 10%' }}>
                <div className='mt-4' >
                    <div className='d-flex justify-content-end'>
                        <button className='btn-close' aria-label="Close" onClick={() => { setResponseToUserModal(false) }}></button>
                    </div>
                    <h2 className="modal-title text-white text-center" >Book Venue</h2>
                    <form onSubmit={handleSubmitDjData} method="post">
                        <div className="mb-3">
                            <input type="date" className="form-control input-field" placeholder="Event Date" name="date" onChange={getData} />
                        </div>
                        <div className="mb-3 mt-4">
                            <label className="text-white fw-bold">Function Time</label><br />
                            <label className="text-white">Day</label>
                            <input type="radio" className="ms-2" name="functionTime" value="Day" onClick={getData} />
                            <label className="text-white ms-2">Evening</label>
                            <input type="radio" className="ms-2" name="functionTime" value="Evening" onClick={getData} />
                        </div>
                        {/* <div className="mb-3 mt-4">
                            <input type="text" className="form-control input-field" placeholder="Event location" name="location" onChange={getData} />
                        </div> */}
                        {/* <div className="mb-3 mt-4">
                            <input type="number" className="form-control input-field" id="exampleInputName" placeholder="Enter hours" onChange={getData} name="venuehours" />
                        </div> */}
                        <div className="mb-3 mt-4">
                            <input type="number" className="form-control input-field" id="exampleInputName" placeholder="Number of Rooms" onChange={getData} name="numRooms" />
                        </div>
                        <select
                            class="form-select"
                            name="functionType"
                            id=""
                            onChange={getData}
                        >
                            <option selected>Select one</option>
                            <option value="Wedding">Wedding</option>
                            <option value="Birthday Party">Birthday Party</option>
                            <option value="Corporate">Corporate</option>
                        </select>
                        <div className="mb-3 mt-4">
                            <input type="text" className="form-control input-field" id="exampleInputName" placeholder="Additional Information" onChange={getData} name="AdditionalInfo" />
                        </div>

                        <div className="d-flex justify-content-center">
                            <button type="submit" className="ourbtn w-50 mt-3 mb-3" style={{ color: 'black' }}>Submit</button>
                        </div>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    </>)
}
export default VenueModal;