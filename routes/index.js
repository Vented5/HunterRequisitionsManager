const express = require('express')
const router = express.Router()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.use(express.json());
//router.use(express.urlencoded());


router.get('/', (req, res) => {
    res.send('Wenas nocheees!')
})

router.get('/requisitions', async (req, res) => {
    const requisitions = await prisma.requisitons.findMany()
    await prisma.$disconnect()
    res.send(requisitions)
})

router.get('/requisitions/:id', async (req, res) => {
    const requisition = await prisma.requisitons.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })
    await prisma.$disconnect()
    res.send(requisition)
})

router.get('/users', async (req, res) => {
    const users = await prisma.users.findMany()
    await prisma.$disconnect()
    res.send(users)
})

router.get('/users/:id', async (req, res) => {
    const user = await prisma.users.findUnique({
        where: {
            id: parseInt(req.params.id),
        }
    })
    await prisma.$disconnect()
    res.send(user)
})

router.post('/users', async (req, res) => {
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

router.delete('/users/:id', async (req, res) => {
    try { 
        const user = await prisma.users.findUnique({
            where: {
                id: parseInt(req.params.id),
            }
        })
        prisma.users.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })
        res.send("El usuario: " + user.name + " ha sido eliminado")
    }
    catch (e) {
        console.log(e)
        res.send(e)
    }
    
})

module.exports = router