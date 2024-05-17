const express = require("express");
const hrm = express();
const port = 3010;

hrm.get('/', (req, res) => {
    res.send('Wenas nocheees!');
});

hrm.listen(port, () => {
    console.log(`Hrm listening on port ${port}`);
});