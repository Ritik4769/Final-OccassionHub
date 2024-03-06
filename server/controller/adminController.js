import usermodel from "../model/usermodel.js"
import catererRegistrationModel from "../model/catererRegistrationModel.js";
import venueRegistration from "../model/venueRegistration.js";
import decorationRegistrationModel from "../model/decorationRegistrationModel.js";
import djRegistrationModel from "../model/djRegistrationModel.js";
import passesModel from '../model/passesModel.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import customiseThaliModel from "../model/customiseThaliModel.js";
import adminModel from "../model/adminModel.js";
import requestSchema from '../model/eventRequestModel.js'
import requestedDjModel from '../model/requestedDjModel.js';
import admindecorationRequestModel from "../model/admindecorationRequestModel.js";
import adminCatereToRequestModal from "../model/adminCatereToRequestModal.js";
import admindjRequestModel from "../model/admindjRequestModel.js";
import adminRequestToVenue from '../model/adminRequestToVenue.js';
import userBookVenue from '../model/userBookVenue.js';
import decorationRequestModel from '../model/decorationRequestModel.js';
import quatationmodel from "../model/quatationmodel.js";

// import user
dotenv.config();
var secret_key = process.env.ADMIN_SECRET_KEY
export const adminLoginController = async (request, response, next) => {
    const { email, password } = request.body;
    try {
        console.log("admin email : ", email);
        console.log("admin password : ", password);
        var expireTime = { expiresIn: '1d' };
        var token = jwt.sign({ _id: email }, secret_key, expireTime);
        console.log("token", token)
        if (!token)
            response.status(500).json({ message: "Error while generating token inside admin login" });
        var adminObj = await adminModel.findOne({ email: email });
        console.log("adminOBJ : ", adminObj);
        var adminPassword = adminObj.password;
        console.log(adminPassword);
        if (password === adminPassword) {
            response.status(201).json({ adminemail: email, token: token });
            next();
        } else {
            response.status(203).json({ message: "Incorrect password" });
        }
    } catch (err) {
        console.log("Error in admin login controller : " + err);
        response.status(203).json({ message: "Error while Login" });
    }
};
export const adminShowUserController = async (req, res) => {
    try {
        var data = await usermodel.find();
        console.log("data : ", data);
        res.status(201).json({ userdata: data });
    } catch (error) {
        console.error("Error in admin Show user data controller: ", error);
        res.status(500).json({ status: false });
    }
}

export const adminShowCatererDataController = async (req, res) => {
    try {
        var data = await catererRegistrationModel.find();
        console.log("data : ", data);
        res.status(201).json({ caterersData: data });
    } catch (error) {
        console.error("Error in admin Show caterer data controller: ", error);
        res.status(500).json({ status: false });
    }
}

export const adminShowDjController = async (req, res) => {
    try {
        var djData = await djRegistrationModel.find();
        console.log("djData : ", djData);
        res.status(201).json({ djUserData: djData });
    } catch (error) {
        console.error("Error in admin Show caterer data controller: ", error);
        res.status(500).json({ status: false });
    }
}

export const adminshowVeneueController = async (req, res) => {
    try {
        var veneueData = await venueRegistration.find();
        res.status(201).json({ veneueData: veneueData });
    } catch (error) {
        console.error("Error in admin Show venue data controller: ", error);
        res.status(500).json({ status: false });
    }
}

export const adminShowDecorationController = async (req, res) => {
    try {
        var decorationData = await decorationRegistrationModel.find();
        res.status(201).json({ decorationData: decorationData });
    } catch (error) {
        console.error("Error in admin Show decoration data controller : ", error);
        res.status(500).json({ status: false });
    }
}
export const adminshowPassesDataController = async (req, res) => {
    try {
        var passes = await passesModel.find();

        res.status(201).json({ passes: passes });
    } catch (error) {
        console.error("Error in admin Show passes data controller: ", error);
        res.status(500).json({ status: false });
    }
}
export const adminShowEventController = async (req, res) => {
    try {
        var event = await requestSchema.find();
        console.log("Event Data", event);
        res.status(201).json({ event: event });
    }
    catch (error) {
        console.log("error in admin show event controller: ", error);
        res.status(500).json({ status: false });
    }
}

