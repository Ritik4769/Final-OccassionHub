// import caterer1 from '../../images/Caterer.jpg'
// import { useState } from 'react';
// import { addCaterer, RegisterCatererData } from '../../store/CatererSlice.js';
// import Modal from 'react-bootstrap/Modal';
// import jscookie from 'js-cookie';
// import { useNavigate } from "react-router-dom";

// function Caterersreg() {
//   const [isCatererManagerRegistrationModal, setCatererRegistrationModal] = useState(false);
//   const [caterer, setCatererdata] = useState({});
//   var navigate = useNavigate();
//   const getData = (event) => {
//     let { name, value } = event.target;
//     if (event.target.type == 'file') {
//       value = event.target.files[0];
//       setCatererdata({
//         ...caterer,
//         [name]: value
//       });
//     } else {
//       setCatererdata({
//         ...caterer,
//         [name]: value
//       });
//     }
//   };
//   const handleSubmitCaterer = (event) => {
//     event.preventDefault();
//     console.log('caterer ', caterer);
//     const userCookieEmail = jscookie.get("user");
//     caterer["userEmail"] = userCookieEmail;
//     const formData = new FormData();
//     for (var index in caterer) {
//       console.log("caterer[index] : ", caterer[index])
//       if (caterer[index]) {
//         formData.append(index, caterer[index])
//       }
//     }
//     var result = RegisterCatererData(formData);
//     console.log("rsult in catrere controller : ", result);
//     result.then((result) => {

//       if(result.status == 201) {
//         alert("registration sucefully...!")
//         setCatererRegistrationModal(false);
//         navigate('/catererprofile')
//       }

//     }).catch((err) => {
//       alert("error in registration......!!");
//       console.log("error in catch.....!!" + err);
//     });
//   };

//   const handleCatererManagerModalClose = () => {
//     setCatererRegistrationModal(false);
//   }

//   return (<>
//     <h6 onClick={() => { setCatererRegistrationModal(true) }}>Caterer Manager</h6>
//     <form onSubmit={handleSubmitCaterer} className="form-group" enctype="multipart/form-data">

//       <Modal size="lg" show={isCatererManagerRegistrationModal} onHide={handleCatererManagerModalClose} centered  >
//         <Modal.Body className='p-0'>
//           <div className="container bg-black">
//             <div className="row d-flex justify-content-center align-items-center h-50" >
//               <div className='col-lg-6'>
//                 <img src={caterer1} width={'100%'} alt="Sample photo" />
//               </div>
//               <div className="col-lg-6 py-4">
//                 <h2 className="text-center text-white">Caterer Manager Form</h2>
//                 <form className="px-md-2">
//                   <div className="row">
//                     <div className="col-md-12">
//                       <div className="mt-4">
//                         <input type="text" name="Businessname" onChange={getData} value={caterer.Businessname} className="form-control input-field" placeholder="Enter your Business name" />
//                       </div>
//                     </div>
//                     <div className="col-md-12">
//                       <div className="mt-4">
//                         <input type="text" name="Specialization" onChange={getData} value={caterer.Specialization} id="name2" className="form-control input-field" placeholder="Enter your Specialization" />
//                       </div>
//                     </div>
//                     <div className="col-md-12">
//                       <select className="w-100 mt-4" id="select1" name="FoodType" onChange={getData} value={caterer.FoodType} aria-label="Default select example">
//                         <option selected>Select Food Type</option>
//                         <option value="Vegetarian">Vegetarian</option>
//                         <option value="Non-Vegetarian">Non-Vegetarian</option>
//                       </select>
//                     </div>
//                     <div className="col-md-12">
//                       <div className="mt-4">
//                         <input type="text" onChange={getData} value={caterer.ServiceCharges} id="name2" className="form-control input-field" name="ServiceCharges" placeholder="Enter your Service Charges" />
//                       </div>
//                     </div>
//                     <div className="col-md-12">
//                       <div className="mt-4">
//                         <label for="formFile" id="addgallery" className="form-label">Add Your Gallery</label>
//                         <input onChange={getData} type="file" id="docs" name="docs" />
//                       </div>
//                     </div>
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
//   </>
//   );
// }

// export default Caterersreg;


// import caterer1 from '../../images/Caterer.jpg'
// import { useState } from 'react';
// import { addCaterer, RegisterCatererData } from '../../store/CatererSlice.js';
// import Modal from 'react-bootstrap/Modal';
// import jscookie from 'js-cookie';
// import { useNavigate } from "react-router-dom";

// function Caterersreg() {
//   const [isCatererManagerRegistrationModal, setCatererRegistrationModal] = useState(false);
//   const [caterer, setCatererdata] = useState({

