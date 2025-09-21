import { logger } from "@/app";
import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

try {
  prisma = new PrismaClient();
  logger.info("database initialized");
} catch (error) {
  logger.error(error);
}

export default prisma;
