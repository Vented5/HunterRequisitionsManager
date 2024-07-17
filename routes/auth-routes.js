const { serialize } = require('cookie');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')

const SECRET_KEY = 'tu_clave_secreta'; //token key

const express = require('express')
const router = express.Router()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient() 

router.use(express.json());

router.get('/:token', async(req, res) => {
    const token = jwt.decode(req.params.token)
    const user = await prisma.users.findUnique({
        where: { id: token.id }
    })
    console.log(token)
    console.log(user)
    res.status(200).json({ session: user })
})


router.post('/', async(req, res) => {
    const { email, pwd } = req.body
    //Verificacion del usuario
    const existingUser = await prisma.users.findFirst({
        where: {email: email}
    })
    if(existingUser){ //El usuario existe
        //Encriptacion de la contraseña
        bcrypt.compare(pwd, existingUser.pwd, (err, result) => {
            if (err) {
                console.error('Error comparando contraseñas:', err);
                res.status(500).json({ message: 'Error interno del servidor' });
              } else if (result) {
                //Creacion del token
                const token = jwt.sign({ id: 1, username: 'zaner' }, SECRET_KEY, { expiresIn: '1h' });  
                res.cookie('auth_token', token, {
                httpOnly: false,
                secure: true,
                sameSite: 'none',
                maxAge: 3600,     
                path: '/'
                }).status(200).json({ message: 'Conexión exitosa con la API', user: existingUser, token: token});
            } else {
                // Contraseña incorrecta
                res.status(401).json({ message: 'Contraseña incorrecta' });
            }
        })        
        console.log("El usuario existe")    
    } else {
        res.status(401).json({ message: 'El usuario no existe'})
        console.log("El usuario no existe")
    }
})  

///NO TOCAR ==== SE DESMADRA
router.post('/logout', (req, res) => {
    res.clearCookie('auth_token', {
        httpOnly: false,
            secure: false,
            sameSite: 'lax',
            maxAge: 3600,     
            path: '/'
    })
    res.status(200).json({ message: 'Cookie auth_token eliminada correctamente' });
})

module.exports = router