//   });
//   var navigate = useNavigate();
//   const getData = (event) => {
//     let { name, value } = event.target;
//     if (event.target.type == 'file') {
//       value = event.target.files[0];
//       setCatererdata({
//         ...caterer,
//         [name]: value
//       });
//     } else {
//       setCatererdata({
//         ...caterer,
//         [name]: value
//       });
//     }
//   };
//   const handleSubmitCaterer = (event) => {
//     event.preventDefault();
//     console.log('caterer ', caterer);
//     const userCookieEmail = jscookie.get("user");
//     caterer["userEmail"] = userCookieEmail;
//     const formData = new FormData();
//     for (var index in caterer) {
//       console.log("caterer[index] : ", caterer[index])
//       if (caterer[index]) {
//         formData.append(index, caterer[index])
//       }
//     }
//     var result = RegisterCatererData(formData);
//     console.log("rsult in catrere controller : ", result);
//     result.then((result) => {

//       if(result.status == 201) {
//         alert("registration sucefully...!")
//         setCatererRegistrationModal(false);
//         navigate('/catererprofile')
//       }

//     }).catch((err) => {
//       alert("error in registration......!!");
//       console.log("error in catch.....!!" + err);
//     });
//   };

//   const handleCatererManagerModalClose = () => {
//     setCatererRegistrationModal(false);
//   }



//   return (<>
//     <h6 onClick={() => { setCatererRegistrationModal(true) }}>Caterer Manager</h6>
//     <form onSubmit={handleSubmitCaterer} className="form-group" enctype="multipart/form-data">

//       <Modal size="lg" show={isCatererManagerRegistrationModal} onHide={handleCatererManagerModalClose} centered  >
//         <Modal.Body className='p-0'>
//           <div className="container bg-black">
//             <div className="row d-flex justify-content-center align-items-center h-50" >
//               <div className='col-lg-6'>
//                 <img src={caterer1} width={'100%'} alt="Sample photo" />
//               </div>
//               <div className="col-lg-6 py-4">
//                 <h2 className="text-center text-white">Caterer Manager Form</h2>
//                 <form className="px-md-2">
//                   <div className="row">
//                     <div className="col-md-12">
//                       <div className="mt-4">
//                         <input type="text" id='Businessname' name="Businessname" onChange={getData}  value={caterer.Businessname} className="form-control input-field" placeholder="Enter your Business name" />
//                         <label className='form-label' id='BusinessnameValid'></label>
//                       </div>
//                     </div>
//                     <div className="col-md-12">
//                       <div className="mt-4">
//                         <input type="text" name="Specialization" onChange={getData} value={caterer.Specialization} id="name2" className="form-control input-field" placeholder="Enter your Specialization" />
//                       </div>
//                     </div>
//                     <div className="col-md-12">
//                       <select className="w-100 mt-4" id="select1" name="FoodType" onChange={getData} value={caterer.FoodType} aria-label="Default select example">
//                         <option selected>Select Food Type</option>
//                         <option value="Vegetarian">Vegetarian</option>
//                         <option value="Non-Vegetarian">Non-Vegetarian</option>
//                       </select>
//                     </div>
//                     <div className="col-md-12">
//                       <div className="mt-4">
//                         <input type="text" onChange={getData} value={caterer.ServiceCharges} id="name2" className="form-control input-field" name="ServiceCharges" placeholder="Enter your Service Charges" />
//                       </div>
//                     </div>
//                     <div className="col-md-12">
//                       <div className="mt-4">
//                         <label for="formFile" id="addgallery" className="form-label">Add Your Gallery</label>
//                         <input onChange={getData} type="file" id="docs" name="docs" />
//                       </div>
//                     </div>
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
//   </>
//   );
// }

// export default Caterersreg;

// import React, { useState } from 'react';
// import Modal from 'react-bootstrap/Modal';
// import jscookie from 'js-cookie';
// import { useNavigate } from "react-router-dom";

import caterer1 from '../../images/Caterer.jpg'
import { useState } from 'react';
import { addCaterer, RegisterCatererData } from '../../store/CatererSlice.js';
import Modal from 'react-bootstrap/Modal';
import jscookie from 'js-cookie';
import { useNavigate } from "react-router-dom";

