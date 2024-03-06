import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { user_requestedUrl } from "../../urls";
import jscookie from 'js-cookie';
import { loadStripe } from '@stripe/stripe-js';
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function UserPaymentModal() {
    const location = useLocation();
    const navigate = useNavigate();
    var CatereData;
    const pathname = location.pathname;

    console.log("pathname : ", pathname);
    console.log("location.data : ", CatereData);

    const [isModalOpen, setModalOpen] = useState(false);
    const [isChecked, setChecked] = useState(false);

    const handleCheckboxChange = () => {
        setChecked(!isChecked);
    };

    const submitCatererData = async () => {
        try {
            console.log("Intry : ");
            var response = await axios.get(user_requestedUrl + '/userBookCaterer');
            if (response.status === 201) {
                Swal.fire({
                    position: "middle",
                    icon: "success",
                    title: response.data.message,
                    showConfirmButton: false,
                    timer: 2000
                });
                navigate('/profile');
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "ERROR",
                    text: "Please try Again...",
                });
            }
        }
        catch (error) {
            console.log("error in submit Data : ", error);
        }
    }

    const submitDecorationData = async () => {
        axios.post(user_requestedUrl + `/bookingDecoration`)
            .then((response) => {
                console.log("response in acceptRequestofUser : ", response.status);
                if (response.status == 201) {
                    Swal.fire({
                        position: "middle",
                        icon: "success",
                        title: response.data.message,
                        showConfirmButton: false,
                        timer: 2000
                    });
                    navigate('/profile');
                }
                else {
                    Swal.fire({
                        icon: "error",
                        title: "ERROR",
                        text: "Please try Again...",
                    });
                }

            }).catch((error) => {
                console.log("error : ", error);
            });
    }
    const submitDjData = async () => {
        axios.post(user_requestedUrl + `/bookingDj`)
            .then((response) => {
                console.log("response in acceptRequestofUser : ", response.status);
                if (response.status == 201) {
                    Swal.fire({
                        position: "middle",
                        icon: "success",
                        title: response.data.message,
                        showConfirmButton: false,
                        timer: 2000
                    });
                    navigate('/profile');
                }
                else {
                    Swal.fire({
                        icon: "error",
                        title: "ERROR",
                        text: "Please try Again...",
                    });
                }

            }).catch((error) => {
                console.log("error : ", error);
            });
    }

    useEffect(() => {
        if (location.search) {
            const params = new URLSearchParams(location.search);
            const status = params.get('status');
            const role = params.get('role');
            if (status === 'true' && role === 'Caterer') {
                submitCatererData();
                // alert(role);
            }
            else if (status === 'true' && role === 'Decoration') {
                submitDecorationData();
                // alert(role);
            }
            else if (status === 'true' && role === 'Dj') {
                submitDjData();
                // alert(role);
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "ERROR",
                    text: "Please try Again...",
                });
                navigate('/profile');
            }
        }
    }, []);

    const handlePayment = async () => {
        if (isChecked) {
            setModalOpen(false);
            try {
                CatereData = location.state.data;
                console.log("CatererDAta in handle PAyment function : ", CatereData);
                const stripe = await loadStripe('pk_test_51O7qF0SJUnxcOIoS0sB7ANA2hIetDRhpRNTB4adPmYuOBzByrlhxBJaD9v5FFrUAlh9btXzUBeju1uuUHqZmbGgG00rLZ3hiG2');
                var result = await axios.post(user_requestedUrl + '/userPaymentForCatereBook', { CatereData, pathname });
                const result1 = stripe.redirectToCheckout({
                    sessionId: result.data.id
                });
                console.log("REsult1 in handlepayment : ", result1);
            } catch (error) {
                console.log('error', error);
            }
        } else {
            alert("Please agree to the terms and conditions before proceeding.");
        }
    };

    return (
        <>

            {/* <button className="btn btn-danger" onClick={() => setModalOpen(true)}>Confrim</button> */}
            {/* <Modal size="md" show={isModalOpen} centered>
                <Modal.Body className='bg-black' style={{ padding: '0 10%' }}> */}
            <div className='mt-4'>
                <div className='d-flex justify-content-end'>
                    <button className='btn-close' aria-label="Close" onClick={() => setModalOpen(false)}></button>
                </div>

                <div className="container h-75 text-light">
                    <h3 className="d-flex justify-content-center text-danger">Terms and Conditions</h3>
                    <ul className="my-4">
                        <li>There is no refund back if you cancel any service.</li><br />
                        <li>You must have to pay full payment before book any service.</li><br />
                        <li>Specify the process for handling any changes or modifications to the services. This could not include changes in the number of guests, event date, or specific requirements.</li><br />
                        <li>User's Responsibilities: Communicate the user's responsibilities, such as providing accurate event details, ensuring access to the venue, and cooperating with the service provider during the event.</li><br />
                    </ul>
                    <Form.Group className="mb-3" controlId="termsCheckbox">
                        <Form.Check
                            type="checkbox"
                            label="I agree to all terms and conditions"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                        />
                    </Form.Group>
                    <div className="d-flex justify-content-center my-3">
                        <Button variant="danger" onClick={handlePayment}>Proceed with Payment</Button>
                    </div>
                </div>
            </div>
            {/* </Modal.Body>
            </Modal> */}
        </>
    );
}

export default UserPaymentModal;
