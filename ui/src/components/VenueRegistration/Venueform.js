// import { useState } from 'react';
// import caterer from '../../images/Caterer.jpg'
// import './venueRegistrationcss.css';
// import jscookie from 'js-cookie';
// import Modal from 'react-bootstrap/Modal';
// import { RegistervenueData } from '../../store/venueSlice.js';
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';

// function Venue() {
//   const [isVenueManagerRegistrationModal, setVenueRegistrationModal] = useState(false);
//   const [venueData, setVenuedata] = useState({});
//   const navigate = useNavigate();

//   const getData = (event) => {
//     let { name, value } = event.target;
//     console.log("name : ", name)
//     console.log("value : ", value)
//     if (event.target.type == 'file') {
//       value = event.target.files[0];
//       setVenuedata({
//         ...venueData,
//         [name]: value
//       });
//     } else {
//       setVenuedata({
//         ...venueData,
//         [name]: value
//       });
//     }
//   };

//   const handleSubmitVenue = (event) => {
//     event.preventDefault();
//     const userCookieEmail = jscookie.get("user");
//     venueData["venueEmail"] = userCookieEmail;
//     const formData = new FormData();
//     for (var index in venueData) {
//       if (venueData[index]) {
//         formData.append(index, venueData[index])
//       }
//     }
//     var result = RegistervenueData(formData);
//     console.log("result : ", result)
//     result.then((result) => {
//       if (result.status == 201) {
//         // alert("registration sucefully...!!");
//         Swal.fire({
//           background: "black",
//           icon: "success",
//           text: "Registartion successfully",
//           showCloseButton: true,
//           focusConfirm: false,
//         });
//         setVenueRegistrationModal(false);
//         // navigate('/decorationDashboard')
//       }
//     }).catch((err) => {
//       alert("error in registration......!!");
//       console.log("error in catch.....!!" + err);
//     });
//   };


//   const handleVenueManagerModalClose = () => {
//     setVenueRegistrationModal(false);
//   }
//   return (<>
//     <h6 onClick={() => { setVenueRegistrationModal(true) }}>Venue Manager</h6>
//     <form onSubmit={handleSubmitVenue} className="form-group" enctype="multipart/form-data">

//       <Modal size="md" show={isVenueManagerRegistrationModal} onHide={handleVenueManagerModalClose} centered  >
//         <Modal.Body className='p-0'>
//           <div className="container bg-black">
//             <div className="row d-flex justify-content-center align-items-center h-50" >
//               {/* <div className='col-lg-6'>
//                 <img src={caterer} width={'100%'} alt="Sample photo" />
//               </div> */}
//               <div className="col-lg-12 py-4">
//                 <h2 className="text-center text-white">Venue Manager Form</h2>
//                 <form className="px-md-2">
//                   <div className="row">
//                     <div className="col-md-12">
//                       <div className="mt-4">
//                         <input type="text" id="name1" className="form-control input-field" placeholder="Enter your Venue name" onChange={getData} name='VenueName' />
//                       </div>
//                     </div>
//                     <div className="col-md-12">
//                       <div className="mt-4">
//                         <input type="text" id="name2" className="form-control input-field" placeholder="Enter your venue location" onChange={getData} name='venueLocation' />
//                       </div>
//                     </div>
//                     <div className="col-md-12">
//                       <div className="mt-4">
//                         <input type="text" id="name2" className="form-control input-field" placeholder="Enter your Venue Price/per Day" onChange={getData} name='venuePrice' />
//                       </div>
//                     </div>

