import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  const email = "admin@admin.com";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const user = await prisma.user.create({
    data: {
      email,
    },
  });

  const shop = await prisma.shop.create({
    data: {
      name: "sample shop",
      userId: user.id,
    },
  });

  await prisma.expense.create({
    data: {
      shopId: shop.id,
      userId: user.id,
      amountSpent: 25,
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
