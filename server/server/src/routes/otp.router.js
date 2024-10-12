import { Router } from "express";
import { sendOtp, checkOtp } from "../controllers/otp.controller.js";

const router = Router();

router.route("/sendOtp").post(sendOtp);
router.route("/checkOtp").post(checkOtp);

export default router;
