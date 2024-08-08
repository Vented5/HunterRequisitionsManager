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
            email: 'zaner019@gmail.com',
            role: 'Admin',
            accessLvl: 3,
        },{
            id: 2,
            name: 'derek',
            email: 'derekMZ@gmail.com',
            accessLvl: 3,
            role: 'Admin',
            pwd: '$2b$10$uJ.k6CGDH/DXSxtvqkgdKu17bRkdXRhQ5JiQnhlzrf6132izSUIvq',
        },{
            id: 3,
            name: 'LGsus',
            role: 'Validator',
            accessLvl: 2,
            email: 'elysus@gmail.com',
            pwd: '$2b$10$uJ.k6CGDH/DXSxtvqkgdKu17bRkdXRhQ5JiQnhlzrf6132izSUIvq'
        },{
            id: 4,
            name: 'Fran',
            role: 'Validator',
            accessLvl: 2,
            email: 'f.a.montoya.2020@gmail.com',
            pwd: '$2b$10$uJ.k6CGDH/DXSxtvqkgdKu17bRkdXRhQ5JiQnhlzrf6132izSUIvq'
        },{
            id: 5,
            name: 'Alexis',
            role: 'User',
            accessLvl: 1,
            email: 'aamedinag62@gmail.com',
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
                name: 'Picaso Electronics',
                email: 'picaso_electronics@gmail.com',
                website: '',
                phone: 1000000001,
            },
            {
                id: 2,
                name: 'Vallarta Electronics',
                email: 'electrica_vallarta@gmail.com',
                website: 'electronica_vallarta.com',
                phone: 1111111111
            },
            {
                id: 3,
                name: 'Office depot',
                email: 'electrica_vallarta@gmail.com',
                website: 'electronica_vallarta.com',
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
                description: 'Colaborators require new print equipment.',
                dueDate: '2024-08-19T18:00:00.000Z',
                justification: 'Last printer got unoperative during manteinance.',
                providerId: 1,
            },
            {
                id: 2,
                total: 1500,
                requisitorId: 2,
                department: 'Quality Asurance',
                description: 'Reciently arrived colaborators require two monitors for operation.',
                dueDate: '2024-08-23T18:00:00.000Z',
                justification: 'Old models in the storage were sent to HR',
                providerId: 2,
            },{
                id: 3,
                total: 95,
                requisitorId: 3,
                department: "Development",
                description: 'Development team colaborators required a new desk for the pasant.',
                dueDate: '2024-07-19T18:00:00.000Z',
                justification: 'Reports descrive an innovation in desk usage for recreative purposes during the perfomance of newby part last weekend. It didnt go as expected',
                providerId: 3,
            },
            {
                id: 4,
                total: 70,
                requisitorId: 3,
                department: "Production",
                description: 'Production team reported they require new wraping machine for shipments.',
                dueDate: '2024-08-29T18:00:00.000Z',
                justification: 'Third shift tried to make a bed out of plastic during stand by time',
                providerId: 1,
            }
        ]
    });

    const items = await prisma.items.createMany({
        data: [
            { id: 1, name: 'Monitor', quantity: 1, price: 3500, category: 'Electronics', requisitionId: 2},
            { id: 2, name: 'Printer Epson 500', quantity: 1, price: 4000,  category: 'Electronics', requisitionId: 1},
            { id: 3, name: 'Desk', quantity: 1, price: 4500,  category: 'Office', requisitionId: 3},
            { id: 4,  name:'Wraping Machine 3000', quantity: 1, price: 20000, category: 'especial', requisitionId: 4},
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