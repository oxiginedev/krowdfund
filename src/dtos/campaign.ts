import { z } from "zod";

export enum Currency {
  NGN,
}

export const CreateCampaignDto = z.object({
  title: z.string().max(200),
  slug: z.string().min(4).max(100).nullable(),
  description: z.string().max(1000),
  currency: z.string(),
  targetAmount: z.number().int().positive().min(1000).max(999999).nullable(),
  endsAt: z.date().nullish(),
  isPublic: z.boolean().default(true),
});
