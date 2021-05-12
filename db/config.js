const logger = require("../logger");
const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/Codift", { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        logger.info("database connected");
    })
    .catch((err) => {
        logger.error(err);
    })

