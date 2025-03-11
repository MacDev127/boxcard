// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Example seeds
  await prisma.boxer.create({
    data: {
      name: 'Mike Tyson',
      country: 'USA',
      profileImage: 'https://someurl.com/tyson.jpg',
      club: 'Custom Club',
      province: 'New York',
      age: 54,
      weight: 220,
      stance: 'Orthodox',
      level: 'elite',
      fightsWon: 50,
      fightsLost: 6,
      videoUrl: 'https://youtube.com/...',
    },
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
