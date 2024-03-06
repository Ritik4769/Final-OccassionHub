import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { user_requestedUrl } from "../../urls";
import jscookie from 'js-cookie';
import './showResponse.css';
// import Form from 'react-bootstrap/Form';

function ShowsResponseModal() {
    const [isModalOpen, setModalOpen] = useState(false);

    const [djData, setDjData] = useState([]);
    const [catereData, setcatereData] = useState([]);
    var userEmail = jscookie.get('user');
    const requstedData = async () => {
        // setLink("requestedData");
        var response = await axios.post(user_requestedUrl + "/seeRequetedData", { userEmail });
        setDjData(response.data.djUserData);
        setcatereData(response.data.catereData);
        console.log("caterer data -00000-000- 0-0-0-0- ", response.data.djUserData)
        setModalOpen(true);
    }
    return (
        <>
            <button className='ourbtn ms-1' onClick={requstedData}>
                <i className="fa fa-bell" aria-hidden="true"></i>
            </button>
            <Modal size="lg" show={isModalOpen} centered>
                <Modal.Body className='bg-black px-2'>
                    <div className='mt-4'>
                        <div className='d-flex justify-content-end'>
                            <button className='btn-close' aria-label="Close" onClick={() => setModalOpen(false)}></button>
                        </div>
                        <div className="container-fluid scroller w-100 bg-success">
                            <div className="container-fluid  subScroller">
                                <h5 className="modal-title text-white text-center my-3" >Catere Response</h5>
                                <table class="table table-dark table-striped w-100">
                                    <thead>
                                        <tr>
                                            <th scope="col">Sno</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Catere Name</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            catereData.map((data, index) => (
                                                (data.status == "Send") ?
                                                    <tr key={index}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{data.date}</td>
                                                        <td>{data.catereBusiness}</td>
                                                        <td>{data.Price}</td>
                                                        <td>
                                                            <button className="btn btn-danger">Book</button>
                                                        </td>
                                                    </tr>
                                                    : ""
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="container-fluid subScroller">
                                <h5 className="modal-title text-white text-center my-3" >DJ Response</h5>
                                <table class="table table-dark table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">Sno</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">DJ Name</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            djData.map((data, index) => (
                                                (data.status == "pending") ?
                                                    <tr key={index}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{data.date}</td>
                                                        <td>{data.djDetails.Businessname}</td>
                                                        <td>{data.djprice}</td>
                                                        <td>
                                                            <button className="btn btn-danger">Book</button>
                                                        </td>
                                                    </tr>
                                                    : ""
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>

                            <div className="container-fluid">
                                <h5 className="modal-title text-white text-center my-3" >Decoration Response</h5>
                                <table class="table table-dark table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">Sno</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Decoration Name</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {

                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ShowsResponseModal;