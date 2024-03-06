import './testimonial.css'
import img1 from '../../images/1.png'
import img2 from '../../images/2.png'
import img3 from '../../images/3.png'
import img4 from '../../images/4.png'
import img5 from '../../images/5.png'
import rating from '../../images/rating.png'

function Testimonial() {
    return (<>
        <div>
            <div className="row mt-5">
                <div className="col-lg-12">
                    <div className="section-title text-center">
                        <span className="subtitle ">What Clients Says</span>
                        <h3 className="title">Testimonial</h3>
                    </div>
                </div>
            </div>
            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <span style={{ height: '10px', width: '10px', borderRadius: '50%', backgroundColor: '#FF0057' }} data-bs-target="#carouselExampleControls" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></span>
                    <span style={{ height: '10px', width: '10px', borderRadius: '50%', backgroundColor: '#FF0057' }} data-bs-target="#carouselExampleControls" data-bs-slide-to="1" aria-label="Slide 2"></span>
                    <span style={{ height: '10px', width: '10px', borderRadius: '50%', backgroundColor: '#FF0057' }} data-bs-target="#carouselExampleControls" data-bs-slide-to="2" aria-label="Slide 3"></span>
                    <span style={{ height: '10px', width: '10px', borderRadius: '50%', backgroundColor: '#FF0057' }} data-bs-target="#carouselExampleControls" data-bs-slide-to="3" aria-label="Slide 4" ></span>
                    <span style={{ height: '10px', width: '10px', borderRadius: '50%', backgroundColor: '#FF0057' }} data-bs-target="#carouselExampleControls" data-bs-slide-to="4" aria-label="Slide 5"></span>
                    <span style={{ height: '10px', width: '10px', borderRadius: '50%', backgroundColor: '#FF0057' }} data-bs-target="#carouselExampleControls" data-bs-slide-to="5" aria-label="Slide 6"></span>
                </div>

                <div className=" p-5 w-100">
                    <div className="carousel-inner container">
                        <div className="carousel-item active ">
                            <div className="inner">
                                <div className="card-info">
                                    <div className="card-thumbnail">
                                        <img src={img1} alt="" />
                                    </div>
                                    <div className="card-content">
                                        <span className="subtitle mt-10">Client 1</span>
                                        <h3 className="title">Navnit Kumar</h3>
                                    </div>
                                </div>
                                <div className="card-description">
                                    <div className="title-area">
                                        <div className="title-info">
                                            <h3 className="title">Website Development</h3>
                                            <span className="date">Task done in 1 Month</span>
                                        </div>
                                        <div className="rating">
                                            <img src={rating} alt="" />
                                            <img src={rating} alt="" />
                                            <img src={rating} alt="" />
                                            <img src={rating} alt="" />
                                            <img src={rating} alt="" />
                                        </div>
                                    </div>
                                    <div className="seperator"></div>
                                    <p className="description">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid fuga harum
                                        quasi aperiam quam cupiditate nihil aut, voluptates corporis provident? Impedit,
                                        cupiditate fugit sapiente doloremque eaque harum libero dolorem. Vitae!
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="inner">
                                <div className="card-info">
                                    <div className="card-thumbnail">
                                        <img src={img2} alt="" />
                                    </div>
                                    <div className="card-content">
                                        <span className="subtitle mt-10">Client 2</span>
                                        <h3 className="title">Navnit Kumar</h3>
                                    </div>
                                </div>
                                <div className="card-description">
                                    <div className="title-area">
                                        <div className="title-info">
                                            <h3 className="title">Website Development</h3>
                                            <span className="date">Task done in 1 Month</span>
                                        </div>
                                        <div className="rating">
                                            <img src={rating} alt="" />
                                            <img src={rating} alt="" />
                                            <img src={rating} alt="" />
                                            <img src={rating} alt="" />
                                            <img src={rating} alt="" />
                                        </div>
                                    </div>
                                    <div className="seperator"></div>
                                    <p className="description">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid fuga harum
                                        quasi aperiam quam cupiditate nihil aut, voluptates corporis provident? Impedit,
                                        cupiditate fugit sapiente doloremque eaque harum libero dolorem. Vitae!
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="inner">
                                <div className="card-info">
                                    <div className="card-thumbnail">
                                        <img src={img3} alt="" />
                                    </div>
                                    <div className="card-content">
                                        <span className="subtitle mt-10">Client 3</span>
                                        <h3 className="title">Navnit Kumar</h3>
                                    </div>
                                </div>
                                <div className="card-description">
                                    <div className="title-area">
                                        <div className="title-info">
                                            <h3 className="title">Website Development</h3>
                                            <span className="date">Task done in 1 Month</span>
                                        </div>
                                        <div className="rating">
                                            <img src={rating} alt="" />
                                            <img src={rating} alt="" />
                                            <img src={rating} alt="" />
                                            <img src={rating} alt="" />
                                            <img src={rating} alt="" />
                                        </div>
                                    </div>
                                    <div className="seperator"></div>
                                    <p className="description">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid fuga harum
                                        quasi aperiam quam cupiditate nihil aut, voluptates corporis provident? Impedit,
                                        cupiditate fugit sapiente doloremque eaque harum libero dolorem. Vitae!
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="inner">
                                <div className="card-info">
                                    <div className="card-thumbnail">
                                        <img src={img4} alt="" />
                                    </div>
                                    <div className="card-content">
                                        <span className="subtitle mt-10">Client 4</span>
                                        <h3 className="title">Navnit Kumar</h3>
                                    </div>
                                </div>
                                <div className="card-description">
                                    <div className="title-area">
                                        <div className="title-info">
                                            <h3 className="title">Website Development</h3>
                                            <span className="date">Task done in 1 Month</span>
                                        </div>
                                        <div className="rating">
                                            <img src={rating} alt="" />
                                            <img src={rating} alt="" />
                                            <img src={rating} alt="" />
                                            <img src={rating} alt="" />
                                            <img src={rating} alt="" />
                                        </div>
                                    </div>
                                    <div className="seperator"></div>
                                    <p className="description">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid fuga harum
                                        quasi aperiam quam cupiditate nihil aut, voluptates corporis provident? Impedit,
                                        cupiditate fugit sapiente doloremque eaque harum libero dolorem. Vitae!
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="inner">
                                <div className="card-info">
                                    <div className="card-thumbnail">
                                        <img src={img4} alt="" />
                                    </div>
                                    <div className="card-content">
                                        <span className="subtitle mt-10">Client 5</span>
                                        <h3 className="title">Navnit Kumar</h3>
                                    </div>
                                </div>
                                <div className="card-description">
                                    <div className="title-area">
                                        <div className="title-info">
                                            <h3 className="title">Website Development</h3>
                                            <span className="date">Task done in 1 Month</span>
                                        </div>
                                        <div className="rating">
                                            <img src={rating} alt="" />
                                            <img src={rating} alt="" />
                                            <img src={rating} alt="" />
                                            <img src={rating} alt="" />
                                            <img src={rating} alt="" />
                                        </div>
                                    </div>
                                    <div className="seperator"></div>
                                    <p className="description">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid fuga harum
                                        quasi aperiam quam cupiditate nihil aut, voluptates corporis provident? Impedit,
                                        cupiditate fugit sapiente doloremque eaque harum libero dolorem. Vitae!
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="inner">
                                <div className="card-info">
                                    <div className="card-thumbnail">
                                        <img src={img5} alt="" />
                                    </div>
                                    <div className="card-content">
                                        <span className="subtitle mt-10">Client 6</span>
                                        <h3 className="title">Navnit Kumar</h3>
                                    </div>
                                </div>
                                <div className="card-description">
                                    <div className="title-area">
                                        <div className="title-info">
                                            <h3 className="title">Website Development</h3>
                                            <span className="date">Task done in 1 Month</span>
                                        </div>
                                        <div className="rating">
                                            <img src={rating} alt="" />
                                            <img src={rating} alt="" />
                                            <img src={rating} alt="" />
                                            <img src={rating} alt="" />
                                            <img src={rating} alt="" />
                                        </div>
                                    </div>
                                    <div className="seperator"></div>
                                    <p className="description">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid fuga harum
                                        quasi aperiam quam cupiditate nihil aut, voluptates corporis provident? Impedit,
                                        cupiditate fugit sapiente doloremque eaque harum libero dolorem. Vitae!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <button className="carousel-control-prev pre-nxt-buttons" type="button" data-bs-target="#carouselExampleControls"
                    data-bs-slide="prev">
                    <div className='p-1 pre-btn d-flex aling-items-center justify-content-center'>
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </div>
                </button>
                <button className="carousel-control-next pre-nxt-buttons" type="button" data-bs-target="#carouselExampleControls"
                    data-bs-slide="next">
                    <div className='p-1 nxt-btn d-flex aling-items-center justify-content-center'>
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </div>
                    {/* <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span> */}
                </button>

            </div>
        </div>
    </>);

}

export default Testimonial;