export const adminshowRequestedUserCatererDataController = async (request, response) => {
    try {
        var catererdata = await customiseThaliModel.find();
        console.log("data in adminshowRequestedUserCatererDataController : ", catererdata);
        const userData = [];
        for (let i = 0; i < catererdata.length; i++) {
            const requestItem = catererdata[i];
            const caterer = await catererRegistrationModel.findOne({ catererEmail: requestItem.catereEmail });
            const user = await usermodel.findOne({ email: requestItem.userEmail });
            userData.push({ ...requestItem.toObject(), user, caterer });
        }
        console.log("userData in see RequetCatarer To User Controller ", userData);
        response.status(201).json({ AllRequtedUserData: userData });
    } catch (error) {
        console.log("error in admin show Requested User CatarerData Controller: ", error);
        response.status(500).json({ status: false });
    }
}

export const adminshowRequestedUserDjDataController = async (request, response) => {
    try {
        var DjData = await requestedDjModel.find();
        console.log("DjData ---------->", DjData);

        const userData = [];
        for (let i = 0; i < DjData.length; i++) {
            const requestItem = DjData[i];
            const dj = await djRegistrationModel.findOne({ DjEmail: requestItem.djEmail });
            const user = await usermodel.findOne({ email: requestItem.userEmail });
            userData.push({ ...requestItem.toObject(), user, dj });
        }

        // console.log("userData in see RequetDj To User Controller ", userData);
        response.status(201).json({ AllRequtedUserData: userData });

    } catch (error) {
        console.log("error in admin show Requested User DjData Controller: ", error);
        response.status(500).json({ status: false });
    }
}

