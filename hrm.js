const express = require("express");
const hrm = express();
const port = 3010;

hrm.get('/', (req, res) => {
    res.send('Wenas nocheees!');
});

hrm.listen(port, () => {
    console.log(`Hrm listening on port ${port}`);
});

/*  ------    MYSQL RAW CONNECTION ----------------
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'H4mb0rgue50',
    database: 'test'
});

function connectDb(){
    connection.connect();    
    console.log("Ahueso tenemos conexion");
    connection.query('SHOW TABLES', function (err, rows, fields){
        if(err) throw err;
        console.log('The solution is: ', rows[0]);
    });
    connection.end();
}

connectDb();
*/
