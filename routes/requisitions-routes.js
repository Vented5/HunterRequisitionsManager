const express = require('express')
const router = express.Router()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.use(express.json());
//router.use(express.urlencoded());


router.get('/', async (req, res) => {
    const requisitions = await prisma.requisitons.findMany()
    await prisma.$disconnect()
    res.send(requisitions)
})

router.get('/:id', async (req, res) => {
    const requisition = await prisma.requisitons.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })
    await prisma.$disconnect()
    res.send(requisition)
})

module.exports = router