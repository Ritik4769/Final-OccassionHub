import { fileURLToPath } from 'url';
import path from 'path';
import venueModel from '../model/venueRegistration.js'
import userBookVenue from '../model/userBookVenue.js';
import usermodel from "../model/usermodel.js";
import bcrypt from 'bcrypt';

export const venueRegistration = async (request, response) => {
    var __filename = fileURLToPath(import.meta.url);
    var __dirname = path.dirname(__filename).replace("\\controller", "");
    const { VenueName, venueLocation, venuePrice, VenueType, venueEmail, capacity, minMembers, bookingAmount, numRooms, roomCharge, policy } = request.body;
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
                const newUser = await venueModel.create({
                    venueEmail: venueEmail,
                    VenueName: VenueName,
                    venueLocation: venueLocation,
                    VenueType: VenueType,
                    venuePrice: venuePrice,
                    docs: fileName,
                    capacity: capacity,
                    minMembers: minMembers,
                    bookingAmount: bookingAmount,
                    numRooms: numRooms,
                    roomCharge: roomCharge,
                    policy: policy
                });
                const role = await usermodel.updateOne({ email: venueEmail }, [
                    {
                        $set: {
                            role: "venue"
                        }
                    }
                ])
                await newUser.save();
                response.status(201).json({ newUser: "newUser" });
            } catch (err) {
                console.error("Error in venue registration controller: ", err);
                response.status(500).json({ status: false });
            }
        }
    });
}

export const searchVenuController = async (request, response) => {
    try {
        const venuDetails = await venueModel.find();
        response.status(201).json({ venuDetails });
    } catch (error) {
        console.error("Error in  Venu Details search: ", error);
        response.status(500).json({ error: "Error in  Venu search" });
    }
}

export const venueBookUserController = async (request, response) => {
    const { date, numRooms, functionTime, userEmail, venueEmail, functionType, AdditionalInfo } = request.body;
    try {
        var requestedVenuedata = userBookVenue.create({
            userEmail: userEmail,
            venueEmail: venueEmail,
            date: date,
            functionTime: functionTime,
            numRooms: numRooms,
            functionType: functionType,
            AdditionalInfo: AdditionalInfo
        });
        console.log("data : ", requestedVenuedata);
        response.status(201).json({ msg: "Request Sent Successfully" });
    } catch (error) {
        console.error("Error in dj Book Controller: ", error);
        response.status(500).json({ error: "Error in dj Book Controller" });
    }
}

export const venueSeeRequestedDataController = async (request, response) => {

    try {
        const { venueEmail } = request.body;
        const venueRegistrationInfo = await venueModel.findOne({ venueEmail: venueEmail });
        const userData = await usermodel.findOne({ email: venueEmail });

        var allUserRequestedDataForCateres = await userBookVenue.find({ venueEmail: venueEmail });
        const userName = [];
        for (let i = 0; i < allUserRequestedDataForCateres.length; i++) {
            const userEmail = allUserRequestedDataForCateres[i].userEmail;
            const name = (await usermodel.findOne({ email: userEmail })).name;
            console.log("user email ===-=-- ", userEmail)
            console.log("user naME ===-=-- ", name)
            userName.push(name);
        }
        response.status(201).json({
            userData,
            venueRegistrationInfo,
            allUserRequestedDataForCateres,
            userName

        });
    } catch (error) {
        console.log("Error in catere See Requested Data Controller", error);
        response.status(500).json({ status: false });
    }
}

