const logger = require("../logger")
const mongoose = require("mongoose")
const companyRegister = require("../models/company")
module.exports = {
    post: async (req, res) => {
        try {
            // console.log(req.body);
            // console.log(req.token);
            // const file = req.swagger
            // console.log(file);
            const {Username, address, pincode, email,createAt } = req.body
            const companyData = await companyRegister({
                Username:Username,
                address: address,
                pincode: pincode,
                email: email,
                updatedBy : null,
                createdBy:req.token._id,
                createAt:createAt,
                //for swagger...
                logo: `http://localhost:4000/${req.file}`
                //for postman..
                // logo: `http://localhost:4000/${req.file.filename}`
            })
            const data = await companyData.save()
            res.status(201).json(data)
            logger.info(data);
            console.log(req.file);

        } catch (err) {
            console.log(err);
           logger.error(err);
            res.status(500).json({
                message: "server error"
            })

        }
    },
    put: async(req,res)=>{
        try{
            const updatedBy = req.token._id
            // const file = req.swagger.params.upfile.value
            // console.log(file);
            const {Username, address, pincode, email } = req.body
            const companyData ={
                Username:Username,
                address: address,
                pincode: pincode,
                email: email,
                //for swagger...
                logo: `http://localhost:4000/${req.file}`,
                updatedBy : updatedBy
            }
            const data = await companyRegister.findByIdAndUpdate({_id:mongoose.Types.ObjectId(req.params.id)},{$set:companyData},{new:true})
            res.send(data)
        }catch(err){
            logger.error(err);
            console.log(err);
        }
    }
}