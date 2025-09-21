import { LoginDto, SignupDto } from "@/dtos/auth";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import bcrypt from "bcryptjs";
import {
  AuthenticationException,
  HttpException,
  UnauthorizedException,
} from "@/exceptions/http.exception";
import { env } from "@/config/env";
import { jwt } from "@/utils/jwt";
import prisma from "@/config/database";

export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body as z.infer<typeof SignupDto>;

  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (user) {
    throw new HttpException("Account with email already exist");
  }

  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  const newUser = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: passwordHash,
    },
    omit: { password: true },
  });

  const accessToken = jwt.sign(newUser.id);

  res.status(StatusCodes.CREATED).json({
    status: true,
    message: "Registration successful",
    data: { accessToken },
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body as z.infer<typeof LoginDto>;

  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!user) throw new AuthenticationException("Invalid credentials");

  const matches = await bcrypt.compare(password, user.password);

  if (!matches) throw new AuthenticationException("Invalid credentials");

  const accessToken = jwt.sign(user.id);

  res.json({
    status: true,
    message: "User logged in successfully",
    data: { accessToken },
  });
};
