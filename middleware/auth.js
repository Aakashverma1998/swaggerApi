const jwt = require("jsonwebtoken");
const logger = require("../logger");

module.exports =
    function verifyToken(req, res, next) {
        // console.log(req);
        const authorizationHeaader = req.headers.authorization;
        // let result;
        if (authorizationHeaader) {
            const token = req.headers.authorization.split(' ')[1];
            // logger.info(`token  `, token);

            try {
                result = jwt.verify(token, process.env.secret_key);
                // logger.info(`result  `, result);
                req.token = result;
                next();
            } catch (err) {
                logger.error('Failed to authenticate token.')
                return res.status(401).send({ error: 'Failed to authenticate token.' });
            }
        } else {
            logger.error(`Authentication error. Token required.`)
            return res
                .status(401)
                .send({ error: `Authentication error. Token required.` });
        }
    }


