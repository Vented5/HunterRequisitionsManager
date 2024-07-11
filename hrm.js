const express = require("express")
const cors = require('cors')
const morgan = require('morgan')

const hrm = express();
const port = 3010;

const corsOptions = {
    origin: 'http://localhost:3000',
    optionSuccessStatus: 200,
    credentials: true,
}

//routes
hrm.use(morgan('short')) //shows al request in console
hrm.use('/users', cors(corsOptions), require('./routes/user-routes'))
hrm.use('/requisitions', cors(corsOptions), require('./routes/requisitions-routes')) 
hrm.use('/auth', cors(corsOptions), require('./routes/auth-routes'))

hrm.listen(port, () => {
    console.log(`Hrm listening on port ${port}`);
});
