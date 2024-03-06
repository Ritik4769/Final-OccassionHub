import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { user_requestedUrl } from "../urls.js";
import jscookiee from 'js-cookie';

const initialState = {
    isNavbar: 'home'
}

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setNavbar: (state, payload) => {
            console.log(payload.nav);
            state.isNavbar = "profile"
        }
    }
});

// export const adduser = async (userData) => {
//     try {
//         console.log("adduser slice call....!!");
//         console.log("userData in adduserSlice  : ", userData);
//         console.log("userData in adduserSlice  : ", userData.email);
//         var result = await axios.post(user_requestedUrl + "/genrateOtp", { email: userData.email });
//         console.log("result : ", result);
//         return result;
//     } catch (error) {
//         console.log("erro in opt send", error);
//     }
// }
export const adduser = async (userData) => {
    var result = "";
    try {
        console.log("adduser slice call....!!");
        console.log("userData in adduserSlice  : ", userData);
        console.log("userData in adduserSlice  : ", userData.email);
        result = await axios.post(user_requestedUrl + "/genrateOtp", { email: userData.email });
        console.log("result : ", result);
        return result;
    } catch (error) {
        console.log("erro in opt send", error);
        return result;
    }
}


// export const RegisterUserData = async (userDataForRegistation) => {
//     try {
//         console.log("userData : ", userDataForRegistation);
//         var registaion = await axios.post(user_requestedUrl + "/register", userDataForRegistation);
//         console.log("registration data : ", registaion);
//         console.log("registration data2 : ", registaion.data.newUser.email);
//         jscookiee.set("user", registaion.data.newUser.email, { expires: 7 });
//         console.log("Cookie set ");

//         // var result = await axios.post(user_requestedUrl+"/genrateOtp", {email : userData.email});
//         // console.log("result : ",result);
//         return registaion;
//     } catch (error) {
//         console.log("erro in registation user ");
//     }
// }

export const RegisterUserData = async (userDataForRegistation) => {
    try {
        console.log("userData : ", userDataForRegistation);
        var registaion = await axios.post(user_requestedUrl + "/register", userDataForRegistation);
        console.log("registration data : ", registaion);
        console.log("registration data2 : ", registaion.data.newUser.email);
        jscookiee.set("user", registaion.data.newUser.email, { expires: 7 });
        console.log("Cookie set ");
        return registaion;
    } catch (error) {
        console.log("erro in registation user ");
    }
}


// export const userLogin = async (userDataLogin) => {
//     try {
//         console.log("userDataLogin : ", userDataLogin);
//         var result = await axios.post(user_requestedUrl + '/userLogin', userDataLogin);
//         console.log("userloginSlice : ", result);
//         jscookiee.set('userToken', result.data.token, { expires: 1 });
//         jscookiee.set("user", result.data.email, { expires: 1 })

//         return result;

//     } catch (error) {
//         console.log("error in userLoginSlice : ", error);
//     }
// }

export const userLogin = async (userDataLogin) => {
    try {
        console.log("userDataLogin : ", userDataLogin);
        var result = await axios.post(user_requestedUrl + '/userLogin', userDataLogin);
        if (result.status == 201) {
            console.log("userloginSlice : ", result);
            jscookiee.set('userToken', result.data.token, { expires: 1 });
            jscookiee.set("user", result.data.email, { expires: 1 })
            jscookiee.set("userID", result.data.userId, { expires: 1 })
        }
        return result;

    } catch (error) {
        console.log("error in userLoginSlice : ", error);
    }
}

// export const forgotPassuser = async (email) => {
//     try {
//         console.log("adduser slice call....!!" + email);
//         // console.log("userData in adduserSlice  : ", userData);
//         // console.log("userData in adduserSlice  : ", userData.email);
//         var result = await axios.post(user_requestedUrl + "/genrateForgotPassOtp", { email: email });
//         console.log("result : ", result);
//         return result;
//     } catch (error) {
//         console.log("erro in opt send", error);
//     }
// }
// export const confirmResetPassword = async (data) => {
//     try {
//         console.log(data);
//         const { forgetemail, resetPass } = data;
//         console.log("data in slice cp : " + forgetemail);
//         console.log("data in slice cp : " + resetPass);
//         var result = await axios.post(user_requestedUrl + "/forgotPassword", data);
//         return result;
//     } catch (error) {
//         console.log("Error:", error);
//         alert("Confirm reset password error in Slice");
//     }
// };
export const forgetPassUser = async (email) => {
    try {
        console.log("adduser slice call....!!"+email);
        var result = await axios.post(user_requestedUrl + "/genrateForgetPassOtp", {email:email});
        console.log("result : ", result);
        console.log("result==========> : ", result.data.status);
        return result;
    } catch (error) {
        console.log("erro in opt send", error);
    }
}
export const confirmResetPassword = async (data) => {
    try {
        console.log(data);
        const { forgetemail, resetPass } = data;
        console.log("data in slice cp : " + forgetemail);
        console.log("data in slice cp : " + resetPass);
        var result = await axios.post(user_requestedUrl+"/forgotPassword",data);
        return result;
    } catch (error) {
        console.log("Error:", error);
        alert("Confirm reset password error in Slice");
    }
};
export const { setNavbar } = userSlice.actions;
export default userSlice.reducer;