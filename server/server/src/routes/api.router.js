import { Router } from "express";
import {   generateSecretKey, authenticateSecretKey } from "../controllers/api.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.route("/generateSecretKey").post(verifyJWT,generateSecretKey);
router.route("/authenticateSecretKey").post(verifyJWT,authenticateSecretKey);

export default router;