export const seedecorationdatatoadminController = async (request, response) => {
    console.log("in seedecorationdatatoadminController");

    try {
        // var alldecorationData = await decorationRegistrationModel.find();
        // var alldecorationRequestData = await admindecorationRequestModel.find();



        // var userData = [];
        // for (let i = 0; i < alldecorationData.length; i++) {
        //     const decorationEmail = alldecorationData[i].DecorationEmail;
        //     const user = await usermodel.findOne({ email: decorationEmail });
        //     if (user) {
        //         userData.push(user);
        //     }
        // }




        // console.log("userData : ", userData);
        // console.log("alldecorationData : ", alldecorationData);

        // var mergedArray = [];
        // for (var i = 0; i < alldecorationData.length; i++) {
        //     if (alldecorationData[i].DecorationEmail == userData[i].email) {
        //         var allData = {
        //             DecorationEmail: alldecorationData[i].DecorationEmail,
        //             Businessname: alldecorationData[i].Businessname,
        //             Decorationtype: alldecorationData[i].Decorationtype,
        //             Decorationprice: alldecorationData[i].Decorationprice,
        //             docs: alldecorationData[i].docs,
        //             DecorationName: userData[i].name,
        //             DecorationContact: userData[i].contect,
        //             DecorationAddress: userData[i].address,
        //         }
        //         mergedArray.push(allData)
        //     }
        // }
        // console.log("mergedArray ---> : ", mergedArray);



        // var mergedData = await decorationRegistrationModel.aggregate([
        //     {
        //         $lookup: {
        //             from: "user", // Name of the userModel collection
        //             localField: "DecorationEmail", // Field in decorationRegistrationModel
        //             foreignField: "email", // Field in userModel
        //             as: "userDetails"// Alias for the merged user data
        //         }
        //     },
        //     {
        //         $unwind: {
        //             path: "$userDetails", // Unwind the array created by lookup
        //             preserveNullAndEmptyArrays: true // Preserve data even if there's no matching user
        //         }
        //     },
        //     {
        //         $project: {
        //             // Project the fields you want from both collections
        //             "_id": 1, // Include decorationRegistrationModel _id
        //             "DecorationEmail": 1, // Include DecorationEmail
        //             "otherDecorationFields": 1, // Include other fields from decorationRegistrationModel
        //             "userDetails._id": 1, // Include user _id
        //             "userDetails.email": 1, // Include user email
        //             "userDetails.otherUserFields": 1,// Include other fields from usermodel
        //             "contect": "$userDetails.contect", // Include contect field from userModel
        //             "name": "$userDetails.name", // Include name field from userModel
        //             "address": "$userDetails.address",
        //         }
        //     }
        // ]);



        var mergedData = await decorationRegistrationModel.aggregate([
            {
                $lookup: {
                    from: "user", // Name of the userModel collection
                    localField: "DecorationEmail", // Field in decorationRegistrationModel
                    foreignField: "email", // Field in userModel
                    as: "userDetails" // Alias for the merged user data
                }
            },
            {
                $unwind: {
                    path: "$userDetails", // Unwind the array created by lookup
                    preserveNullAndEmptyArrays: true // Preserve data even if there's no matching user
                }
            },
            {
                $project: {
                    // Project the fields you want from both collections
                    "_id": 1, // Include decorationRegistrationModel _id
                    "DecorationEmail": 1, // Include DecorationEmail
                    "Businessname": 1, // Include Businessname from decorationSchema
                    "Decorationtype": 1, // Include Decorationtype from decorationSchema
                    "Decorationprice": 1, // Include Decorationprice from decorationSchema
                    "ServiceType": 1, // Include ServiceType from decorationSchema
                    "docs": 1, // Include docs from decorationSchema
                    "adminRequest": 1, // Include adminRequest from decorationSchema
                    "userDetails._id": 1, // Include user _id
                    "userDetails.email": 1, // Include user email
                    "userDetails.otherUserFields": 1, // Include other fields from userModel
                    "contect": "$userDetails.contect", // Include contect field from userModel
                    "name": "$userDetails.name", // Include name field from userModel
                    "address": "$userDetails.address", // Include address field from userModel
                }
            }
        ]);


        // Now mergedData will contain the merged data with userDetails field embedded
        console.log("====================================== ", mergedData);




        response.status(201).json({ alldecorationData: mergedData });
    } catch (error) {
        console.log("Error in seedecorationdatatoadminController : ", error);
    }
}

