import cors from "cors";
import express from "express";
import helmet from "helmet";
import { pino } from "pino";
import { errorHandler } from "@/middlewares/error";
import { env } from "@/config/env";
import router from "@/routes/api";

const logger = pino({ name: "krowdfund" });
const app = express();

app.set("trust proxy", true);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.FRONTEND_URL, credentials: true }));
app.use(helmet());
app.use(errorHandler);

app.get("/", (_req, res) => {
  res.json({ message: "Krowdfund API is running" });
});

app.use("/", router);

export { app, logger };
