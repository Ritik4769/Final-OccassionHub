import mongoose from "../connection/dbConfig.js"
var decorationRequestSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true,
    },
    decorationEmail: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    starttime: {
        type: String,
        required: true
    },
    endtime: {
        type: String,
        required: true
    },
    additionalInfo: {
        type: String,
        required: true
    },
    status : {
        type : String,
        required : true,
        default: "pending"
    },
    Price : {
        type : Number,
        required : true
    }
});

export default mongoose.model('DecorationRequestModel', decorationRequestSchema, "DecorationRequest");