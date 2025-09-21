import { logger } from "@/app";
import prisma from "@/config/database";
import {
  AuthenticationException,
  HttpException,
  UnauthorizedException,
} from "@/exceptions/http.exception";
import { jwt } from "@/utils/jwt";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) throw new AuthenticationException();

    const userId = jwt.verify(token);

    if (!userId) throw new AuthenticationException();

    const user = await prisma.user.findUnique({
      where: { id: Number.parseInt(userId) },
    });

    if (!user) throw new AuthenticationException();

    res.locals.auth = { user: user };
    next();
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
