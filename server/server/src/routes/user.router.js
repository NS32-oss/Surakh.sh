import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  googleAuth,
  googleAuthCallback,
  googleRedirectAuth,
  refreshAccessToken,

} from "../controllers/user.controller.js";
import { createAccountLimiter, generalLimiter } from "../middlewares/rateLimiter.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/signup").post(
  createAccountLimiter,
  registerUser
);

router.route("/login").post(generalLimiter,loginUser);
//secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refreshAccessToken").post(refreshAccessToken);
router.route("/changePassword").patch(verifyJWT, changeCurrentPassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/updateAccount").patch(verifyJWT, updateAccountDetails);
router.get('/auth/google', googleAuth);
router.get('/auth/google/callback', googleAuthCallback);
router.get('/auth/googlesign', googleRedirectAuth);









export default router;
