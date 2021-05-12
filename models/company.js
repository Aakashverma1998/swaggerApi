const mongoose = require("mongoose")
const validator = require("validator")
const companySchema = new mongoose.Schema({
    Username:{
        type:String,
        required:true,
        minlength:2,
        maxlength:20
    },
    email: {
        type: String,
        required:true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new error("Invalid Email..")
            }
        }
    },
    address: {
        type: String,
        required:true,
        minlength:5,
        maxlength:100
    },
    logo:{
        type:String
    },
    pincode: {
        type: String,
        required:true,
        minlength:6,
        maxlength:6
    },
    uniqueId: {
        type: String,
        default: function () {
            return Math.floor(Math.random() * 900000) + 100000
        }
    },
    createdAt: {
        time: { type: Date, default: Date.now }
    },
    createdBy: {
        type:String
    },
    updatedBy:{
        type:String
    }

})
const companyRegister = new mongoose.model("companyRegister", companySchema)
module.exports = companyRegister