import mongoose from "../connection/dbConfig.js"
var admindecorationRequestSchema = new mongoose.Schema({
    eventId : {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
    },
    decorationEmail: {
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
    decorationprice : {
        type : Number,
        required : false,
        default : 0
    }
});

export default mongoose.model('admindecorationRequestModel', admindecorationRequestSchema, "AdmindecorationRequest");