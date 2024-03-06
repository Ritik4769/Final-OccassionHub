import { fileURLToPath } from 'url';
import djRegistrationModel from '../model/djRegistrationModel.js';
import requestedDjModel from '../model/requestedDjModel.js';
import path from 'path';
import usermodel from '../model/usermodel.js';
import admindjRequestModel from '../model/admindjRequestModel.js';
import bcrypt from 'bcrypt';

export const djRegistrationContoller = async (request, response) => {
    var __filename = fileURLToPath(import.meta.url);
    var __dirname = path.dirname(__filename).replace("\\controller", "");
    console.log("request.body -----------> : ", request.body);
    const { Businessname, EquipmentType, Djprice, userEmail } = request.body;
    console.log("request.files.docs-------------->", request.files.docs);
    var filename = request.files.docs;
    console.log("filename ++++++++>  : ", filename);
    var fileName = new Date().getTime() + filename.name;
    console.log("fileName : ", fileName);

    var pathName = path.join(__dirname, "/public/assets/images/", fileName);

    filename.mv(pathName, async (error) => {
        if (error) {
            console.log(error);
            response.status(203).json({ message: "Error while uploading document in dj controller" });
        }
        else {
            var userdata = await usermodel.findOne({ email: userEmail });
            console.log("userdata in dj registration controller----------> ", userdata);
            try {
                console.log("request.body : ", request.body);
                const newUser = await djRegistrationModel.create({
                    DjEmail: userEmail,
                    Businessname: Businessname,
                    EquipmentType: EquipmentType,
                    Djprice: Djprice,
                    address: userdata.address,
                    docs: fileName
                });

                const role = await usermodel.updateOne({ email: userEmail }, [
                    {
                        $set: {
                            role: "dj"
                        }
                    }
                ])
                console.log("newUser : ", newUser);
                await newUser.save();
                response.status(201).json({ newUser: "newUser" });
            } catch (err) {
                console.error("Error in Dj registration controller: ", err);
                response.status(500).json({ status: false });
            }
        }
    });
}
export const searchDjController = async (request, response) => {
    try {
        const djDetails = await djRegistrationModel.find();
        response.status(201).json({ djDetails });
    } catch (error) {
        console.error("Error in dj search: ", error);
        response.status(500).json({ error: "Error in  dj search" });
    }
}

export const djBookUserController = async (request, response) => {
    console.log("request.body : -----------> ", request.body);
    const { date, time, djhours, userEmail, djEmail, location } = request.body;
    try {
        var requestedDjModeldata = requestedDjModel.create({
            date: date,
            time: time,
            djhours: djhours,
            location: location,
            userEmail: userEmail,
            djEmail: djEmail,
            status : 'send'
        });
        console.log("data : ", requestedDjModeldata);
        response.status(201).json({ requestedDjModeldata: requestedDjModeldata });
    } catch (error) {
        console.error("Error in dj Book Controller: ", error);
        response.status(500).json({ error: "Error in dj Book Controller" });
    }
}
export const djProfileDataFindController = async (request, response) => {
    const { djEmail } = request.body;
    try {
        var userDjdata = await usermodel.findOne({ email: djEmail });
        var djData = await djRegistrationModel.findOne({ DjEmail: djEmail });
        console.log("djjData in controller Profile .........!!", djData);
        response.status(201).json({ djData, userDjdata });
    } catch (error) {
        console.error("Error in dj prfile Controller: ", error);
        response.status(500).json({ error: "Error in dj prfile Controller" });
    }
}

export const seeRequetDjToUserController = async (request, response) => {
    console.log("seeRequetDjToUser request.body----->: ", request.body);
    const { DjEmail } = request.body;

    try {
        console.log("DjEmail : ", DjEmail);
        const AllRequtedData = await requestedDjModel.find({ djEmail: DjEmail });

        const userData = [];
        for (let i = 0; i < AllRequtedData.length; i++) {
            const request = AllRequtedData[i];
            const user = await usermodel.findOne({ email: request.userEmail });
            userData.push({ ...request.toObject(), user });
        }

        console.log("AllRequtedData in seeRequetDjToUserController ", userData);
        response.status(201).json({ AllRequtedData: userData });
    } catch (error) {
        console.error("Error in seeRequetDjToUserController: ", error);
        response.status(500).json({ error: "Error in seeRequetDjToUserController" });
    }
};


