const Register = require("../models/register")
const { sendMail } = require("../nodemailer")
const bcrypt = require("bcryptjs")
const logger = require("../logger")
module.exports = {
    post: async (req, res) => {
        try {
            let { userName, email, password, phone, userType, dob } = req.body
            let register = await Register.findOne({ email: email })
            if (register == null) {
                const hashpassword = await bcrypt.hash(password, 10)
                const register = Register({
                    userName: userName,
                    email: email,
                    password: hashpassword,
                    phone: phone,
                    dob: dob,
                    userType: userType,
                })
                const RegisterData = await register.save()
                let template = {
                    subject: "Sucessfull Regestration",
                    content: `<h4> Hi ${userName || email} </h4>
                          <h4>Your regestration is sucessfull</h4> 
                          <h4>Your details: ${RegisterData}</h4>`
                }
                await sendMail({ email: email, subject: template.subject, html: template.content })
                res.status(201).json({ "userName": RegisterData.userName, "dob": RegisterData.dob, "userType": RegisterData.userType, "email": RegisterData.email, "phone": RegisterData.phone, "uniqueId": RegisterData.uniqueId, "registrationDate": RegisterData.registrationDate })
                logger.info(RegisterData)

            } else {
                logger.error("user already exists...")
                res.status(400).json({
                    message: "user already exists..."
                })
            }

        } catch (err) {
            logger.error(err);
            res.status(400).json({
                message: error
            })

        }
    }
}
