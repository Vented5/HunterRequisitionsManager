const express = require('express')
const router = express.Router()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/:userId', async (req, res) => {
    const budgets = await prisma.budgets.findMany({
        where: {
            creatorId: req.params.userId
        }
    })
    await prisma.$disconnect()
    res.send(budgets)
})

router.post('/', async (req, res) => {
    await prisma.budgets.create({
        data: {
            ammount: req.body.ammount, 
            name: req.body.name,
            creatorId: req.body.userId,
        }
    })
})

module.exports = router