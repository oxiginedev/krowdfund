import { User } from "@/generated/prisma";
import type { Request, Response } from "express";

export const me = async (req: Request, res: Response) => {
  const user = res.locals.auth.user as Omit<User, "password">;

  res.json({
    status: true,
    message: "User retrieved",
    data: user,
  });
};
