import mongoose from "../connection/dbConfig.js";

var adminSchema = mongoose.Schema({
    _id : {
        type:String,
        required:true,
        default:"admin@gmail.com"
    },
    password:{
        type:String,
        required:true,
        default:"Admin@123"
    }
});

export default mongoose.model('adminModel',adminSchema,'admin');