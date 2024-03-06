import Modal from 'react-bootstrap/Modal';
import { caterre_requestUrl } from '../../urls';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
function CatererSendResponseToAdmin(props) {
    const {userData} = props;
    const [response,setResponse] = useState({});
    const [isResponseToUserModal, setResponseToUserModal] = useState(false);
    const [diseasPrice,setPrice] = useState('');
    function getData(event){
        let { name, value } = event.target;
        setPrice({
            ...diseasPrice,
            [name] : value
        })
    }

    const handleSubmitResponse = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(caterre_requestUrl + "/sendResponseToAdminPrice", {userData,diseasPrice})
            setResponse(response.data.requestThaliData);
            Swal.fire({
                background: "black",
                icon: "success",
                text: response.data.message,
                showCloseButton: true,
                focusConfirm: false,
            });
            setResponseToUserModal(false);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (<>
        <button className="btn btn-danger w-25 offset-lg-4 offset-1" onClick={() => { setResponseToUserModal(true) }}>{(response&&response.status) ?"Sent" : "Accept Request"}</button>
        <Modal size="md-down" show={isResponseToUserModal} onHide={() => { setResponseToUserModal(false) }} centered  >
            <Modal.Body className='bg-black' style={{ padding: '0 10%' }}>
                <div className='mt-4' >
                    <div className='d-flex justify-content-end'>
                        <button className='btn-close' aria-label="Close" onClick={() => { setResponseToUserModal(false) }}></button>
                    </div>
                    <h1 style={{color:"white"}}></h1>
                    <h2 className="modal-title text-white text-center" >Enter Price </h2>
                    <form onSubmit={handleSubmitResponse} method="post">
                        <div className="mb-3 mt-4">
                            <input type="name" className="form-control input-field" defaultValue={diseasPrice.Price} id="exampleInputName" placeholder="Enter Price Per Thali" name="Price" onChange={getData} />
                        </div>
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="ourbtn w-50 mt-3 mb-3" style={{color:'black'}}>Send Response</button>
                        </div>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    </>)
}
export default CatererSendResponseToAdmin;
