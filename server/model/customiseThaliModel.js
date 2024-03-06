import mongoose from "../connection/dbConfig.js";

var customiseThaliSchema = new mongoose.Schema({
    eventrequirmentid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'requestSchema',
        required: false
    },
    catereid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModal',
        required: false
    },
    userEmail: {
        type: String,
        required: false
    },
    catereEmail: {
        type: String,
        required: false
    },
    catereBusiness: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: false
    },
    date: {
        type: String,
        required: false
    },
    time: {
        type: String,
        required: false
    },
    totalguest: {
        type: Number,
        required: false
    },
    requirments: [{
        Roti: [{
            type: String,
            required: false
        }],
        Sabji: [{
            type: String,
            required: false
        }],
        Starter: [{
            type: String,
            required: false
        }],
        Dessert: [{
            type: String,
            required: false
        }],
    }],
    addtionalmenu: {
        type: String,
        required: false
    },
    Price: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: "pending"
    }
});

export default mongoose.model('customiseThaliSchema', customiseThaliSchema, 'customiseThaliSchema');
