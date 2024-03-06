import mongoose from "../connection/dbConfig.js"
var adminCatereToRequestModal = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true,
    },
    catererEmail: {
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
    eventstartdate: {
        type: String,
        required: true
    },
    eventenddate: {
        type: String,
        required: true
    },
    customiseThali: [{
        Roti: [
            {
                type: String,
                required: false
            }
        ],
        Sabji: [
            {
                type: String,
                required: false
            }
        ],
        Starter: [
            {
                type: String,
                required: false
            }
        ],
        Dessert: [
            {
                type: String,
                required: false
            }
        ]
    }],
    status: {
        type: String,
        required: true,
        default: "pending"
    },
    catereprice: {
        type: Number,
        required: false,
        default: 0
    }
});

export default mongoose.model('adminCatereToRequestModal', adminCatereToRequestModal, "AdminCatereRequest");
