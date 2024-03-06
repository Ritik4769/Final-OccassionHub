import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { caterre_requestUrl } from '../urls.js'
import jscookie from 'js-cookie';
const initialState = {

}
const catererSlice = createSlice({
    name: 'catererSlice',
    initialState,
    reducers: {

    }
});
export const RegisterCatererData = async (formData) => {
    try {
        const userCookieEmail = jscookie.get("user");
        console.log("userCookieEmail : ", userCookieEmail);

        console.log("formData : ", formData);

        var registaion = await axios.post(caterre_requestUrl + "/catererRegister", formData);
        console.log("registration data : ", registaion);
        return registaion;
    } catch (error) {
        console.log("erro in registation user ");
    }
}

export const RegisterBankDetails = async (BankDetails) => {
    console.log(BankDetails);
    try {
        var result = await axios.post(caterre_requestUrl + "/catererBankDetail", BankDetails);
        console.log("result------", result);
        return result;
    } catch (error) {
        console.log("error in Caterres Bank ");
    }
}

export default catererSlice.reducer;