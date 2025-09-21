import prisma from "@/config/database";
import { CreateCampaignDto } from "@/dtos/campaign";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";

export const createCampaign = async (req: Request, res: Response) => {
  const data = req.body as z.infer<typeof CreateCampaignDto>;

  const campaign = await prisma.campaign.create({
    data: {
      title: data.title,
    },
  });

  res.status(StatusCodes.CREATED).json({
    status: true,
    message: "Campaign created",
    data: campaign,
  });
};
