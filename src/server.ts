import { app, logger } from "@/app";
import { env } from "@/config/env";
import prisma from "@/config/database";

const server = app.listen(env.PORT, () => {
  logger.info(`Server running on port http://localhost:${env.PORT}`);
});

const onCloseSignal = () => {
  logger.info("server received shutdown signal");

  server.close(() => {
    logger.info("server closed");
    process.exit();
  });

  setTimeout(() => process.exit(1), 10000).unref();
};

process.on("SIGINT", onCloseSignal);
process.on("SIGTERM", onCloseSignal);
