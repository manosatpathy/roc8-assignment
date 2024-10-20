import { PrismaClient } from "@prisma/client";
import seedData from "./seedData.js";

const prisma = new PrismaClient();

async function main() {
  await prisma.data.createMany({ data: seedData });
  console.log("Data seeded");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
