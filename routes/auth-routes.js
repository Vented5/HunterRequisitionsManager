const { serialize } = require('cookie');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')

const SECRET_KEY = 'tu_clave_secreta'; 

const express = require('express')
const router = express.Router()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient() 

router.use(express.json());

router.post('/', async(req, res) => {
    const { user, pwd } = req.body
    const existingUser = await prisma.users.findFirst({
        where: {name: user}
    })
    console.log("El usuario existente es: ", existingUser)
    if(existingUser){
        //Login exitoso
        const token = jwt.sign({ id: 1, username: 'zaner' }, SECRET_KEY, { expiresIn: '1h' });
          
          res.cookie('auth_token', token, {
            httpOnly: false,
            secure: false,
            sameSite: 'None',
            maxAge: 3600,     
            path: '/'
          }).status(200).json({ message: 'Conexión exitosa con la API' });    
    
        console.log("El usuario existe")    

    } else {
        res.status(401).json({ message: 'El usuario no existe'})
        console.log("El usuario no existe")
    }
    
    
    console.log( req.body)

    
})  

router.post('/logout', (req, res) => {
    res.clearCookie('auth_token', {
        path: '/',
    })
    res.status(200).json({ message: 'Cookie auth_token eliminada correctamente' });
})

module.exports = router