//                     <div className="col-md-12">
//                       <div className="mt-4">
//                         <input type="number" id="name2" className="form-control input-field" placeholder="Members Capacity " onChange={getData} name='capacity' />
//                       </div>
//                     </div>
//                     <div className="col-md-12">
//                       <div className="mt-4">
//                         <input type="number" id="name2" className="form-control input-field" placeholder="Minimun Members For Booking" onChange={getData} name='minMembers' />
//                       </div>
//                     </div>
//                     <div className="col-md-12">
//                       <div className="mt-4">
//                         <input type="number" id="name2" className="form-control input-field" placeholder="Booking Amount Of venue" onChange={getData} name='bookingAmount' />
//                       </div>
//                     </div>
//                     {/* <div className="col-md-12">
//                       <div className="mt-4">
//                         <input type="text" id="name2" className="form-control input-field" placeholder="What year did your venue start operations ?" onChange={getData} name='experience' />
//                       </div>
//                     </div> */}
//                     <div className="col-md-12">
//                       <div className="mt-4">
//                         <input type="number" id="name2" className="form-control input-field" placeholder="Number Of Rooms" onChange={getData} name='numRooms' />
//                       </div>
//                     </div>
//                     <div className="col-md-12">
//                       <div className="mt-4">
//                         <input type="number" id="name2" className="form-control input-field" placeholder="Per Room Charge" onChange={getData} name='roomCharge' />
//                       </div>
//                     </div>
//                     <div className="col-md-12">
//                       <div className="mt-4">
//                         <label for="formFile" id="addgallery" className="form-label">Add Your Gallery</label>
//                         <input onChange={getData} className="form-control" type="file" id="docs" name='docs' />
//                       </div>
//                     </div>
//                     <div className="col-md-12">
//                       <select onChange={getData} name='VenueType' class="w-100 mt-4" id="select1" aria-label="Default select example">
//                         <option selected>Select Venue type</option>
//                         <option value="All">All</option>
//                         <option value="Garden & Hall">Garden + Hall</option>
//                         <option value="Garden,Room & Hall">Garden + Room + Hall</option>
//                       </select>
//                     </div>
//                     <div className="col-md-12">
//                       <div className="mt-4">
//                         <label for="form-check-label" className="form-label text-white"><b>Policy</b></label><br />
//                         <input onChange={getData} className="" type="radio" id="policy" name='policy' value="No Refund Offered" />
//                         <label for="form-check-label" htmlFor='policy' className="form-label text-white">&nbsp;No Refund Offered</label><br />

//                         <input onChange={getData} className="" type="radio" id="policy" name='policy' value="No Refund Offered However Date Adjustment Can Be Done" />
//                         <label for="form-check-label" id="addgallery" htmlFor='policy' className="form-label">No Refund Offered However Date Adjustment Can Be Done</label>


//                       </div>
//                     </div>

//                     {/* <div className="col col-lg-6  d-flex justify-content-center">
//                             <div className="mb-3 form-check">
//                                 <label className="form-check-label" htmlFor="exampleCheck1">Celebration Event</label>
//                                 <input type="radio" className="mx-5" id="exampleInputEmail1" name="eventtype" value="Celebration" onChange={getFormData} aria-describedby="emailHelp" />
//                             </div>
//                         </div> */}

//                   </div>
//                   <div className="d-flex justify-content-center mt-3">
//                     <button type="submit" className="ourbtn w-50">Submit</button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </Modal.Body>
//       </Modal>
//     </form>
//   </>)
// }
// export default Venue


// // import { useState } from 'react';
// // import caterer from '../../images/Caterer.jpg'
// // import './venueRegistrationcss.css';
// // import jscookie from 'js-cookie';
// // import Modal from 'react-bootstrap/Modal';
// // import { RegistervenueData } from '../../store/venueSlice.js';
// // import { useNavigate } from 'react-router-dom';

// // function Venue() {
// //   const [isVenueManagerRegistrationModal, setVenueRegistrationModal] = useState(false);
// //   const [venueData, setVenuedata] = useState({});
// //   const navigate = useNavigate();

// //   const getData = (event) => {
// //     let { name, value } = event.target;
// //     if (event.target.type == 'file') {
// //       value = event.target.files[0];
// //       setVenuedata({
// //         ...venueData,
// //         [name]: value
// //       });
// //     } else {
// //       setVenuedata({
// //         ...venueData,
// //         [name]: value
// //       });
// //     }
// //   };

// //   const handleSubmitVenue = (event) => {
// //     event.preventDefault();
// //     const userCookieEmail = jscookie.get("user");
// //     venueData["venueEmail"] = userCookieEmail;
// //     const formData = new FormData();
// //     for (var index in venueData) {
// //       if (venueData[index]) {
// //         formData.append(index, venueData[index])
// //       }
// //     }
// //     var result = RegistervenueData(formData);
// //     result.then((result) => {
// //       if (result.status == 201) {
// //         alert("registration sucefully...!!");
// //         setVenueRegistrationModal(false);
// //         // navigate('/decorationDashboard')
// //       }
// //     }).catch((err) => {
// //       alert("error in registration......!!");
// //       console.log("error in catch.....!!" + err);
// //     });
// //   };


// //   const handleVenueManagerModalClose = () => {
// //     setVenueRegistrationModal(false);
// //   }
// //   return (<>
// //     <h6 onClick={() => { setVenueRegistrationModal(true) }}>Venue Manager</h6>
// //     <form onSubmit={handleSubmitVenue} className="form-group" enctype="multipart/form-data">

