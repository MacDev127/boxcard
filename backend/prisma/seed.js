// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.boxer.createMany({
    data: [
      {
        name: 'Katie Taylor',
        country: 'Ireland',
        profileImage: 'https://someurl.com/image1.jpg',
        club: 'Bray Boxing Club',
        province: 'Leinster',
        age: 36,
        stance: 'Orthodox',
        level: 'elite',
        weight: 154,
        fightsWon: 22,
        fightsLost: 0,
        videoUrl: 'https://youtube.com/...',
      },
      {
        name: 'Carleigh Irving',
        country: 'Ireland',
        age: 19,
        profileImage: 'https://someurl.com/carleigh.jpg',
        club: 'Oakleaf Boxing Club',
        province: 'Ulster',
        weight: 48,
        stance: 'Orthodox',
        level: 'elite',
        fightsWon: 50,
        fightsLost: 6,
        videoUrl: 'https://youtube.com/...',
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
