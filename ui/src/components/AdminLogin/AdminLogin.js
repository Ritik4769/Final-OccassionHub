import './AdminLogin.css'
import {useState} from 'react';
import { useDispatch } from 'react-redux';
import {Link,useNavigate,useLocation} from 'react-router-dom';
import { adminLogin } from '../../store/adminSlice.js';
import Swal from 'sweetalert2';


function AdminLogin(){
    const [adminCredential,setAdminCredential] = useState();
    const navigate = useNavigate();
    // const location = useLocation();
    const dispatch = useDispatch();

    const getData = (event)=>{
      const {name,value} = event.target;
      setAdminCredential({
        ...adminCredential,
        [name]:value
      });
    }
    const handleSubmit = (event)=>{
    event.preventDefault();
    console.log("adminCredential : ",adminCredential);
      var result = adminLogin(adminCredential);
      console.log("result of admin : ",result);
      result.then((resultData)=>{
           console.log(resultData);
           console.log("result of admin email : ",resultData.data.adminemail);
           console.log("result of admin status : ",resultData.status);
           if(resultData.status==201){
            Swal.fire({
                background: "black",
                icon: "success",
                text: "Login successfully",
                showCloseButton: true,
                focusConfirm: false,
            });
            navigate("/adminHome",{
                state:{
                  email : resultData.data.adminemail
                }
              });
            }else if(resultData.status==203){
              Swal.fire({
                background: "black",
                icon: "error",
                text: "invalide credenital",
                showCloseButton: true,
                focusConfirm: false,
            });
            navigate("/admin",{
              state:{
                email : resultData.data.adminemail
              }
            });
          }
      });
      
    }
     return(<>
   <div class="background">
        <div class="shape"></div>
        <div class="shape"></div>
    </div>
    <form className='adminform' onSubmit={handleSubmit}>
        <h2 className='admintext'>Admin Login</h2>

        <label className='adminlabel' for="username">Email</label>
        <input className='admininput' type="email" onChange={getData} placeholder="Email" name="email" id="Email"/>

        <label className='adminlabel' for="password">Password</label>
        <input className='admininput' type="password" onChange={getData} placeholder="Password"  name="password" id="password"/>

        <button className='adminbtn'>Log In</button>
        <div class="social">
            <a href=''>Forgot Password</a>
          {/* <div class="go"><i class="fab fa-google"></i>  Google</div>
          <div class="fb"><i class="fab fa-facebook"></i>  Facebook</div> */}
        </div>
    </form>
      </>)
// const [adminCredential,setAdminCredential] = useState();
// const[email,setEmail] = useState();
// const[password,setPassword] = useState();
// const[details,setDetails] = useState({});
// const navigate = useNavigate();
// // const location = useLocation();
// const dispatch = useDispatch();

// const getData = (event)=>{
//   const {name,value} = event.target;
//   setAdminCredential({
//     ...adminCredential,
//     [name]:value
//   });
// }
// console.log("email",email);
// const handleSubmit =(event)=>{
//      event.preventDefault();
//      console.log("email",email);
//      const obj = {email,password};
//      setDetails([...details,obj]);
//      event.target.reset();
// }
// const handleSubmit = (event)=>{
// event.preventDefault();
// // console.log("adminCredential : ",adminCredential);
// //   var result = adminLogin(adminCredential);
//   console.log("result of admin : ",result);
//   result.then((resultData)=>{
//        console.log(resultData);
//        console.log("result of admin email : ",resultData.data.adminemail);
//        console.log("result of admin status : ",resultData.status);
//        if(resultData.status==201){
// //          dispatch(setEmail(resultData.data.adminemail));
//         navigate("/adminHome",{
//             state:{
//               email : resultData.data.adminemail
//             }
//           });
//         }else if(resultData.status==203){
//           navigate("/admin",{
//             state:{
//               message : resultData.data.message
//             }
//           });
//         }
//   });
  
// }
//  return(<>
// <div class="background">
//     <div class="shape"></div>
//     <div class="shape"></div>
// </div>
// <form onSubmit={handleSubmit}>
//     <h3 >Admin Login</h3>

//     <label for="username">Email</label>
//     <input type="text" onChange={(event)=>{setEmail(event.target.value)}} placeholder="Email " id="Email"/>

//     <label for="password">Password</label>
//     <input type="password" onChange={(event)=>{setPassword(event.target.value)}} placeholder="Password" id="password"/>

//     <button>Log In</button>
//     <div class="social">
//         <a href=''>Forgot Password</a>
//       {/* <div class="go"><i class="fab fa-google"></i>  Google</div>
//       <div class="fb"><i class="fab fa-facebook"></i>  Facebook</div> */}
//     </div>
// </form>
//   </>)

}
export default AdminLogin;