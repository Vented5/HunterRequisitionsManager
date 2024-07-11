const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  
    const dummyusers = await prisma.users.createMany({
        data: [{
            name: 'Jaziel',
            pwd: '$2b$10$uJ.k6CGDH/DXSxtvqkgdKu17bRkdXRhQ5JiQnhlzrf6132izSUIvq',
            email: 'zanero@test.x',
            role: 'Admin',
            accessLvl: 3,
        },{
            name: 'derek',
            email: 'derek@test.x',
            accessLvl: 3,
            role: 'Admin',
            pwd: '$2b$10$uJ.k6CGDH/DXSxtvqkgdKu17bRkdXRhQ5JiQnhlzrf6132izSUIvq',
        },{
            name: 'LGsus',
            role: 'Validator',
            accessLvl: 2,
            email: 'elysus@test.x',
            pwd: '$2b$10$uJ.k6CGDH/DXSxtvqkgdKu17bRkdXRhQ5JiQnhlzrf6132izSUIvq'
        },{
            name: 'Fran',
            role: 'Validator',
            accessLvl: 2,
            email: 'fran@test.x',
            pwd: '$2b$10$uJ.k6CGDH/DXSxtvqkgdKu17bRkdXRhQ5JiQnhlzrf6132izSUIvq'
        },{
            name: 'Alexis',
            role: 'User',
            accessLvl: 1,
            email: 'alexis@test.x',
            pwd: '$2b$10$uJ.k6CGDH/DXSxtvqkgdKu17bRkdXRhQ5JiQnhlzrf6132izSUIvq'
        }]
    });
    
    const dummyRequisitions = await prisma.requisitons.createMany({
        data: [
            {
           
                status: 'requested',
                total: 500,
                requisitorId: 1,
            },
            {
                status: 'validated',
                total: 1500,
                requisitorId: 2,
            },{
                status: 'denied',
                total: 20000,
                requisitorId: 3,
            }
        ]
    });
    
    //console.log({alice, req1});
    console.log(await prisma.users.findFirst({
        where: {
            id: 1,
        }
    }));

    
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