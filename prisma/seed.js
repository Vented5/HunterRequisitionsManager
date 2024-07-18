const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    await prisma.users.deleteMany();
    await prisma.requisitons.deleteMany();
    await prisma.departments.deleteMany();
    await prisma.providers.deleteMany();
    await prisma.categories.deleteMany();

    const dummyusers = await prisma.users.createMany({
        data: [{
            id: 1,
            name: 'Jaziel',
            pwd: '$2b$10$uJ.k6CGDH/DXSxtvqkgdKu17bRkdXRhQ5JiQnhlzrf6132izSUIvq',
            email: 'zanero@test.x',
            role: 'Admin',
            accessLvl: 3,
        },{
            id: 2,
            name: 'derek',
            email: 'derek@test.x',
            accessLvl: 3,
            role: 'Admin',
            pwd: '$2b$10$uJ.k6CGDH/DXSxtvqkgdKu17bRkdXRhQ5JiQnhlzrf6132izSUIvq',
        },{
            id: 3,
            name: 'LGsus',
            role: 'Validator',
            accessLvl: 2,
            email: 'elysus@test.x',
            pwd: '$2b$10$uJ.k6CGDH/DXSxtvqkgdKu17bRkdXRhQ5JiQnhlzrf6132izSUIvq'
        },{
            id: 4,
            name: 'Fran',
            role: 'Validator',
            accessLvl: 2,
            email: 'fran@test.x',
            pwd: '$2b$10$uJ.k6CGDH/DXSxtvqkgdKu17bRkdXRhQ5JiQnhlzrf6132izSUIvq'
        },{
            id: 5,
            name: 'Alexis',
            role: 'User',
            accessLvl: 1,
            email: 'alexis@test.x',
            pwd: '$2b$10$uJ.k6CGDH/DXSxtvqkgdKu17bRkdXRhQ5JiQnhlzrf6132izSUIvq'
        }]
    });
    
    const dummyDepartments = await prisma.departments.createMany({
        data: [
            { id: 1, name: 'Human Resources' },
            { id: 2, name: 'Quelity Asurance' },
            { id: 3, name: 'Production'}
        ]
    })

    const dummyProviders = await prisma.providers.createMany({
        data: [
            {
                id: 1,
                name: 'Barcel',
                email: 'takis@x.x',
                website: 'barcel.simon',
                phone: 1000000001,
            },
            {
                id: 2,
                name: 'paco',
                email: 'gansitos@paco.x',
                website: 'pacogansitos.com',
                phone: 1111111111
            }

        ]
    })

    const category = await prisma.categories.createMany({
        data: [
            { id: 1, name: 'espacial' },
            { id: 2, name: 'electronics'},
            { id: 3, name: 'office' }
        ]
    })

    const dummyRequisitions = await prisma.requisitons.createMany({
        data: [
            {
                id: 1,
                status: 'requested',
                total: 500,
                requisitorId: 1,
                departmentId: 1,
                description: 'Idk... i need 500 gansitos',
                dueDate: '2024-07-19T18:00:00.000Z',
                justification: 'why not?',
                providerId: 1,
                categoryId: 1, 
            },
            {
                id: 2,
                status: 'validated',
                total: 1500,
                requisitorId: 2,
                departmentId: 2,
                description: '20 gt3060 and a cold coke',
                dueDate: '2024-07-19T18:00:00.000Z',
                justification: 'The project manager got the sugar down',
                providerId: 2,
                categoryId: 3,
            },{
                id: 3,
                status: 'denied',
                total: 20000,
                requisitorId: 3,
                departmentId: 3,
                description: '300g of spacial brownies',
                dueDate: '2024-07-19T18:00:00.000Z',
                justification: 'I want to smell colors',
                providerId: 1,
                categoryId: 2
            }
        ]
    });

    

}
main()
    .then(async() => {
        await prisma.$disconnect()
    })
    .catch(async(e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })