const express = require("express")
const app = express()
const logger = require("./logger")
const swaggerUi = require('swagger-ui-express');
const cors = require("cors")
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const User_route = require("./routes/route")
const PORT = process.env.PORT || 4000
require("./db/config")
var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(User_route)
    
app.use(function(req, res, next) {
    (req.body, req.files);
   next();
 });
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors(corsOptions))
app.use("/", express.static("upload/logo"))
app.listen(PORT, logger.info(`server is running on port${PORT}`))



