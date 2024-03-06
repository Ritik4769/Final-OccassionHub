import mongoose from "../connection/dbConfig.js";

var catererSchema = new mongoose.Schema({
    catererEmail: {
        type: String,
        required: true,
        unique: true
    },
    Businessname: {
        type: String,
        required: true
    },
    Specialization: {
        type: String,
        required: true
    },
    ServiceCharges: {
        type: Number,
        required: true
    },
    FoodType: {
        type: String,
        required: true
    },
    ServiceType: {
        type: String,
        default: "caterer"
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

            status: {
                type: String,
                required: false,
                default: "sendRequest"
            },
            Price: {
                type: Number,
                required: false,
                default: 0
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

export default mongoose.model('catererModel', catererSchema, "Caterer");
