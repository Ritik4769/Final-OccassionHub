import mongoose from "../connection/dbConfig.js";

var quatationSchema = new mongoose.Schema({
    userId : {
        type : String,
        require : false
    },
    eventId : {
        type : String,
        require : false
    },
    eventName : {
        type : String,
        require : false
    },
    catererId : {
        type : String,
        require : false
    },
    djId : {
        type : String,
        require : false
    },
    decorationId : {
        type : String,
        require : false
    },
    venueId : {
        type : String,
        require : false
    },
    totalPrice : {
        type : Number,
        default : 0,
        require : false
    },
    status : {
        type : String,
        require : false,
        default : 'pending'
    }
});

export default mongoose.model('quatationModel', quatationSchema, 'Quatation');