export const seedjdatatoadminController = async (request, response) => {
    console.log("In seedjdatatoadminController : ");

    try {
        // var alldjdata = await djRegistrationModel.find();
        // var alldjRequestdata = await admindjRequestModel.find();
        // // console.log("alldjdata : " , alldjdata);
        // var userData = [];
        // for (let i = 0; i < alldjdata.length; i++) {
        //     const DjEmail = alldjdata[i].DjEmail;
        //     const user = await usermodel.findOne({ email: DjEmail });
        //     // console.log("userData : ", user);
        //     if (user) {
        //         userData.push(user);
        //     }
        // }

        // console.log("userData : ", userData);
        // console.log("alldjdata : ", alldjdata);

        // var mergedArray = [];

        // for (var i = 0; i < alldjdata.length; i++) {
        //     if (alldjdata[i].DjEmail === userData[i].email) {
        //         var allData = {
        //             DjEmail: alldjdata[i].DjEmail,
        //             Businessname: alldjdata[i].Businessname,
        //             EquipmentType: alldjdata[i].EquipmentType,
        //             Djprice: alldjdata[i].Djprice,
        //             docs: alldjdata[i].docs,
        //             DjName: userData[i].name,
        //             DjContact: userData[i].contect,
        //             DjAddress: userData[i].address,
        //         }
        //         mergedArray.push(allData)
        //     }
        // }



        var mergedData = await djRegistrationModel.aggregate([
            {
                $lookup: {
                    from: "user", // Name of the userModel collection
                    localField: "DjEmail", // Field in decorationRegistrationModel
                    foreignField: "email", // Field in userModel
                    as: "userDetails" // Alias for the merged user data
                }
            },
            {
                $unwind: {
                    path: "$userDetails", // Unwind the array created by lookup
                    preserveNullAndEmptyArrays: true // Preserve data even if there's no matching user
                }
            },
            {
                $project: {
                    // Project the fields you want from both collections
                    "_id": 1, // Include decorationRegistrationModel _id
                    "DjEmail": 1, // Include DecorationEmail
                    "Businessname": 1, // Include Businessname from decorationSchema
                    "EquipmentType": 1, // Include Decorationtype from decorationSchema
                    "Djprice": 1, // Include Decorationprice from decorationSchema
                    "ServiceType": 1, // Include ServiceType from decorationSchema
                    "docs": 1, // Include docs from decorationSchema
                    "adminRequest": 1, // Include adminRequest from decorationSchema
                    "userDetails._id": 1, // Include user _id
                    "userDetails.email": 1, // Include user email
                    "userDetails.otherUserFields": 1, // Include other fields from userModel
                    "contect": "$userDetails.contect", // Include contect field from userModel
                    "name": "$userDetails.name", // Include name field from userModel
                    "address": "$userDetails.address", // Include address field from userModel
                }
            }
        ]);

        // Now mergedData will contain the merged data with userDetails field embedded
        console.log("====================================== ", mergedData);

        // var result = await djRegistrationModel.find();
        // console.log("result ===========> : ", result);
        // var mergedData = await djRegistrationModel.aggregate([
        //     {
        //         $lookup: {
        //             from: "user", // Name of the userModel collection
        //             localField: "DjEmail", // Field in djRegistrationModel
        //             foreignField: "email", // Field in userModel
        //             as: "userDetails" // Alias for the merged user data
        //         }
        //     },
        //     {
        //         $unwind: {
        //             path: "$userDetails", // Unwind the array created by lookup
        //             preserveNullAndEmptyArrays: true // Preserve data even if there's no matching user
        //         }
        //     },
        //     {
        //         $project: {
        //             "_id": 1,
        //             "DjEmail": 1,
        //             "Businessname": 1,
        //             "EquipmentType": 1,
        //             "Djprice": 1,
        //             "ServiceType": 1,
        //             "docs": 1,
        //             "adminRequest": 1, // Include adminRequest from djRegistrationModel
        //             "userDetails._id": 1,
        //             "userDetails.email": 1,
        //             "userDetails.otherUserFields": 1,
        //             "contect": "$userDetails.contect",
        //             "name": "$userDetails.name",
        //             "address": "$userDetails.address",
        //         }
        //     }
        // ]);

        // // Now mergedData will contain the merged data with userDetails field embedded
        // console.log("====================================== ", mergedData);

        response.status(201).json({ alldjdata: mergedData });
    } catch (error) {
        console.log("Error in seedecorationdatatoadminController : ", error);
    }
}

