const express = require("express")
const morgan = require('morgan')

const hrm = express();
const port = 3010;

//routes
hrm.use(morgan('short')) //shows al request in console
hrm.use('/', require('./routes/index')) 

hrm.listen(port, () => {
    console.log(`Hrm listening on port ${port}`);
});
