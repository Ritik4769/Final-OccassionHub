import decorationRegistrationModel from '../model/decorationRegistrationModel.js';
import { fileURLToPath } from 'url';
import decorationRequestModel from '../model/decorationRequestModel.js';
import path from 'path';
import usermodel from "../model/usermodel.js";
import admindecorationRequestModel from '../model/admindecorationRequestModel.js';
import bcrypt from 'bcrypt';

export const decorationRegistration = async (request, response) => {
    var __filename = fileURLToPath(import.meta.url);
    var __dirname = path.dirname(__filename).replace("\\controller", "");

    console.log("request.body -----------> : ", request.body);

    const { Businessname, Decorationtype, Decorationprice, userEmail } = request.body;
    console.log("user  email -=========== -=-=-=-=-= ", userEmail);
    var filename = request.files.docs;
    var fileName = new Date().getTime() + filename.name;

    var pathName = path.join(__dirname, "/public/assets/images/", fileName);

    filename.mv(pathName, async (error) => {
        if (error) {
            console.log(error);
            response.status(203).json({ message: "Error while uploading document in decoration controller" });
        }
        else {
            try {
                const newUserData = {
                    DecorationEmail: userEmail,
                    Businessname: Businessname,
                    Decorationtype: Decorationtype,
                    Decorationprice: Decorationprice,
                    docs: fileName
                }
                const newUser = await decorationRegistrationModel.create(newUserData);
                console.log("newUser : ", newUser);
                const role = await usermodel.updateOne({ email: userEmail }, [
                    {
                        $set: {
                            role: "decoration"
                        }
                    }
                ])

                await newUser.save();
                response.status(201).json({ newUser: "newUser" });
            } catch (err) {
                console.error("Error in Decoration registration controller: ", err);
                response.status(500).json({ status: false });
            }
        }
    });
}
export const searchDecorationController = async (request, response) => {
    try {
        const decorationDetails = await decorationRegistrationModel.find();
        response.status(201).json({ decorationDetails });
    } catch (error) {
        console.error("Error in decoration search: ", error);
        response.status(500).json({ error: "Error in  decoration search" });
    }
}
export const seeNormalUserTodecorationRequest = async (request, response) => {
    try {
        // request.body
        const { location, date, starttime, endtime, additionalInfo } = request.body.selectedRequest;
        const decorationEmail = request.body.decorationEmail;
        const userEmail = request.body.userEmail;
        const Price = request.body.Price;

        const obj = {
            location,
            date,
            starttime,
            endtime,
            additionalInfo,
            decorationEmail,
            userEmail,
            Price
        }
        console.log("request.body in seeNormalUserTodecorationRequest : ", obj);
        var result = await decorationRequestModel.create(obj);
        console.log("result in seeNormalUserTodecorationRequest : ", result);
    }
    catch (error) {
        console.log("eroor : ", error);
    }
}

export const decorationSeeRequestedData = async (request, response) => {

    console.log("rekjkhjhbsfhmn in decoration controllerrr : ", request.body);
    try {
        var decorationRequestData = await decorationRequestModel.find({ decorationEmail: request.body.decorationEmail })
        // console.log("result in decoration controller :" , result);
        var normalUserData = await usermodel.findOne({ email: request.body.decorationEmail });
        var decorationData = await decorationRegistrationModel.findOne({ email: request.body.decorationEmail });
        console.log("decoration data : ", normalUserData);
        response.status(201).json({ decorationRequestData, normalUserData, decorationData });
    } catch (error) {
        console.log("error in see decoration request controller : ", error);
        response.status(500).json({ error: "error in see decoration request controller " });
    }
}

export const acceptRequestOfUserController = async (request, response) => {
    console.log("in acceptRequestOfUserController ", request.params.userEmail);
    const normaluserEmail = request.params.userEmail;
    var result = await decorationRequestModel.updateOne({ userEmail: normaluserEmail }, {
        $set: {
            status: 'accepted'
        }
    })
    console.log("result in acceptRequestOfUserController : ", result);
    response.status(201).json({ message: "Request accept successfully..!" });
}

