import { login, signup } from "@/controllers/auth.controller";
import {
  createCampaign,
  fetchCampaign,
  listCampaignDonations,
  listCampaigns,
} from "@/controllers/campaign.controller";
import { me } from "@/controllers/user.controller";
import { LoginDto, SignupDto } from "@/dtos/auth";
import { CreateCampaignDto } from "@/dtos/campaign";
import { authenticate } from "@/middlewares/authenticate";
import { validator } from "@/middlewares/validator";
import { Router } from "express";

const router = Router();

router.post("/auth/signup", validator(SignupDto), signup);
router.post("/auth/login", validator(LoginDto), login);

router.post(
  "/campaigns",
  authenticate,
  validator(CreateCampaignDto),
  createCampaign
);
router.get("/campaigns", authenticate, listCampaigns);
router.get("/campaigns/:id", authenticate, fetchCampaign);
router.get("/campaigns/:id/donations", authenticate, listCampaignDonations);

router.get("/me", authenticate, me);

export default router;
