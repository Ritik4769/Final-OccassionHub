import mongoose from "../connection/dbConfig.js"
var adminRequestToVenueSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true,
    },
    venueEmail: {
        type: String,
        required: true,
    },
    adminEmail: {
        type: String,
        required: true,
    },

    eventstartdate: {
        type: String,
        required: true
    },
    eventenddate: {
        type: String,
        required: true
    },
    addInfo: {
        type: String,
        required: false
    },
    // addtionalinfo: {
    //     type: String,
    //     required: false
    // },
    status: {
        type: String,
        required: true,
        default: "pending"
    },
    venueprice: {
        type: Number,
        required: false,
        default: 0
    },
    explaination: {
        type: String,
        required: false,
    }

})
export default mongoose.model("adminRequestToVenueModal", adminRequestToVenueSchema, "AdminVenueRequest");
