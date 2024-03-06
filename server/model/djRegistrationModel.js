import mongoose from "../connection/dbConfig.js"
var djSchema = new mongoose.Schema({
    DjEmail: {
        type: String,
        required: true,
        unique: true
    },
    Businessname: {
        type: String,
        required: true
    },
    EquipmentType: {
        type: String,
        required: true
    },
    Djprice: {
        type: Number,
        required: true
    },
    ServiceType: {
        type: String,
        default: "Dj"
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

export default mongoose.model('DjModel', djSchema, "Dj");
