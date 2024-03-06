import mongoose from "../connection/dbConfig.js"
var decorationSchema = new mongoose.Schema({
    DecorationEmail: {
        type: String,
        required: true,
        unique: true
    },
    Businessname: {
        type: String,
        required: true
    },
    Decorationtype: {
        type: String,
        required: true
    },
    Decorationprice: {
        type: Number,
        required: true
    },
    ServiceType: {
        type: String,
        default: "Decoration"
    },
    docs: {
        type: String,
        required: true
    },
    adminRequest: [
        {
            eventId: {
                type: String,
                required: false
            },
            Price: {
                type: Number,
                required: false,
                default: 0
            },
            status: {
                type: String,
                required: false,
                default: 'pending'
            }
        }
    ],
    AadharNo: {
        type: Number,
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

export default mongoose.model('DecorationModel', decorationSchema, "Decoration");
