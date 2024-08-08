const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

router.use(express.json());

router.get('/', async (req, res) => {
    try {
        const users = await prisma.users.findMany();
        res.send(users);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching users');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await prisma.users.findUnique({
            where: { id: parseInt(req.params.id) }
        });
        if (user) {
            res.send(user);
        } else {
            res.status(404).send('Usuario no encontrado');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching user');
    }
});

router.post('/', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.pwd, 10);

        const newUser = await prisma.users.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                role: req.body.role,
                accessLvl: 1,
                pwd: hashedPassword
            }
        });

        console.log("El usuario registrado es: ", newUser);

        res.status(200).json({ message: "Usuario creado con éxito", user: newUser });
    } catch (error) {
        console.error("Error al crear el usuario:", error);
        res.status(500).json({ message: "Error al crear el usuario", error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const findUser = await prisma.users.findUnique({
            where: { id: parseInt(req.params.id) }
        });
        if (findUser) {
            await prisma.users.delete({
                where: { id: parseInt(req.params.id) }
            });
            res.status(200).json({message: "El usuario: " + findUser.name + " ha sido eliminado"});
        } else {
            res.status(404).send("El usuario no existe");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting user');
    }
});

router.patch('/:id', async (req, res) => {
    console.log("req.body", req.body)
    try {
        const findUser = await prisma.users.findUnique({
            where: { id: parseInt(req.params.id) }
        });
        if (findUser) {
            await prisma.users.update({
                where: { id: parseInt(req.params.id) },
                data: {
                    name: req.body.name,
                    role: req.body.role
                }
            });
            res.status(200).json({message: "El usuario: " + findUser.id + " ha sido actualizado"});
        } else {
            res.status(404).json({message: "El usuario no existe."});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating user');
    }
});

module.exports = router;
