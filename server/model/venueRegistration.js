import mongoose from "../connection/dbConfig.js";

var venueSchema = new mongoose.Schema({
    venueEmail: {
        type: String,
        required: true,
        unique: true
    },
    VenueName: {
        type: String,
        required: true
    },
    venueLocation: {
        type: String,
        required: true
    },
    venuePrice: {
        type: Number,
        required: true
    },
    VenueType: {
        type: String,
        required: true
    },
    ServiceType: {
        type: String,
        default: "venue"
    },
    docs: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    minMembers: {
        type: Number,
        required: true
    },
    bookingAmount: {
        type: Number,
        required: true
    },
    numRooms: {
        type: Number,
        required: true
    },
    roomCharge: {
        type: Number,
        required: true
    },
    policy: {
        type: String,
        required: true
    },
    adminRequest: [
        {
            eventId: {
                type: String,
                required: false
            },
            // userEmail: {
            //     type: String,
            //     required: false,
            // },
            // venueEmail: {
            //     type: String,
            //     required: true,
            // },
            // adminEmail: {
            //     type: String,
            //     required: true,
            // },
            eventstartdate: {
                type: String,
                required: false
            },
            eventenddate: {
                type: String,
                required: false
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
                required: false,
                default: "sendRequest"
            },
            venueprice: {
                type: Number,
                required: false,
                default: 0
            },
            explaination: {
                type: String,
                required: false,
            },
        }
    ],
    AadharNo: {
        type: String,
        unique: true
    },
    BankName: {
        type: String,

    },
    BranchName: {
        type: String,

    },
    IfscCode: {
        type: String,

    },
    AccountNo: {
        type: Number,
    }
});

export default mongoose.model('veneueModel', venueSchema, "Venue");