export const venueSendRequestTouserController = async (request, response) => {
    const { venuePrice } = request.body;
    try {

        var result = await userBookVenue.findOne(
            { _id: venuePrice.requestId },
        );
        result.status = "Send";
        result.calculateAmount.push({
            roomCharge: venuePrice.roomCharge,
            otherCharge: venuePrice.otherPrice,
            explaination: venuePrice.explaination,
            totalAmount: (parseInt(venuePrice.roomCharge) + parseInt(venuePrice.otherPrice)),
        })

        await result.save()
        var alRequest = await userBookVenue.find();
        response.status(201).json({ message: 'send request to user', requestData: alRequest });
    } catch (error) {
        console.log("Error in venueSendRequestTouserController ----------->", error);
        response.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};
export const getRequestData = async (request, response) => {

    try {
        var result = await userBookVenue.find();
        response.status(201).json({ message: 'send request to user', requestData: result });
    } catch (error) {
        console.log("Error in getRequestData ----------->", error);
        response.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};
export const updateVenueProfileController = async (request, response) => {
    console.log("updateVenueProfileController  ==== === === === == == ", request.body);
    const { Id, name, contect, address, VenueName, email, venueLocation, venuePrice, VenueType, venueEmail, capacity, minMembers, bookingAmount, numRooms, roomCharge, policy } = request.body;

    try {
        const updatedVenuData = await venueModel.updateOne({ _id: Id },
            {
                $set: {
                    VenueName,
                    venueLocation,
                    venuePrice, VenueType,
                    capacity, minMembers, bookingAmount,
                    numRooms, roomCharge, policy
                }
            });
        // const userData = await userRegistration.findOne({ email: email });
        console.log("cateData   - - - - - ", updatedVenuData)
        const updatedUserData = await usermodel.updateOne({ email: email }, { $set: { name, contect, address } });

        if (updatedVenuData && updatedUserData) {
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

export const venueSeeAdminRequestedDataController = async (request, response) => {
    try {
        var result = await venueModel.findOne({ venueEmail: request.body.venueEmail })
        response.status(201).json({ adminVenueRequestData: result })
    } catch (error) {
        console.log("error in decorationSeeAdminRequestedDataController : ", error);
    }
}

export const venueSendRequestToAdminController = async (request, response) => {
    const { venuePrice } = request.body;
    try {

        var result = await venueModel.findOne(
            { venueEmail: venuePrice.venueEmail },
        );

        result.adminRequest.map((data) => {
            console.log("data = = = = = = = ", data);
            // console.log("eventdata._id = = = = = = = ", eventdata._id);
            if (data.eventId === venuePrice.eventId) {
                data.status = "accpect";
                data.venueprice = venuePrice.venuePrice;
                data.explaination = venuePrice.explaination;
                return;
            } else {
                console.log("in else  ===== ")
            }

        })

        await result.save()
        var alRequest = await venueModel.findOne({ venueEmail: venuePrice.venueEmail });
        response.status(201).json({ message: 'send request to user', requestData: alRequest });
    } catch (error) {
        console.log("Error in venueSendRequestTouserController ----------->", error);
        response.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
}


export const updateVenuePasswordController = async (request, response) => {
    const { Id, newPasword, confirmPassword, oldPassword } = request.body;
    console.log("request.body", request.body);

    try {
        const data = await venueModel.findOne({ _id: Id });

        const userData = await usermodel.findOne({ email: data.venueEmail });

        if (!userData) {
            console.log("User not found for the venue");
            response.status(404).json({ error: 'User not found for the venue' });
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
            console.log("venue password updated successfully", updateResult);
            response.status(201).json({ message: 'venue password updated successfully' });
        } else {
            console.log("No changes made to the venue password");
            response.status(404).json({ error: 'No changes made to the venue password' });
        }
    } catch (error) {
        console.log("Error while updating venue password in the controller ", error);
        response.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};

export const VenueBankDetailController = async (req, res) => {
    const { Id, Aadharno, Bankname, Branchname, Ifsc, Accountno } = req.body
    console.log("request.Body", req.body);
    try {
        const data = await venueModel.findOne({ _id: Id });
        console.log(data);
        const updateResult = await venueModel.updateOne({ _id: data._id }, { $set: { AadharNo: Aadharno, BankName: Bankname, BranchName: Branchname, IfscCode: Ifsc, AccountNo: Accountno } });
        if (updateResult) {
            console.log("caterer Bank details successfully", updateResult);
            res.status(201).json({ message: 'caterer Bank details successfully Added' });
        }
    } catch (error) {
        console.error("Error in caterers Bank Details controller: ", error);
        res.status(500).json({ status: false });
    }
}