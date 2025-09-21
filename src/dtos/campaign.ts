import { z } from "zod";

export const CreateCampaignDto = z.object({
  title: z.string().max(200),
  description: z.string().max(1000),
  currency: z.string(),
  targetAmount: z.number().int().positive().min(1000).max(999999).nullable(),
});
