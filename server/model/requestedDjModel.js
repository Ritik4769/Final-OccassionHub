import mongoose from "mongoose";

var requestedDjSchema = new mongoose.Schema({
    userEmail : {
        type : String,
        required : true
    },
    djEmail : {
        type : String,
        required : true
    },
    date: {
        type:String,
        required:false
    },
    time: {
        type:String,
        required:false
    },
    djhours : {
        type : Number,
        required : true
    },
    location:{
        type : String,
        required :true
    },
    status : {
        type :String,
        default : 'pending'
    },
    djprice : {
        type :Number,
        default : 0
    }
});

export default mongoose.model("requestedDjSchema",requestedDjSchema,"DjBookSchema");