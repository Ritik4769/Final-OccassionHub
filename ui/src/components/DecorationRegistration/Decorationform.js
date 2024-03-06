// import { useState } from 'react';
// import caterer from '../../images/Caterer.jpg'
// import './decorationRegistrationcss.css';
// import Modal from 'react-bootstrap/Modal';

// function Decorationform() {
//   const [isDecorationManagerRegistrationModal, setDecorationRegistrationModal] = useState(false);
//   const handleDecorationManagerModalClose = () => {
//     setDecorationRegistrationModal(false);
//   }
//   return (<>
//     <h6 onClick={() => { setDecorationRegistrationModal(true) }}>Decoration Manager</h6>

//     <Modal size="lg" show={isDecorationManagerRegistrationModal} onHide={handleDecorationManagerModalClose} centered  >
//       <Modal.Body className='p-0'>
//         <div className="container bg-black">
//           <div className="row d-flex justify-content-center align-items-center h-50" >
//             <div className='col-lg-6'>
//               <img src={caterer} width={'100%'} alt="Sample photo" />
//             </div>
//             <div className="col-lg-6 py-4">
//               <h2 className="text-center text-white">Decoration Manager Form</h2>
//               <form className="px-md-2">
//                 <div className="row">
//                   <div className="col-md-12">
//                     <div className="mt-4">
//                       <input type="text" id="name1" className="form-control input-field" placeholder="Enter your Business name" />
//                     </div>
//                   </div>
//                   <div className="col-md-12">
//                     <div className="mt-4">
//                       <label for="formFile" id="addgallery" className="form-label">Add Your Gallery</label>
//                       <input className="form-control" type="file" id="formFile" />
//                     </div>
//                   </div>
//                   <div className="col-md-12">
//                     <select class="w-100 mt-4" id="select1" aria-label="Default select example">
//                       <option selected>Decoration type</option>
//                       <option value="ballon">Ballon</option>
//                       <option value="flower">Flower</option>
//                       <option value="ballonflower">Ballon+Flower</option>
//                       <option value="pyro">Pyro</option>
//                       <option value="entry">Entry</option>
//                     </select>
//                   </div>
//                   <div className="col-md-12">
//                     <div className="mt-4">
//                       <input type="text" id="name2" className="form-control input-field" placeholder="Enter your Decoration Price as per Type" />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="d-flex justify-content-center mt-3">
//                   <button type="submit" className="ourbtn w-50">Submit</button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </Modal.Body>
//     </Modal>
//   </>)

// }
// export default Decorationform

// import { useState } from 'react';
// import caterer from '../../images/Caterer.jpg'
// import './decorationRegistrationcss.css';
// import Modal from 'react-bootstrap/Modal';
// import jscookie from 'js-cookie';
// import { RegisterDecorationData } from '../../store/DecorationSlice.js';
// import { useNavigate } from 'react-router-dom';

// function Decorationform() {
//   const navigate = useNavigate();
//   const [isDecorationManagerRegistrationModal, setDecorationRegistrationModal] = useState(false);
//   const [decoration, setDecorationdata] = useState({});
//   const getData = (event) => {

