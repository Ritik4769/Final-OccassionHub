// import img from '../images/6.jpg';
import './Contactus.css';
function Contact() {
   return (<>
      <div className="containerfluid  " style={{height:'63vw'}} >
         <div className='' id="curvediv">
            <h1 className="contact text-center mt-3">Contact <span style={{ color: "white" }}>Us</span></h1>
            <p className="text-center text-white mt-3">Pellentesque lorem quis in auctor bibendum ullamcorper non purus dui,<br /> ultricies sit eu sit pellentesque duis vitae non est eu, quis metus aliquet laoreet.</p>
            <div className="container  mt-5">
               <div className="row h-100">
                  <div className="col-sm-6 col-md-6 form-section " style={{ backgroundColor: "#1B1B1B" }}>
                     <div className="login-wrapper">
                        <form action="#!">
                           <div className="form-group ">
                              <input type="text" name="name" id="name" className="form-control input-field" placeholder="Enter Name" />
                           </div>
                           <div className="form-group mt-4">
                              <input type="email" name="email" id="email" className="form-control input-field" placeholder="Enter Email" />
                           </div>
                           <div className="form-group mt-4">
                              <input type="text" name="subject" id="subject" className="form-control input-field" placeholder="Enter Subject" />
                           </div>
                           <div className="mb-3 mt-4">
                              <label className="" style={{ color: "#fff", fontSize: "14px" }}>Enter a Message </label>
                              <textarea className="form-control" id="exampleFormControlTextarea1" rows="1"></textarea>
                           </div>
                           <div className='d-flex justify-content-center mt-5'>
                              <button className="ourbtn w-50" type="submit">Send Message</button>
                           </div>
                        </form>
                     </div>
                  </div>
                  <div className="col-lg-6 " style={{ backgroundColor: "#000000" }}>
                     <div className="">

                        <h2 className="getintouch"><span style={{ color: "white" }}>Get In</span> Touch</h2>
                        <p id="get" className="mx-3">Pellentesque lorem quis in auctor bibendum ullamcorper non purus dui</p>
                     </div>
                     <br />
                     <hr className="ms-4" style={{ width: "90%", color: "white" }} />
                     <div>
                        <div className="d-flex flex-row justify-content-center   align-items-center">
                           <i className="bi bi-geo-alt-fill fs-2 mx-2" style={{ color: "#ff0057" }}></i>
                           <h2 className="getintouch mt-2"><span className='text-white'>Our</span> Location</h2>
                        </div>
                        <p id="get1">198 West 21th Street,  Suite 721 New York   NY 10016</p>
                     </div>
                     <br />
                     <hr className="ms-4" style={{ width: "90%", color: "white" }} />
                     <div>
                        <div className="d-flex flex-row justify-content-center align-items-center">
                           <i class="bi bi-telephone-fill fs-2 mx-2" style={{ color: "#ff0057" }}></i>
                           <h2 className="getintouch mt-2"><span style={{ color: "white" }}>Call</span> Us</h2>
                        </div>
                        <p id="get2">91+7895623895</p>
                     </div>
                     <br />
                     <hr className="ms-4" style={{ width: "90%", color: "white" }} />
                     <div>
                        <div className="d-flex flex-row justify-content-center align-items-center">
                           <i class="bi bi-envelope-open-fill fs-2 mx-2" style={{ color: "#ff0057" }}></i>
                           <h2 className="getintouch mt-2"><span style={{ color: "white" }}>Email</span> US</h2>
                        </div>
                        <p id="get3">admin@gmail.com</p>
                     </div>
                     <br />
                  </div>
               </div>
            </div>
         </div>
      </div>
   </>)
}
export default Contact