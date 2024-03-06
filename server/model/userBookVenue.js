import mongoose from "mongoose";

var userBookVenue = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    venueEmail: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: false
    },
    numRooms: {
        type: String,
        required: false
    },
    functionTime: {
        type: String,
        required: false
    },
    functionType: {
        type: String,
        required: true
    },
    AdditionalInfo: {
        type: String,
        required: true
    },
    calculateAmount: [{
        roomCharge: {
            type: Number,
            required: false
        },
        otherCharge:{
            type:Number,
            required:false
        },
        totalAmount:{
            type: Number,
            required: false
        },
        explaination:{
            type: String,
            required: false
        }
    }],
    status: {
        type: String,
        default: "pending"
    }
});

export default mongoose.model("userBookVenue", userBookVenue, "userBookVenue");