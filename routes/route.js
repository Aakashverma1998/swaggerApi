const router = require("express").Router()
const signup = require("../Controllers/Signup")
const signin = require("../Controllers/login")
const token = require("../Controllers/verifytoken")
const verifytoken = require("../middleware/auth")
const {post,put} = require("../Controllers/Company")

const path = require("path")
const multer = require("multer")
const storage = multer.diskStorage({
    destination: "./upload/logo",
    filename:(req,file,cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({
    storage:storage
})

router.post("/api/user", signup.post)
router.post("/api/user/login", signin.post)
router.post("/api/user/token", verifytoken, token.post)
router.post("/api/company", verifytoken,upload.single("logo"), post)
router.put("/api/company/:id",verifytoken, upload.single("logo"),put)

module.exports = router