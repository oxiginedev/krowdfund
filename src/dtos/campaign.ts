import { z } from "zod";

export const createCampaignDto = z.object({
  title: z.string().max(200),
  description: z.string().max(1000),
  targetAmount: z.number().int().positive().min(1000),
});
