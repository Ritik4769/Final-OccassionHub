import { request, response } from "express";
import mailer from "./mailer.js";
import usermodel from "../model/usermodel.js";
import jwt from 'jsonwebtoken';
import stripe from 'stripe';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import userBookVenue from "../model/userBookVenue.js";
import venueRegistration from "../model/venueRegistration.js";
import { fileURLToPath } from 'url';
import path from "path";
import quatationmodel from '../model/quatationmodel.js';
import catererRegistrationModel from '../model/catererRegistrationModel.js';

dotenv.config();
const { USER_SECRET_KEY, STRIPE_SECRET_KEY } = process.env;
const stripeInstance = stripe(STRIPE_SECRET_KEY);
const maxAge = 10 * 24 * 60 * 60;
var SECRET_KEY = "thisisusersecretkey";
import passesModel from "../model/passesModel.js";
import customiseThaliModel from "../model/customiseThaliModel.js";
import requestedDjModel from "../model/requestedDjModel.js";
import djRegistrationModel from "../model/djRegistrationModel.js";
import decorationRequestModel from "../model/decorationRequestModel.js";
import decorationRegistrationModel from '../model/decorationRegistrationModel.js'
import eventRequestModel from "../model/eventRequestModel.js";

var CatererData;

export const userotpContoller = async (request, response) => {
    try {

        const { email } = request.body;
        var data = await usermodel.findOne({ email: email });

        if (!data) {

            mailer(email, (status, Rotp) => {

                if (status) {
                    console.log("email send")
                    console.log("otp : " + Rotp);
                    response.status(201).json({ status: true, Rotp: Rotp });
                } else {
                    console.log("Error in user OTP generation : ")
                    response.status(500).json({ status: false });
                }
            });
        } else {
            console.log("email is already exists......!! ")
            response.status(501).json({ status: false });
        }
    } catch (error) {
        console.error("Error in user OTP generation controller: ", error);
        response.status(500).json({ status: false });
    }
}
export const userRegistration = async (request, response) => {
    var payload = {};
    try {
        const { name, email, password, contect, address } = request.body
        const newUser = await usermodel.create({
            email: email,
            name: name,
            password: await bcrypt.hash(password, 10),
            contect: contect,
            address: address,
        });
        payload.user = request.body;
        const expiryTime = {
            expiresIn: '1d'
        }
        const token = jwt.sign(payload, SECRET_KEY, expiryTime);
        response.cookie('user', token, { httpOnly: true, maxAge: 86400 * 1000 });
        response.cookie('userRegistrationData', newUser.email, { maxAge: 86400 * 1000 });

        await newUser.save();
        response.status(201).json({ newUser: newUser, token: token });

    } catch (error) {
        console.error("Error in user registration controller: ", error);
        response.status(500).json({ status: false });
    }
}

export const userLoginController = async (request, response) => {
    const { email, password } = request.body;
    try {
        var userObj = await usermodel.findOne({ email: email });
        console.log("userObj : ", userObj);
        var userPassword = userObj.password;
        if (userObj.userstatus == 'unblock') {
            var status = await bcrypt.compare(password, userPassword);
            console.log("hfkshuefes");
            if (status) {
                var expireTime = { expiresIn: '1d' };
                var token = jwt.sign({ _id: email }, USER_SECRET_KEY, expireTime);

                if (!token)
                    response.status(500).json({ message: "Error while generating token inside user login" });

                response.status(201).json({ email: email, userId: userObj._id, token: token, message: "login sucefully" });
            }
            else {
                console.log("error in bcrypt controller");
                response.status(203).json({ message: "Error In User Login " });
            }
        } else {
            console.log("error in bcrypt controller");
            return response.status(204).json({ message: "Sorry you are not autorized user.........!!" });
        }
    } catch (error) {
        console.log("Error in user login controller : " + error);
        response.status(203).json({ message: "Error while Login" });
    }
}