//     let { name, value } = event.target;
//     if (event.target.type == 'file') {
//       value = event.target.files[0];
//       setDecorationdata({
//         ...decoration,
//         [name]: value
//       });
//     } else {
//       setDecorationdata({
//         ...decoration,
//         [name]: value
//       });
//     }
//   };
//   const handleSubmitDecoartionRegistartion = (event) => {
//     event.preventDefault();
//     console.log('Decoration ', decoration);
//     const userCookieEmail = jscookie.get("user");
//     decoration["userEmail"] = userCookieEmail;
//     const formData = new FormData();
//     for (var index in decoration) {
//       console.log("caterer[index] : ", decoration[index])
//       if (decoration[index]) {
//         formData.append(index, decoration[index])
//       }
//     }
//     console.log("FORM DATA IN COMPONENT IN REGISTRATION : ", formData);
//     var result = RegisterDecorationData(formData);
//     console.log("result in decoration controller : ", result);
//     result.then((result) => {
//       if (result.status == 201) {
//         alert("registration successfully...!")
//         setDecorationRegistrationModal(false);
//         navigate('/decorationDashboard')
//       }
//     }).catch((err) => {
//       alert("error in registration......!!");
//       console.log("error in catch.....!!" + err);
//     });
//   };
//   const handleDecorationManagerModalClose = () => {
//     setDecorationRegistrationModal(false);
//   }
//   return (<>
//     <h6 onClick={() => { setDecorationRegistrationModal(true) }}>Decoration Manager</h6>
//       <Modal size="lg" show={isDecorationManagerRegistrationModal} onHide={handleDecorationManagerModalClose} centered  >
//         <Modal.Body className='p-0'>
//           <div className="container bg-black">
//             <div className="row d-flex justify-content-center align-items-center h-50" >
//               <div className='col-lg-6'>
//                 <img src={caterer} width={'100%'} alt="Sample photo" />
//               </div>
//               <div className="col-lg-6 py-4">
//                 <h2 className="text-center text-white">Decoration Manager Form</h2>
//                 <form className="px-md-2 form-group" onSubmit={handleSubmitDecoartionRegistartion} encType="multipart/form-data">
//                   <div className="row">
//                     <div className="col-md-12">
//                       <div className="mt-4">
//                         <input type="text" id="name1" name="Businessname" onChange={getData} value={decoration.Businessname} className="form-control input-field" placeholder="Enter your Business name" />
//                       </div>
//                     </div>
//                     <div className="col-md-12">
//                       <div className="mt-4">
//                         <label for="formFile" id="addgallery" className="form-label">Add Your Gallery</label>
//                         <input className="form-control" onChange={getData} type="file" id="formFile" name="docs" />
//                       </div>
//                     </div>
//                     <div className="col-md-12">
//                       <select className="w-100 mt-4" id="select1" name="Decorationtype" onChange={getData} value={decoration.DecorationType} aria-label="Default select example">
//                         <option selected>Decoration type</option>
//                         <option value="ballon">Ballon</option>
//                         <option value="flower">Flower</option>
//                         <option value="ballonflower">Ballon+Flower</option>
//                         <option value="pyro">Pyro</option>
//                         <option value="entry">Entry</option>
//                       </select>
//                     </div>
//                     <div className="col-md-12">
//                       <div className="mt-4">
//                         <input type="text" id="name2" name="Decorationprice" onChange={getData} value={decoration.Decorationprice} className="form-control input-field" placeholder="Enter your Decoration Price as per Type" />
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
//   </>)

// }
// export default Decorationform

