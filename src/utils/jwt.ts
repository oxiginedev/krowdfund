import { env } from "@/config/env";
import jsonwebtoken from "jsonwebtoken";

export const jwt = {
  sign(id: string): string {
    return jsonwebtoken.sign({ id }, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRY,
    });
  },

  verify(token: string): string | null {
    try {
      const verified = jsonwebtoken.verify(token, env.JWT_SECRET) as {
        id: string;
      };
      return verified.id;
    } catch (error) {
      return null;
    }
  },
};
