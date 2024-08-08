const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    await prisma.items.deleteMany()
    //wait prisma.itemsLists.deleteMany()
    await prisma.requisitons.deleteMany()
    await prisma.users.deleteMany()
    
    //await prisma.departments.deleteMany();
    await prisma.providers.deleteMany()
    //await prisma.categories.deleteMany()
    
    

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
    
    //const dummyDepartments = await prisma.departments.createMany({
    //    data: [
    //        { id: 1, name: 'Human Resources' },
    //        { id: 2, name: 'Quelity Asurance' },
    //        { id: 3, name: 'Production'}
    //    ]
    //})

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

/*    const category = await prisma.categories.createMany({
        data: [
            { id: 1, name: 'espacial' },
            { id: 2, name: 'electronics'},
            { id: 3, name: 'office' }
        ]
    })*/

    const dummyRequisitions = await prisma.requisitons.createMany({
        data: [
            {
                id: 1,
                total: 4000,
                requisitorId: 1,
                department: "Human resources",
                description: 'Idk... i need 500 gansitos',
                dueDate: '2024-07-19T18:00:00.000Z',
                justification: 'why not?',
                providerId: 1,
            },
            {
                id: 2,
                total: 1500,
                requisitorId: 2,
                department: 'Quelity Asurance',
                description: '5 gt3060 and a cold coke',
                dueDate: '2024-07-19T18:00:00.000Z',
                justification: 'The project manager got the sugar down',
                providerId: 2,
            },{
                id: 3,
                total: 95,
                requisitorId: 3,
                department: "Production",
                description: '300g of spacial panuchos',
                dueDate: '2024-07-19T18:00:00.000Z',
                justification: 'I want to smell colors',
                providerId: 1,
            },
            {
                id: 4,
                total: 70,
                requisitorId: 3,
                department: "Production",
                description: 'Medio litro de elote con papas',
                dueDate: '2024-07-19T18:00:00.000Z',
                justification: 'I want to smell colors',
                providerId: 1,
            }
        ]
    });

    const items = await prisma.items.createMany({
        data: [
            { id: 1, name: 'Gansitos', quantity: 5, price: 25000, category: 'especial', requisitionId: 2},
            { id: 2, name: 'Panuchos', quantity: 200, price: 4000,  category: 'office', requisitionId: 1},
            { id: 3, name: 'Esquites', quantity: 2, price: 95,  category: 'especial', requisitionId: 3},
            { id: 4,  name:'Nvidia Gt-3060', quantity: 1, price: 70, category: 'electroinics', requisitionId: 4},
        ]
    })    

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