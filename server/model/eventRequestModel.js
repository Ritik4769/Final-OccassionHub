import mongoose from "../connection/dbConfig.js";

var requestSchemaModal = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel',
        required: false
    },
    userEmail: {
        type: String,
        required: true
    },
    eventname: {
        type: String,
        required: false
    },
    eventtype: {
        type: String,
        required: false
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
    decorationtype: {
        type: String,
        required: false
    }
    ,
    venuetype: {
        type: String,
        required: false
    },
    serviceschoose: [
        {
            caterer: {
                type: Boolean,
                default: false,
                required: false
            },
            decoration: {
                type: Boolean,
                default: false,
                required: false
            },
            venu: {
                type: Boolean,
                default: false,
                required: false
            }
        }
    ],
    eventservices: [
        {
            caterer: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'catererSchema',
                required: false
            },
            venue: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'venueSchema',
                required: false
            },
            decoration: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'decorationrSchema',
                required: false
            },
            dj: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'djSchema',
                required: false
            }
        },
    ],
    totalguest: {
        type: Number,
        required: false
    },
    startedate: {
        type: String,
        required: false
    },
    enddate: {
        type: String,
        required: false
    },
    starttime: {
        type: String,
        required: false
    },
    endtime: {
        type: String,
        required: false
    },
    budget: {
        type: Number,
        required: false
    },
    location: {
        type: String,
        required: false
    },
    meal: {
        type: String,
        required: false
    },
    addtionalinfo: {
        type: String,
        required: false
    },
    isdjbooked: {
        type: Boolean,
        required: false
    },
    islocationExtraCharge: {
        type: Boolean,
        required: false
    },
    extrachargelocation: {
        type: Number,
        required: false
    },
});

export default mongoose.model('requestSchema', requestSchemaModal, 'requestSchema');