export const ConfirmrequestSendUserController = async (request, response) => {
    const { userEmail, date, hours, price } = request.body;
    try {
        const hourlyRate = price;

        const djprice = hours * hourlyRate;
        console.log("djprice: ", djprice);

        console.log("userEmail in ConfirmrequestSendUserController ", userEmail);
        console.log("date in ConfirmrequestSendUserController ", date);

        const requestDjData = await requestedDjModel.findOne({ userEmail: userEmail, date: date });
        console.log("requestDjData : ", requestDjData);
        if (requestDjData) {
            const requestDjDataUpdate = await requestedDjModel.updateOne(
                { userEmail: requestDjData.userEmail },
                {
                    $set: {
                        djprice: djprice,
                        status: "accepted"
                    }
                }
            );

            console.log("requestDjDataUpdate : ", requestDjDataUpdate);
            console.log("update successfully......!!");
            response.status(201).json({ message: 'send request to user', requestDjData: requestDjData });
        } else {
            console.log("User not found or no changes made");
            response.status(404).json({ error: 'User not found or no changes made' });
        }

    } catch (error) {
        console.error("Error in ConfirmrequestSendUserController: ", error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
}

export const updateDjProfileController = async (request, response) => {
    console.log("request.jkfgs jlvbf");

    const { email, name, contect, address, Businessname, EquipmentType, Djprice, ServiceType } = request.body;

    try {
        const cateData = await djRegistrationModel.updateOne({ DjEmail: email }, { $set: { Businessname, EquipmentType, Djprice, ServiceType } });
        const userData = await djRegistrationModel.findOne({ DjEmail: email });

        const userData1 = await usermodel.updateOne({ email: userData.DjEmail }, { $set: { name, contect, address } });
        if (cateData && userData) {
            console.log("dj profile updated successfully");
            response.status(201).json({ message: 'User profile updated successfully' });
        } else {
            console.log("User not found or no changes made");
            response.status(404).json({ error: 'User not found or no changes made' });
        }
    } catch (error) {
        console.log("Error while updating Dj profile on controller ", error);
        response.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
}

export const djBookDatecheakController = async (req, res) => {
    const { date, djEmail } = req.body;
    try {
        var data = await requestedDjModel.find({ djEmail: djEmail });
        console.log(data, "data ----------------->");
        for (var i = 0; i < data.length; i++) {
            console.log("jgdujc djcgc h usersss : ", data[i]);
            if (data[i].date === date && data[i].status == 'book') {
                console.log("jgdujc djcgc h");
                return res.status(201).json({ message: "DJ is already booked for this date" });
            }
        }
        res.status(203).json({ message: "" });
    } catch (error) {
        console.error("Error checking date:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const CusetomerOderConfirmController = async (request, response) => {
    console.log("seeRequetDjToUser request.body ----->: ", request.body);
    const { DjEmail } = request.body;

    try {
        console.log("DjEmail : ", DjEmail);
        const AllRequtedData = await requestedDjModel.find({ djEmail: DjEmail });
        console.log("AllRequtedData : ----------> in customer oder ere", AllRequtedData);

        const userData = [];
        for (let i = 0; i < AllRequtedData.length; i++) {
            const request = AllRequtedData[i];
            if (request.status === 'book') {
                const user = await usermodel.findOne({ email: request.userEmail });
                userData.push({ ...request.toObject(), user });
            }
        }

        console.log("AllRequtedData in seeRequetDjToUserController ", userData);
        response.status(201).json({ AllRequtedData: userData });
    } catch (error) {
        console.error("Error in seeRequetDjToUserController: ", error);
        response.status(500).json({ error: "Error in seeRequetDjToUserController" });
    }
}

export const djSeeAdminRequestedDataController = async (request, response) => {
    try {
        var result = await djRegistrationModel.findOne({ djEmail: request.body.djEmail });
        console.log("Result in djSeeAdminRequestedDataController : ", result);
        response.status(201).json({ adminDjRequestData: result })
    } catch (error) {
        console.log("error in djSeeAdminRequestedDataController : ", error);
    }
}

export const acceptRequestOfAdminController = async (request, response) => {
    console.log("in acceptRequestOfUserController ", request.body);
    const { eventId, djEmail } = request.body;
    try {
        var result = await djRegistrationModel.findOne({
            DjEmail: djEmail
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
}

export const updateDjPasswordController = async (request, response) => {
    const { Id, newPasword, confirmPassword, oldPassword } = request.body;
    console.log("request.body", request.body);

    try {
        const djData = await djRegistrationModel.findOne({ _id: Id });
        console.log("==============", djData);
        const userData = await usermodel.findOne({ email: djData.DjEmail });
        console.log("-----------------", userData);

        if (!userData) {
            console.log("User not found for the DJ");
            response.status(404).json({ error: 'User not found for the DJ' });
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
            console.log("DJ password updated successfully", updateResult);
            response.status(201).json({ message: 'DJ password updated successfully' });
        } else {
            console.log("No changes made to the DJ password");
            response.status(404).json({ error: 'No changes made to the DJ password' });
        }
    } catch (error) {
        console.log("Error while updating DJ password in the controller ", error);
        response.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};
export const DjBankDetailController = async (req, res) => {
    const { Id, Aadharno, Bankname, Branchname, Ifsc, Accountno } = req.body
    console.log("request.Body", req.body);
    try {
        const data = await djRegistrationModel.findOne({ _id: Id });
        console.log(data);
        const updateResult = await djRegistrationModel.updateOne({ _id: data._id }, { $set: { AadharNo: Aadharno, BankName: Bankname, BranchName: Branchname, IfscCode: Ifsc, AccountNo: Accountno } });
        if (updateResult) {
            console.log("caterer Bank details successfully", updateResult);
            res.status(201).json({ message: 'caterer Bank details successfully Added' });
        }
    } catch (error) {
        console.error("Error in caterers Bank Details controller: ", error);
        res.status(500).json({ status: false });
    }
}