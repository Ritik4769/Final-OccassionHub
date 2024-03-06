import dj from '../../images/DjManager.jpeg'
import caterer from '../../images/Caterer.jpg'
import decoration from '../../images/decoration.jpg'
import './servicesection.css';
function Services() {
    return (<>
        <div className="bg-black p-2">
            <h1 className="text-center text-white mt-3">Our <span className="webcolor">Services...!</span> </h1>
            <div className="container p-5">
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active" data-bs-interval="2000">
                            <div className="image-container">
                                <img src={decoration} className="d-block w-100 servicesimage" alt="..." />
                                <div className="hover-box text-center align-items-center">
                                    <h3 className="text-white" >Decoration</h3>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item" data-bs-interval="2000">
                            <div className="image-container">
                                <img src={caterer} className="d-block w-100 servicesimage" alt="..." />
                                <div className="hover-box text-center align-items-center">
                                    <h3 className="text-white" >Catering</h3>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item" data-bs-interval="2000">
                            <div className="image-container">
                                <img src={dj} className="d-block w-100 servicesimage" alt="..." />
                                <div className="hover-box text-center align-items-center">
                                    <h3 className="text-white" >Dj</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade"
                        data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade"
                        data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </div>
    </>);
}

export default Services;