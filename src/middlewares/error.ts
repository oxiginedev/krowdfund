import { logger } from "@/app";
import type { NextFunction, Request, Response } from "express";
import { env } from "@/config/env";
import { HttpException } from "@/exceptions/http.exception";
import { StatusCodes } from "http-status-codes";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  logger.error(err);

  const message = err.message || "Something went wrong";
  const code =
    err instanceof HttpException
      ? err.code
      : StatusCodes.INTERNAL_SERVER_ERROR;

  return res.status(code).json({
    status: false,
    message,
    ...(!env.isProduction && { stack: err.stack }),
  });
};
