import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import jscookie from 'js-cookie'
import { admin_requestedUrl } from "../urls.js";
const initialState = {

}
const adminSlice = createSlice({
    name: 'adminSlice',
    initialState,
    reducers: {

    }
});
export const adminLogin = async (adminCredential) => {
    try {
        console.log(adminCredential);
        var result = await axios.post(admin_requestedUrl + '/adminLogin', adminCredential);
        console.log("adminSlice : ", result);
        console.log("token : ", result.data.token);
        if (result.status == 201)
            jscookie.set("admin_email", adminCredential.email);

        jscookie.set('admin_jwt_token', result.data.token, { expires: 1 });
        return result;
    } catch (err) {
        console.log("error in adminSlice : ", err);
    }
}
export const adminShowUserData = async () => {
    alert("adminshowUser Slice calll")
    try {
        var res = await axios.post(admin_requestedUrl + "/userData");
        console.log("user data in slice : ", res.data.userdata);
        return res.data.userdata;
    } catch (error) {
        console.log("error in admin show user data slice ");
    }
}

export const adminShowCatererData = async () => {
    try {
        var caterersDataRes = await axios.post(admin_requestedUrl + "/catererData");
        console.log("caterers Data in slice : ", caterersDataRes.data.caterersData);
        return caterersDataRes.data.caterersData;
    } catch (error) {
        console.log("error in admin show caterers Data slice ");
    }
}

export const adminShowDjData = async () => {
    try {
        var djDataRes = await axios.post(admin_requestedUrl + "/djData");
        console.log("DJ Data in slice : ", djDataRes.data.djUserData);
        return djDataRes.data.djUserData;
    } catch (error) {
        console.log("error in admin show Dj Data slice ");
    }
}

export const adminShowVenueData = async () => {
    try {
        var veneueDataRes = await axios.post(admin_requestedUrl + "/veneueData");
        // console.log("DJ Data in slice : ", veneueDataRes.data.veneueData);
        return veneueDataRes.data;
    } catch (error) {
        console.log("error in admin show venue Data slice ");
    }
}

export const adminShowDecorationData = async () => {
    try {
        var decorationDataRes = await axios.post(admin_requestedUrl + "/decorationData");
        console.log("decoration Data in slice : ", decorationDataRes.data.decorationData);
        return decorationDataRes.data.decorationData;
    } catch (error) {
        console.log("error in admin show decoration Data slice ");
    }
}
export const adminShowPassDetails = async () => {
    try {
        var passesDataRes = await axios.post(admin_requestedUrl + "/passesData");
        console.log("passes data in slice ----------->", passesDataRes.data.passes);
        return passesDataRes.data.passes;
    } catch (error) {
        console.log("error in admin show pass Data slice ");
    }
}
export const adminShowEventDetails = async () => {
    try {
        var eventresponse = await axios.post(admin_requestedUrl + "/eventData");
        console.log("Event Data ", eventresponse);
        return eventresponse.data.event;
    }
    catch (error) {
        console.log("Error in Event Data", error);
    }
}

export const adminShowUserrequestedCatererData = async () => {
    try {
        var response = await axios.post(admin_requestedUrl + "/adminshowRequestedUserCatererData");
        console.log(response + "-----------------> response : ", response);
        console.log("response : ", response.data.AllRequtedUserData);
        return response.data.AllRequtedUserData;
    } catch (error) {
        console.log("error in admin show dj Data slice requsted");
    }
}

export const adminShowUserrequestedDjData = async (request, respose) => {
    try {
        var response = await axios.post(admin_requestedUrl + "/adminshowRequestedUserDjData");
        console.log("response : ", response);
        console.log("response : ", response.data.AllRequtedUserData);
        return response.data.AllRequtedUserData;
    } catch (error) {
        console.log("error in admin show dj Data slice requsted");
    }
}
export const adminShowUserrequestedVenueData = async (request, response) => {
    try {
        var response = await axios.post(admin_requestedUrl + "/adminshowRequestedUserVenueData");
        console.log("response : ", response);
        console.log("response : ", response.data.AllRequtedUserData);
        return response.data.AllRequtedUserData;
    } catch (error) {
        console.log("error in admin show venue Data slice requsted");
    }
}

export const adminShowUserrequestedDecorationData = async (request, response) => {
    try {
        var response = await axios.post(admin_requestedUrl + "/adminshowRequestedUserDecorationData");
        console.log("response : ", response);
        console.log("response : ", response.data.AllRequtedUserData);
        return response.data.AllRequtedUserData;
    } catch (error) {
        console.log("error in admin show decoration Data slice requsted");
    }
}



export default adminSlice.reducer;