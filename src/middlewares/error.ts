import { logger } from "@/app";
import type { NextFunction, Request, Response } from "express";
import { env } from "@/config/env";
import HttpException from "@/exceptions/http.exception";
import { StatusCodes } from "http-status-codes";

export const errorHandler = (
  err: HttpException,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  logger.error(err);

  const code = err.code || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || "Something went wrong";

  res.status(code).json({
    status: false,
    message,
    ...(!env.isProduction && { stack: err.stack }),
  });
};