export const seedecorationRequestdatatoadminController = async (request, responses) => {
    console.log("in seedecorationdatatoadminController");
    try {
        var alldecorationrequestData = await admindecorationRequestModel.find();
        console.log("alldecorationData : ", alldecorationrequestData);
        responses.status(201).json({ alldecorationrequestData: alldecorationrequestData });
    } catch (error) {
        console.log("Error in seedecorationdatatoadminController : ", error);
    }
}
export const sendRequesttoDecorationController = async (request, response) => {
    console.log("Request.body in sendRequesttoDecorationController : ", request.body);
    // const { userEmail, decorationEmail, location, startedate, enddate, _id } = request.body.data;
    // const decorationRequestobj = {
    //     eventId: _id,
    //     userEmail: userEmail,
    //     decorationEmail: decorationEmail,
    //     adminEmail: adminEmail,
    //     eventlocation: location,
    //     eventstartdate: startedate,
    //     eventenddate: enddate,
    // }
    // console.log("decorationRequestobj : ", decorationRequestobj);





    try {
        // var admindecorationrequestData = await admindecorationRequestModel.create(decorationRequestobj);
        // console.log("result in sendRequesttoDecorationController : ", admindecorationrequestData);
        // response.status(201).json({ message: 'decoration request send successfully...!', admindecorationrequestData })

        var result = await decorationRegistrationModel.findOne({ DecorationEmail: request.body.DecorationEmail });
        console.log("Result in fhfhgfvgh : ", result);
        result.adminRequest.push({
            eventId: request.body.eventId,
            Price: request.body.Decorationprice,
            status: 'pending'
        });
        result.save();
        response.status(201).json({ message: 'Decoration Send Successfully..!', data: result });
    } catch (error) {
        console.log("error in sendRequesttoDecorationController : ", error);
    }
}

export const sendRequesttoDjController = async (request, response) => {
    console.log("In sendRequesttoDjController : " , request.body);
    // const { userEmail, djEmail, location, startedate, enddate, adminEmail } = request.body.eventdata;
    // try {
    //     var admindjrequestData = await admindjRequestModel.create(djRequestobj);
    //     console.log("result in sendRequesttoDecorationController : ", admindjrequestData);
    //     response.status(201).json({ message: 'decoration request send successfully...!', admindjrequestData })
    // } catch (error) {
    //     console.log("error in sendRequesttoDecorationController : ", error);
    // }
    var result = await djRegistrationModel.findOne({ DjEmail: request.body.DjEmail });
        console.log("Result in fhfhgfvgh : ", result);
        result.adminRequest.push({
            eventId: request.body.eventId,
            Price: request.body.Djprice,
            status: 'pending'
        });
        result.save();
        // console.log("result after add field in : " , result);
        response.status(201).json({ message: 'Decoration Send Successfully..!', data: result });

}

export const seeCatereDataToController = async (request, responses) => {
    try {
        var allCatereData = await catererRegistrationModel.find();
        var userData = await usermodel.findOne({ email: request.body.userEmail });
        responses.status(201).json({ allCatereData: allCatereData, userData: userData });
    } catch (error) {
        console.log("Error in seeCatereDataToController : ", error);
    }
}

export const sendRequestToCatereController = async (request, response) => {
    console.log("Request.body in sendRequestToCatereController : ", request.body);
    const { _id,userEmail, catererEmail, location, startedate, enddate, adminEmail, addInfo} = request.body.eventdata;
    const { Roti, Sabji, Starter, Dessert } = request.body.eventdata.customiseThali[0];

    var catereRequestobj = await catererRegistrationModel.findOne({catererEmail:catererEmail});
    catereRequestobj.adminRequest.push({
        eventId: _id,
        userEmail: userEmail,
        adminEmail: adminEmail,
        eventlocation: location,
        eventstartdate: startedate,
        eventenddate: enddate,
        customiseThali: {
            Roti: Roti,
            Sabji: Sabji,
            Starter: Starter,
            Dessert: Dessert,
        },
        addInfo:addInfo
    });

    catereRequestobj.save();
    console.log("catereRequestobj : ", catereRequestobj);
    try {
        // var adminVenuerequestData = await adminRequestToVenue.create(venueRequestobj);
        // var venueRequest = await adminRequestToVenue.find();
        var data = await catererRegistrationModel.findOne({catererEmail:catererEmail});
        console.log("result in data 999999999 : ", data);
        response.status(201).json({ message: 'Catere request send successfully...!', data: data })
    } catch (error) {
        console.log("error in sendRequesttoCatereController : ", error);
    }
}


