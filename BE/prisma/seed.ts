import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
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

  const company1 = await prisma.company.upsert({
    where: { id: 'company1'},
    update: {},
    create: {
        id: 'company1',
        name: 'Google',
        privateKey: 'imasuperprivatekey'
    }
  })
  
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
