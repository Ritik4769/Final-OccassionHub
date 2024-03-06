import React from 'react';
import concrt from '../../images/concrt.jpg';
import carting from '../../images/catring.jpeg';
import decoreation from '../../images/decoration copy.jpg';
import dj from '../../images/bj.jpg'
import venue from '../../images/venue.webp';
import img from '../../images/occassionHub-logo.webp';
import './servicepage.css'
function Servicepage() {
    return (
        <div>
            <div
                className="bg-success text-white text-center py-5"
                style={{
                    backgroundImage: `url(${ concrt })`,
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                    marginTop: '-5%',
                }}
            >
                <div className="container">
                    <h3 className="webcolor" style={{ fontSize: '3rem', fontWeight: 'bolder', fontFamily: "Kaushan Script" }}>
                        Services
                    </h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bolder', fontFamily: "Kaushan Script" }}>We Provide you.....</p>
                </div>
            </div>

            <div className="bg-black py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 py-1 py-md-0">
                            <img
                                src={carting} className="img-fluid" id="catring" alt='...' />
                        </div>

                        <div className="col-md-6 d-flex align-items-center">
                            <div>
                                <h3 className='webcolor' style={{ fontSize: '3rem' }}>Cateres....... </h3>
                                <hr style={{ height: '0.5rem' }} />
                                <p>
                                    Make your wedding day perfect and stress-free with our catering services.
                                    We’ll provide delicious food and exceptional service so you can relax and
                                    enjoy your special day.
                                </p>
                                <p>
                                    Contact us today to start planning. We offer catering services at venues of
                                    your choice, whether it’s a backyard, a park, or a rented event space. Our
                                    team will work with you to create a customized menu that suits your event’s
                                    theme and preferences.
                                </p>
                                <p>
                                    Contact us today to start planning. We offer catering services at venues of
                                    your choice, whether it’s a backyard, a park, or a rented event space. Our
                                    team will work with you to create a customized menu that suits your event’s
                                    theme and preferences.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="bg-black py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 d-flex align-items-center">
                            <div>
                                <h3 className='webcolor' style={{ fontSize: '3rem' }}>Decoration....... </h3>
                                <hr style={{ height: '0.5rem' }} />
                                <p>
                                    Make your wedding day perfect and stress-free with our catering services.
                                    We’ll provide delicious food and exceptional service so you can relax and
                                    enjoy your special day.
                                </p>
                                <p>
                                    Contact us today to start planning. We offer catering services at venues of
                                    your choice, whether it’s a backyard, a park, or a rented event space. Our
                                    team will work with you to create a customized menu that suits your event’s
                                    theme and preferences.
                                </p>
                                <p>
                                    Contact us today to start planning. We offer catering services at venues of
                                    your choice, whether it’s a backyard, a park, or a rented event space. Our
                                    team will work with you to create a customized menu that suits your event’s
                                    theme and preferences.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <img src={decoreation} className="img-fluid" id="decoration" alt='...' />
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-black py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <img
                                src={dj}
                                className="img-fluid"
                                id="catring"
                            // alt="Catering"
                            // style={{ marginTop: '2rem', height: '80vh',width:"35rem",transform:'0.5s' }}
                            />
                        </div>

                        <div className="col-md-6 d-flex align-items-center">
                            <div>
                                <h3 className='webcolor' style={{ fontSize: '3rem' }}>DJ....... </h3>
                                <hr style={{ height: '0.5rem' }} />
                                <p>
                                    Make your wedding day perfect and stress-free with our catering services.
                                    We’ll provide delicious food and exceptional service so you can relax and
                                    enjoy your special day.
                                </p>
                                <p>
                                    Contact us today to start planning. We offer catering services at venues of
                                    your choice, whether it’s a backyard, a park, or a rented event space. Our
                                    team will work with you to create a customized menu that suits your event’s
                                    theme and preferences.
                                </p>
                                <p>
                                    Contact us today to start planning. We offer catering services at venues of
                                    your choice, whether it’s a backyard, a park, or a rented event space. Our
                                    team will work with you to create a customized menu that suits your event’s
                                    theme and preferences.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="bg-black py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 d-flex align-items-center">
                            <div>
                                <h3 className='webcolor' style={{ fontSize: '3rem' }}>Venue....... </h3>
                                <hr style={{ height: '0.5rem' }} />
                                <p>
                                    Make your wedding day perfect and stress-free with our catering services.
                                    We’ll provide delicious food and exceptional service so you can relax and
                                    enjoy your special day.
                                </p>
                                <p>
                                    Contact us today to start planning. We offer catering services at venues of
                                    your choice, whether it’s a backyard, a park, or a rented event space. Our
                                    team will work with you to create a customized menu that suits your event’s
                                    theme and preferences.
                                </p>
                                <p>
                                    Contact us today to start planning. We offer catering services at venues of
                                    your choice, whether it’s a backyard, a park, or a rented event space. Our
                                    team will work with you to create a customized menu that suits your event’s
                                    theme and preferences.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <img src={venue} className="img-fluid" id="decoration" alt='...' />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Servicepage;
