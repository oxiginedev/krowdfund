import { LoginDto, SignupDto } from "@/dtos/auth";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@/generated/prisma";
import HttpException from "@/exceptions/http.exception";
import * as jwt from "jsonwebtoken";
import { env } from "@/config/env";

const prisma = new PrismaClient();

export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body as z.infer<typeof SignupDto>;

  const existingUser = await prisma.user.findUnique({
    where: { email: email },
  });

  if (existingUser) {
    throw new HttpException("Account with email already exist");
  }

  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: passwordHash,
    },
  });

  const accessToken = jwt.sign({}, env.JWT_SECRET);

  res
    .status(StatusCodes.CREATED)
    .json({ message: "User signed up successfully", data: { accessToken } });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body as z.infer<typeof LoginDto>;

  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!user) {
    throw new HttpException("Invalid credentials");
  }

  const matches = await bcrypt.compare(password, user.password);

  if (!matches) {
    throw new HttpException("Invalid credentials");
  }

  res.json({ message: "User logged in successfully" });
};
