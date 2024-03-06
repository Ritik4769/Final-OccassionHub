import mongoose from "../connection/dbConfig.js";
var passesSchema = new mongoose.Schema({
    eventrequested_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'requestSchema', 
        required: true
    },
    userEmail: {
        type: String,
        required: true,
    },
    passname : {
        type : String,
        required : true,
    },
    eventtype:{
        type : String,
        required : true,
    },
    passesPrice : { 
        type : Number,
        required : true
    },
    address:{
        type : String,
        required : true,
    },
    Quantity : {
        type : Number,
        required : true
    },
    Start_Date : {
        type : String,
        required : true
    },
    // last_Date : {
    //     type : String,
    //     required : true
    // },
    startTime:{
        type : String,
        required : true
    },
    EndTime:{
        type : String,
        required : true
    },
    docs:{
        type:String,
        required:true
    }
});

export default mongoose.model("passesModel",passesSchema,"passesData");