import { useState } from "react";
import { RegisterBankDetails } from "../../store/DjSlice.js"
import Swal from "sweetalert2";
var Aadharno = false, Branch = false, Ifsc = false, Accountno = false
function DjBankDetails(props) {
    console.log("...........", props.data);
    const [BankDetails, setBankDetails] = useState();
    const Validations = (name, value) => {
        console.log("name in validations : ", name);
        switch (name) {
            case 'Aadharno':
                var reg = /^\d{4}\s\d{4}\s\d{4}$/;
                console.log("username regex");
                if (value.trim() == "") {
                    document.getElementById("aadharno").style.color = "red";
                    document.getElementById("aadharno").innerHTML = "Name Required";
                    Aadharno = false;
                    return false
                } else if (reg.test(value)) {
                    document.getElementById('aadharno').style.color = "green";
                    document.getElementById("aadharno").innerHTML = "Looking Good";
                    Aadharno = true;
                    return true
                } else {
                    console.log("aadharno")
                    document.getElementById('aadharno').style.color = "red";
                    document.getElementById("aadharno").innerHTML = "Aadhar card number is invalid";
                    Aadharno = false;
                    return false;
                }
                break;
            case 'Branch':
                if (value.trim() == "") {
                    document.getElementById("Branch").style.color = "red";
                    document.getElementById("Branch").innerHTML = "Branch Required";
                    Branch = false;
                    return false;
                } else {
                    var reg = /^[a-zA-Z ]+$/;
                    if (reg.test(value)) {
                        document.getElementById("Branch").style.color = "green";
                        document.getElementById("Branch").innerHTML = "Looking Good";
                        Branch = true;
                        return true;
                    } else {
                        document.getElementById("Branch").style.color = "red";
                        document.getElementById("Branch").innerHTML = "Invalid Branch name";
                        Branch = false;
                        return false;
                    }
                }
                break;
            case 'Ifsc':
                if (value.trim() == "") {
                    document.getElementById("Ifsc").style.color = "red";
                    document.getElementById("Ifsc").innerHTML = "Ifsc code Required";
                    Ifsc = false;
                    return false;
                } else {
                    var reg = /^[A-Za-z]{4}\d{7}$/;
                    if (reg.test(value)) {
                        document.getElementById("Ifsc").style.color = "green";
                        document.getElementById("Ifsc").innerHTML = "Valid Ifsc code";
                        Ifsc = true;
                        return true;
                    } else {
                        document.getElementById("Ifsc").style.color = "red";
                        document.getElementById("Ifsc").innerHTML = "Invalid Ifsc code";
                        Ifsc = false;
                        return false;
                    }
                }
                break;

            case 'Accountno':
                var reg = /^\d{10,16}$/;
                if (value.trim() == '') {
                    document.getElementById("Accountno").style.color = "red";
                    document.getElementById("Accountno").innerHTML = "Account Number Required";
                    Accountno = false;
                    return false;
                } else if ((/^[A-Za-z]+$/).test(value)) {
                    document.getElementById("Accountno").style.color = "red";
                    document.getElementById("Accountno").innerHTML = "Account Number must be a digit only";
                    Accountno = false;
                    return false;
                } else if (!reg.test(value)) {
                    document.getElementById("Accountno").style.color = "red";
                    document.getElementById("Accountno").innerHTML = "Enter Account number";
                    Accountno = false;
                    return false;
                } else {
                    document.getElementById("Accountno").style.color = "green";
                    document.getElementById("Accountno").innerHTML = "Looking Good";
                    Accountno = true;
                    return true;
                }
                break;
        }
    }
    const getData = (event) => {
        const { name, value } = event.target
        setBankDetails({
            ...BankDetails,
            [name]: value
        });
        Validations(name, value);
    }
    const handleBankDetails = async (event) => {
        event.preventDefault();
        if (Aadharno && Branch && Ifsc && Accountno) {
            console.log(props.data._id);
            BankDetails.Id = props.data._id
            console.log("==========>", BankDetails);
            RegisterBankDetails(BankDetails).then((result) => {
                if (result.status === 201) {
                    Swal.fire({
                        background: "black",
                        icon: "success",
                        text: result.data.message,
                        showCloseButton: true,
                        focusConfirm: false,
                    })
                }
            }).catch(() => {
                console.log("Error while updating caterer profile");
            })
            event.target.reset();
        } else {
            alert("please fix error");
            Swal.fire({
                background: "black",
                icon: "error",
                text: "please Solve Error First......!",
                showCloseButton: true,
                focusConfirm: false,
            });
        }
    }
    return (<>
        <h2 className="modal-title text-white text-center" >Bank Details</h2>
        <form method="post" onSubmit={handleBankDetails}>
            <div className="mb-3 mt-4">
                <input type="text" className="form-control input-field" id="exampleInputName" aria-describedby="nameHelp"
                    placeholder="Enter Your Aadhar Card no." name="Aadharno" onChange={getData} />
                <span id="aadharno"></span>
            </div>
            <div className="mb-3 mt-4">
                <select className="w-100 mt-4" name="Bankname" id="exampleInputDetail" onChange={getData} aria-label="Default select example">
                    <option value="select">Select a bank</option>
                    <option value="sbi">State Bank of India</option>
                    <option value="icici">ICICI Bank</option>
                    <option value="hdfc">HDFC Bank</option>
                    <option value="axis">Axis Bank</option>
                    <option value="pnb">Punjab National Bank</option>
                    <option value="boi">Bank of India</option>
                    <option value="kotak">Kotak Mahindra Bank</option>
                    <option value="yes">Yes Bank</option>
                    <option value="idbi">IDBI Bank</option>
                    <option value="canara">Canara Bank</option>
                    <option value="boi">Bank of Baroda</option>
                </select>
            </div>
            <div className="mb-3 mt-4">
                <input type="text" name="Branch" className="form-control input-field" id="exampleInputContact" aria-describedby="contactHelp"
                    placeholder="Enter Your Bank Branch" onChange={getData} />
                <span id="Branch"></span>
            </div>
            <div className="mb-3 mt-4">
                <input type="text" name="Ifsc" className="form-control input-field" id="exampleInputAddress" aria-describedby="addressHelp"
                    placeholder="Enter your IFSC Code" onChange={getData} />
                <span id="Ifsc"></span>
            </div>
            <div className="mb-3 mt-4">
                <input type="text" name="Accountno" className="form-control input-field" id="exampleInputAddress" aria-describedby="addressHelp"
                    placeholder="Enter your Account Number" onChange={getData} />
                <span id="Accountno"></span>
            </div>
            <div className="d-flex justify-content-center">
                <button type="submit" className="ourbtn w-50 mt-3 mb-3">Update Profile</button>
            </div>
        </form>
    </>)
}
export default DjBankDetails;
