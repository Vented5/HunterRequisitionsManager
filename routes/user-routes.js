const express = require('express')
const router = express.Router()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.use(express.json());
//router.use(express.urlencoded());


router.get('/', async (req, res) => {
    const users = await prisma.users.findMany()
    await prisma.$disconnect()
    res.send(users)
})

router.get('/:id', async (req, res) => {
    const user = await prisma.users.findUnique({
        where: {
            id: parseInt(req.params.id),
        }
    })
    if(user) {
        res.send(user)
    }else {
        res.send("Usuario no encontrado")
    }
    await prisma.$disconnect()
})

router.post('/', async (req, res) => {
    console.log(req.body.name)
    let newUser = await prisma.users.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            role: req.body.role,
            accessLvl: req.body.accessLvl
        }
    })
    newUser = await prisma.users.findUnique({
        where: {
            email: req.body.email
        }
    })
    res.send(newUser)
})

router.delete('/:id', async (req, res) => {
    //try { 
        const findUser = await prisma.users.findUnique({
            where: {
                id: parseInt(req.params.id),
            }
        })
        if(findUser){
            const deleteUser = await prisma.users.delete({
                where: {
                    id: parseInt(req.params.id)
                }
            })
            res.send("El usuario: " + findUser.name + " ha sido eliminado")
        } else {
            res.send("El usuario no existe")
        }
        
        
    //}
    //catch (e) {
    //    console.log(e)
      //  res.send(e)
    //}
    
})

router.patch('/:id', async (req, res) => {
    const findUser = await prisma.users.findUnique({
        where: {
            id: parseInt(req.params.id),
        }
    })
    //if(user){
    try{
        const updateUser = await prisma.users.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: {
                name: req.body.name,
                accessLvl: req.body.accessLvl,            
            }
        })
        res.send("El usuario: "+ findUser.id + " ha sido actualizado/")
    
    } catch(e){
        console.log(e)
    }    
    //} else {
    //    res.send("El usuario no existe.")
    //}
    
})


module.exports = router