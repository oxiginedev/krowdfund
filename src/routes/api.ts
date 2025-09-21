import { login, signup } from "@/controllers/auth.controller";
import { createCampaign } from "@/controllers/campaign.controller";
import { LoginDto, SignupDto } from "@/dtos/auth";
import { authenticate } from "@/middlewares/authenticate";
import { validator } from "@/middlewares/validator";
import { Router } from "express";

const router = Router();

router.post("/auth/signup", validator(SignupDto), signup);
router.post("/auth/login", validator(LoginDto), login);

router.post("/campaigns", authenticate, createCampaign);

export default router;