export const updateUserProfileController = async (request, response) => {
    const { Id, name, contect, address } = request.body;

    try {
        const result = await usermodel.updateOne({ _id: Id }, { $set: { name, contect, address } });
        if (result) {
            console.log("User profile updated successfully");
            response.status(201).json({ message: 'User profile updated successfully' });
        } else {
            console.log("User not found or no changes made");
            response.status(404).json({ error: 'User not found or no changes made' });
        }
    } catch (error) {
        console.log("Error while updating user profile on controller ", error);
        response.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};
export const userCatrerDashboardContoller = async (request, response) => {
    const { email } = request.body;

    try {
        if (email) {
            var role = await usermodel.findOne({ email: email });
            if (role) {
                response.status(201).json(role);
            } else {
                console.log("User not found or no changes made");
                response.status(404).json({ error: 'User not found or no changes made' });
            }
        }
    } catch (error) {
        console.log("error on catrer profile controller ", error);
    }
}

export const userShowUpcomingEventContoller = async (request, response) => {
    try {
        var passes = await passesModel.find();

        response.status(201).json({ passes: passes });
    } catch (error) {
        console.error("Error in user Show upcoming event controller: ", error);
        response.status(500).json({ status: false });
    }
}

export const forgetPassOtpController = async (request, response) => {
    try {
        const { email } = request.body;
        var data = await usermodel.findOne({ email: email });
        if (data) {
            mailer(email, (status, Rotp) => {
                if (status) {
                    console.log("status" + status)
                    console.log("email send")
                    console.log("otp : " + Rotp);
                    response.status(201).json({ status: true, Rotp: Rotp });
                } else {
                    console.log("Error in user OTP generation : ")
                    response.status(500).json({ status: false });
                }
            });
        }
        else {
            console.log("email does not exist......!! ")
            response.status(201).json({ status: false });
        }
    } catch (error) {
        console.error("Error in user OTP generation controller: ", error);
        response.status(500).json({ status: false });
    }
}
export const forgotPasswordController = async (request, response) => {
    try {
        const { forgetemail, resetPass } = request.body;
        var data = await usermodel.updateOne({ email: forgetemail }, {
            $set: {
                password: await bcrypt.hash(resetPass, 10)
            }
        });
        response.status(201).json({ message: "password update successfully", data: data })
    } catch (error) {
        response.status(500).json({ message: "password not update successfully" })
    }
}
export const updateUserPasswordController = async (request, response) => {
    const { Id, newPasword, confirmPassword, oldPassword } = request.body;
    try {
        const data = await usermodel.findOne({ _id: Id });
        var oldpassword1 = data.password;
        var status = await bcrypt.compare(oldPassword, oldpassword1);
        if (status) {
            const result = await usermodel.updateOne({ _id: Id }, { $set: { password: await bcrypt.hash(newPasword, 10) } });
            if (result) {
                console.log("User profile updated successfully");
                response.status(201).json({ message: 'User profile updated successfully' });
            } else {
                console.log("User not found or no changes made");
                response.status(404).json({ error: 'User not found or no changes made' });
            }
        } else {
            console.log("old password does not match");
            response.status(404).json({ error: 'User not found or no changes made' });
        }
    } catch (error) {
        console.log("Error while updating user profile on controller ", error);
        response.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};

export const userShowRequestedDataController = async (request, respose) => {

    const { userEmail } = request.body;

    try {
        var userdata = await usermodel.findOne({ email: userEmail });

        var customiseThaliData = await customiseThaliModel.find({ normaluserid: userdata._id });

    } catch (error) {
        console.log("Error while see caterer requet to  user  controller ", error);
        response.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
}

export const seeRequetedDataController = async (request, response) => {
    console.log("seeRequetedDataController is running ");
    const { userEmail } = request.body;

    try {
        const requestuserData = await requestedDjModel.find({ userEmail: userEmail });
        const result = [];

        for (let i = 0; i < requestuserData.length; i++) {
            const request = requestuserData[i];
            const djDetails = await djRegistrationModel.findOne({ DjEmail: request.djEmail });
            result.push({ ...request.toObject(), djDetails });
        }
        const catereData = await customiseThaliModel.find({ userEmail: userEmail });
        // console.log("catere data in see request --->", catereData);
        // console.log("dj data  data in see request --->", result);

        const decorationRequestData = await decorationRequestModel.find({ userEmail: userEmail });
        // console.log("decorationRequestData : ", decorationRequestData);

        // var decorationData={};

        for (let i = 0; i < decorationRequestData.length; i++) {
            const element = decorationRequestData[i];
            var decorationData = await decorationRegistrationModel.findOne({ email: element.decorationEmail })
            // console.log("Data : ", decorationData);
            // console.log("element : ", element);
        }
        // console.log("decoration Data : ", decorationData);

        response.status(201).json({ djUserData: result, catereData: catereData, decorationRequestData: decorationRequestData, decorationData: decorationData });
    } catch (error) {
        console.log("Error while fetching requested data in controller ", error);
        response.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
}
export const userPaymentForCatereBookController = async (request, response) => {
    console.log("user Payment For CatereBookController ", request.body);
    console.log("user Payment For CatereBookController pathname ", request.body.pathname);
    // console.log("user Payment For CatereBookController price :  ", request.body.CatereData.Price);
    CatererData = request.body.CatereData;
    var price = CatererData.price ? CatererData.price : CatererData.djprice;
    var role;

    if (request.body.CatereData.catereEmail) {
        role = 'Caterer'
    }
    else if (request.body.CatereData.decorationEmail) {
        role = 'Decoration'
    }
    else if (request.body.CatereData.djEmail) {
        role = 'Dj'
    }


    try {
        // const userData = await registration.findOne({ _id: providerData.User_id });
        console.log("Role : ", role);
        const session = await stripeInstance.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'INR',
                    product_data: {
                        name: request.body.CatereData.userEmail,
                    },
                    unit_amount: (price * 100),
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `http://localhost:3000${request.body.pathname}?status=true&role=${role}`,
            cancel_url: `http://localhost:3000${request.body.pathname}?status=false`
        });
        console.log("Session in tryCatch : ", session);
        response.status(201).json({ id: session.id });
    } catch (error) {
        console.error('Error creating Stripe session:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }

    console.log("jhvyhjfhgjyhgjygygjygh");
}

export const userBookCatererController = async (request, response) => {
    try {
        const updateStatus = await customiseThaliModel.updateOne({ _id: CatererData._id }, {
            $set: {
                status: "booked"
            }
        });
        response.status(201).json({ message: `Your Catere Booked Sucessfully on date ${CatererData.date}` });
    } catch (error) {
        console.log("Error while user booked at payment time in user controller ", error);
    }
}

export const bookingDecorationController = async (request, response) => {
    try {
        var result = await decorationRequestModel.updateOne({ _id: CatererData._id }, {
            $set: {
                status: 'booked'
            }
        })
        console.log("result in booking Decoratio Controller : ", result);
        response.status(201).json({ message: 'Decoration Person Booked Successfully..!' });
    } catch (error) {
        console.log("error in booking decoration controller : ", error);
    }
}

export const bookingDjController = async (request, response) => {
    try {
        console.log("Caterer data in bookingDjController : ", CatererData);
        var result = await requestedDjModel.updateOne({ _id: CatererData._id }, {
            $set: {
                status: 'booked'
            }
        })
        console.log("result in booking Dj Controller : ", result);
        response.status(201).json({ message: 'Dj Person Booked Successfully..!' });
    } catch (error) {
        console.log("error in booking dj controller : ", error);
    }
}

export const seeVenueRequestedDataController = async (req, res) => {
    console.log("seeVenueRequetedDataController is running ", req.body);
    const { userEmail } = req.body;
    console.log("user email : ========== >", userEmail)

    try {
        const requestuserData1 = await userBookVenue.find({ userEmail: userEmail });
        const result = []
        console.log("requestuserData1 ===================== ", requestuserData1)
        var rr = await venueRegistration.find({ venueEmail: requestuserData1[0].venueEmail });
        //     var rr = await venueRegistration.find({ VenueEmail: requestuserData1[0].venueEmail });
        console.log("rrrrr : ", rr)
        for (let i = 0; i < requestuserData1.length; i++) {
            const element = requestuserData1[i];
            var venueData = await venueRegistration.findOne({ venueEmail: element.venueEmail });
            console.log("venueData : ", venueData);
            console.log("element : ", element);
            console.log("element.venueEmail : ", element.venueEmail);
            result[i] = venueData;
            // result.push({ ...venueData.toObject(), element });
        }
        console.log("result 0--0-0-0-0-0-0- ", result)
        res.status(201).json({ requestuserData: requestuserData1, result: result });
    } catch (error) {
        console.log("Error while fetching requested data in controller ", error);
        response.status(500).json({ error: 'Internal Server Error', message: error.message });
    }

}

export const uploadImageController = async (request, response) => {
    console.log("request.body ------> ", request.body);
    var __filename = fileURLToPath(import.meta.url);
    var __dirname = path.dirname(__filename).replace("\\controller", "");
    var filename = request.files.img;
    var fileName = new Date().getTime() + filename.name;
    const { userEmail } = request.body;
    var pathName = path.join(__dirname, "/public/assets/images/", fileName);

    filename.mv(pathName, async (error) => {
        if (error) {
            console.log(error);
            response.status(203).json({ message: "Error while uploading document in caterer controller" });
        }
        else {
            try {
                var userData = await usermodel.updateOne({ email: userEmail }, { $set: { img: fileName } })
                console.log("userdata with update profile image :  ", userData);
                response.status(201).json({ message: "image update sucefully...!!" })
            } catch (err) {
                console.error("catch error : ", error);
                response.status(202).json({ message: "image update sucefully...!!" })
            }
        }
    });
}

export const viewQuatationController = async (request, response) => {
    console.log("request.body in viewQuatationController : ", request.params.userId);
    var userID = request.params.userId;
    try {
        var result = await quatationmodel.find({ userId: userID });

        // console.log("Result in viewQuatationController : ", result);

        result.map(async (data, index) => {
            console.log("data._id : ", data.userId);
            var catererData = await catererRegistrationModel.findOne({ _id: data.catererId });
            var venueData = await venueRegistration.findOne({ _id: data.venueId });
            var decorationData = await decorationRegistrationModel.findOne({ _id: data.decorationId });
            var djData = await djRegistrationModel.findOne({ _id: data.djId });

            // console.log("Caterer Data : ", catererData);
            // console.log("venue Data : ", venueData);
            // console.log("decoration Data : ", decorationData);
            // console.log("dj Data : ", djData);


            var totalprice = 0
            // console.log("Total Price before add Caterer price : ", totalprice);
            catererData.adminRequest.map((data1, index) => {
                if (data1.eventId === data.eventId) {
                    totalprice += data1.Price;
                }
            })
            venueData.adminRequest.map((data1, index) => {
                if (data1.eventId === data.eventId) {
                    totalprice += data1.venueprice;
                }
            })
            decorationData.adminRequest.map((data1, index) => {
                if (data1.eventId === data.eventId) {
                    totalprice += data1.Price;
                }
            })
            djData.adminRequest.map((data1, index) => {
                if (data1.eventId === data.eventId) {
                    totalprice += data1.Price;
                }
            })
            // totalprice += decorationData.
            console.log("Total Price after add Caterer and venue price : ", totalprice);
            data.totalPrice = totalprice;
            data.save();
        })
        // setTimeout(() => {
        //     console.log("result afteerrr : " , result);
        // }, 5000);

        response.status(201).json({ quatationData: result, message: "quatation data show successfully...!" });

    } catch (error) {
        console.log("error in viewQuatationController : ", error);
    }
}

export const viewQuatationDataController = async (request, response) => {

    try {

        var quatationdata = request.body.data;
        console.log("quatationData : ", quatationdata);

        var eventdata = await eventRequestModel.findOne({ _id: quatationdata.eventId });
        console.log("eventData : ", eventdata);

        var userdata = await usermodel.findOne({ _id: quatationdata.userId });
        console.log("userData : ", userdata);

        var catererdata = await catererRegistrationModel.findOne({ _id: quatationdata.catererId });
        console.log("catererData : ", catererdata);

        var decorationdata = await decorationRegistrationModel.findOne({ _id: quatationdata.decorationId });
        console.log("decorationData : ", decorationdata);

        var djdata = await djRegistrationModel.findOne({ _id: quatationdata.djId });
        console.log("djData : ", djdata);

        var venuedata = await venueRegistration.findOne({ _id: quatationdata.venueId });
        console.log("venueData : ", venuedata);

        var allData = {
            quatationData: quatationdata,
            eventData: eventdata,
            userData: userdata,
            catererData: catererdata,
            decorationData: decorationdata,
            djData: djdata,
            venueData: venuedata
        };

        console.log("All Data: ", allData);

        response.status(201).json({ allData: allData })
        
    } catch (error) {
        console.log("error in viewQuatationDataController : " , error);
    }
}