import { z } from "zod";

export const CreateDonationDto = z.object({
  campaignId: z.number().int().positive(),
  donorName: z.string().min(1).max(100),
  donorEmail: z.email().max(100),
  amount: z.number().positive().min(100),
  message: z.string().max(500),
  isAnonymous: z.boolean().optional(),
});
