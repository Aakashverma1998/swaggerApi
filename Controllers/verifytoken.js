const jwt = require("jsonwebtoken")
const logger = require("../logger")
module.exports = {
    post: async (req, res) => {
        try {
            const token = req.token
            logger.info(`token in post  `, token);
            res.status(201).json({
                message:token
            })

        } catch (err) {
            logger.error(err);

        }
    }
}