export const acceptRequestOfAdminController = async (request, response) => {
    console.log("in acceptRequestOfUserController ", request.body);
    const { eventId, decorationEmail } = request.body;
    try {
        var result = await decorationRegistrationModel.findOne({
            DecorationEmail: decorationEmail
        })
        result.adminRequest.map((data, index) => {
            if (data.eventId === eventId) {
                data.status = 'accept'
            }
        });
        result.save();
        console.log("result in acceptRequestOfAdminController : ", result);
        response.status(201).json({ message: "Request accept successfully..!" });
    } catch (error) {
        console.log("error in acceptRequestOfAdminController : ", error);

    }
    // var result = await admindecorationRequestModel.updateOne({ _id: id }, {
    //     $set: {
    //         status: 'accepted'
    //     }
    // })
    // response.status(201).json({ message: "Request accept successfully..!" });
}

export const decorationSeeAdminRequestedDataController = async (request, response) => {
    try {
        var result = await decorationRegistrationModel.findOne({ decorationEmail: request.body.decorationEmail })
        console.log("Result in decorationSeeAdminRequestedDataController : ", result);
        response.status(201).json({ adminDecorationRequestData: result })
    } catch (error) {
        console.log("error in decorationSeeAdminRequestedDataController : ", error);
    }
}

export const updateDecorationProfileController = async (request, response) => {

    const { Id, email, name, contect, address, Businessname, Decorationtype, Decorationprice } = request.body;
    try {
        const DecorationData = await decorationRegistrationModel.updateOne({ _id: Id }, { $set: { Businessname, Decorationtype, Decorationprice } });
        const userData = await decorationRegistrationModel.findOne({ DecorationEmail: email });

        const userData1 = await usermodel.updateOne({ email: userData.DecorationEmail }, { $set: { name, contect, address } });
        if (DecorationData && userData) {
            console.log("Decoration profile updated successfully");
            response.status(201).json({ message: 'User profile updated successfully' });
        } else {
            console.log("User not found or no changes made");
            response.status(404).json({ error: 'User not found or no changes made' });
        }
    } catch (error) {
        console.log("Error while updating Decoration profile on controller ", error);
        response.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
}

export const updateDecorationPasswordController = async (request, response) => {
    const { Id, newPasword, confirmPassword, oldPassword } = request.body;
    console.log("request.body", request.body);

    try {

        const userData = await usermodel.findOne({ _id: Id });
        console.log("-----------------", userData);

        if (!userData) {
            console.log("User not found for the decoration");
            response.status(404).json({ error: 'User not found for the decoration' });
            return;
        }

        // Check if oldPassword, newPasword, and confirmPassword are provided
        if (!oldPassword || !newPasword || !confirmPassword) {
            console.log("Please provide oldPassword, newPasword, and confirmPassword");
            response.status(400).json({ error: 'Please provide oldPassword, newPasword, and confirmPassword' });
            return;
        }

        // Check if oldPassword matches the current password
        const isPasswordValid = await bcrypt.compare(oldPassword, userData.password);
        if (!isPasswordValid) {
            console.log("Old password does not match");
            response.status(401).json({ error: 'Old password does not match' });
            return;
        }

        // Check if newPasword and confirmPassword match
        if (newPasword !== confirmPassword) {
            console.log("New password and confirm password do not match");
            response.status(400).json({ error: 'New password and confirm password do not match' });
            return;
        }

        // Continue with password update logic
        const hashedNewPassword = await bcrypt.hash(newPasword, 10);
        console.log("bcrypt password", hashedNewPassword);
        const updateResult = await usermodel.updateOne({ _id: userData._id }, { $set: { password: hashedNewPassword } });

        if (updateResult) {
            console.log("decoration password updated successfully", updateResult);
            response.status(201).json({ message: 'decoration password updated successfully' });
        } else {
            console.log("No changes made to the decoration password");
            response.status(404).json({ error: 'No changes made to the decoration password' });
        }
    } catch (error) {
        console.log("Error while updating venue password in the controller ", error);
        response.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
}

export const DecorationBankDetailController = async (req, res) => {
    const { Id, Aadharno, Bankname, Branchname, Ifsc, Accountno } = req.body
    console.log("request.Body", req.body);
    try {
        const data = await decorationRequestModel.findOne({ _id: Id });
        console.log(data);
        const updateResult = await decorationRequestModel.updateOne({ _id: data._id }, { $set: { AadharNo: Aadharno, BankName: Bankname, BranchName: Branchname, IfscCode: Ifsc, AccountNo: Accountno } });
        if (updateResult) {
            console.log("caterer Bank details successfully", updateResult);
            res.status(201).json({ message: 'caterer Bank details successfully Added' });
        }
    } catch (error) {
        console.error("Error in caterers Bank Details controller: ", error);
        res.status(500).json({ status: false });
    }
}
