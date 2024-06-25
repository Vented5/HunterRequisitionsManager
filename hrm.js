const express = require("express");
const hrm = express();
const port = 3010;

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

hrm.use(express.json());
hrm.use(express.urlencoded());

hrm.get('/', (req, res) => {
    res.send('Wenas nocheees!');
});

hrm.get('/requisitions', async (req, res) => {
    const requisition = await prisma.requisitons.findFirst({
        where: {
            id: 1,
        }
    });
    console.log(requisition);
    await prisma.$disconnect();
    res.send(requisition);
});

hrm.get('/users', async (req, res) => {
    const users = await prisma.users.findFirst({
        where: {
            id: 1,
        }
    });
    console.log(users);
    await prisma.$disconnect();
    res.send(users);
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
