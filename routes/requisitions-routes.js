const express = require('express')
const router = express.Router()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.use(express.json());
//router.use(express.urlencoded());


router.get('/', async (req, res) => {
    const requisitions = await prisma.requisitons.findMany({
        include: {
            requisitor: {
                select: {
                    name: true
                }
            },
            department: {
                select: {
                    name: true
                }
            },
            provider: {
                select: {
                    name: true
                }
            },
            category: {
                select: {
                    name: true
                }
            }
        }
    })
    await prisma.$disconnect()
    res.send(requisitions)
})

router.get('/validate', async (req, res) => {
    const requisitions = await prisma.requisitons.findMany({
        where: {
            status: 'requested'
        },
        include: {
            requisitor: {
                select: {
                    name: true
                }
            },
            department: {
                select: {
                    name: true
                }
            },
            provider: {
                select: {
                    name: true
                }
            },
            category: {
                select: {
                    name: true
                }
            }
        }
    })
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

router.patch('/:id', async (req, res) => {
    const selectedRequest = req.body
    /*await prisma.requisitons.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })*/

    try {
        await prisma.requisitons.update({
            where: {
                id: parseInt(req.params.id)
            }, data: {
                status: selectedRequest.status
            }
        
        })
        res.status(200).send(selectedRequest)
    } catch(e) {
        console.log(e)
    }
})

module.exports = router