const dotenv = require("dotenv").config()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const Register = require("../models/register")
const logger = require("../logger")
module.exports = {
    post: async (req, res) => {
        try {
            const email = req.body.email
            const password = req.body.password
            const useremail = await Register.findOne({ email: email })
            const isMatch = await bcrypt.compare(password, useremail.password)
            if (useremail) {
                if (isMatch) {
                    const token = await jwt.sign({ email: email,_id:useremail._id }, process.env.secret_key, { expiresIn: "60min" })
                    res.status(201).json({
                        User: {"userName":useremail.userName,"dob":useremail.dob,"userType":useremail.userType,"email":useremail.email,"phone":useremail.phone,"uniqueId":useremail.uniqueId,"registrationDate":useremail.registrationDate},
                        token: token,
                        message: "user login sucessfully....."

                    })
                    logger.info("user:",{"userName":useremail.userName,"dob":useremail.dob,"userType":useremail.userType,"email":useremail.email,"phone":useremail.phone,"uniqueId":useremail.uniqueId,"registrationDate":useremail.registrationDate})
                    logger.info(token)
                } else {
                    logger.error("Password is wrong....")
                    res.status(400).json({
                        message: "Password is wrong...."
                    })
                }
            } else {
                logger.error("Email is wrong...")
                res.status(400).json({
                    message: "Email is wrong..."
                })
            }
        } catch (err) {
            logger.error("Email is wrong...")
            res.status(400).json({
                message: "Email is wrong..."
            })

        }

    }

}









