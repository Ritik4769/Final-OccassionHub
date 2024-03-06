import mongoose from "../connection/dbConfig.js";

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true,
        unique: true

    },
    password: {
        type: String,
        required: true
    },
    contect: {
        type: Number,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    role: {
        type: String,
        require: false,
        default: "user"
    },
    img :{
        default :"1707306633104userProfile.png",
        type:String,
        required:true
    },userstatus:{
        default : "unblock",
        type:String,
        required:true
    }
});

export default mongoose.model('userModel', userSchema, 'user');