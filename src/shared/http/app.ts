import "dotenv/config";
import "reflect-metadata";
import "express-async-errors";
import helmet from "helmet";
import cors from "cors";
import routes from "@shared/http/routes";
import AppError, { isOperationalError } from "@shared/errors/AppError";
import express, { Express, NextFunction, Request, Response } from "express";

class AppController {
  express: Express;

  constructor() {
    process.on("unhandledRejection", error => {
      throw error;
    });

    process.on("uncaughtException", error => {
      console.error(error);

      if (!isOperationalError(error)) {
        process.exit(1);
      }
    });

    this.express = express();
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(express.json());
    this.express.use(helmet());
    this.express.use(cors());
    this.routes();
    this.errorHandler();
  }

  routes() {
    this.express.use(routes);
  }

  errorHandler() {
    this.express.use(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (error: Error, req: Request, res: Response, next: NextFunction) => {
        if (error instanceof AppError) {
          return res.status(error.statusCode).json({
            status: "error",
            message: error.message,
          });
        }
        console.log(error);
        return res.status(500).json({
          status: "error",
          message: "Internal server error",
        });
      },
    );
  }
}

export default new AppController().express;
