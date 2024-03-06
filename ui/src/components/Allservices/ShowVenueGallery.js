import image from '../../images/Caterer.jpg';
import allPhotos from '../../images/catring.jpeg';
import Form from 'react-bootstrap/Form';
import { useLocation } from 'react-router-dom';


import './showgallery.css';
function ShowVenueGallery() {
    const location = useLocation();
    const data = location.state.data;
    console.log("in show venue ", data)
    const handleInputChange = () => { }
    const handleSubmit = () => { }
    return (<>
        <div className="container-fluid " style={{ marginTop: "10vw" }}>
            <div className="row mt-5">
                <div className="col col-lg-8 col-md-12 col-12">
                    <div className="container-fluid outerGalleryContainer ">
                        <img src={"http://localhost:4001/" + data.docs} alt="Registration image..." />
                    </div>
                    <div className="container bg-dark position-relative belowGalleryContainer">
                        <div className="row">
                            <div className="col col-lg-9 col-md-9 col-12 text-light">
                                <h4 className='text-danger my-3 fw-bold' >{data.VenueName}</h4>
                                <span className="my-2">{data.venueLocation}</span><br />
                                <span className="my-2">Booking Charge : &#x20B9; {data.bookingAmount}  </span><br />
                                <div className="row mt-4">
                                    <div className="col col-lg-3 col-md-3 col-12" style={{ backgroundColor: "rgb(36, 33, 33)" }}>
                                        <button className="btn btn-transparent text-white">View Gallery</button>
                                    </div>
                                    <div className="col col-lg-3 col-md-3 col-12" style={{ backgroundColor: "rgb(36, 33, 33)" }}>
                                        <button className="btn btn-transparent text-white">View Orders</button>
                                    </div>
                                    <div className="col col-lg-3 col-md-3 col-12" style={{ backgroundColor: "rgb(36, 33, 33)" }}>
                                        <button className="btn btn-transparent text-white">View Gallery</button>
                                    </div>
                                    <div className="col col-lg-3 col-md-3 col-12" style={{ backgroundColor: "rgb(36, 33, 33)" }}>
                                        <button className="btn btn-transparent text-white">View Gallery</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col col-lg-3 col-md-3 col-12">
                                <div className="container mt-2 ratingBox mx-2">
                                    <i class="fa fa-star-o" style={{ fontSize: "25px", display: "inline" }}></i>Rating</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col col-lg-3 col-md-12 col-12 " style={{ width: '31rem' }}>
                    <form onSubmit={handleSubmit} method="post">
                        <div className="row bg-dark">
                            <h2 className="text-white text-center" >Choose Services</h2>
                            <div className="col col-lg-6 col-md-12 col-12 mb-3">
                                <input type="text" className="form-control input-field" placeholder="Event Location" name="location" onChange={handleInputChange} />
                            </div>
                            <div className="col col-lg-6 col-md-12 col-12 mb-3 ">
                                <input type="date" className="form-control input-field" placeholder="Event Date" name="date" id="userEventdate" onChange={handleInputChange} />
                            </div>
                            <div className="col col-lg-6 col-md-12 col-12 mb-3 mt-4">
                                <input type="time" className="form-control input-field" placeholder="Event Time" name="time" onChange={handleInputChange} />
                            </div>
                            <div className="col col-lg-6 col-md-12 col-12 mb-3 mt-4">
                                <input type="number" className="form-control input-field" placeholder="Total Guest" min="1" name="totalguest" onChange={handleInputChange} />
                            </div>
                            <h5 className="text-danger">Customize Your Thali Here</h5>

                            <div className="accordion text-light row" id="accordionExample">
                                <div className="accordion-item col col-lg-6 col-md-12 col-12 mb-3 bg-dark">
                                    <h2 className="accordion-header" id="rotiSection">
                                        <button className="accordion-button text-light" type="button" data-bs-toggle="collapse" data-bs-target="#collapseRoti" aria-expanded="true" aria-controls="collapseRoti" style={{ backgroundColor: "black" }}>
                                            Select Roti Type
                                        </button>
                                    </h2>
                                    <div id="collapseRoti" className="accordion-collapse collapse " aria-labelledby="rotiSection" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <Form>
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Tandoori Roti"
                                                    name="Roti"
                                                    value="Tandoori Roti"
                                                // defaultChecked={selectedDish.Roti.includes('Tandoori Roti')}
                                                // onChange={() => handleRotiChange('Tandoori Roti')}
                                                />
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Non-Roti"
                                                    name="Roti"
                                                    value="Non Roti"
                                                // defaultChecked={selectedDish.Roti.includes('Non Roti')}
                                                // onChange={() => handleRotiChange('Non Roti')}
                                                />
                                            </Form>
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item col col-lg-6 col-md-12 col-12 bg-dark">
                                    <h2 className="accordion-header" id="sabjiSection">
                                        <button className="accordion-button text-light" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSabji" aria-expanded="true" aria-controls="collapseSabji" style={{ backgroundColor: "black" }}>
                                            Select Sabji Type
                                        </button>
                                    </h2>
                                    <div id="collapseSabji" className="accordion-collapse collapse" aria-labelledby="sabjiSection" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <Form>
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Mutter Panner"
                                                    name="Sabji"
                                                    value="Mutter Panner"
                                                // defaultChecked={selectedDish.Sabji.includes('Mutter Panner')}
                                                // onChange={() => handleSabjiChange('Mutter Panner')}
                                                />
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Kaaju Kari"
                                                    name="Sabji"
                                                    value="Kaaju Kari"
                                                // defaultChecked={selectedDish.Sabji.includes('Kaaju Kari')}
                                                // onChange={() => handleSabjiChange('Kaaju Kari')}
                                                />
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Bheendi"
                                                    name="Sabji"
                                                    value="Bheendi"
                                                // defaultChecked={selectedDish.Sabji.includes('Bheendi')}
                                                // onChange={() => handleSabjiChange('Bheendi')}
                                                />
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Gravy"
                                                    name="Sabji"
                                                    value="Gravy"
                                                // defaultChecked={selectedDish.Sabji.includes('Gravy')}
                                                // onChange={() => handleSabjiChange('Gravy')}
                                                />
                                            </Form>
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-itemcol col-lg-6 col-md-12 col-12 bg-dark">
                                    <h2 className="accordion-header" id="dessertSection">
                                        <button className="accordion-button  text-light mt-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseDessert" aria-expanded="true" aria-controls="collapseDessert" style={{ backgroundColor: "black" }}>
                                            Select Dessert Type
                                        </button>
                                    </h2>
                                    <div id="collapseDessert" className="accordion-collapse collapse" aria-labelledby="dessertSection" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <Form>
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Milk Cake"
                                                    name="Dessert"
                                                    value="Milk Cake"
                                                // defaultChecked={selectedDish.Dessert.includes('Milk Cake')}
                                                // onChange={() => handleDessertChange('Milk Cake')}
                                                />
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Kaaju Katli"
                                                    name="Dessert"
                                                    value="Kaaju Katli"
                                                // defaultChecked={selectedDish.Dessert.includes('Kaaju Katli')}
                                                // onChange={() => handleDessertChange('Kaaju Katli')}
                                                />
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Gupchup"
                                                    name="Dessert"
                                                    value="Gupchup"
                                                // defaultChecked={selectedDish.Dessert.includes('Gupchup')}
                                                // onChange={() => handleDessertChange('Gupchup')}
                                                />
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Gulab Jamun"
                                                    name="Dessert"
                                                    value="Gulab Jamun"
                                                // defaultChecked={selectedDish.Dessert.includes('Gulab Jamun')}
                                                // onChange={() => handleDessertChange('Gulab Jamun')}
                                                />
                                            </Form>
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item col col-lg-6 col-md-12 col-12 bg-dark">
                                    <h2 className="accordion-header" id="starterSection">
                                        <button className="accordion-button  text-light mt-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseStarter" aria-expanded="true" aria-controls="collapseStarter" style={{ backgroundColor: "black" }}>
                                            Select Starter Type
                                        </button>
                                    </h2>
                                    <div id="collapseStarter" className="accordion-collapse collapse" aria-labelledby="starterSection" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <Form>
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Kimchi Salad"
                                                    name="Starter"
                                                    value="Kimchi Salad"
                                                // defaultChecked={selectedDish.Starter.includes('Kimchi Salad')}
                                                // onChange={() => handleStarterChange('Kimchi Salad')}
                                                />
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Raita Bar"
                                                    name="Starter"
                                                    value="Raita Bar"
                                                // defaultChecked={selectedDish.Starter.includes('Raita Bar')}
                                                // onChange={() => handleStarterChange('Raita Bar')}
                                                />
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Onion Pakoda"
                                                    name="Starter"
                                                    value="Onion Pakoda"
                                                // defaultChecked={selectedDish.Starter.includes('Onion Pakoda')}
                                                // onChange={() => handleStarterChange('Onion Pakoda')}
                                                />
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Chana Garlic Fry"
                                                    name="Starter"
                                                    value="Chana Garlic Fry"
                                                // defaultChecked={selectedDish.Starter.includes('Chana Garlic Fry')}
                                                // onChange={() => handleStarterChange('Chana Garlic Fry')}
                                                />
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Moong Daal Chat"
                                                    name="Starter"
                                                    value="Moong Daal Chat"
                                                // defaultChecked={selectedDish.Starter.includes('Moong Daal Chat')}
                                                // onChange={() => handleStarterChange('Moong Daal Chat')}
                                                />

                                            </Form>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-3 mt-3">
                                <input type="text" className="form-control input-field" placeholder="Additional Information" name="additionalInfo" />
                            </div>

                            <div className="d-flex justify-content-center">
                                <button type="submit" className="ourbtn w-50 my-2">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col col-lg-8 col-md-12 col-12  gallerySection">
                        <div className="galleryTop bg-dark text-danger fs-4 ps-4">
                            <span className='mx-4'>PortFolio</span>
                            <span className='mx-5'><a href="#about" style={{ color: "#ff0057", textDecoration: 'none' }}>About</a></span>
                        </div>
                        <div className="constainer photos ">
                            <div className="row my-3">
                                <div className="col col-lg-3 col-md-6 col-12 mb-3 uploadImages">
                                    <img src={allPhotos} alt="img..." />
                                </div>
                                <div className="col col-lg-3 col-md-6 col-12 mb-3  uploadImages">
                                    <img src={allPhotos} alt="img..." />
                                </div>
                                <div className="col col-lg-3 col-md-6 col-12 mb-3  uploadImages">
                                    <img src={allPhotos} alt="img..." />
                                </div>
                                <div className="col col-lg-3 col-md-6 col-12 mb-3  uploadImages">
                                    <img src={allPhotos} alt="img..." />
                                </div>
                                <div className="col col-lg-3 col-md-6 col-12 mb-3  uploadImages">
                                    <img src={allPhotos} alt="img..." />
                                </div>
                                <div className="col col-lg-3 col-md-6 col-12 mb-3  uploadImages">
                                    <img src={allPhotos} alt="img..." />
                                </div>
                                <div className="col col-lg-3 col-md-6 col-12 mb-3  uploadImages">
                                    <img src={allPhotos} alt="img..." />
                                </div>
                                <div className="col col-lg-3 col-md-6 col-12 mb-3 uploadImages">
                                    <img src={allPhotos} alt="img..." />
                                </div>
                                <div className="col col-lg-3 col-md-6 col-12 mb-3 uploadImages">
                                    <img src={allPhotos} alt="img..." />
                                </div>
                                <div className="col col-lg-3 col-md-6 col-12 mb-3 uploadImages">
                                    <img src={allPhotos} alt="img..." />
                                </div>
                                <div className="col col-lg-3 col-md-6 col-12 mb-3 uploadImages">
                                    <img src={allPhotos} alt="img..." />
                                </div>
                                <div className="col col-lg-3 col-md-6 col-12 mb-3 uploadImages">
                                    <img src={allPhotos} alt="img..." />
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>

            <div className="container-fluid detailsSection bg-dark" id="about">
                <div className='bg-dark text-light pt-3 detailsSectionHead'>
                    <h3>About <span className="text-danger ms-3">{data.VenueName}</span> -</h3>
                </div>
                <hr className="mb-4" style={{ color: "gray" }} />
                <p>
                    Caters is a catering company serving all over Jaipur. He started catering for wedding and other events. With countless clients, ranging from public to private companies, DB Caters gained a reputation for elegant presentations and impressive services. Be assured of the fact that the food is prepared & served under hygienic conditions and all rates are inclusive of top-class service, crockery & cutlery. Cuisines offered:North Indian South Indian Chinese
                </p>
                <hr className="mt-5" style={{ color: "gray" }} />

                <div className="row text-light pb-3 mb-3">
                    <div className="col col-lg-3 col-md-3 col-12 ">
                        <h6 className="text-danger">Max capacity</h6>
                        <span>{data.capacity}</span>
                        <h6 className="text-danger mt-5">Min capacity</h6>
                        <span>{data.minMembers}</span>
                    </div>
                    <div className="col col-lg-3 col-md-3 col-12">
                        <h6 className="text-danger">Number of Rooms </h6>
                        <span>&#x20B9;{data.numRooms}</span>
                        <h6 className="text-danger mt-5">Venue Type</h6>
                        <span>{data.VenueType}</span>
                    </div>
                    <div className="col col-lg-3 col-md-3 col-12">
                        <h6 className="text-danger">Per Room Rent</h6>
                        <span>&#x20B9; {data.roomCharge}</span>
                    </div>
                    <div className="col col-lg-3 col-md-3 col-12">
                        <h6 className="text-danger">Policy</h6>
                        <span> {data.policy}</span>
                        <h6 className="text-danger mt-5">Service Type</h6>
                        <span>{data.ServiceType}</span>
                    </div>
                </div>

            </div>

        </div>
    </>);
}

export default ShowVenueGallery;
