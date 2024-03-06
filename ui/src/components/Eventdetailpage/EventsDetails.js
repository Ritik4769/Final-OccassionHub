import "./eventsdetails.css";

function EventsDetails() {
    return (<>
        <div className="container">
            <div className="row my-5">
                <div className="col col-lg-6 col-md-12 col-12 djImageSection">
                    
                </div>
                <div className="col col-lg-5 col-md-12 col-12 my-1 rightContainer">
                    <p className="para">Our distinctive decor will transport you to an oriental atmosphere, full of mystery and glamour where you will enjoy our chic and relaxing ambiance.
                    </p>
                    <h3 className=" mt-2 details">Details</h3>
                    <h5 className="my-2"><span>Start : </span><span>October 9,2023 12:00 am</span></h5>
                    <h5 className="my-3"><span>End : </span><span>October 9,2023 12:00 am</span></h5>
                    <div className="row my-2">
                        <div className="col col-lg-7 ">
                            <h5>Cost : </h5>
                        </div>
                        <div className="col col-lg-5 "><span>
                            $199</span></div>
                    </div>
                    <div className="row">
                        <div className="col col-lg-7">
                            <h5>Event Category : </h5>
                        </div>  
                        <div className="col col-lg-5"><span>
                            Night Party</span></div>
                    </div>
                    <h5 className="my-2">Website</h5>
                    <form >
                        <div className="mb-3">
                            <input type="email" className="form-control my-4" placeholder="Enter Email" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <input type="password" className="form-control" placeholder="Enter Name" id="exampleInputPassword1" />
                        </div>
                        <button type="submit" className="btn btn-danger my-2">Get Ticket</button>
                    </form>
                </div>
            </div>
        </div>
    </>)
}

export default EventsDetails;