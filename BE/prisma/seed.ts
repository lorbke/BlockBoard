import { BillBoardStatus, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {

  const company1 = await prisma.company.upsert({
    where: { id: 'company1'},
    update: {},
    create: {
        id: 'company1',
        name: 'Google',
        privateKey: 'imasuperprivatekey',
        publicKey: 'iampublic',
        ownedBB: {
          create: [
            {
              id: 'billBoard3',
              walletAddress: '0xsmth',
              GeoX: '1.14',
              GeoY: '1.15',
              videoUrl: 'blabla1.com',
              status: BillBoardStatus.RENTED,
            },
            {
              id: 'billBoard4',
              walletAddress: '0xsmth2',
              GeoX: '1.12',
              GeoY: '1.13',
              videoUrl: 'blabla2.com',
              status: BillBoardStatus.RENTED,
            },
          ]
        }
    }
  })

  const billBoard1 = await prisma.billBoard.upsert({
    where: { id: 'billBoard1' },
    update: {},
    create: {
      id: 'billBoard1',
      walletAddress: '0x1234567890',
      GeoX: '1.1',
      GeoY: '1.1',
      videoUrl: 'blabla.com',
    },
  });

  const billBoard2 = await prisma.billBoard.upsert({
    where: { id: 'billBoard2' },
    update: {},
    create: {
      id: 'billBoard2',
      walletAddress: '0x0987654321',
      GeoX: '2.1',
      GeoY: '2.1',
      videoUrl: 'blabla2.com',
    },
  });

  
  console.log({
    billBoard1,
    billBoard2,
    company1
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