import { useState } from 'react';
import caterer from '../../images/Caterer.jpg'
import './decorationRegistrationcss.css';
import Modal from 'react-bootstrap/Modal';
import jscookie from 'js-cookie';
import { RegisterDecorationData } from '../../store/DecorationSlice.js';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
var Businessname_check = false, Decorationprice_check = false, Decorationtype_check = false, docsType_check = false;
function Decorationform() {
  const navigate = useNavigate();
  const [isDecorationManagerRegistrationModal, setDecorationRegistrationModal] = useState(false);
  const [decoration, setDecorationdata] = useState({});
  const getData = (event) => {

    let { name, value } = event.target;
    if (event.target.type == 'file') {
      value = event.target.files[0];
      setDecorationdata({
        ...decoration,
        [name]: value
      });
      Validations(name, value);
    } else {
      setDecorationdata({
        ...decoration,
        [name]: value
      });
      Validations(name, value);
    }
  };

  function Validations(name, value) {
    console.log("name in validation : ", name);
    switch (name) {
      case 'Businessname':
        var reg = /^[A-Za-z\s]+$/;
        if (value.trim() == "") {
          document.getElementById("Businessnamelabel").style.color = "red";
          document.getElementById("Businessnamelabel").innerHTML = "Businessname Required";
          Businessname_check = false;
        } else if (reg.test(value)) {
          document.getElementById('Businessnamelabel').style.color = "green";
          document.getElementById("Businessnamelabel").innerHTML = "Looking Good";
          Businessname_check = true;
          return true
        } else {
          console.log("Businessnamelabel")
          document.getElementById('Businessnamelabel').style.color = "red";
          document.getElementById("Businessnamelabel").innerHTML = "Invalid Businessname please enter only character";
          Businessname_check = false;
          return false;
        }
        break;

      case 'Decorationtype':
        if (value.trim() == "") {
          document.getElementById("Decorationtypelabel").style.color = "red";
          document.getElementById("Decorationtypelabel").innerHTML = "Decorationtype Required";
          Decorationtype_check = false;
          return false;
        } else {
          document.getElementById("Decorationtypelabel").style.color = "green";
          document.getElementById("Decorationtypelabel").innerHTML = "Looking Good";
          Decorationtype_check = true;
          return true;
        }
        break;
        case 'Decorationprice':
          var reg = /^[0-9]+$/;
          if (value.trim() == '' || value.toLowerCase().includes('no') || !reg.test(value)) {
              document.getElementById("Decorationpricelabel").style.color = "red";
              document.getElementById("Decorationpricelabel").innerHTML = "Dj Price invalide";
              Decorationprice_check = false;
              return false;
          } else {
              document.getElementById('Decorationpricelabel').style.color = "green";
              document.getElementById("Decorationpricelabel").innerHTML = "Looking Good";
              Decorationprice_check = true;
              return true;
          }
          break;
      case 'docs':
        if (value == null) {
          document.getElementById("imglabel").style.color = "red";
          document.getElementById("imglabel").innerHTML = "Business Card Image Required";
          docsType_check = false;
          return false;
        } else {
          document.getElementById("imglabel").style.color = "green";
          document.getElementById("imglabel").innerHTML = "Looking Good";
          docsType_check = true;
          return true;
        }
        break;
    }
  }

  const handleSubmitDecoartionRegistartion = (event) => {
    event.preventDefault();
    console.log('Decoration ', decoration);
    if (Businessname_check && Decorationprice_check && docsType_check && Decorationtype_check) {
      const userCookieEmail = jscookie.get("user");
      decoration["userEmail"] = userCookieEmail;
      const formData = new FormData();
      for (var index in decoration) {
        console.log("caterer[index] : ", decoration[index])
        if (decoration[index]) {
          formData.append(index, decoration[index])
        }
      }
      console.log("FORM DATA IN COMPONENT IN REGISTRATION : ", formData);
      var result = RegisterDecorationData(formData);
      console.log("result in decoration controller : ", result);
      result.then((result) => {
        if (result.status == 201) {
          alert("registration successfully...!")
          setDecorationRegistrationModal(false);
          navigate('/decorationDashboard')
        }
      }).catch((err) => {
        alert("error in registration......!!");
        console.log("error in catch.....!!" + err);
      });
    } else {
      alert("please fix error");
      Swal.fire({
        background: "black",
        icon: "error",
        text: "please Solve Error First......!",
        showCloseButton: true,
        focusConfirm: false,
      });
    }
  };
  const handleDecorationManagerModalClose = () => {
    setDecorationRegistrationModal(false);
  }
  return (<>
    <h6 onClick={() => { setDecorationRegistrationModal(true) }}>Decoration Manager</h6>
    <Modal size="lg" show={isDecorationManagerRegistrationModal} onHide={handleDecorationManagerModalClose} centered  >
      <Modal.Body className='p-0'>
        <div className="container bg-black">
          <div className="row d-flex justify-content-center align-items-center h-50" >
            <div className='col-lg-6'>
              <img src={caterer} width={'100%'} alt="Sample photo" />
            </div>
            <div className="col-lg-6 py-4">
              <h2 className="text-center text-white">Decoration Manager Form</h2>
              <form className="px-md-2 form-group" onSubmit={handleSubmitDecoartionRegistartion} encType="multipart/form-data">
                <div className="row">
                  <div className="col-md-12">
                    <div className="mt-4">
                      <input type="text" id="name1" name="Businessname" onChange={getData} value={decoration.Businessname} className="form-control input-field" placeholder="Enter your Business name" />
                      <span id="Businessnamelabel"></span>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mt-4">
                      <label for="formFile" id="addgallery" className="form-label">Add Your Gallery</label>
                      <input className="form-control" onChange={getData} type="file" id="formFile" name="docs" />
                      <span id="imglabel"></span>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <select className="w-100 mt-4" id="select1" name="Decorationtype" onChange={getData} value={decoration.Decorationtypelabel} aria-label="Default select example">
                      <option selected>Decoration type</option>
                      <option value="ballon">Ballon</option>
                      <option value="flower">Flower</option>
                      <option value="ballonflower">Ballon+Flower</option>
                      <option value="pyro">Pyro</option>
                      <option value="entry">Entry</option>
                    </select>
                    <span id="Decorationtypelabel"></span>
                  </div>
                  <div className="col-md-12">
                    <div className="mt-4">
                      <input type="text" id="name2" name="Decorationprice" onChange={getData} value={decoration.Decorationprice} className="form-control input-field" placeholder="Enter your Decoration Price as per Type" />
                      <span id="Decorationpricelabel"></span>
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
  </>)

}
export default Decorationform;
