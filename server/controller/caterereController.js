import catererRegistrationModel from "../model/catererRegistrationModel.js";
import usermodel from "../model/usermodel.js";
import { fileURLToPath } from 'url';
import path from 'path';
import customiseThaliModel from "../model/customiseThaliModel.js";
import bcrypt from 'bcrypt';

export const caterrerRegistration = async (request, response) => {
    var __filename = fileURLToPath(import.meta.url);
    var __dirname = path.dirname(__filename).replace("\\controller", "");
    const { Businessname, Specialization, FoodType, ServiceCharges, userEmail } = request.body;
    var filename = request.files.docs;
    var fileName = new Date().getTime() + filename.name;

    var pathName = path.join(__dirname, "/public/assets/images/", fileName);

    filename.mv(pathName, async (error) => {
        if (error) {
            console.log(error);
            response.status(203).json({ message: "Error while uploading document in caterer controller" });
        }
        else {
            try {
                const newUser = await catererRegistrationModel.create({
                    catererEmail: userEmail,
                    Businessname: Businessname,
                    Specialization: Specialization,
                    FoodType: FoodType,
                    ServiceCharges: ServiceCharges,
                    docs: fileName
                });


                const role = await usermodel.updateOne({ email: userEmail }, [
                    {
                        $set: {
                            role: "catrer"
                        }
                    }
                ])

                await newUser.save();

                response.status(201).json({ newUser: "newUser" });
            } catch (err) {
                console.error("Error in caterer registration controller: ", error);
                response.status(500).json({ status: false });
            }
        }
    });
}

export const searchCatrerController = async (request, response) => {
    try {
        const catererDetails = await catererRegistrationModel.find();
        response.status(201).json({ catererDetails });
    } catch (error) {
        console.error("Error in cateres search: ", error);
        response.status(500).json({ error: "Error in  cateres search" });
    }
}

export const seeNormalUserToCatereRequestController = async (request, response) => {
    try {
        const { location, date, time, totalguest, additionalInfo, Roti, Sabji, Dessert, Starter } = request.body.selectedDish;
        var userEmail = request.body.userEmail;
        const userData = await usermodel.findOne({ email: request.body.catererEmail });
        const catereBusinessName = await catererRegistrationModel.findOne({ catererEmail: request.body.catererEmail });
        const detailsOfNormalUserRequestForCateres = await customiseThaliModel.create({
            catereid: userData._id,
            catereEmail: userData.email,
            userEmail: userEmail,
            catereBusiness: catereBusinessName.Businessname,
            location: location,
            date: date,
            time: time,
            totalguest: totalguest,
            requirments: [{
                Roti: Roti,
                Sabji: Sabji,
                Dessert: Dessert,
                Starter: Starter,
            }],
            addtionalmenu: additionalInfo,
        });

        await detailsOfNormalUserRequestForCateres.save();
        response.status(201).json({ detailsOfNormalUserRequestForCateres });
    } catch (err) {
        console.error("Error in see Normal User To Catere RequestController: ", err);
        response.status(500).json({ status: false });
    }
}

export const catereSeeRequestedDataController = async (request, response) => {

    try {
        const { catereEmail } = request.body;
        const userData = await usermodel.findOne({ email: catereEmail });
        const catereRegistrationInfo = await catererRegistrationModel.findOne({ catererEmail: catereEmail });

        var allUserRequestedDataForCateres = await customiseThaliModel.find({ catereid: userData._id });
        const userName = [];
        for (let i = 0; i < allUserRequestedDataForCateres.length; i++) {
            const userEmail = allUserRequestedDataForCateres[i].userEmail;
            const name = (await usermodel.findOne({ email: userEmail })).name;
            userName.push(name);
        }

        response.status(201).json({
            userData,
            catereRegistrationInfo,
            allUserRequestedDataForCateres, userName
        });
    } catch (error) {
        console.log("Error in catere See Requested Data Controller", error);
        response.status(500).json({ status: false });
    }
}

