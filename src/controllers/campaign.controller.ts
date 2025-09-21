import prisma from "@/config/database";
import { CreateCampaignDto } from "@/dtos/campaign";
import { NotFoundException } from "@/exceptions/http.exception";
import { User } from "@/generated/prisma";
import { slugify } from "@/utils/string";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";

export const createCampaign = async (req: Request, res: Response) => {
  const user = res.locals.auth.user as User;
  const data = req.body as z.infer<typeof CreateCampaignDto>;

  const slug = data.slug ?? slugify(data.title);

  const campaign = await prisma.campaign.create({
    data: {
      userId: user.id,
      title: data.title,
      description: data.description,
      currency: data.currency.toString(),
      targetAmount: data.targetAmount ?? 0,
      endsAt: data.endsAt,
      isPublic: data.isPublic,
      slug: slug,
    },
  });

  res.status(StatusCodes.CREATED).json({
    status: true,
    message: "Campaign created",
    data: campaign,
  });
};

export const fetchCampaign = async (req: Request, res: Response) => {
  const user = res.locals.auth.user as User;
  const { id } = req.params;

  const campaign = await prisma.campaign.findUnique({
    where: { id: Number.parseInt(id), userId: user.id },
  });

  if (!campaign) throw new NotFoundException("Campaign not found");

  res.json({
    status: true,
    message: "Campaign retrieved",
    data: campaign,
  });
};

export const listCampaigns = async (req: Request, res: Response) => {
  const user = res.locals.auth.user as User;

  const campaigns = await prisma.campaign.findMany({
    where: {
      userId: {
        equals: user.id,
      },
    },
    orderBy: { createdAt: "desc" },
  });

  res.json({
    status: true,
    message: "Campaigns retrieved",
    data: campaigns,
  });
};

export const listCampaignDonations = async (req: Request, res: Response) => {};
