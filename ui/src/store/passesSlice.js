import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { passes_requestUrl } from "../urls.js";
const initialState = {
   
}
const passesSlice = createSlice({
    name:'passesSlice',
    initialState,
    reducers : {
        
    }
});
export const passesDataDetails = async(passesDetails)=>{
    try {
        console.log("passesDetails : ",passesDetails);
        alert("passesSlice ");
        var passesDetail = await axios.post(passes_requestUrl+"/passesData",passesDetails);        
        console.log("passesDetails after insert data : " , passesDetail);
        return passesDetail;
    } catch (error) {
        console.log("erro in passes schema");
    }
}
export default passesSlice.reducer;