import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { z, ZodError } from "zod";

export function validator(schema: z.ZodObject<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const errors = err.issues.map((issue) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));

        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
          message: "The given data was invalid.",
          errors,
        });
      }
      next(err);
    }
  };
}
