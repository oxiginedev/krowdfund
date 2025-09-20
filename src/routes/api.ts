import { login, signup } from "@/controllers/auth.controller";
import { LoginDto, SignupDto } from "@/dtos/auth";
import { validator } from "@/middlewares/validator";
import { Router } from "express";

const router = Router();

router.post("/auth/signup", validator(SignupDto), signup);
router.post("/auth/login", validator(LoginDto), login);

export default router;