// //       <Modal size="lg" show={isVenueManagerRegistrationModal} onHide={handleVenueManagerModalClose} centered  >
// //         <Modal.Body className='p-0'>
// //           <div className="container bg-black">
// //             <div className="row d-flex justify-content-center align-items-center h-50" >
// //               <div className='col-lg-6'>
// //                 <img src={caterer} width={'100%'} alt="Sample photo" />
// //               </div>
// //               <div className="col-lg-6 py-4">
// //                 <h2 className="text-center text-white">Venue Manager Form</h2>
// //                 <form className="px-md-2">
// //                   <div className="row">
// //                     <div className="col-md-12">
// //                       <div className="mt-4">
// //                         <input type="text" id="name1" className="form-control input-field" placeholder="Enter your Venue name" onChange={getData} name='VenueName' />
// //                       </div>
// //                     </div>
// //                     <div className="col-md-12">
// //                       <div className="mt-4">
// //                         <input type="text" id="name2" className="form-control input-field" placeholder="Enter your venue location" onChange={getData} name='venueLocation' />
// //                       </div>
// //                     </div>
// //                     <div className="col-md-12">
// //                       <div className="mt-4">
// //                         <input type="text" id="name2" className="form-control input-field" placeholder="Enter your Venue Price/per Day" onChange={getData} name='venuePrice' />
// //                       </div>
// //                     </div>
// //                     <div className="col-md-12">
// //                       <div className="mt-4">
// //                         <label for="formFile" id="addgallery" className="form-label">Add Your Gallery</label>
// //                         <input onChange={getData} className="form-control" type="file" id="docs" name='docs' />
// //                       </div>
// //                     </div>
// //                     <div className="col-md-12">
// //                       <select onChange={getData} name='VenueType' class="w-100 mt-4" id="select1" aria-label="Default select example">
// //                         <option selected>Select Venue type</option>
// //                         <option value="garden">All</option>
// //                         <option value="2">Garden+Hall</option>
// //                         <option value="3">Garden+Room+Hall</option>
// //                       </select>
// //                     </div>
// //                   </div>
// //                   <div className="d-flex justify-content-center mt-3">
// //                     <button type="submit" className="ourbtn w-50">Submit</button>
// //                   </div>
// //                 </form>
// //               </div>
// //             </div>
// //           </div>
// //         </Modal.Body>
// //       </Modal>
// //     </form>
// //   </>)
// // }
// // export default Venue

// import { useState } from 'react';
// import caterer from '../../images/Caterer.jpg'
// import './venueRegistrationcss.css';
// import jscookie from 'js-cookie';
// import Modal from 'react-bootstrap/Modal';
// import { RegistervenueData } from '../../store/venueSlice.js';
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';

// function Venue() {
//   const [isVenueManagerRegistrationModal, setVenueRegistrationModal] = useState(false);
//   const [venueData, setVenuedata] = useState({});
//   const navigate = useNavigate();

//   const getData = (event) => {
//     let { name, value } = event.target;
//     console.log("name : ", name)
//     console.log("value : ", value)
//     if (event.target.type == 'file') {
//       value = event.target.files[0];
//       setVenuedata({
//         ...venueData,
//         [name]: value
//       });
//     } else {
//       setVenuedata({
//         ...venueData,
//         [name]: value
//       });
//     }
//   };

//   const handleSubmitVenue = (event) => {
//     event.preventDefault();
//     const userCookieEmail = jscookie.get("user");
//     venueData["venueEmail"] = userCookieEmail;
//     const formData = new FormData();
//     for (var index in venueData) {
//       if (venueData[index]) {
//         formData.append(index, venueData[index])
//       }
//     }
//     var result = RegistervenueData(formData);
//     console.log("result : ", result)
//     result.then((result) => {
//       if (result.status == 201) {
//         // alert("registration sucefully...!!");
//         Swal.fire({
//           background: "black",
//           icon: "success",
//           text: "Registartion successfully",
//           showCloseButton: true,
//           focusConfirm: false,
//         });
//         setVenueRegistrationModal(false);
//         // navigate('/decorationDashboard')
//       }
//     }).catch((err) => {
//       alert("error in registration......!!");
//       console.log("error in catch.....!!" + err);
//     });
//   };


//   const handleVenueManagerModalClose = () => {
//     setVenueRegistrationModal(false);
//   }
//   return (<>
//     <h6 onClick={() => { setVenueRegistrationModal(true) }}>Venue Manager</h6>
//     <form onSubmit={handleSubmitVenue} className="form-group" enctype="multipart/form-data">

