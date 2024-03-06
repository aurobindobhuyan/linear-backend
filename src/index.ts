import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import { connectMongoDb } from "./config/database";
import { logError, logInfo, logWarning } from "./utils/logger/logger";
import { globalErrorHandler } from "./utils/helper/errorHandlers";

dotenv.config();
const app = express();

app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    allowedHeaders: ["Content-Type", "Authorization"],
    preflightContinue: true,
    methods: "*",
    credentials: true,
  })
);
app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
  })
);

(async () => {
  try {
    await connectMongoDb();
    logWarning(`🌿[DB]: MongoDB Connected`);

    app.listen(process.env.PORT, () => {
      logInfo(`⚡️[server]: Server is running at ${process.env.PORT}`);
    });

    app.use("*", (req: Request, res: Response) => {
      throw new Error(`Can't find ${req.originalUrl} on the server!`);
    });
    app.use(globalErrorHandler);
  } catch (error) {
    logError(error);
  }
})();
