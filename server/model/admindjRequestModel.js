import mongoose from "../connection/dbConfig.js"
var admindjRequestSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true,
    },
    djEmail: {
        type: String,
        required: true,
    },
    adminEmail: {
        type: String,
        required: true,
    },
    eventlocation: {
        type: String,
        required: true
    },
    eventstartdate : {
        type: String,
        required: true
    },
    eventenddate : {
        type: String,
        required: true
    },
    status : {
        type : String,
        required : true,
        default: "pending"
    },
    djprice : {
        type : Number,
        required : false,
        default : 0
    }
});

export default mongoose.model('admindjRequestModel', admindjRequestSchema, "AdmindjRequest");