//       <Modal size="md" show={isVenueManagerRegistrationModal} onHide={handleVenueManagerModalClose} centered  >
//         <Modal.Body className='p-0'>
//           <div className="container bg-black">
//             <div className="row d-flex justify-content-center align-items-center h-50" >
//               {/* <div className='col-lg-6'>
//                 <img src={caterer} width={'100%'} alt="Sample photo" />
//               </div> */}
//               <div className="col-lg-12 py-4">
//                 <h2 className="text-center text-white">Venue Manager Form</h2>
//                 <form className="px-md-2">
//                   <div className="row">
//                     <div className="col-md-12">
//                       <div className="mt-4">
//                         <input type="text" id="name1" className="form-control input-field" placeholder="Enter your Venue name" onChange={getData} name='VenueName' />
//                       </div>
//                     </div>
//                     <div className="col-md-12">
//                       <div className="mt-4">
//                         <input type="text" id="name2" className="form-control input-field" placeholder="Enter your venue location" onChange={getData} name='venueLocation' />
//                       </div>
//                     </div>
//                     <div className="col-md-12">
//                       <div className="mt-4">
//                         <input type="text" id="name2" className="form-control input-field" placeholder="Enter your Venue Price/per Day" onChange={getData} name='venuePrice' />
//                       </div>
//                     </div>

//                     <div className="col-md-12">
//                       <div className="mt-4">
//                         <input type="number" id="name2" className="form-control input-field" placeholder="Members Capacity " onChange={getData} name='capacity' />
//                       </div>
//                     </div>
//                     <div className="col-md-12">
//                       <div className="mt-4">
//                         <input type="number" id="name2" className="form-control input-field" placeholder="Minimun Members For Booking" onChange={getData} name='minMembers' />
//                       </div>
//                     </div>
//                     <div className="col-md-12">
//                       <div className="mt-4">
//                         <input type="number" id="name2" className="form-control input-field" placeholder="Booking Amount Of venue" onChange={getData} name='bookingAmount' />
//                       </div>
//                     </div>
//                     {/* <div className="col-md-12">
//                       <div className="mt-4">
//                         <input type="text" id="name2" className="form-control input-field" placeholder="What year did your venue start operations ?" onChange={getData} name='experience' />
//                       </div>
//                     </div> */}
//                     <div className="col-md-12">
//                       <div className="mt-4">
//                         <input type="number" id="name2" className="form-control input-field" placeholder="Number Of Rooms" onChange={getData} name='numRooms' />
//                       </div>
//                     </div>
//                     <div className="col-md-12">
//                       <div className="mt-4">
//                         <input type="number" id="name2" className="form-control input-field" placeholder="Per Room Charge" onChange={getData} name='roomCharge' />
//                       </div>
//                     </div>
//                     <div className="col-md-12">
//                       <div className="mt-4">
//                         <label for="formFile" id="addgallery" className="form-label">Add Your Gallery</label>
//                         <input onChange={getData} className="form-control" type="file" id="docs" name='docs' />
//                       </div>
//                     </div>
//                     <div className="col-md-12">
//                       <select onChange={getData} name='VenueType' class="w-100 mt-4" id="select1" aria-label="Default select example">
//                         <option selected>Select Venue type</option>
//                         <option value="All">All</option>
//                         <option value="Garden & Hall">Garden + Hall</option>
//                         <option value="Garden,Room & Hall">Garden + Room + Hall</option>
//                       </select>
//                     </div>
//                     <div className="col-md-12">
//                       <div className="mt-4">
//                         <label for="form-check-label" className="form-label text-white"><b>Policy</b></label><br />
//                         <input onChange={getData} className="" type="radio" id="policy" name='policy' value="No Refund Offered" />
//                         <label for="form-check-label" htmlFor='policy' className="form-label text-white">&nbsp;No Refund Offered</label><br />

//                         <input onChange={getData} className="" type="radio" id="policy" name='policy' value="No Refund Offered However Date Adjustment Can Be Done" />
//                         <label for="form-check-label" id="addgallery" htmlFor='policy' className="form-label">No Refund Offered However Date Adjustment Can Be Done</label>


//                       </div>
//                     </div>

