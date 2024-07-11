const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  
    const dummyusers = await prisma.users.createMany({
        data: [{
            name: 'Alice',
            pwd: '$2b$10$uJ.k6CGDH/DXSxtvqkgdKu17bRkdXRhQ5JiQnhlzrf6132izSUIvq',
            email: 'alice@zaner.x',
            role: 'user',
            accessLvl: 2,
        },{
            name: 'derek',
            email: 'derek@test.si',
            accessLvl: 2,
            role: 'Admin',
            pwd: '$2b$10$uJ.k6CGDH/DXSxtvqkgdKu17bRkdXRhQ5JiQnhlzrf6132izSUIvq',
        },{
            name: 'Elysus',
            role: 'validator',
            accessLvl: 3,
            email: 'elysus@test.si',
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