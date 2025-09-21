import prisma from "@/config/database";
import { CreateDonationDto } from "@/dtos/donation";
import { NotFoundException } from "@/exceptions/http.exception";
import type { Request, Response } from "express";
import { z } from "zod";

export const createDonation = async (req: Request, res: Response) => {
  const data = req.body as z.infer<typeof CreateDonationDto>;

  const campaign = await prisma.campaign.findUnique({
    where: { id: data.campaignId },
  });

  if (!campaign) throw new NotFoundException();

  const donation = await prisma.donation.create({
    data: {
      campaignId: data.campaignId,
      donorName: data.donorName,
      donorEmail: data.donorEmail,
      amount: data.amount,
      message: data.message,
      isAnonymous: data.isAnonymous || false,
    },
  });

  res.json({
    status: true,
    message: "Donation created",
  });
};