function Caterersreg() {
  const [isCatererManagerRegistrationModal, setCatererRegistrationModal] = useState(false);
  const [caterer, setCatererdata] = useState({
    Businessname: '',
    Specialization: '',
    FoodType: '',
    ServiceCharges: '',
    docs: null
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    const nameRegex = /^[A-Za-z\s]+$/;
    const specializationRegex = /^[A-Za-z\s-]+$/;
    const foodTypeRegex = /^(Vegetarian|Non-Vegetarian)$/;
    const serviceChargesRegex = /^\d+(\.\d{1,2})?$/;
    if (!caterer.Businessname.trim()) {
      errors.Businessname = 'Business name is required';
    } else if (!nameRegex.test(caterer.Businessname.trim())) {
      errors.Businessname = 'Invalid name format';
    }
    if (!caterer.Specialization.trim()) {
      errors.Specialization = 'Specialization is required';
    } else if (!specializationRegex.test(caterer.Specialization.trim())) {
      errors.Specialization = 'Invalid Specialization format';
    }

    if (!caterer.FoodType) {
      errors.FoodType = 'Food Type is required';
    } else if (!foodTypeRegex.test(caterer.FoodType)) {
      errors.FoodType = 'Invalid Food Type';
    }

    if (!caterer.ServiceCharges.trim()) {
      errors.ServiceCharges = 'Service Charges are required';
    } else if (!serviceChargesRegex.test(caterer.ServiceCharges.trim())) {
      errors.ServiceCharges = 'Invalid Service Charges format';
    }

    if (!caterer.docs) {
      errors.docs = 'Gallery image is required';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitCaterer = (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    console.log('caterer ', caterer);
    const userCookieEmail = jscookie.get("user");
    caterer["userEmail"] = userCookieEmail;
    const formData = new FormData();
    for (var index in caterer) {
      if (caterer[index]) {
        formData.append(index, caterer[index])
      }
    }
    // Assuming RegisterCatererData is a function that sends the form data to the server
    RegisterCatererData(formData)
      .then((result) => {
        if (result.status === 201) {
          alert("Registration successful!");
          setCatererRegistrationModal(false);
          navigate('/catererprofile');
        }
      })
      .catch((err) => {
        alert("Error in registration");
        console.error("Error: ", err);
      });
  };

  const handleCatererManagerModalClose = () => {
    setCatererRegistrationModal(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCatererdata({
      ...caterer,
      [name]: value
    });
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setCatererdata({
      ...caterer,
      [name]: files[0]
    });
  };

  return (
    <>
      <h6 onClick={() => { setCatererRegistrationModal(true) }}>Caterer Manager</h6>
      <form onSubmit={handleSubmitCaterer} className="form-group" encType="multipart/form-data">

        <Modal size="lg" show={isCatererManagerRegistrationModal} onHide={handleCatererManagerModalClose} centered>
          <Modal.Body className='p-0'>
            <div className="container bg-black">
              <div className="row d-flex justify-content-center align-items-center h-50" >
                <div className='col-lg-6'>
                  <img src={caterer1} width={'100%'} alt="Sample photo" />
                </div>
                <div className="col-lg-6 py-4">
                  <h2 className="text-center text-white">Caterer Manager Form</h2>
                  <form className="px-md-2">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="mt-4">
                          <input type="text" name="Businessname" onChange={handleInputChange} value={caterer.Businessname} className="form-control input-field" placeholder="Enter your Business name" />
                          {errors.Businessname && <label style={{ color: "red" }}>{errors.Businessname}</label>}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mt-4">
                          <input type="text" name="Specialization" onChange={handleInputChange} value={caterer.Specialization} className="form-control input-field" placeholder="Enter your Specialization" />
                          {errors.Specialization && <label style={{ color: "red" }}>{errors.Specialization}</label>}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <select className="w-100 mt-4" name="FoodType" onChange={handleInputChange} value={caterer.FoodType} aria-label="Default select example">
                          <option value="">Select Food Type</option>
                          <option value="Vegetarian">Vegetarian</option>
                          <option value="Non-Vegetarian">Non-Vegetarian</option>
                        </select>
                        {errors.FoodType && <label style={{ color: "red" }}>{errors.FoodType}</label>}
                      </div>
                      <div className="col-md-12">
                        <div className="mt-4">
                          <input type="text" name="ServiceCharges" onChange={handleInputChange} value={caterer.ServiceCharges} className="form-control input-field" placeholder="Enter your Service Charges" />
                          {errors.ServiceCharges && <label style={{ color: "red" }}>{errors.ServiceCharges}</label>}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mt-4">
                          <label htmlFor="docs" className="form-label" id="addgallery">Add Your Gallery</label>
                          <input type="file" name="docs" onChange={handleFileChange} />
                          {errors.docs && <label style={{ color: "red" }}>{errors.docs}</label>}
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

export default Caterersreg;
