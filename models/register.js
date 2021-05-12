const mongoose = require("mongoose")
const validator = require("validator")
const registerSchema = new mongoose.Schema({
    userName: {
        type: String,
        required:true,
        minlength:2,
        maxlength:20
    },
    email: {
        type: String,
        required: true,
        unique: [true, "email already present..."],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new error("Invalid Email..")
            }
        }
    },
    phone: {
        type: String,
        required:true,
        minlength:10,
        maxlength:10
    
    },
    password: {
        type: String,
        required:true
        
    },
    userType: {
        type: String,
        required:true
    },
    dob: {
        type:String
    },
    uniqueId: {
        type: String,
        default: function () {
            return Math.floor(Math.random() * 900000) + 100000
        }
    },
    registrationDate: {
        type: Date,
        default: new Date().getTime()
    }
})
const Register = new mongoose.model("Register", registerSchema)
module.exports = Register