export const updateCatereProfileController = async (request, response) => {

    const { Id, email, name, contect, address, Businessname, Specialization, ServiceCharges, FoodType, ServiceType } = request.body;

    try {
        const cateData = await catererRegistrationModel.updateOne({ _id: Id }, { $set: { Businessname, Specialization, ServiceCharges, FoodType, ServiceType } });
        const userData = await catererRegistrationModel.findOne({ catererEmail: email });

        const userData1 = await usermodel.updateOne({ email: userData.catererEmail }, { $set: { name, contect, address } });
        if (cateData && userData) {
            console.log("catere profile updated successfully");
            response.status(201).json({ message: 'User profile updated successfully' });
        } else {
            console.log("User not found or no changes made");
            response.status(404).json({ error: 'User not found or no changes made' });
        }
    } catch (error) {
        console.log("Error while updating catere profile on controller ", error);
        response.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
}

export const catereSendRequestTouserController = async (request, response) => {

    const { diseasPrice: { Price }, catereid, date } = request.body;
    try {
        var requestThaliData = await customiseThaliModel.findOne({ catereid: catereid, date: date });
        if (requestThaliData) {
            var requestThaliData1 = await customiseThaliModel.updateOne(
                { _id: requestThaliData._id },
                { $set: { Price, status: "Send" } }
            );
            response.status(201).json({ message: 'send request to user', requestThaliData: requestThaliData });
        } else {
            console.log("User not found or no changes made");
            response.status(404).json({ error: 'User not found or no changes made' });
        }
    } catch (error) {
        console.log("Error in catereSendRequestTouserController ----------->", error);
        response.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};

export const isBookedCatereOrNot = async (request, response) => {
    try {
        const allCatereData = await customiseThaliModel.find({ catereEmail: request.body.catererEmail });
        for (var i = 0; i < allCatereData.length; i++) {
            if (allCatereData[i].date == request.body.userEventdate) {
                console.log(allCatereData[i].date, "allCatereData[i].date");
                return response.status(201).json({ msg: "This Catere is already booked" });
            }
        }

    } catch (error) {
        console.log("Error while select date to book catere  catere  controller ", error);
        response.status(500).json({ error: 'Internal Server Error', message: error.message });
    };
}

export const adminRequestDataController = async (request, response) => {
    try {
        const caterDataAdminSendForRequest = await catererRegistrationModel.findOne({ catereEmail: request.body.catereEmail });
        response.status(201).json({ caterDataAdminSendForRequest });
        console.log("caterDataAdminSendForRequest ", caterDataAdminSendForRequest);
    } catch (error) {
        console.log("Error while admin send request on  catere  controller ", error);
        response.status(500).json({ error: 'Internal Server Error', message: error.message });
    };
}
export const venueSeeAdminRequestedDataController = async (request, response) => {
    try {
        var result = await venueModel.findOne({ venueEmail: request.body.venueEmail })
        response.status(201).json({ adminVenueRequestData: result })
    } catch (error) {
        console.log("error in decorationSeeAdminRequestedDataController : ", error);
    }
}

export const catereSendRequestToAdminController = async (request, response) => {
    const { diseasPrice: { Price }, userData: { catererEmail, eventdata } } = request.body;
    try {
        var requestThaliEventData = await catererRegistrationModel.findOne({
            catererEmail: catererEmail,
        });

        console.log("requestThaliEventData", requestThaliEventData);

        requestThaliEventData.adminRequest.map((data) => {
            if (data.eventId === eventdata.eventId) {
                data.status = "accept";
                data.addInfo = eventdata.addInfo;
                data.Price = Price;
                return;
            } else {
                console.log("data not going into catereSendRequestToAdminController ")
            }

        })
        await requestThaliEventData.save();
        var catereAcceptData = await catererRegistrationModel.findOne({ catererEmail: catererEmail });
        response.status(201).json({ message: 'Send Request to Admin', catereAcceptData: catereAcceptData })

    } catch (error) {
        console.log("Error in catere Send Request To user Controller ", error);
        response.status(500).json({ error: 'Internal Server Error', message: error.message });
    }


};

export const updateCatererPasswordController = async (request, response) => {
    const { Id, newPasword, confirmPassword, oldPassword } = request.body;
    console.log("request.body", request.body);

    try {
        const data = await catererRegistrationModel.findOne({ _id: Id });

        const userData = await usermodel.findOne({ email: data.catererEmail });
        console.log("-----------------", userData);

        if (!userData) {
            console.log("User not found for the caterer");
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
            console.log("caterer password updated successfully", updateResult);
            response.status(201).json({ message: 'caterer password updated successfully' });
        } else {
            console.log("No changes made to the caterer password");
            response.status(404).json({ error: 'No changes made to the caterer password' });
        }
    } catch (error) {
        console.log("Error while updating caterer password in the controller ", error);
        response.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
}

export const CatererBankDetailsController = async (req, res) => {
    const { Id, Aadharno, Bankname, Branchname, Ifsc, Accountno } = req.body
    console.log("request.Body", req.body);
    try {
        const data = await catererRegistrationModel.findOne({ _id: Id });
        console.log(data);
        const updateResult = await catererRegistrationModel.updateOne({ _id: data._id }, { $set: { AadharNo: Aadharno, BankName: Bankname, BranchName: Branchname, IfscCode: Ifsc, AccountNo: Accountno } });
        if (updateResult) {
            console.log("caterer Bank details successfully", updateResult);
            res.status(201).json({ message: 'caterer Bank details successfully Added' });
        }
    } catch (error) {
        console.error("Error in caterers Bank Details controller: ", error);
        res.status(500).json({ status: false });
    }
}