export const adminBlockUserController = async (req, res) => {
    try {
        console.log("email in blockController : ", req.body.email);
        var data = await usermodel.findOne({ email: req.body.email });
        console.log("data : ", data);
        console.log("data name : ", data.name);

        console.log("userstatus : ", data.userstatus);
        if (data.userstatus == "unblock") {
            await usermodel.updateOne({ email: req.body.email }, { $set: { userstatus: "block" } });
            var status = 'block';
        } else {
            await usermodel.updateOne({ email: req.body.email }, { $set: { userstatus: "unblock" } });
            var status = 'unblock';
        }
        var updatedData = await usermodel.find();
        var updatedDataStatus = await usermodel.find({ email: req.body.email });
        res.status(201).json({ userdata: updatedData, massage: status });
    } catch (error) {
        console.log("error in admin Block user Controller: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const sendRequesttoVenueController = async (request, response) => {
    console.log("request, response === :", request.body)
    const { _id, userEmail, venueEmail, startedate, enddate, adminEmail, addtionalinfo, addInfo } = request.body.eventdata;
    var venueobj = await venueRegistration.findOne({ venueEmail: venueEmail })
    console.log("venue obj : ", venueobj);
    venueobj.adminRequest.push({

        eventId: _id,
        userEmail: userEmail,
        adminEmail: adminEmail,
        eventstartdate: startedate,
        eventenddate: enddate,
        addInfo: addInfo,
        status: "pending"

    })
    venueobj.save();

    try {
        // var adminVenuerequestData = await adminRequestToVenue.create(venueRequestobj);
        var venueRequest = await adminRequestToVenue.find();
        var data = await venueRegistration.findOne({
            venueEmail: venueEmail
        })
        console.log("result in data 999999999 : ", data);
        response.status(201).json({ message: 'Venue request send successfully...!', data: data })
    } catch (error) {
        console.log("error in sendRequesttoDecorationController : ", error);
    }
}


export const sendquatationController = async (request, response) => {
    console.log("Request.body in sendquatationController : ", request.body);
    try {
        var result = await quatationmodel.create({
            userId : request.body.userId,
            eventId : request.body.eventId,
            eventName : request.body.eventName,
            catererId : request.body.catererId,
            decorationId : request.body.decorationId,
            venueId : request.body.venueId,
            djId :  request.body.djId
        })
        console.log("result in sendquatationControiller : " , result);
    } catch (error) {
        console.log("error in send quatation form : " , error);
    }

}

export const adminviewRequestedUserVenueDataController = async (request, response) => {
    try {
        var venueData = await userBookVenue.find();
        console.log("venueData ---------->", venueData);

        const userData = [];
        for (let i = 0; i < venueData.length; i++) {
            const requestItem = venueData[i];
            const venue = await venueRegistration.findOne({ venueEmail: requestItem.venueEmail });
            const user = await usermodel.findOne({ email: requestItem.userEmail });
            userData.push({ ...requestItem.toObject(), user, venue });
        }

        console.log("userData in see Requetvenue To User Controller ", userData);
        response.status(201).json({ AllRequtedUserData: userData });

    } catch (error) {
        console.log("error in admin show Requested User DjData Controller: ", error);
        response.status(500).json({ status: false });
    }
}

export const adminshowRequestedUserDecorationDataController = async (request, response) => {
    try {
        var decorationData = await decorationRequestModel.find();
        console.log("venueData ---------->", decorationData);

        const userData = [];
        for (let i = 0; i < decorationData.length; i++) {
            const requestItem = decorationData[i];
            const decoration = await decorationRegistrationModel.findOne({ DecorationEmail: requestItem.decorationEmail });
            const user = await usermodel.findOne({ email: requestItem.userEmail });
            userData.push({ ...requestItem.toObject(), user, decoration });
        }

        console.log("userData in see Requet Decoration To User Controller ", userData);
        response.status(201).json({ AllRequtedUserData: userData });
    } catch (error) {
        console.log("error in admin show Requested User Decoration Data Controller: ", error);
        response.status(500).json({ status: false });
    }
}