//                     {/* <div className="col col-lg-6  d-flex justify-content-center">
//                             <div className="mb-3 form-check">
//                                 <label className="form-check-label" htmlFor="exampleCheck1">Celebration Event</label>
//                                 <input type="radio" className="mx-5" id="exampleInputEmail1" name="eventtype" value="Celebration" onChange={getFormData} aria-describedby="emailHelp" />
//                             </div>
//                         </div> */}     

//                   </div>
//                   <div className="d-flex justify-content-center mt-3">
//                     <button type="submit" className="ourbtn w-50">Submit</button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </Modal.Body>
//       </Modal>
//     </form>
//   </>)
// }
// export default Venue

import { useState } from 'react';
import jscookie from 'js-cookie';
import Modal from 'react-bootstrap/Modal';
import { RegistervenueData } from '../../store/venueSlice.js';
import { useNavigate } from 'react-router-dom';

function Venue() {
  const [isVenueManagerRegistrationModal, setVenueRegistrationModal] = useState(false);
  const [venueData, setVenueData] = useState({
    VenueName: '',
    venueLocation: '',
    venuePrice: '',
    capacity: '',
    minMembers: '',
    bookingAmount: '',
    numRooms: '',
    roomCharge: '',
    docs: null,
    VenueType: '',
    policy: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    const nameRegex = /^[A-Za-z\s]+$/;
    const locationRegex = /^[A-Za-z0-9\s,-]+$/;
    const priceRegex = /^\d+(\.\d{1,2})?$/;
    const capacityRegex = /^\d+$/;
    const bookingAmountRegex = /^\d+(\.\d{1,2})?$/;
    const numRoomsRegex = /^\d+$/;
    const roomChargeRegex = /^\d+(\.\d{1,2})?$/;

    if (!venueData.VenueName.trim()) {
      errors.VenueName = 'Venue name is required';
    } else if (!nameRegex.test(venueData.VenueName.trim())) {
      errors.VenueName = 'Invalid venue name format';
    }

    if (!venueData.venueLocation.trim()) {
      errors.venueLocation = 'Venue location is required';
    } else if (!locationRegex.test(venueData.venueLocation.trim())) {
      errors.venueLocation = 'Invalid venue location format';
    }

    if (!venueData.venuePrice.trim()) {
      errors.venuePrice = 'Venue price is required';
    } else if (!priceRegex.test(venueData.venuePrice.trim())) {
      errors.venuePrice = 'Invalid venue price format';
    }

    if (!venueData.capacity.trim()) {
      errors.capacity = 'Capacity is required';
    } else if (!capacityRegex.test(venueData.capacity.trim())) {
      errors.capacity = 'Invalid capacity format';
    }

    if (!venueData.minMembers.trim()) {
      errors.minMembers = 'Minimum members for booking are required';
    } else if (!capacityRegex.test(venueData.minMembers.trim())) {
      errors.minMembers = 'Invalid minimum members format';
    }

    if (!venueData.bookingAmount.trim()) {
      errors.bookingAmount = 'Booking amount is required';
    } else if (!bookingAmountRegex.test(venueData.bookingAmount.trim())) {
      errors.bookingAmount = 'Invalid booking amount format';
    }

    if (!venueData.numRooms.trim()) {
      errors.numRooms = 'Number of rooms is required';
    } else if (!numRoomsRegex.test(venueData.numRooms.trim())) {
      errors.numRooms = 'Invalid number of rooms format';
    }

    if (!venueData.roomCharge.trim()) {
      errors.roomCharge = 'Room charge is required';
    } else if (!roomChargeRegex.test(venueData.roomCharge.trim())) {
      errors.roomCharge = 'Invalid room charge format';
    }

    if (!venueData.docs) {
      errors.docs = 'Gallery image is required';
    }

    if (!venueData.VenueType) {
      errors.VenueType = 'Venue type is required';
    }

    if (!venueData.policy) {
      errors.policy = 'Policy is required';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };


  const handleSubmitVenue = (event) => {
    event.preventDefault();
    // Validate form
    if (!validateForm()) {
      return;
    }
    // Proceed with form submission
    const userCookieEmail = jscookie.get("user");
    venueData["venueEmail"] = userCookieEmail;
    const formData = new FormData();
    for (var index in venueData) {
      if (venueData[index]) {
        formData.append(index, venueData[index]);
      }
    }
    RegistervenueData(formData)
      .then((result) => {
        if (result.status === 201) {
          alert("Registration successful!");
          setVenueRegistrationModal(false);
          navigate('/venueDashboard');
        }
      })
      .catch((err) => {
        alert("Error in registration");
        console.error("Error: ", err);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setVenueData({
      ...venueData,
      [name]: value
    });
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setVenueData({
      ...venueData,
      [name]: files[0]
    });
  };

  const handleVenueManagerModalClose = () => {
    setVenueRegistrationModal(false);
  };

  return (
    <>
      <h6 onClick={() => { setVenueRegistrationModal(true) }}>Venue Manager</h6>
      <form onSubmit={handleSubmitVenue} className="form-group" encType="multipart/form-data">
        <Modal size="md" show={isVenueManagerRegistrationModal} onHide={handleVenueManagerModalClose} centered>
          <Modal.Body className='p-0'>
            <div className="container bg-black">
              <div className="row d-flex justify-content-center align-items-center h-50">
                <div className="col-lg-12 py-4">
                  <h2 className="text-center text-white">Venue Manager Form</h2>
                  <form className="px-md-2">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="mt-4">
                          <input type="text" id="name1" className="form-control input-field" placeholder="Enter your Venue name" onChange={handleInputChange} name='VenueName' />
                          {errors.VenueName && <label style={{ color: "red" }}>{errors.VenueName}</label>}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mt-4">
                          <input type="text" id="name2" className="form-control input-field" placeholder="Enter your venue location" onChange={handleInputChange} name='venueLocation' />
                          {errors.venueLocation && <label style={{ color: "red" }}>{errors.venueLocation}</label>}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mt-4">
                          <input type="text" id="name2" className="form-control input-field" placeholder="Enter your Venue Price/per Day" onChange={handleInputChange} name='venuePrice' />
                          {errors.venuePrice && <label style={{ color: "red" }}>{errors.venuePrice}</label>}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mt-4">
                          <input type="number" id="name2" className="form-control input-field" placeholder="Members Capacity" onChange={handleInputChange} name='capacity' />
                          {errors.capacity && <label style={{ color: "red" }}>{errors.capacity}</label>}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mt-4">
                          <input type="number" id="name2" className="form-control input-field" placeholder="Minimum Members For Booking" onChange={handleInputChange} name='minMembers' />
                          {errors.minMembers && <label style={{ color: "red" }}>{errors.minMembers}</label>}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mt-4">
                          <input type="number" id="name2" className="form-control input-field" placeholder="Booking Amount Of venue" onChange={handleInputChange} name='bookingAmount' />
                          {errors.bookingAmount && <label style={{ color: "red" }}>{errors.bookingAmount}</label>}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mt-4">
                          <input type="number" id="name2" className="form-control input-field" placeholder="Number Of Rooms" onChange={handleInputChange} name='numRooms' />
                          {errors.numRooms && <label style={{ color: "red" }}>{errors.numRooms}</label>}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mt-4">
                          <input type="number" id="name2" className="form-control input-field" placeholder="Per Room Charge" onChange={handleInputChange} name='roomCharge' />
                          {errors.roomCharge && <label style={{ color: "red" }}>{errors.roomCharge}</label>}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mt-4">
                          <label htmlFor="docs" className="form-label" id="addgallery">Add Your Gallery</label>
                          <input onChange={handleFileChange} className="form-control" type="file" id="docs" name='docs' />
                          {errors.docs && <label style={{ color: "red" }}>{errors.docs}</label>}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <select onChange={handleInputChange} name='VenueType' className="w-100 mt-4" id="select1" aria-label="Default select example">
                          <option value="">Select Venue type</option>
                          <option value="All">All</option>
                          <option value="Garden & Hall">Garden + Hall</option>
                          <option value="Garden,Room & Hall">Garden + Room + Hall</option>
                        </select>
                        {errors.VenueType && <label style={{ color: "red" }}>{errors.VenueType}</label>}
                      </div>
                      <div className="col-md-12">
                        <div className="mt-4">
                          <label htmlFor="policy" className="form-label text-white"><b>Policy</b></label><br />
                          <input onChange={handleInputChange} type="radio" id="policy1" name='policy' value="No Refund Offered" />
                          <label htmlFor="policy1" className="form-label text-white">&nbsp;No Refund Offered</label><br />

                          <input onChange={handleInputChange} type="radio" id="policy2" name='policy' value="No Refund Offered However Date Adjustment Can Be Done" />
                          <label htmlFor="policy2" className="form-label text-white">&nbsp;No Refund Offered However Date Adjustment Can Be Done</label>
                          {errors.policy && <label style={{ color: "red" }}>{errors.policy}</label>}
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                      <button type="submit" className="ourbtn w-50">Submit</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>

      </form>
    </>
  );
}

export default Venue;