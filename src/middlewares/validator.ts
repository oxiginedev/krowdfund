import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { z, ZodError } from "zod";

export function validator(schema: z.ZodObject<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors: Record<string, string[]> = {};

        error.issues.map((issue) => {
          const field = issue.path.join(".");

          if (!errors[field]) {
            errors[field] = [];
          }

          errors[field].push(issue.message);
        });

        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
          message: "The given data was invalid",
          errors,
        });
      }
      next(error);
    }
  };
}
