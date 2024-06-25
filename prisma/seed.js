const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const alice = await prisma.users.upsert({
        where: { id: 1 },
        update: {},
        create: {
            name: 'Alice',
            pwd: 'wenas',
            email: 'alice@zaner.x',
            role: 'user',
            accessLvl: 2,
            requisitions: {
                /* create: [
                    {
                        //validatorId: 1,
                        validatedAt: null,
                        status: 'validated',
                        total: 500,
                    }
                ] */
            }
        },
    })
    
    const req1 = await prisma.requisitons.create({
        data: {
            status: 'requested',
            total: 500,
            requisitorId: 1,
        }
    })
    
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